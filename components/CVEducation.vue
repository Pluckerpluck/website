<template>
  <div class="flex flex-col items-center gap-2 break-inside-avoid-page">
    <div class="flex flex-col items-center justify-center gap-2">
      <h3 class="font-bold">{{ degree }}</h3>
      <p class="">{{ location }}</p>
      <p class="">{{ dateRange }}</p>
      <p class="">{{ result }}</p>
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
  location: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
});
</script>
