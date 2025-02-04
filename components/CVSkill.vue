<template>
    <div class="flex flex-col gap-2 break-inside-avoid-page">
      <div class="flex flex-col items-center justify-center gap-2">
        <p class="font-bold">{{ title }}</p>
      </div>
      <slot></slot>
    </div>
  </template>

  <script setup>
  // Add your props here
  const props = defineProps({
    title: {
      type: String,
      required: true,
    }
  });
  </script>
