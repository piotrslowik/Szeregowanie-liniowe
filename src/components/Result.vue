<template>
  <v-row>
    <v-col cols="12">
      <Variantions />
    </v-col>
    <v-col cols="12">
      <Best />
    </v-col>
    <v-col cols="12">
      <ChartWrapper />
    </v-col>
  </v-row>
</template>

<script>
import Variantions from './results/Variantions.vue';
import ChartWrapper from './results/ChartWrapper.vue';
import Best from './results/Best.vue';

export default {
  name: 'Result',
  components: {
    Variantions,
    ChartWrapper,
    Best,
  },
};
</script>