<template>
  <v-row>
    <v-col cols="12" md="6">
      <ValidationObserver ref="Validator">
        <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            name="nazwa"
        >
          <v-text-field
            v-model="objectsName"
            label="Nazwa porównywanych obiektów"
            name="nazwa"
            :error-messages="errors"
            autocomplete="off"
          />
        </ValidationProvider>
      </ValidationObserver>
    </v-col>
    <v-col cols="12" md="6" class="pt-md-6">
      <SubmitButton
        :state.sync="submitState"
        block
        @click="initTable"
      >
        Stwórz tabelę
      </SubmitButton>
    </v-col>
  </v-row>
</template>

<script>
import SubmitButton from '@/components/common/SubmitButton';

import { MUTATIONS as M } from '@/store/mutation-types';
export default {
  name: 'Start',
  components: {
    SubmitButton,
  },
  data() {
    return {
      objectsName: '',
      submitState: '',
    };
  },
  methods: {
    async initTable() {
      const isValid = await this.$refs.Validator.validate();
      if (isValid) {
        this.submitState = 'success';
        setTimeout(() => {
          this.$store.commit(M.setTable, this.objectsName);
        }, 400);
      }
      else {
        this.submitState = 'error';
      }
    },
  },
};
</script>