<template>
  <v-card class="pt-2">
    <v-row class="px-5">
      <v-col cols="7" sm="6" md="3" class="py-0">
        <ValidationObserver ref="Validator">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|between:1,100"
            name="variation"
          >
            <v-text-field
              v-model="minVariantion"
              label="Współczynnik minimalnej zmienności"
              type="number"
              :error-messages="errors"
              name="variation"
              min="1"
              max="100"
              suffix="%"
              :step="1"
              autocomplete="off"
            />
          </ValidationProvider>
        </ValidationObserver>
      </v-col>
      <v-col cols="5" sm="6" md="9">
        <SubmitButton
          :state.sync="submitState"
          block
          @click="checkVariation"
        >
          Uruchom
        </SubmitButton>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import SubmitButton from '@/components/common/SubmitButton';

import { MUTATIONS as M } from '@/store/mutation-types';
import { ACTIONS as A } from '@/store/action-types';

export default {
  name: 'Run',
  components: {
    SubmitButton,
  },
  data() {
    return {
      minVariantion: 20,
      submitState: '',
    };
  },
  methods: {
    async checkVariation() {
      const isValid = await this.$refs.Validator.validate();
      if (isValid) this.$emit('run');
      else this.submitState = 'error';
    },
    runCalculaion(success) {
      if (success) {
        this.submitState = 'success';
        this.$store.commit(M.setMinVariantion, this.minVariantion);
        this.$store.dispatch(A.runCalculation);
      }
      else {
        this.submitState = 'error';
      }
    },
  },
};
</script>