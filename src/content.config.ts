import { defineCollection, reference } from 'astro:content';
import type { ImageFunction } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogSchema = ({image}: {image: ImageFunction }) => z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()).optional(),
  image: image().optional(),
  language: z.enum(['en', 'es']), // languages defined
  translated_post: reference("blog").optional(),
  publication_date: z.date(),
  publication_day: z.string().optional(),
  publication_month: z.string().optional(),
  publication_year: z.string().optional(),
  related_posts: z.array(reference('blog')).optional(),
});

const projectSchema = ({ image }: { image: ImageFunction }) => z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()).optional(),
  image: image(),
  language: z.enum(['en', 'es']), // languages defined
  publication_date: z.date(),
  related_posts: z.array(reference('blog')).optional(),
  href: z.string().optional(),
  images: z.array(z.object(
    {
      image: image(),
      alt: z.string().optional(),
    }
  )).optional(),
  featured: z.boolean().optional(),
  code_repo: z.string().optional(),
  demo: z.string().optional(),
  link: z.string().optional(),
});


const experienceSchema = z.object({
  company_name: z.string(),
  positions: z.array( z.object({
    role: z.string(),
    start_date: z.date(),
    end_date: z.date().optional(),
    description: z.string().optional(),
  })),
  location: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  website: z.string().optional(),
  logo: z.object({
    url: z.string(),
    alt: z.string().optional(),
  }).optional(),
  start_date: z.date(),
  end_date: z.date().optional(),
  images: z.array(z.object({
    url: z.string(),
    alt: z.string().optional(),
  })).optional(),
  related_posts: z.array(reference('blog')).optional(),
  language: z.enum(['en', 'es']),
  content: z.string().optional(),
});


const educationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  start_date: z.date().or(z.string()),
  end_date: z.date().or(z.string()).optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  website: z.string().optional(),
  logo: z.object({
    url: z.string(),
    alt: z.string().optional(),
  }).optional(),
  images: z.array(z.object({
    url: z.string(),
    alt: z.string().optional(),
  })).optional(),
  related_posts: z.array(reference('blog')).optional(),
  language: z.enum(['en', 'es']),
  content: z.string().optional(),
});



const project = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: projectSchema,
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: blogSchema,
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/experience' }),
  schema: experienceSchema,
});

const education = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/education' }),
  schema: educationSchema,
});




export const collections = {
  'blog': blog,
  'projects': project,
  'experience': experience,
  'education': education,
};
