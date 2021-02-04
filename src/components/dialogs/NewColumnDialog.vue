<template>
  <span>
    <TooltipButton
      icon="mdi-table-column-plus-before"
      @click="dialog = true"
    >
        Dodaj kolumnę
    </TooltipButton>
    <v-dialog
      v-model="dialog"
      max-width="600px"
      @click:outside="resetForm"
    >
      <v-card>
        <v-card-title>
          Nowa kolumna
        </v-card-title>
        <v-card-text class="py-3 px-6">
          <ValidationObserver ref="Validator">
            <v-form ref="Form">
              <ValidationProvider
                v-slot="{ errors, valid }"
                rules="required"
                name="nazwa"
              >
                <v-text-field
                  label="Nazwa wyświetlana"
                  v-model="form.text"
                  :error-messages="errors"
                  :success="valid"
                  outlined
                />
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors, valid }"
                rules="required"
                name="zmienna"
              >
                <v-text-field
                  label="Zmienna"
                  v-model="form.value"
                  :error-messages="errors"
                  :success="valid"
                  outlined
                />
              </ValidationProvider>
            </v-form>
          </ValidationObserver>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <SubmitButton
            :state.sync="submitState"
            @click="addColumn"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import SubmitButton from '@/components/common/SubmitButton.vue';
import TooltipButton from '@/components/common/TooltipButton.vue';

import { MUTATIONS as M } from '@/store/mutation-types';
import { Column } from '@/classes';

export default {
  name: 'NewColumnDialog',
  components: {
    TooltipButton,
    SubmitButton,
  },
  data() {
    return {
      dialog: false,
      form: {
        text: '',
        value: '',
      },
      submitState: '',
    };
  },
  methods: {
    async addColumn() {
      const isValid = await this.$refs.Validator.validate();
      if (isValid) {
        const { text, value } = this.form;
        const newColumn = new Column(text, value);
        this.$store.commit(M.addColumn, newColumn);
        this.$store.commit(M.addField, value);
        this.submitState = 'success';
        setTimeout(() => {
          this.dialog = false;
          this.resetForm();
        }, 2000);
      } else {
        this.submitState = 'error';
      }
    },
    resetForm() {
      this.$refs.Form.reset();
      this.$refs.Validator.reset();
    },
  },
};
</script>