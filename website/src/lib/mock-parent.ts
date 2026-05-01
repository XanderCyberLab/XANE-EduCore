export type SubjectKey = "Reading" | "Math" | "Thinking";

export type SubjectProgress = {
  subject: SubjectKey;
  completed: number;
  total: number;
  minutes: number;
  status: "on track" | "needs attention" | "completed today";
  color: string;
};

export type ChildDashboardProfile = {
  id: string;
  name: string;
  ageLabel: string;
  weeklyCompletion: number;
  completedToday: number;
  totalToday: number;
  focus: string;
  nextStep: string;
  rewardName: string;
  rewardProgress: number;
  rewardTokens: number;
  rewardGoal: number;
  mood: string;
  username: string;
  parentNotes?: string | null;
  learningStrengths?: string | null;
  supportNotes?: string | null;
  motivators?: string | null;
  loginStatus: string;
  pinStatus: string;
  privacyNote: string;
  setupState: string;
  lastActive: string;
  pacingNote: string;
  strengths: string[];
  gentleSupport: string[];
  parentActions: {
    addLabel: string;
    editLabel: string;
    loginLabel: string;
    rewardLabel: string;
    learningLabel: string;
  };
  subjects: SubjectProgress[];
};

export type PlannerDay = {
  day: string;
  tone: string;
  items: string[];
};

export type RewardHighlight = {
  childName: string;
  rewardName: string;
  progress: number;
  tokens: number;
  goal: number;
  note: string;
};

export type PlannerHeaderStat = {
  label: string;
  value: string;
  note: string;
};

export type PlannerControl = {
  label: string;
  detail: string;
};

export type PlannerPrintable = {
  title: string;
  forChild: string;
  subject: SubjectKey;
  note: string;
};

export type PlannerBlock = {
  title: string;
  childName: string;
  subject: SubjectKey;
  duration: string;
  mode: "guided" | "printable" | "offline" | "together";
  note: string;
  printable?: boolean;
};

export type PlannerWeekDay = {
  day: string;
  dateLabel: string;
  rhythm: string;
  parentNote: string;
  guidanceTag: string;
  blocks: PlannerBlock[];
};

