<template>
  <span>
    <TooltipButton
      icon="mdi-table-row-plus-after"
      @click="dialog = true"
    >
      Dodaj wiersz
    </TooltipButton>
    <RowDialog
      v-model="dialog"
      @submit="addRow"
      addMode
    />
  </span>
</template>

<script>
import TooltipButton from '@/components/common/TooltipButton.vue';
import RowDialog from './RowDialog.vue';

import { MUTATIONS as M } from '@/store/mutation-types';
import { Row } from '@/classes';

export default {
  components: {
    TooltipButton,
    RowDialog,
  },
  name: 'NewRowDialog',
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    addRow(name, form) {
      const newRow = new Row(name);
      Object.entries(form).forEach(entry => {
        const [key, value] = entry;
        newRow.addField(key, parseFloat(value));
      });
      this.$store.commit(M.addRow, newRow);
      this.dialog = false;
    },
  },
};
</script>