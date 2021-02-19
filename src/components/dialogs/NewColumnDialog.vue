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
                  label="Nazwa"
                  v-model="name"
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
import { ACTIONS as A } from '@/store/action-types';
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
      name: '',
      submitState: '',
    };
  },
  methods: {
    async addColumn() {
      const isValid = await this.$refs.Validator.validate();
      if (isValid) {
        if (await this.nameExists()) {
          this.$refs.Validator.setErrors({nazwa: 'Istnieje kolumna o zbyt podobnej nazwie'});
          this.submitState = 'error';
        }
        else {
          const newColumn = new Column(this.name);
          this.$store.commit(M.addColumn, newColumn);
          this.$store.commit(M.addField, newColumn.value);
          this.submitState = 'success';
          setTimeout(() => {
            this.dialog = false;
            this.resetForm();
          }, 200);
        }
      } else {
        this.submitState = 'error';
      }
    },
    resetForm() {
      this.$refs.Form.reset();
      this.$refs.Validator.reset();
    },
    async nameExists() {
      return await this.$store.dispatch(A.getColumnValue, this.name);
    },
  },
};
</script>