const baseDir = process.env.BASE_DIR || '/'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ichiyo',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/global.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/firebase.ts' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Quicksand: [300],
          'M PLUS 1p': [300, 400, 500],
        },
      },
    ],
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // routing
  generate: {
    routes: ['/mgpqch', '/mgpqhc', '/kegnvk', '/xcgery', '/czboum', '/hansrn'],
  },

  router: {
    base: baseDir,
  },
}
