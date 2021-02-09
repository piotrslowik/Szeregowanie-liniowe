<template>
  <v-card>
    <v-card-title>
      Wagi
    </v-card-title>
    <v-card-text class="px-lg-12">
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
              rules="required|between:1,100|digits"
              :name="column.value"
            >
              <v-text-field
                :label="column.text"
                type="number"
                :error-messages="errors"
                :success="valid"
                min="1"
                max="100"
                suffix="%"
                :step="1"
                autocomplete="off"
              />
            </ValidationProvider>
          </v-col>
          <v-col
            cols="6"
            sm="4"
            md="3"
            lg="2"
            class="align-self-center"
          >
            <p class="text-h6 ma-0">
              Suma: {{ getSum() }}%
            </p>
          </v-col>
        </v-row>
      </ValidationObserver>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Weights',
  computed: {
    columns() {
      return this.$store.getters.valueColumns;
    },
  },
  methods: {
    getSum() {
      return 0;
    },
  },
};
</script>