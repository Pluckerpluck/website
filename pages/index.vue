<template>
  <div>
    <div
      class="grid grid-cols-1 sm:grid-cols-[320px_1fr] gap-4 max-w-6xl mx-auto"
    >
      <CVSidebar />
      <div>
        <div class="flex flex-col gap-6 my-5 mx-4">
          <div class="w-full break">
            <SectionHeader title="Experience" />
            <CVExperienceFitch />
            <CVExperienceImagination />
          </div>
          <div class="w-full">
            <SectionHeader title="Skills" />
            <CVSkillPython />
            <CVSkillProgramming />
            <CVSkillWebDevelopment />
          </div>
          <div class="w-full">
            <SectionHeader title="Education" />
            <CVEducationBirmingham />
            <!-- Dashed Line -->
            <DashedLine />
            <CVEducationOxford />
            <DashedLine />
            <CVEducationParmiters />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Programmatically create a dashed line component
const DashedLine = defineComponent(() => {
  return () => h("div", {
    class: "w-full border-t border-dashed border-black my-4",
  });
});

// Programmatically create a section header component
const SectionHeader = defineComponent(
  (props) => {
    return () => {
      return h(
        "div",
        {
          class: "flex items-center justify-center gap-2 break-after-avoid-page",
        },
        [
          h("div", {
            class: "w-1/2 h-0.5 bg-black",
          }),
          h(
            "div",
            {
              class: "font-bold mb-2 font-serif text-2xl",
            },
            [props.title]
          ),
          h("div", {
            class: "w-1/2 h-0.5 bg-black",
          }),
        ]
      );
    };
  },
  {
    props: {
      title: {
        type: String,
        required: true,
      },
    },
  }
);
</script>
