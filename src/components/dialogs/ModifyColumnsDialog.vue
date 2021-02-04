<template>
  <span>
    <TooltipButton
      icon="mdi-table-column-plus-before"
      @click="dialog = true"
    >
      Modyfikacja nagłówków
    </TooltipButton>
</template>

<script>
import TooltipButton from '@/components/common/TooltipButton.vue';

export default {
  name: 'ModifyColumnDialog',
  components: {
    TooltipButton,
  },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>