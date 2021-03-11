<template>
  <section class="section">
    <div class="container is-max-desktop">
      <section class="header">
        <h1 class="title">
          {{ title }}
          <span class="cursor">&nbsp;</span>
        </h1>
        <h2 class="sub-title">Software Engineer and Quantitative Analyst</h2>
      </section>
      <section class="section">
        <Terminal />
      </section>
    </div>
  </section>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
</template>

<script>
//import Header from '@/components/Header.vue'
import Terminal from '@/components/Terminal.vue'
import { ref } from "vue";

function type(text, target, delay) {
  if (text.length > 0) {
    let letter = text[0];

    let remainingText = text.substring(1);

    setTimeout(() => {
      target.value += letter;
      type(remainingText, target, delay);
    }, delay);
  }
}

export default {
  name: "App",
  components: {Terminal},
  setup() {
    // Title loads in via typing
    let title = ref("> ");
    setTimeout(() => {
      type("Samuel Gillespie", title, 90);
    }, 50)


    return {
      title
    };
  },
};
</script>

<style lang="scss">

// Set all the globa variables
$scheme-main: #000a14;
$text: #0fb300;
$text-strong: #0fb300;
$title-size: 4rem;

@import "bulma/bulma";

html,
body {
  font-family: Consolas, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.header {
  text-align: center;
}

.title {
  text-align: left;
  width: 75%;
  margin: auto;
  font-weight: 400;
  padding-left: 1rem;
}

.cursor {
  background-color: $text-strong;
  animation: caret 1s steps(1) infinite;

}

@keyframes caret {
 50% {
  background-color:transparent
 }
}
</style>
