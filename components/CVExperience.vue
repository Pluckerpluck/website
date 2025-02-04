<!-- <template>
  <div class="flex flex-col items-center justify-center gap-2">
    <div class="flex flex-col items-center justify-center gap-2">
      <p class="font-bold">{{ title }}</p>
      <p class="">{{ dateRange }}</p>
    </div>
    <slot></slot>
  </div>
</template> -->

<template>
  <div class="grid grid-cols-[1fr] sm:grid-cols-[50px_1fr] break-inside-avoid-page">
    <div class="hidden sm:flex flex-col items-center justify-center">
      <div class="w-3 h-3 bg-gray-700 rounded-full"></div>
    </div>
    <div class="flex items-center justify-between">
      <div class="text-lg font-bold text-left">
        {{ title }}
      </div>
      <div class="text-sm text-gray-500 text-right">
        {{ dateRange }}
      </div>
    </div>
    <div class="hidden sm:flex flex-col items-center justify-center">
      <div class="w-px flex-1 bg-gray-400 h-full"></div>
    </div>
    <div class="pb-6">
      <slot></slot>
    </div>
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
  },
});
</script>
