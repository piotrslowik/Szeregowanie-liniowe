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
    </v-row>
  </v-container>
</template>

<script>
import Table from './Table.vue';
import Weights from './Weights.vue';

export default {
  name: 'Main',
  components: {
    Table,
    Weights,
  },
  data() {
    return {

    };
  },
};
</script>
