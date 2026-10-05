import { MetadataRoute } from 'next';
import { caseStudies } from './lib/data';
import { capabilities } from './lib/site';
import { SITE_URL } from './lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  // Dynamic portfolio routes
  const portfolioUrls = caseStudies.map((project) => ({
    url: `${baseUrl}/case-studies/${project.slug}`,

    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Dynamic capabilities routes
  const capabilityUrls = capabilities.map((c) => ({
    url: `${baseUrl}/what-we-do/${c.slug}`,

    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,

      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,

      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/what-we-do`,

      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-we-work`,

      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/case-studies`,

      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/insights`,

      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/enquire`,

      changeFrequency: 'yearly',
      priority: 0.7,
    },
    { url: `${baseUrl}/reports/content-creator-training`, changeFrequency: "yearly", priority: 0.6 },
    ...capabilityUrls,
    ...portfolioUrls,
  ];
}
