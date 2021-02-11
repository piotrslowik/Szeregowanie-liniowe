<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <Table />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <Weights ref="WeightsComponent"/>
      </v-col>
      <v-col cols="12">
        <Stimulants />
      </v-col>
      <v-col cols="12">
        <Run
          @run="checkWeights"
          ref="RunComponent"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Table from './Table.vue';
import Weights from './Weights.vue';
import Stimulants from './Stimulants.vue';
import Run from './Run.vue';

export default {
  name: 'Main',
  components: {
    Table,
    Weights,
    Stimulants,
    Run,
  },
  computed: {
    weights() {
      return this.$store.getters.columnsWeightsSum;
    },
  },
  methods: {
    checkWeights() {
      const areWeightsValid = this.weights === 100;
      if (!areWeightsValid) this.$refs.WeightsComponent.showError();
      this.$refs.RunComponent.runCalculaion(areWeightsValid);
    },
  },
};
</script>
