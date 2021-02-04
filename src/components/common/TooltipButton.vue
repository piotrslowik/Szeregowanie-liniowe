<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        :color="color || 'primary'"
        dark
        v-bind="attrs"
        :fab="!notFab"
        :block="block"
        :small="!normal"
        :x-small="xSmall"
        :large="large"
        :x-large="xLarge"
        @click="$emit('click')"
        v-on="on"
      >
        <v-icon v-if="icon">
          {{ icon }}
        </v-icon>
        {{ text }}
      </v-btn>
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
    text: String,
    icon: String,
    color: String,
    block: Boolean,
    notFab: Boolean,
    xSmall: Boolean,
    normal: Boolean,
    large: Boolean,
    xLarge: Boolean,
  },
};
</script>