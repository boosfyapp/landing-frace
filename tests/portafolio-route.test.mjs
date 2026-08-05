import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const root = new URL('..', import.meta.url)
const file = (path) => new URL(path, root)

test('publishes Isaac portfolio at the /portafolio-isaac route with its visual assets', () => {
  const route = readFileSync(file('src/app/portafolio-isaac/route.ts'), 'utf8')
  const portfolio = readFileSync(file('public/portafolio-isaac/index.html'), 'utf8')

  assert.match(route, /export async function GET/, 'the portfolio must be served by a Next.js route')
  assert.match(route, /'Cache-Control': 'no-store'/, 'the portfolio document must not serve an outdated cached version')
  assert.match(portfolio, /<base href="\/portafolio-isaac\/"/, 'relative assets must resolve from the portfolio URL')
  assert.match(portfolio, /min-height:\s*44px/, 'project links must meet a mobile-friendly touch target')
  assert.match(portfolio, /\.project-card \.visual \{ height: 220px; \}/, 'mobile cards must use a compact visual height')
  assert.match(portfolio, /Frace Solutions \/ Proyectos recientes/, 'the portfolio must carry the Frace Solutions identity')

  for (const name of ['dform.png', 'contractoros.png', 'ai-academy.png', 'thu-talento.png', 'gorila-prime.png']) {
    assert.equal(existsSync(file(`public/portafolio-isaac/client-portfolio-assets/${name}`)), true, `${name} must be published with the portfolio`)
  }
})
