<template>
  <CVExperience
    dateRange="Jan 2016 - Jan 2018"
    title="Software Design Engineer at Imagination Technologies"
  >
    <div>
      <p class="mb-2">
        Charged with implementing a git based platform, built on top of gerrit, to
        support open sourcing a subset of our driver codebase. Developed an automated
        system to extract public portions of code as it was deployed, transfer it into a
        gerrit change review, and then publish it to a public git repository. This
        system was designed to be robust and secure, with a focus on ensuring that no
        proprietary code was accidentally published.
      </p>
      <p>
        Also worked on a number of internal tools to improve the efficiency of our
        development and testing processes. This included a system to automatically (and
        continuously) run a large suite of tests on an emulated platform using QEMU. Due
        to the slow nature of the tests this involved a pool of test machines
        continually rotating through all available tests on the latest codebase.
      </p>
    </div>
    <div class="text-gray-600 text-center mt-5 grid grid-cols-2 gap-4">
      <div>
        Designed and implemented software and hardware tools to improve testing and
        development efficiency.
      </div>
      <div>
        Researched, designed and implemented an application for review and safe
        publication of code
      </div>
      <div>
        Interfaced with various internal departments in order to develop robust
        operational specifications.
      </div>
      <div>
        Modified existing software to both fix and upgrade software; working in C, Java,
        Python and Ruby.
      </div>
    </div>
  </CVExperience>
</template>
