<template>
  <v-card>
    <v-card-title>
      Wagi
    </v-card-title>
    <v-card-text class="px-lg-12 pb-2">
      <ValidationObserver ref="Validator">
        <v-row>
          <v-col
            cols="6"
            sm="4"
            md="3"
            lg="2"
            v-for="(column, n) in columns"
            :key="n"
          >
            <ValidationProvider
              v-slot="{ errors, valid }"
              rules="required|between:1,100"
              :name="column.value"
            >
              <v-text-field
                :value="column.weight"
                @input="changeColumnWeight(column, $event)"
                :label="column.text"
                type="number"
                :error-messages="errors"
                :success="valid"
                :name="column.value"
                min="1"
                max="100"
                suffix="%"
                :step="1"
                autocomplete="off"
              />
            </ValidationProvider>
          </v-col>
          <v-col
            v-if="showSum"
            cols="6"
            sm="4"
            md="3"
            lg="2"
            class="align-self-center"
          >
            <p class="text-h6 ma-0">
              Suma: {{ getSum }}%
            </p>
          </v-col>
        </v-row>
        <v-scroll-y-transition>
          <v-row v-if="showAlert">
            <v-col>
              <v-alert
                type="error"
                outlined
              >
                Wagi nie sumują się do 100%
              </v-alert>
            </v-col>
          </v-row>
        </v-scroll-y-transition>
      </ValidationObserver>
    </v-card-text>
  </v-card>
</template>

<script>
import { MUTATIONS as M } from '@/store/mutation-types';

export default {
  name: 'Weights',
  data() {
    return {
      showAlert: false,
    };
  },
  computed: {
    columns() {
      return this.$store.getters.valueColumns;
    },
    showSum() {
      return this.columns.length > 0;
    },
    getSum() {
      return this.$store.getters.columnsWeightsSum;
    },
  },
   methods: {
    changeColumnWeight(column, val) {
      this.$store.commit(M.setColumnWeight, { 
        column,
        weight: parseFloat(val),
      });
    },
    showError() {
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 5000);
    },
  },
};
</script>