import type { MetadataRoute } from 'next';
import sitemap from '@/app/sitemap';

function csvCell(value: string | number | Date | undefined) {
  const text = value instanceof Date ? value.toISOString() : String(value ?? '');
  return `"${text.replace(/"/g, '""')}"`;
}

export function GET() {
  const routes: MetadataRoute.Sitemap = sitemap();
  const rows = [
    ['url', 'last_modified', 'change_frequency', 'priority'].map(csvCell).join(','),
    ...routes.map((route) => [
      route.url,
      route.lastModified,
      route.changeFrequency,
      route.priority,
    ].map(csvCell).join(',')),
  ];

  return new Response(`${rows.join('\r\n')}\r\n`, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="all-about-pawz-routes.csv"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}