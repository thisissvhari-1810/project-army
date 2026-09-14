import { config } from 'dotenv'
import { runMigrations, seedInitialUsers } from '../server/db/migrate.js'

config({ path: '.env.local' })
config()

async function main() {
  await runMigrations()
  const seed = await seedInitialUsers()
  console.log(seed.seeded ? 'Database migrated and seeded.' : 'Database migrated.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
