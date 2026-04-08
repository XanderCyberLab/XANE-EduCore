export const childDailyPlan = {
  childName: "Sunny",
  greeting: "Ready for your calm learning day?",
  focusTitle: "3 little wins for today",
  focusNote: "We will read, count, and solve one tiny puzzle.",
  completedTasks: 1,
  totalTasks: 3,
  tokensEarned: 8,
  tokenGoal: 12,
  streakLabel: "Day 4 calm streak",
  aiHint: "Your learning path was gently picked just for today.",
  reward: {
    title: "Pick the cozy story basket",
    note: "4 more stars until reward time",
  },
};

export const childTodayTasks = [
  {
    id: 1,
    stepLabel: "First",
    subject: "Reading",
    title: "Sound out the sun words",
    description: "Tap and read: sun, sip, sock. Then find the word that starts like snake.",
    type: "Sounds",
    effort: "Quick",
    encouragement: "You can point and say it slowly.",
    color: "var(--accent-reading)",
  },
  {
    id: 2,
    stepLabel: "Next",
    subject: "Math",
    title: "Count the berry bowl",
    description: "Look at a bowl of berries and choose how many there are. Try one more bowl after that.",
    type: "Counting",
    effort: "Medium",
    encouragement: "Touch each berry one at a time.",
    color: "var(--accent-math)",
  },
  {
    id: 3,
    stepLabel: "Then",
    subject: "Thinking",
    title: "Find the sleepy pattern",
    description: "Moon, star, moon... what comes next? Finish the calm nighttime pattern.",
    type: "Pattern",
    effort: "Quick",
    encouragement: "Look for what repeats.",
    color: "var(--accent-thinking)",
  },
] as const;

export const childSubjectCards = [
  {
    href: "/child/subject/reading",
    label: "Reading",
    color: "var(--accent-reading)",
    icon: "Aa",
    note: "Stories, sounds, and letter play",
    todayFocus: "Sound-it-out words",
  },
  {
    href: "/child/subject/math",
    label: "Math",
    color: "var(--accent-math)",
    icon: "123",
    note: "Counting, shapes, and number fun",
    todayFocus: "Count the berry bowl",
  },
  {
    href: "/child/subject/thinking",
    label: "Thinking",
    color: "var(--accent-thinking)",
    icon: "?",
    note: "Patterns, choices, and tiny puzzles",
    todayFocus: "Moon and star pattern",
  },
] as const;
