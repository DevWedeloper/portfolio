import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z
        .string()
        .max(200, 'Summary should be concise (max ~200 chars)'),
      github: z.string().url(),
      liveDemo: z.string().url(),
      tags: z.array(z.string()),
      heroImage: image(),
      images: z.array(z.string()),
      order: z.number().int(),
    }),
});

export const collections = { projects };
