export type AboutTrivia = {
  id: string
  title: string
  description: string
  icon: string
}

export const aboutTrivia: AboutTrivia[] = [
  {
    id: 'purchase',
    title: 'Available to purchase',
    description:
      'When a craft is ready to buy, its card links to an external shop where you can complete your order.',
    icon: '🛒',
  },
  {
    id: 'customize',
    title: 'Custom colors',
    description:
      'We can customize the color of an existing craft. Send the Instagram link to the product and tell us what you want—we’ll discuss the details from there.',
    icon: '🎨',
  },
  {
    id: 'small-batches',
    title: 'Small batches',
    description:
      'Most pieces are made in limited runs, so what you see today may not come back the same way twice.',
    icon: '✋',
  },
  {
    id: 'materials',
    title: 'Thoughtful materials',
    description:
      'Fabrics, threads, and finishes are chosen for how they feel in hand—not just how they look in photos.',
    icon: '🧵',
  },
]
