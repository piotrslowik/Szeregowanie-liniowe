<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <Table />
      </v-col>
    </v-row>
    <v-fade-transition>
      <v-row v-if="isTableInited">
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
    </v-fade-transition>
    <v-fade-transition>
      <Result v-if="showResult" />
    </v-fade-transition>
  </v-container>
</template>

<script>
import Table from './Table.vue';
import Weights from './Weights.vue';
import Stimulants from './Stimulants.vue';
import Run from './Run.vue';
import Result from './Result.vue';

export default {
  name: 'Main',
  components: {
    Table,
    Weights,
    Stimulants,
    Run,
    Result,
  },
  data() {
    return {
      showResult: false,
    };
  },
  computed: {
    isTableInited() {
      return this.$store.getters.isTableInited; 
    },
    weights() {
      return this.$store.getters.columnsWeightsSum;
    },
  },
  methods: {
    checkWeights() {
      const areWeightsValid = this.weights === 100;
      this.$refs.RunComponent.runCalculaion(areWeightsValid);
      if (areWeightsValid) this.showResult = true;
      else this.$refs.WeightsComponent.showError();
    },
  },
};
</script>
