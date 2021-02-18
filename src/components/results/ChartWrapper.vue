<template>
  <v-card>
    <v-card-title>
      Syntetyczne Mierniki Rozwoju
    </v-card-title>
    <v-card-text>
      <Chart :height="height" />
    </v-card-text>
  </v-card>
</template>

<script>
import Chart from './Chart.vue';

export default {
  name: 'ChartWrapper',
  components: {
    Chart,
  },
  computed: {
    height() {
      return this.$store.getters.rows.length * 50;
    },
  },
};
</script>