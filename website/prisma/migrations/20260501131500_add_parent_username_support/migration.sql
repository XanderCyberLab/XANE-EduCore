-- AlterTable
ALTER TABLE "ParentUser" ADD COLUMN "username" TEXT;

-- Backfill usernames from email local-parts with collision-safe numeric suffixes.
WITH normalized AS (
  SELECT
    id,
    CASE
      WHEN cleaned = '' OR length(cleaned) < 3 THEN 'parent'
      ELSE cleaned
    END AS base_username
  FROM (
    SELECT
      id,
      left(
        trim(both '-' FROM regexp_replace(lower(split_part(email, '@', 1)), '[^a-z0-9]+', '-', 'g')),
        24
      ) AS cleaned
    FROM "ParentUser"
  ) candidates
), ranked AS (
  SELECT
    id,
    base_username,
    row_number() OVER (PARTITION BY base_username ORDER BY id) AS occurrence
  FROM normalized
)
UPDATE "ParentUser" parent_user
SET "username" = CASE
  WHEN ranked.occurrence = 1 THEN ranked.base_username
  ELSE left(ranked.base_username, 24 - length('-' || ranked.occurrence::text)) || '-' || ranked.occurrence::text
END
FROM ranked
WHERE parent_user.id = ranked.id
  AND parent_user."username" IS NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ParentUser_username_key" ON "ParentUser"("username");
