import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { writeFileSync } from 'fs';

const baseUrl = 'https://www.future-value-calculator.com';

// Define all routes
const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/learn', changefreq: 'weekly', priority: 0.8 },
  { url: '/about', changefreq: 'monthly', priority: 0.7 },
  { url: '/More/BasicFV', changefreq: 'weekly', priority: 0.9 },
  { url: '/More/CompoundInterest', changefreq: 'weekly', priority: 0.9 },
  { url: '/More/MonthlyContributions', changefreq: 'weekly', priority: 0.9 },
  { url: '/More/Withdrawals', changefreq: 'weekly', priority: 0.9 },
  { url: '/More/MutualFund', changefreq: 'weekly', priority: 0.9 },
  { url: '/More/HomeValue', changefreq: 'weekly', priority: 0.9 },
  { url: '/More/CarValue', changefreq: 'weekly', priority: 0.9 },
  { url: '/More/Inflation-Adjusted', changefreq: 'weekly', priority: 0.9 },
  { url: '/More/Annuity', changefreq: 'weekly', priority: 0.9 },
  { url: '/More/Retirement', changefreq: 'weekly', priority: 0.9 },
  { url: '/More/SIP', changefreq: 'weekly', priority: 0.9 }
];

// Create a stream to write to
const stream = new SitemapStream({ hostname: baseUrl });

// Return a promise that resolves with your XML string
const sitemap = streamToPromise(Readable.from(routes).pipe(stream)).then((data) =>
  data.toString()
);

sitemap.then(xml => {
  writeFileSync('public/sitemap.xml', xml);
  console.log('Sitemap generated successfully!');
}).catch(err => {
  console.error('Error generating sitemap:', err);
});