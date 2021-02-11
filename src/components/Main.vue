<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <Table />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <Weights />
      </v-col>
      <v-col cols="12">
        <Stimulants />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Table from './Table.vue';
import Weights from './Weights.vue';
import Stimulants from './Stimulants.vue';

export default {
  name: 'Main',
  components: {
    Table,
    Weights,
    Stimulants,
  },
  data() {
    return {

    };
  },
};
</script>
