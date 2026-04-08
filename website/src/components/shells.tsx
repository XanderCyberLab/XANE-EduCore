import Link from "next/link";
import type { ReactNode } from "react";

export function ShellCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)] ${className}`}
    >
      {children}
    </div>
  );
}

export function ParentPageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">{eyebrow}</p>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-[var(--parent-text)] md:text-4xl">{title}</h1>
        <p className="max-w-2xl text-sm leading-7 text-[var(--parent-muted)] md:text-base">{description}</p>
      </div>
    </div>
  );
}

export function ChildPageIntro({ title, description, badge }: { title: string; description: string; badge?: string }) {
  return (
    <div className="space-y-3 text-center md:text-left">
      {badge ? (
        <span className="inline-flex rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-[var(--child-muted)] shadow-sm">
          {badge}
        </span>
      ) : null}
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight text-[var(--child-text)] md:text-5xl">{title}</h1>
        <p className="mx-auto max-w-2xl text-base leading-7 text-[var(--child-muted)] md:mx-0 md:text-lg">{description}</p>
      </div>
    </div>
  );
}

export function PlaceholderList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-inherit">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function QuickLinks({ links }: { links: { href: string; label: string }[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--surface-muted)]"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
