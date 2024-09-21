import { z, defineCollection, reference } from 'astro:content';

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()).optional(),
  image: z.object({
    url: z.string(),
    alt: z.string().optional(),
  }).optional(),
  language: z.enum(['en', 'es']), // languages defined
  translated_post: reference("blog").optional(),
  publication_date: z.date(),
  publication_day: z.string().optional(),
  publication_month: z.string().optional(),
  publication_year: z.string().optional(),
  related_posts: z.array(reference('blog')).optional(),
});

const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()).optional(),
  image: z.object({
    url: z.string(),
    alt: z.string().optional(),
  }).optional(),
  language: z.enum(['en', 'es']), // languages defined
  publication_date: z.date(),
  related_posts: z.array(reference('blog')).optional(),
  href: z.string().optional()
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
  type: 'content',
  schema: projectSchema,
});

const blog = defineCollection({
  type: 'content',
  schema: blogSchema,
});

const experience = defineCollection({
  type: 'content',
  schema: experienceSchema,
});

const education = defineCollection({
  type: 'content',
  schema: educationSchema,
});




export const collections = {
  'blog': blog,
  'projects': project,
  'experience': experience,
  'education': education,
};
