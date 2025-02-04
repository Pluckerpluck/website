<template>
  <CVEducation
    dateRange="Sept 2011 - Sept 2014"
    location="University of Oxford"
    degree="BA (Hons) Physics"
    result="2:2"
  >
    <div>
      <h3 class="font-semibold">Modules Included:</h3>
      <ul class="grid grid-cols-3 gap-2">
        <li class="text-sm" v-for="module in oxfordModules" :key="module">
          {{ module }}
        </li>
      </ul>
      <h3 class="font-semibold mt-4">Group Industrial Project:</h3>
      <p class="text-sm">
        Developed and created, as a team of 6, an apparatus capable of
        measuring thermal conductivity at liquid nitrogen temperatures
        (-2000C). This project received the Gibbs Prize for Best Group Project
        Presentation.
      </p>
    </div>
  </CVEducation>
</template>

<script setup>
const oxfordModules = [
  "Flows, Fluctuations & Complexity",
  "Quantum, Atomic & Molecular Physics",
  "Thermal Physics",
  "Astrophysics",
  "Sub-Atomic Physics",
  "Condensed-Matter",
  "Electromagnetism",
  "Optics",
  "Mathematical Methods",
];
</script>
