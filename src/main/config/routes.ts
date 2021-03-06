import { Express, Router } from 'express'
// import fg from 'fast-glob'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  readdirSync(path.resolve(__dirname, '../routes')).map(async file => {
    if (!file.includes('.test.') && !file.includes('js.map')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}
