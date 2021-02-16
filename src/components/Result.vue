<template>
  <v-row>
    <v-col cols="12">
      <Variantions />
    </v-col>
  </v-row>
</template>

<script>
import Variantions from './results/Variantions';

export default {
  name: 'Result',
  components: {
    Variantions,
  },
};
</script>