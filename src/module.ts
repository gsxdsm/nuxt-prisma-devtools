import { defineNuxtModule } from '@nuxt/kit';

// Module options TypeScript interface definition
export interface ModuleOptions {
  port?: number
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-prisma-devtools',
    configKey: 'nuxt-prisma-devtools',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    port: 5555,
  },
  setup(_options, _nuxt) {
    _nuxt.hook('devtools:customTabs', (tabs) => {
      tabs.push({
        name: 'Prisma',
        title: 'Prisma',
        icon: 'simple-icons:prisma',
        view: {
          type: 'iframe',
          src: `http://localhost:${_options.port}`,
        },
      });
    });
  },
});
