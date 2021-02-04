<template>
  <v-app-bar
    dense
    app
    color="primary"
    :collapse="collapse"
  >
    <v-icon
      large
      dark
      class="mr-12 ml-3"
      @click="collapse = !collapse"
    >
      mdi-cog
    </v-icon>

    <v-btn
      class="ml-6"
      @click="toggleTheme"
    >
      motyw
      <v-icon right>
        mdi-theme-light-dark
      </v-icon>
    </v-btn>

    <v-btn
      class="ml-6"
      @click="setDemo"
    >
      Przykład
      <v-icon right>
        mdi-head-question-outline
      </v-icon>
    </v-btn>
    
    <v-btn
      class="ml-6"
      @click="loadCsv"
    >
      Wczytaj CSV
      <v-icon right>
        mdi-file-delimited-outline
      </v-icon>
    </v-btn>
  </v-app-bar> 
</template>

<script>
import { ACTIONS } from '@/store/action-types';

export default {
  name: 'AppBar',
  data() {
    return {
      collapse: true,
    };
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    setDemo() {
      this.$store.dispatch(ACTIONS.createExample);
    },
    loadCsv() {

    },
  },
};
</script>
