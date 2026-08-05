import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const root = new URL('..', import.meta.url)
const file = (path) => new URL(path, root)

test('publishes the portfolio at the /portafolio route with its visual assets', () => {
  const route = readFileSync(file('src/app/portafolio/route.ts'), 'utf8')
  const portfolio = readFileSync(file('public/portafolio/index.html'), 'utf8')

  assert.match(route, /export async function GET/, 'the portfolio must be served by a Next.js route')
  assert.match(portfolio, /<base href="\/portafolio\/"/, 'relative assets must resolve from the portfolio URL')
  assert.match(portfolio, /Frace Solutions \/ Proyectos recientes/, 'the portfolio must carry the Frace Solutions identity')

  for (const name of ['dform.png', 'contractoros.png', 'ai-academy.png', 'thu-talento.png', 'gorila-prime.png']) {
    assert.equal(existsSync(file(`public/portafolio/client-portfolio-assets/${name}`)), true, `${name} must be published with the portfolio`)
  }
})
