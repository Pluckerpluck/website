<template>
  <div class="bg-gray-200 sm:min-h-dvh relative">
    <div class="flex flex-col items-center justify-center mx-6 gap-6 my-5">
      <div class="flex flex-col items-center justify-center gap-2 w-full">
        <img
          src="/images/profile-144.webp"
          alt="Samuel Gillespie"
          class="rounded-full w-36 h-36 object-cover"
        />
        <h1 class="font-serif text-3xl">Samuel Gillespie</h1>
        <p class="font-serif">Software Engineer</p>
      </div>
      <hr class="w-full bg-black h-0.5 my-2 px-2" />
      <div class="w-full">
        <h2 class="font-bold mb-2 text-center">About Me</h2>
        <p class="sm:text-sm sm:leading-tight text-center [text-align-last:center]">
          Experienced Software Engineer with a strong foundation in modern development
          practices and cloud technologies. Skilled in designing scalable solutions and
          collaborating with diverse teams to deliver high-impact software products
          in the finance sector
        </p>
      </div>
      <div class="w-full">
        <h2 class="font-bold mb-2 text-center">Key Skills</h2>

        <ul class="grid grid-cols-3 gap-2 text-center">
          <li class="text-sm">Python</li>
          <li class="text-sm">React</li>
          <li class="text-sm">JavaScript</li>
          <li class="text-sm">Node.js</li>
          <li class="text-sm">Docker</li>
          <li class="text-sm">Kubernetes</li>
          <li class="text-sm">AWS</li>
          <li class="text-sm">GraphQL</li>
          <li class="text-sm">REST</li>
          <li class="text-sm">Java</li>
          <li class="text-sm">CI/CD</li>
        </ul>
      </div>
    </div>
    <div class="absolute bottom-0 print:hidden">Download CV</div>
  </div>
</template>
