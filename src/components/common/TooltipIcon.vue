<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-icon
        :color="color || 'primary'"
        dark
        v-bind="attrs"
        :small="!normal"
        :x-small="xSmall"
        :large="large"
        :x-large="xLarge"
        @click="$emit('click')"
        v-on="on"
      >
        {{ icon }}
      </v-icon>
    </template>
    <span>
      <slot />
    </span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'TooltipButton',
  props: {
    icon: String,
    color: String,
    xSmall: Boolean,
    normal: Boolean,
    large: Boolean,
    xLarge: Boolean,
  },
};
</script>