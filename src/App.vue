<template>
  <v-app :style="{background: backgroundColor}">
    <v-sheet
      id="scrolling-techniques-6"
      class="overflow-y-auto"
      :max-height="maxHeight"
    >
      <AppBar />
      <v-main>
        <Main />
      </v-main>
    </v-sheet>
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
    maxHeight() {
      return window.innerHeight; 
    },
    backgroundColor() {
      const isDark = this.$vuetify.theme.dark;
      return isDark
        ? undefined
        : this.$vuetify.theme.themes.light.background;
    },
  },
};
</script>

<style>
html { overflow-y: hidden }
</style>