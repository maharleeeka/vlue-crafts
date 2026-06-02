export const scrollToSection = (hash: string) => {
  const id = hash.startsWith('#') ? hash.slice(1) : hash
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
