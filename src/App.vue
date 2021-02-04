<template>
  <v-app :style="{background: backgroundColor}">
    <AppBar />
    <v-main>
      <Main />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue';
import Main from './components/Main';

export default {
  name: 'App',
  components: {
    AppBar,
    Main
  },
  computed: {
    backgroundColor() {
      const isDark = this.$vuetify.theme.dark;
      return isDark
        ? undefined
        : this.$vuetify.theme.themes.light.background;
    },
  },
};
</script>
