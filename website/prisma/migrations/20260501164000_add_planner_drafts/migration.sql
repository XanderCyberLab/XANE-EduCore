CREATE TABLE "PlannerDraft" (
    "id" TEXT NOT NULL,
    "childProfileId" TEXT NOT NULL,
    "weekStart" DATE NOT NULL,
    "summary" TEXT,
    "source" TEXT,
    "learningGoals" TEXT,
    "pacingNotes" TEXT,
    "supportNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlannerDraft_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PlannerDraftItem" (
    "id" TEXT NOT NULL,
    "plannerDraftId" TEXT NOT NULL,
    "subject" "SubjectArea" NOT NULL,
    "assignedDate" DATE NOT NULL,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "itemType" "PlanItemType" NOT NULL DEFAULT 'LESSON',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "tokenValue" INTEGER NOT NULL DEFAULT 1,
    "isPrintable" BOOLEAN NOT NULL DEFAULT false,
    "isOffline" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlannerDraftItem_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "PlannerDraft_childProfileId_weekStart_key" ON "PlannerDraft"("childProfileId", "weekStart");
CREATE INDEX "PlannerDraft_childProfileId_idx" ON "PlannerDraft"("childProfileId");
CREATE INDEX "PlannerDraftItem_plannerDraftId_assignedDate_idx" ON "PlannerDraftItem"("plannerDraftId", "assignedDate");
CREATE INDEX "PlannerDraftItem_subject_assignedDate_idx" ON "PlannerDraftItem"("subject", "assignedDate");

ALTER TABLE "PlannerDraft" ADD CONSTRAINT "PlannerDraft_childProfileId_fkey" FOREIGN KEY ("childProfileId") REFERENCES "ChildProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PlannerDraftItem" ADD CONSTRAINT "PlannerDraftItem_plannerDraftId_fkey" FOREIGN KEY ("plannerDraftId") REFERENCES "PlannerDraft"("id") ON DELETE CASCADE ON UPDATE CASCADE;
