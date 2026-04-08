-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "ChildAgeBand" AS ENUM ('EARLY_YEARS', 'LOWER_ELEMENTARY', 'UPPER_ELEMENTARY');

-- CreateEnum
CREATE TYPE "PlanStatus" AS ENUM ('DRAFT', 'ACTIVE', 'COMPLETED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "SubjectArea" AS ENUM ('READING', 'MATH', 'CRITICAL_THINKING');

-- CreateEnum
CREATE TYPE "PlanItemType" AS ENUM ('LESSON', 'ACTIVITY', 'PRACTICE', 'OFFLINE', 'PRINTABLE');

-- CreateEnum
CREATE TYPE "TaskCompletionStatus" AS ENUM ('PENDING', 'COMPLETED', 'SKIPPED');

-- CreateTable
CREATE TABLE "ParentUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "timezone" TEXT DEFAULT 'America/Chicago',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParentUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChildProfile" (
    "id" TEXT NOT NULL,
    "parentUserId" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "pinHash" TEXT,
    "ageBand" "ChildAgeBand",
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChildProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewardPlan" (
    "id" TEXT NOT NULL,
    "childProfileId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "tokenGoal" INTEGER NOT NULL DEFAULT 10,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RewardPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyPlan" (
    "id" TEXT NOT NULL,
    "childProfileId" TEXT NOT NULL,
    "weekStart" DATE NOT NULL,
    "status" "PlanStatus" NOT NULL DEFAULT 'DRAFT',
    "summary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeeklyPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyPlanItem" (
    "id" TEXT NOT NULL,
    "weeklyPlanId" TEXT NOT NULL,
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

    CONSTRAINT "WeeklyPlanItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskCompletion" (
    "id" TEXT NOT NULL,
    "childProfileId" TEXT NOT NULL,
    "weeklyPlanItemId" TEXT NOT NULL,
    "status" "TaskCompletionStatus" NOT NULL DEFAULT 'PENDING',
    "awardedTokens" INTEGER NOT NULL DEFAULT 0,
    "completedAt" TIMESTAMP(3),
    "completionNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskCompletion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ParentUser_email_key" ON "ParentUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ChildProfile_username_key" ON "ChildProfile"("username");

-- CreateIndex
CREATE INDEX "ChildProfile_parentUserId_idx" ON "ChildProfile"("parentUserId");

-- CreateIndex
CREATE UNIQUE INDEX "RewardPlan_childProfileId_key" ON "RewardPlan"("childProfileId");

-- CreateIndex
CREATE INDEX "WeeklyPlan_childProfileId_status_idx" ON "WeeklyPlan"("childProfileId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "WeeklyPlan_childProfileId_weekStart_key" ON "WeeklyPlan"("childProfileId", "weekStart");

-- CreateIndex
CREATE INDEX "WeeklyPlanItem_weeklyPlanId_assignedDate_idx" ON "WeeklyPlanItem"("weeklyPlanId", "assignedDate");

-- CreateIndex
CREATE INDEX "WeeklyPlanItem_subject_assignedDate_idx" ON "WeeklyPlanItem"("subject", "assignedDate");

-- CreateIndex
CREATE INDEX "TaskCompletion_childProfileId_status_idx" ON "TaskCompletion"("childProfileId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "TaskCompletion_childProfileId_weeklyPlanItemId_key" ON "TaskCompletion"("childProfileId", "weeklyPlanItemId");

-- AddForeignKey
ALTER TABLE "ChildProfile" ADD CONSTRAINT "ChildProfile_parentUserId_fkey" FOREIGN KEY ("parentUserId") REFERENCES "ParentUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardPlan" ADD CONSTRAINT "RewardPlan_childProfileId_fkey" FOREIGN KEY ("childProfileId") REFERENCES "ChildProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyPlan" ADD CONSTRAINT "WeeklyPlan_childProfileId_fkey" FOREIGN KEY ("childProfileId") REFERENCES "ChildProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyPlanItem" ADD CONSTRAINT "WeeklyPlanItem_weeklyPlanId_fkey" FOREIGN KEY ("weeklyPlanId") REFERENCES "WeeklyPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskCompletion" ADD CONSTRAINT "TaskCompletion_childProfileId_fkey" FOREIGN KEY ("childProfileId") REFERENCES "ChildProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskCompletion" ADD CONSTRAINT "TaskCompletion_weeklyPlanItemId_fkey" FOREIGN KEY ("weeklyPlanItemId") REFERENCES "WeeklyPlanItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

