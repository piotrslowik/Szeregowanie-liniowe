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
    
    <span class="ml-6">
      <CsvDialog />
    </span>
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
      collapse: false,
    };
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    setDemo() {
      this.$store.dispatch(ACTIONS.createExample);
    },
  },
};
</script>
