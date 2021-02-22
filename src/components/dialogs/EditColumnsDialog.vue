<template>
    <span>
    <TooltipButton
      @click="dialog = true"
      icon="mdi-pencil-outline"
    >
      Edytuj kolumny
    </TooltipButton>
    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          Edycja kolumn
        </v-card-title>
        <v-card-text class="pt-5">
          <ValidationObserver ref="Validator">
            <ValidationProvider
              v-for="column in columns"
              :key="column.value"
              v-slot="{ errors }"
              rules="required"
              :name="column.text"
            >
              <v-text-field
                :label="column.text"
                outlined
                v-model="form[column.value]"
                :name="column.text"
                :error-messages="errors"
              >
                <template #append-outer>
                  <TooltipIcon
                    @click="editItem(column)"
                    color="primary"
                    icon="mdi-pencil-outline"
                    normal
                  >
                    Edytuj
                  </TooltipIcon>
                  <span class="mx-2" />
                  <TooltipIcon
                    @click="deleteItem(column)"
                    color="red"
                    icon="mdi-delete-circle-outline"
                    normal
                  >
                    Usuń
                  </TooltipIcon>
                </template>
              </v-text-field>
            </ValidationProvider>
          </ValidationObserver>
        </v-card-text>
        <v-card-actions
          class="px-4 py-0"
        >
          <v-slide-y-reverse-transition>
            <v-alert
              v-if="message"
              type="error"
              outlined
              width="100%"
              class="my-3"
            >
              {{ message }} 
            </v-alert>
         </v-slide-y-reverse-transition>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import TooltipButton from '@/components/common/TooltipButton.vue'
import TooltipIcon from '@/components/common/TooltipIcon.vue';

import { MUTATIONS as M } from '@/store/mutation-types';
import { ACTIONS as A } from '@/store/action-types';

export default {
  name: 'EditColumnsDialog',
  components: {
    TooltipButton,
    TooltipIcon,
  },
  data() {
    return {
      dialog: false,
      form: {},
      message: '',
    };
  },
  computed: {
    columns() {
      return this.$store.getters.valueColumns;
    },
  },
  methods: {
    async editItem(column) {
      const isValid = await this.$refs.Validator.validate();
      if (isValid) {
        if (await this.nameExists(this.form[column.value])) {
          this.$refs.Validator.setErrors({[column.text]: 'Istnieje kolumna o zbyt podobnej nazwie'});
          this.message = 'Istnieje kolumna o zbyt podobnej nazwie';
        }
        else {
          this.$store.commit(M.changeColumnName, {
            col: column,
            name: this.form[column.value],
          });
        }
      }
      else {
        this.message = 'Nie podano nazwy';
      }
    },
    async deleteItem(column) {
      const confirmed = await this.$confirm(`Czy chcesz usunąć kolumnę ${column.text}?`)
      if (confirmed) this.$store.commit(M.deleteColumn, column);
    },
    async nameExists(name) {
      return await this.$store.dispatch(A.getColumnValue, name);
    },
  },
  watch: {
    columns: {
      handler(val) {
        val.forEach(column => this.form[column.value] = column.text);
      },
      deep: true,
    },
    message() {
      setTimeout(() => {
        this.message = '';
      }, 4000);
    }
  },
  mounted() {
    this.columns.forEach(column => this.form[column.value] = column.text);
  },
};
</script>