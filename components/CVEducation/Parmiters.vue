<template>
  <CVEducation
    dateRange="Sept 2004 - June 2011"
    location="Parmiter's School, Hertfordshire"
    degree="A-Levels & GCSEs"
    result=""
  >
    <div>
      <h3 class="font-semibold">A-Levels</h3>
      <ul class="grid grid-cols-3 gap-2">
        <li class="text-sm" v-for="subject in parmitersALevels" :key="subject.subject">
          {{ subject.subject }}:
          <span class="font-bold">{{ subject.grade }}</span>
        </li>
      </ul>
      <h3 class="font-semibold">GCSEs:</h3>
      <p class="text-sm">
        13 GCSE's at grade A or A* including Maths and English
      </p>
      <h3 class="font-semibold">Gold Crest Award:</h3>
      <p class="text-sm">
        Participated in the Engineering Education Scheme, completing (as a
        team of 4) a real life 6 month STEM project in Year 12
      </p>
    </div>
  </CVEducation>
</template>

<script setup>
const parmitersALevels = [
  {
    subject: "Physics",
    grade: "A*",
  },
  {
    subject: "Mathematics",
    grade: "A",
  },
  {
    subject: "Further Mathematics",
    grade: "A*",
  },
  {
    subject: "Systems and Controls",
    grade: "A",
  },
];
</script>
