<template>
  <v-card>
    <v-card-title>
      Współczynniki zmienności
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          cols="6"
          sm="4"
          md="3"
          lg="2"
          v-for="column in variantions"
          :key="column.value"
        >
          <v-text-field
            :label="column.text"
            :value="`${column.variantion.toFixed(2)}%`"
            readonly
            outlined
            :error="column.variantion < minVariantion"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Variantions',
  computed: {
    variantions() {
      return this.$store.getters.variantions;
    },
    minVariantion() {
      return this.$store.getters.minVariantion;
    },
  },
};
</script>