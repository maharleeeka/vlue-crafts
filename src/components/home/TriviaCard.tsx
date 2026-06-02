import type { AboutTrivia } from '@/data/about-trivia'

type TriviaCardProps = {
  item: AboutTrivia
}

export default function TriviaCard({ item }: TriviaCardProps) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <span aria-hidden="true" className="text-2xl">
        {item.icon}
      </span>
      <h3 className="mt-3 text-lg font-semibold text-gray-900">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        {item.description}
      </p>
    </article>
  )
}
