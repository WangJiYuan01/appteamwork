import colors from 'vuetify/es5/util/colors'
import path from 'path'
import fs from 'fs'

export default {
  ssr:false,
  server: {
    host: '0.0.0.0',
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'selfsigned.key')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'selfsigned.crt'))
    // }    
  },  
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - csg3pl-warehouse',
    title: 'csg3pl-warehouse',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/axios",
    "@/plugins/moment",
    "@/plugins/htmlPrintPaper",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/apollo',
  ],
  apollo: {
    // Sets up the apollo client endpoints
    clientConfigs: {
      default: '@/plugins/apollo.js',
    }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.NODE_ENV === 'production' ? 'http://13.55.73.172:3001/' : 'http://13.55.73.172:3001/',
    headers:{

    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta:{
      theme_color:colors.orange.darken3
    },
    manifest: {
      name: 'CSG3PL Warehouse Plus',
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake:true,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.grey.darken4,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
