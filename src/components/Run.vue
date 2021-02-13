<template>
  <v-card class="pt-2">
    <v-row class="px-5">
      <v-col cols="3" class="py-0">
        <ValidationObserver ref="Validator">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|between:1,100"
            name="variation"
          >
            <v-text-field
              v-model="variantion"
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
      <v-col cols="9">
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

export default {
  name: 'Run',
  components: {
    SubmitButton,
  },
  data() {
    return {
      submitState: '',
      variantion: 20,
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
        console.log('running...')
        this.submitState = 'success';
      }
      else {
        this.submitState = 'error';
      }
    },
  },
};
</script>