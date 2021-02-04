<template>
    <v-dialog
        v-model="dialog"
        max-width="600px"
    >
        <v-card>
        <v-card-title>
            {{ title }}
        </v-card-title>
        <v-card-text class="py-3 px-6">
            <ValidationObserver ref="Validator">
            <v-form ref="Form">
                <ValidationProvider
                v-slot="{ errors, valid }"
                rules="required"
                name="name"
                >
                <v-text-field
                    label="Nazwa"
                    v-model="name"
                    :error-messages="errors"
                    :success="valid"
                    outlined
                />
                </ValidationProvider>
                <ValidationProvider
                v-for="column in columns"
                :key="column.value"
                v-slot="{ errors, valid }"
                rules="required"
                :name="column.text"
                >
                <v-text-field
                    :label="column.text"
                    v-model="form[column.value]"
                    :error-messages="errors"
                    :success="valid"
                    outlined
                    type="number"
                />
                </ValidationProvider>
            </v-form>
            </ValidationObserver>
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <SubmitButton
                :state.sync="submitState"
                @click="submit"
            >
                {{ submitButtonText }}
            </SubmitButton>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import SubmitButton from '@/components/common/SubmitButton';

export default {
  components: {
    SubmitButton,
  },
  name: 'RowDialog',
  props: {
    row: Object,
    addMode: {
        type: Boolean,
        default: false,
    },
    value: Boolean,
  },
  data() {
    return {
      dialog: this.value,
      submitState: '',
      name: '',
      form: {
      },
    };
  },
  computed: {
    columns() {
      return this.$store.getters.valueColumns;
    },
    title() {
      return this.addMode ? 'Nowy wiersz' : 'Edytuj wiesz';
    },
    submitButtonText() {
      return this.addMode ? 'Dodaj' : 'Edytuj';
    },
  },
  methods: {
    async submit() {
        const isValid = await this.$refs.Validator.validate();
        if (isValid) {
            this.submitState = 'success';
            setTimeout(() => {
                this.$emit('submit', this.name, this.form);
                this.resetForm();
            }, 200);
        } else {
            this.submitState = 'error';
        }
    },
    resetForm() {
      this.$refs.Form.reset();
      this.$refs.Validator.reset();
    },
  },
  watch: {
    value(val) {
        this.dialog = val;
    },
    dialog(val) {
        this.$emit('input', val);
    },
    row(val) {
      this.form = {};
      this.name = val.name;
      Object.entries(val).forEach(entry => {
        const [key, value] = entry;
        this.form[key] = value;
      });
    }
  },
};
</script>