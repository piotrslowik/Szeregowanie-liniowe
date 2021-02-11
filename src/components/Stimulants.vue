<template>
  <v-card>
    <v-card-title>
      Stymulanty
    </v-card-title>
    <v-card-text class="px-lg-12">
      <v-row>
        <v-col
          cols="6"
          sm="4"
          md="3"
          lg="2"
          v-for="(column, n) in columns"
          :key="n"
        >
          <v-switch
            :value="column.destimulant"
            @change="setColumnStimulant(column, $event !== null)"
            :label="column.text"
            :success="!column.destimulant"
            :error="column.destimulant"
            :messages="column.destimulant ? 'Destymulanta' : 'Stymulanta'"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { MUTATIONS as M } from '@/store/mutation-types';

export default {
  name: 'Stimulants',
  computed: {
    columns() {
      return this.$store.getters.valueColumns;
    },
  },
  methods: {
    setColumnStimulant(column, val) {
      this.$store.commit(M.setColumnStimulant, { 
        column,
        destimulant: val,
      });
    },
  },
};
</script>