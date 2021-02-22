<template>
  <v-app-bar
    dense
    app
    color="primary"
    :collapse="collapse || collapseOnScroll"
    :collapse-on-scroll="collapseOnScroll"
    scroll-target="#scrolling-sheet"
  >
    <v-icon
      large
      dark
      @click="colps"
      class="ml-3 mr-8"
    >
      {{ collapse ? 'mdi-cog' : 'mdi-cog-outline' }}
    </v-icon>

    <v-toolbar-title>

      <v-btn
        class="ml-2"
        @click="toggleTheme"
      >
        <span class="d-none d-sm-flex">motyw</span>
        <v-icon right>
          mdi-theme-light-dark
        </v-icon>
      </v-btn>

      <v-btn
        class="ml-6"
        @click="setDemo"
      >
        <span class="d-none d-sm-flex">Przykład</span>
        <v-icon right>
          mdi-head-question-outline
        </v-icon>
      </v-btn>
      
      <span class="ml-6">
        <CsvDialog />
      </span>

    </v-toolbar-title>
  </v-app-bar> 
</template>

<script>
import { ACTIONS } from '@/store/action-types';
import CsvDialog from '@/components/dialogs/CsvDialog';

export default {
  name: 'AppBar',
  components: {
    CsvDialog,
  },
  data() {
    return {
      collapse: true,
      collapseOnScroll: true,
    };
  },
  methods: {
    colps() {
      console.log('this.collapse')
      this.collapse = !this.collapse;
      this.collapseOnScroll = !this.collapseOnScroll;
    },
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    setDemo() {
      this.$store.dispatch(ACTIONS.createExample);
    },
  },
};
</script>