export const parentDashboardData = {
  parentName: "Xander",
  welcomeLabel: "Good morning",
  familySummary: {
    activeChildren: 2,
    completedBlocks: 16,
    weeklyBlocks: 22,
    plannerReadiness: "Ready through Friday",
    attentionNote: "Math check-in for Milo, reading celebration for Junie",
  },
  weeklySnapshot: {
    completedToday: 5,
    plannedToday: 6,
    weeklyCompletion: 73,
    streakDays: 4,
    calmNote: "The week is moving well. One small math nudge keeps everything on track.",
  },
  children: [
    {
      id: "junie",
      name: "Junie",
      ageLabel: "Age 6",
      weeklyCompletion: 82,
      completedToday: 3,
      totalToday: 3,
      focus: "Reading is flowing easily this week",
      nextStep: "Print tomorrow's short story cards before breakfast.",
      rewardName: "Zoo afternoon",
      rewardProgress: 76,
      rewardTokens: 19,
      rewardGoal: 25,
      mood: "Calm momentum",
      username: "junie-sky",
      parentNotes: "Reading confidence is high. Math goes better with short transitions and gentle warmups.",
      learningStrengths: "Story retell, phonics confidence, nature journaling",
      supportNotes: "Gentle math warmups and short transitions",
      motivators: "Visible progress and read-aloud time",
      loginStatus: "Username prepared",
      pinStatus: "Parent-managed PIN active",
      privacyNote: "Nickname-first profile, no legal name or extra identity details stored.",
      setupState: "Ready for daily use",
      lastActive: "Used today",
      pacingNote: "Confident with short reading wins, still benefits from gentle transitions into math.",
      strengths: ["Story retell", "Phonics confidence", "Nature journaling"],
      gentleSupport: ["Mental math warmups", "Stopping before fatigue"],
      parentActions: {
        addLabel: "Add child",
        editLabel: "Edit profile",
        loginLabel: "Adjust login",
        rewardLabel: "Review reward setup",
        learningLabel: "Review learning profile",
      },
      subjects: [
        { subject: "Reading", completed: 4, total: 5, minutes: 62, status: "completed today", color: "var(--accent-reading)" },
        { subject: "Math", completed: 3, total: 4, minutes: 41, status: "on track", color: "var(--accent-math)" },
        { subject: "Thinking", completed: 2, total: 3, minutes: 28, status: "on track", color: "var(--accent-thinking)" },
      ],
    },
    {
      id: "milo",
      name: "Milo",
      ageLabel: "Age 4",
      weeklyCompletion: 64,
      completedToday: 2,
      totalToday: 3,
      focus: "Short sessions are working better than one long block",
      nextStep: "Keep tomorrow's counting activity tactile and under 10 minutes.",
      rewardName: "Lego helper set",
      rewardProgress: 58,
      rewardTokens: 14,
      rewardGoal: 24,
      mood: "Needs a gentle math reset",
      username: "milo-moon",
      parentNotes: "Best with tactile activities, movement breaks, and one clear task at a time. Loves visible progress.",
      learningStrengths: "Pattern spotting, curious questions, hands-on counting",
      supportNotes: "Movement breaks and one clear task at a time",
      motivators: "Visible reward progress and helper jobs",
      loginStatus: "Username prepared",
      pinStatus: "Parent reviews PIN at login time",
      privacyNote: "Kept lightweight for family use, with parent-controlled access only.",
      setupState: "Needs one small math support tweak",
      lastActive: "Used this morning",
      pacingNote: "Best with tactile activities, movement breaks, and one clear task at a time.",
      strengths: ["Pattern spotting", "Hands-on counting", "Curious questions"],
      gentleSupport: ["Math confidence reset", "Shorter seat time"],
      parentActions: {
        addLabel: "Add child",
        editLabel: "Edit profile",
        loginLabel: "Adjust login",
        rewardLabel: "Review reward setup",
        learningLabel: "Review learning profile",
      },
      subjects: [
        { subject: "Reading", completed: 3, total: 4, minutes: 35, status: "on track", color: "var(--accent-reading)" },
        { subject: "Math", completed: 2, total: 4, minutes: 24, status: "needs attention", color: "var(--accent-math)" },
        { subject: "Thinking", completed: 2, total: 2, minutes: 19, status: "completed today", color: "var(--accent-thinking)" },
      ],
    },
  ] satisfies ChildDashboardProfile[],
  plannerPreview: [
    {
      day: "Today",
      tone: "Steady rhythm",
      items: ["Junie: reading review + nature journal", "Milo: counting tray + pattern cards", "Shared: library visit after lunch"],
    },
    {
      day: "Thursday",
      tone: "Light practice",
      items: ["Printable phonics cards", "10-minute math game", "Thinking walk with sorting prompts"],
    },
    {
      day: "Friday",
      tone: "Reward finish line",
      items: ["Story retell check-in", "Shape hunt outside", "Family reward review before dinner"],
    },
  ] satisfies PlannerDay[],
  rewardHighlights: [
    {
      childName: "Junie",
      rewardName: "Zoo afternoon",
      progress: 76,
      tokens: 19,
      goal: 25,
      note: "Likely reachable by early next week.",
    },
    {
      childName: "Milo",
      rewardName: "Lego helper set",
      progress: 58,
      tokens: 14,
      goal: 24,
      note: "A calm finish to math blocks should restore momentum.",
    },
  ] satisfies RewardHighlight[],
  plannerDetail: {
    weekLabel: "Week of April 8",
    title: "A gentle plan for a focused, printable-friendly week",
    summary:
      "This week leans on short reading confidence for Junie, tactile math resets for Milo, and a few low-prep offline moments that keep the rhythm realistic at home.",
    aiNote:
      "Suggested by EduCore: keep Wednesday and Friday light, print phonics cards once, and treat the outdoor walk as a real learning block so the week stays calm.",
    headerStats: [
      { label: "Planned blocks", value: "18", note: "Short, realistic blocks across both children" },
      { label: "Printable supports", value: "4", note: "Visible early so prep stays simple" },
      { label: "Offline-first moments", value: "5", note: "Walks, tray work, and hands-on review" },
    ] satisfies PlannerHeaderStat[],
    controls: [
      { label: "Regenerate week", detail: "Placeholder for a calmer full-week refresh" },
      { label: "Refresh today", detail: "Swap a single day without rebuilding everything" },
      { label: "Adjust pacing", detail: "Ease the load when energy or attention shifts" },
    ] satisfies PlannerControl[],
    printables: [
      { title: "Phonics cards", forChild: "Junie", subject: "Reading", note: "Use Thursday morning, 5 to 7 minutes" },
      { title: "Counting tray prompts", forChild: "Milo", subject: "Math", note: "Pair with beads or cereal pieces" },
      { title: "Pattern puzzle sheet", forChild: "Milo", subject: "Thinking", note: "Good backup for a short-focus day" },
      { title: "Story retell cards", forChild: "Junie", subject: "Reading", note: "Helpful for Friday review and confidence" },
    ] satisfies PlannerPrintable[],
    days: [
      {
        day: "Monday",
        dateLabel: "Apr 8",
        rhythm: "Steady start",
        parentNote: "Good day for normal rhythm and one shared outside break.",
        guidanceTag: "keep sessions short",
        blocks: [
          {
            title: "Short reading block",
            childName: "Junie",
            subject: "Reading",
            duration: "12 min",
            mode: "guided",
            note: "Warm up with sight words, then read one short story together.",
          },
          {
            title: "Counting tray activity",
            childName: "Milo",
            subject: "Math",
            duration: "8 min",
            mode: "offline",
            note: "Use pom-poms or cereal pieces for tactile counting.",
            printable: true,
          },
          {
            title: "Outdoor observation walk",
            childName: "Family",
            subject: "Thinking",
            duration: "15 min",
            mode: "together",
            note: "Collect three things to compare by color, shape, or texture.",
          },
        ],
      },
      {
        day: "Tuesday",
        dateLabel: "Apr 9",
        rhythm: "Confidence day",
        parentNote: "Lean into what is already working and avoid overloading math.",
        guidanceTag: "reward push day",
        blocks: [
          {
            title: "Phonics review cards",
            childName: "Junie",
            subject: "Reading",
            duration: "10 min",
            mode: "printable",
            note: "Fast confidence win before lunch.",
            printable: true,
          },
          {
            title: "Pattern puzzle",
            childName: "Milo",
            subject: "Thinking",
            duration: "7 min",
            mode: "printable",
            note: "Use shapes first, then let him finish with stickers.",
            printable: true,
          },
          {
            title: "Reward checkpoint",
            childName: "Family",
            subject: "Thinking",
            duration: "5 min",
            mode: "together",
            note: "Notice effort and show token progress without making it noisy.",
          },
        ],
      },
      {
        day: "Wednesday",
        dateLabel: "Apr 10",
        rhythm: "Light day",
        parentNote: "Protect energy here. A lighter plan still counts as a successful day.",
        guidanceTag: "light day",
        blocks: [
          {
            title: "Story retell and picture prompts",
            childName: "Junie",
            subject: "Reading",
            duration: "9 min",
            mode: "guided",
            note: "Focus on telling the story back, not perfect accuracy.",
          },
          {
            title: "Number match basket",
            childName: "Milo",
            subject: "Math",
            duration: "6 min",
            mode: "offline",
            note: "Keep it physical and stop early if attention fades.",
          },
        ],
      },
      {
        day: "Thursday",
        dateLabel: "Apr 11",
        rhythm: "Printable support",
        parentNote: "Best day to use printed materials so Friday can stay relaxed.",
        guidanceTag: "review day",
        blocks: [
          {
            title: "Short story cards",
            childName: "Junie",
            subject: "Reading",
            duration: "12 min",
            mode: "printable",
            note: "One card read-through, one retell, then done.",
            printable: true,
          },
          {
            title: "Counting tray reset",
            childName: "Milo",
            subject: "Math",
            duration: "8 min",
            mode: "printable",
            note: "Printable prompt plus hands-on counting pieces.",
            printable: true,
          },
          {
            title: "Sorting walk",
            childName: "Family",
            subject: "Thinking",
            duration: "12 min",
            mode: "offline",
            note: "Find items that are rough, smooth, tiny, and big.",
          },
        ],
      },
      {
        day: "Friday",
        dateLabel: "Apr 12",
        rhythm: "Calm finish",
        parentNote: "Finish with visible wins and avoid adding anything new.",
        guidanceTag: "keep session short",
        blocks: [
          {
            title: "Favorite book reread",
            childName: "Junie",
            subject: "Reading",
            duration: "10 min",
            mode: "guided",
            note: "End the week with fluency and comfort.",
          },
          {
            title: "Shape hunt outside",
            childName: "Milo",
            subject: "Math",
            duration: "8 min",
            mode: "offline",
            note: "Look for circles, squares, and triangles around the yard.",
          },
          {
            title: "Weekly reward review",
            childName: "Family",
            subject: "Thinking",
            duration: "5 min",
            mode: "together",
            note: "Celebrate effort and preview what next week could keep.",
          },
        ],
      },
    ] satisfies PlannerWeekDay[],
  },
};
