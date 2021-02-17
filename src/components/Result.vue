<template>
  <v-row>
    <v-col cols="12">
      <Variantions />
    </v-col>
    <!-- WIP only -->
    <v-col cols="12">
      <v-data-table
        :items="items"
        :headers="headers"
        dense
      />
    <!-- -------- -->
    </v-col>
  </v-row>
</template>

<script>
import Variantions from './results/Variantions.vue';

export default {
  name: 'Result',
  components: {
    Variantions,
  },
  // WIP only
  computed: {
    rows() {
      return this.$store.getters.calcRows;
    },
    items() {
      return this.rows.map(row => ({
        id: row.id,
        name: row.name,
        ...row.values,
      }))
    },
    headers() {
      return this.$store.getters.columns;
    },
  }
  //-------------
};
</script>