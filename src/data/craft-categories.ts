export type CraftCategory = {
  slug: string
  name: string
  description: string
  icon: string
}

export const craftCategories: CraftCategory[] = [
  {
    slug: 'home-decor',
    name: 'Home Décor',
    description: 'Vases, trays, and pieces for your space.',
    icon: '🏠',
  },
  {
    slug: 'wearables',
    name: 'Wearables',
    description: 'Bags, pouches, and things you carry.',
    icon: '👜',
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    description: 'Keychains, charms, and small add-ons.',
    icon: '✨',
  },
  {
    slug: 'seasonal',
    name: 'Seasonal',
    description: 'Limited runs for holidays and occasions.',
    icon: '🎁',
  },
]
