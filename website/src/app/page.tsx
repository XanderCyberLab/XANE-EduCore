import Link from "next/link";
import { QuickLinks, ShellCard } from "@/components/shells";
import { childNav, parentNav } from "@/lib/site";

export default function Home() {
  return (
    <main className="px-4 py-8 md:px-6 md:py-12">
      <div className="shell-page space-y-6">
        <ShellCard className="overflow-hidden bg-gradient-to-br from-white via-white to-[#eef3ff]">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5f6f86]">EduCore website scaffold</p>
              <h1 className="text-4xl font-semibold tracking-tight text-[#172033] md:text-5xl">
                Calm foundations for parent planning and child learning.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-[#5f6f86] md:text-lg">
                This starter shell separates the parent control surface from the child-friendly experience, with tablet-ready layouts and placeholder routes for the first build phase.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/parent/dashboard" className="rounded-full bg-[#172033] px-5 py-3 text-sm font-semibold text-white">
                  Open parent area
                </Link>
                <Link href="/child/home" className="rounded-full bg-[#ffd77a] px-5 py-3 text-sm font-semibold text-[#172033]">
                  Open child area
                </Link>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[var(--radius-card)] bg-[#172033] p-5 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a9b5cb]">Parent</p>
                <p className="mt-3 text-xl font-semibold">Soft, practical control surface</p>
                <p className="mt-2 text-sm leading-6 text-[#d7deea]">Login, dashboard, children, planner, and rewards routes are ready for mocked and real feature work.</p>
              </div>
              <div className="rounded-[var(--radius-card)] bg-[#fff1cf] p-5 text-[#172033]">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a6b4d]">Child</p>
                <p className="mt-3 text-xl font-semibold">Warm, low-stimulation tablet shell</p>
                <p className="mt-2 text-sm leading-6 text-[#5f6f86]">Large touch targets, low text burden, and subject placeholders for reading, math, and thinking.</p>
              </div>
            </div>
          </div>
        </ShellCard>

        <div className="grid gap-6 lg:grid-cols-2">
          <ShellCard>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#5f6f86]">Parent routes</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#172033]">Ready for control and review flows</h2>
              </div>
              <QuickLinks links={[{ href: "/parent/login", label: "Login" }, ...parentNav]} />
            </div>
          </ShellCard>

          <ShellCard>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#5f6f86]">Child routes</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#172033]">Ready for calm daily learning flows</h2>
              </div>
              <QuickLinks links={[{ href: "/child/login", label: "Login" }, ...childNav, { href: "/child/subject/reading", label: "Reading" }, { href: "/child/subject/math", label: "Math" }, { href: "/child/subject/thinking", label: "Thinking" }]} />
            </div>
          </ShellCard>
        </div>
      </div>
    </main>
  );
}
