<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app floating>
      <v-list nav>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dense flat dark color="primary" :clipped-left="clipped" fixed app floating>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <v-img width="80" class="logo" :src="logo"></v-img>
      </v-toolbar-title>
      <h2 class="mx-2 font-weight-light primary--text text--lighten-4">{{title}}</h2>
      <v-spacer />
    </v-app-bar>
    <v-main class="grey lighten-4">
        <Nuxt />
    </v-main>
    <v-footer :absolute="!fixed" app >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  middleware:['auth','administration'],
  data () {
    return {
      logo:require("@/assets/images/csg-3pl-logo-1.png"),
      clipped: true,
      drawer: null,
      fixed: false,
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          to: '/'
        },
        {
          icon: 'mdi-page-next-outline',
          title: 'Purchase Order',
          to: '/purchaseOrder'
        },
        {
          icon: 'mdi-package-variant-closed',
          title: 'Order',
          to: '/order'
        },
        {
          icon: 'mdi-truck-delivery-outline',
          title: 'Return',
          to: '/return'
        },
        {
          icon: 'mdi-tag-arrow-down',
          title: 'Storage',
          to: '/storage'
        },
        {
          icon: 'mdi-barcode-scan',
          title: 'Barcodes ( Activity )',
          to: '/bar-codes'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Warehouse Plus'
    }
  }
}
</script>
<style>
  .logo{
    filter: brightness(0) invert(1);
  }
</style>