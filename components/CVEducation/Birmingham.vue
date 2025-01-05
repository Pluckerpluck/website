<template>
  <CVEducation
    dateRange="Sept 2014 - Sept 2015"
    location="University of Birmingham"
    degree="MSc Computer Science"
    result="Distinction"
  >
    <div>
      <h3 class="font-semibold">Modules Included:</h3>
      <ul class="grid grid-cols-3 gap-2">
        <li class="text-sm" v-for="module in birminghamModules" :key="module">
          {{ module }}
        </li>
      </ul>
      <h3 class="font-semibold">Summer Project:</h3>
      <p class="text-sm">
        Development of a neural network poker AI, capable of playing Limit
        Texas Hold'em
      </p>
    </div>
  </CVEducation>
</template>

<script setup>
const birminghamModules = [
  "Neural Computation",
  "Databases",
  "Artificial Intelligence",
  "Data Structure",
  "OS and Networks",
  "HCI",
];
</script>
