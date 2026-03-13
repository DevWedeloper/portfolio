import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const applications = defineCollection({
  loader: glob({ base: './src/content/applications', pattern: '**/*.{md,mdx}' }),
  schema: () =>
    z.object({
      title: z.string(),
      summary: z
        .string()
        .max(200, 'Summary should be concise (max ~200 chars)'),
      github: z.string().url(),
      liveDemo: z.string().url(),
      tags: z.array(z.string()),
      heroImage: z.string(),
      images: z.array(z.string()),
      order: z.number().int(),
    }),
})

const automations = defineCollection({
  loader: glob({ base: './src/content/automations', pattern: '**/*.{md,mdx}' }),
  schema: () =>
    z.object({
      title: z.string(),
      summary: z.string(),
      trigger: z.string(),
      patterns: z.array(z.string()),
      categories: z.array(z.string()),
      tools: z.array(z.string()),
      order: z.number().int(),
    }),
})

export const collections = { applications, automations }
