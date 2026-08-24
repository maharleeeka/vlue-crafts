import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import CategoryCard from '@/components/home/CategoryCard'
import TriviaCard from '@/components/home/TriviaCard'
import { aboutTrivia } from '@/data/about-trivia'
import { craftCategories } from '@/data/craft-categories'
import { scrollToSection } from '@/lib/scroll-to-section'
import { scrollToTop } from '@/lib/scroll-to-top'

const Home = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (pathname !== '/') return

    if (hash) {
      scrollToSection(hash.replace('#', ''))
      return
    }

    scrollToTop()
  }, [pathname, hash])

  return (
    <div>
      <section
        className="scroll-mt-24 bg-gradient-to-br from-primary-50 via-neutral-50 to-secondary-50 px-4 py-24"
        id="hero"
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-1.5 w-8 rounded-full bg-primary" />
            <span className="h-1.5 w-8 rounded-full bg-secondary" />
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-primary-900">
            Vlue Crafts
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-600">
            Handmade pieces for your home and everyday life.
          </p>
        </div>
      </section>

      <section
        className="scroll-mt-24 bg-neutral-0 px-4 py-24"
        id="browse-by-category"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold text-primary-900">
            Browse by category
          </h2>
          <p className="mt-2 max-w-2xl text-neutral-600">
            Pick a category to see related crafts.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {craftCategories.map((category, index) => (
              <li key={category.slug}>
                <CategoryCard
                  accent={index % 2 === 0 ? 'primary' : 'secondary'}
                  category={category}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="scroll-mt-24 bg-secondary-50 px-4 py-24"
        id="recent-crafts"
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-2xl font-semibold text-primary-900">
              Recent crafts
            </h2>
            <Link
              className="shrink-0 text-sm font-medium text-primary-600 hover:text-primary-700"
              to="/crafts"
            >
              View all →
            </Link>
          </div>
          <p className="mt-4 max-w-2xl text-neutral-600">
            The latest five pieces will show here. Available items link out to
            purchase.
          </p>
        </div>
      </section>

      <section className="scroll-mt-24 bg-primary-50 px-4 py-24" id="fun-fact">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold text-primary-900">Fun Fact</h2>
          <p className="mt-2 max-w-2xl text-neutral-600">
            A few things to know before you browse or reach out.
          </p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {aboutTrivia.map((item, index) => (
              <li key={item.id}>
                <TriviaCard
                  accent={index % 2 === 0 ? 'primary' : 'secondary'}
                  item={item}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="scroll-mt-24 bg-primary-700 px-4 py-24" id="contact">
        <div className="mx-auto max-w-6xl">
          <span
            aria-hidden="true"
            className="mb-6 block h-1.5 w-12 rounded-full bg-secondary"
          />
          <h2 className="text-2xl font-semibold text-neutral-0">Contact</h2>
          <p className="mt-4 max-w-2xl text-primary-100">
            Reach out for custom orders, wholesale, or questions about our work.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home
