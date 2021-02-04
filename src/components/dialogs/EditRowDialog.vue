<template>
    <RowDialog
        v-model="dialog"
        :row="row"
        @submit="editRow"
    />
</template>

<script>
import RowDialog from './RowDialog';

import { MUTATIONS as M } from '@/store/mutation-types';

export default {
  components: {
    RowDialog
  },
  name: 'EditRowDialog',
  props: {
    row: Object,
    value: Boolean,
  },
  data() {
    return {
      dialog: this.value,
    };
  },
  methods: {
    editRow(name, form) {
      const formCopy = Object.assign({}, form);
      delete formCopy.id;
      delete formCopy.name;
      Object.entries(formCopy).forEach(entry => {
        const [key, value] = entry;
        formCopy[key] = parseFloat(value);
      });
      const rowUpdate = {
        name,
        id: form.id,
        values: formCopy,
      };
      this.$store.commit(M.editRow, rowUpdate);
      this.dialog = false;
    },
  },
  watch: {
    value(val) {
      this.dialog = val;
    },
    dialog(val) {
      this.$emit('input', val);
    },
  },
};
</script>