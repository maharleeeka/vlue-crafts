import type { AboutTrivia } from '@/data/about-trivia'

type TriviaCardProps = {
  accent?: 'primary' | 'secondary'
  item: AboutTrivia
}

const accentStyles = {
  primary: {
    bar: 'border-l-primary-400',
    icon: 'bg-primary-100',
  },
  secondary: {
    bar: 'border-l-secondary-400',
    icon: 'bg-secondary-100',
  },
} as const

export default function TriviaCard({
  accent = 'primary',
  item,
}: TriviaCardProps) {
  const styles = accentStyles[accent]

  return (
    <article
      className={`rounded-xl border border-neutral-200 border-l-4 bg-neutral-0 p-6 shadow-sm ${styles.bar}`}
    >
      <span
        aria-hidden="true"
        className={`inline-flex size-10 items-center justify-center rounded-full text-2xl ${styles.icon}`}
      >
        {item.icon}
      </span>
      <h3 className="mt-3 text-lg font-semibold text-primary-900">
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">
        {item.description}
      </p>
    </article>
  )
}
