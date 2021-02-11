<template>
  <v-btn
    :color="buttonColor"
    @click="handleClick"
    :loading="isProcessing"
    min-width="120px"
    :block="block"
  >
  <slot>
    <v-icon v-if="shouldRenderIcon" class="mr-2">
      {{ buttonIcon }}
    </v-icon>
    Dodaj
  </slot>
</v-btn>
</template>

<script>
export default {
  name: 'SubmitButton',
  props: {
    state: {
      type: String,
      required: true,
      validator: value => {
        return ['', 'error', 'success', 'processing'].includes(value);
      },
    },
    block: Boolean,
  },
  computed: {
    buttonColor() {
      if (this.state == 'error') return 'error';
      if (this.state == 'success') return 'success';
      return 'primary';
    },
    buttonIcon() {
      if (this.state == 'error') return 'mdi-alert-circle-outline';
      if (this.state == 'success') return 'mdi-check-bold';
      return '';
    },
    shouldRenderIcon() {
      return this.state == 'error' || this.state == 'success';
    },
    isProcessing() {
      return this.state === 'processing';
    },
  },
  methods: {
    handleClick() {
      if (this.state === '') {
        this.$emit('update:state', 'processing');
        this.$emit('click');
      }
    },
  },
  watch: {
    state(val) {
      if (val === 'error' || val === 'success') {
        setTimeout(() => {
        this.$emit('update:state', '');
        }, 3000);
      }
    },
  },
};
</script>