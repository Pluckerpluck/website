<template>
  <div class="flex flex-col items-center justify-center gap-2">
    <div class="flex flex-col items-center justify-center gap-2">
      <p class="font-bold">{{ title }}</p>
      <p class="">{{ dateRange }}</p>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  dateRange: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  }
});
</script>
