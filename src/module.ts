import { defineNuxtModule } from '@nuxt/kit'
import { execa } from 'execa'
// Module options TypeScript interface definition
export interface ModuleOptions {
  port?: number
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-prisma-devtools',
    configKey: 'prismaDevtools',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    port: 5555,
  },
  setup(_options, _nuxt) {
    const npm_lifecycle_event = process.env?.npm_lifecycle_event
    if (npm_lifecycle_event !== 'dev') {
      return
    }
    _nuxt.hook('devtools:customTabs', (tabs) => {
      tabs.push({
        name: 'Prisma',
        title: 'Prisma',
        icon: 'simple-icons:prisma',
        view: {
          type: 'iframe',
          src: `http://localhost:${_options.port}`,
        },
      })
    })
    try {
      const subprocess = execa('npx', ['prisma', 'studio', '--browser', 'none', '--port', `${_options.port}`], {
        cwd: _nuxt.options.rootDir,
      })
      subprocess.unref()
    }
    catch (err) {
      console.error(err)
    }
  },
})
