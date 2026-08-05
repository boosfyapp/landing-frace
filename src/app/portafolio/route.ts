import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const runtime = 'nodejs'

export async function GET() {
  const portfolio = await readFile(
    join(process.cwd(), 'public', 'portafolio', 'index.html'),
    'utf8',
  )

  return new Response(portfolio, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
