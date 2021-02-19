<template>
  <v-card>
    <v-card-title>
      Najwyższe wyniki
    </v-card-title>
    <v-card-text>
      <p class="text-h4">
        1. {{ best[0] }}
      </p>
      <p class="text-h5">
        2. {{ best[1] }}
       </p>
      <p class="text-h6" v-if="best.length > 2">
        3. {{ best[2] }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Best',
  computed: {
    best() {
      return this.$store.getters.threeBest;
    },
  },
};
</script>