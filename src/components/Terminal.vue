<template>
<div class="terminal-wrapper">
  <div class="terminal-shell">
    <div class="terminal-overlay"></div>
    <div class="terminal-contents has-cursor" ref="terminalElement">
      <div
        class="terminal-message"
        v-for="message in messages"
        :key="message.id"
      >
        <div
          v-if="message.html"
          class="terminal-response"
          v-html="message.html"
        ></div>
        <div v-if="message.action !== undefined" class="terminal-action">
          {{ prompt }}{{ message.action }}
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { onMounted, ref, nextTick, reactive, onUnmounted } from "vue";
import {
  writeMarkdownToTerminal,
  isPrintableKeyCode,
} from "@/commands/terminalWriter";

//    ######   #######  ##     ## ##     ##    ###    ##    ## ########   ######
//   ##    ## ##     ## ###   ### ###   ###   ## ##   ###   ## ##     ## ##    ##
//   ##       ##     ## #### #### #### ####  ##   ##  ####  ## ##     ## ##
//   ##       ##     ## ## ### ## ## ### ## ##     ## ## ## ## ##     ##  ######
//   ##       ##     ## ##     ## ##     ## ######### ##  #### ##     ##       ##
//   ##    ## ##     ## ##     ## ##     ## ##     ## ##   ### ##     ## ##    ##
//    ######   #######  ##     ## ##     ## ##     ## ##    ## ########   ######

function getEmail() {
  // Create my email address using javascript to avoid
  // scrapers finding it.
  // NOTE: Only use after user interactivity
  let response = [
    "sam",
    "my",
    "gil",
    "les",
    "pie",
    "@",
    "g",
    "ma",
    "il",
    ".",
    "c",
    "om",
  ];
  return response.join("");
}

function getMobile() {
  let response = ["+44", "7", "81", "7", "89", "0", "98", "4"];
  return response.join("");
}

function runCommand(command) {
  let splitCommand = command.split(" ");
  let baseCommand = splitCommand[0].toLowerCase();

  let commandArgs = splitCommand.slice(1);
  let response = [];

  switch (baseCommand) {
    case "help":
      response.push("Available Commands:");
      response.push("  - about        ->  Learn a little bit about me");
      response.push("  - experience   ->  Learn about my work experience");
      response.push("  - education    ->  Learn about what I studied");
      response.push("  - projects     ->  Learn about some of my projects");
      response.push("  - skills       ->  Learn about my skills");
      response.push("  - certificates ->  My licenses & certifications");
      response.push("  - contact      ->  Contact me!");
      response.push("  - clear        ->  Clears the terminal");
      break;
    case "skills":
      response.push(runSkills(commandArgs));
      break;
    case "education":
      response.push(runEducation(commandArgs));
      break;
    case "contact":
      response.push(runContact(commandArgs));
      break;
    case "about":
      response.push(runAbout(commandArgs));
      break;
    case "":
      // In this case, we don't need a new line to start
      response = [""];
      break;
    case "clear":
      // Special case, return null to indicate clear
      return null;
    default:
      response.push(
        "Unrecognized command. Type `help` for a list of commands."
      );
  }

  return response.join("\n");
}

function runAbout() {
  let response = [
    '<div style="text-align:center">I\'m Samuel Gillespie!',
    '<img src="/images/photo.png" alt="It\'s ME!">',
    "I'm a software engineer and quantitative analyst.</div>",
  ];
  return response.join("\n");
}

function runEducation() {
  let response = [
    "===============================================",
    "MSc Computer Science - University of Birmingham",
    "===============================================",
    "Grade: Distinction      [Sept 2014 - Sept 2015]",
    "",
    "Modules:",
    "  - Neural Compuation",
    "  - Aritifical Intelligence",
    "  - OS and Networks",
    "  - Data Structures",
    "  - Databases",
    "  - HCI",
    "",
    "Summer Project:",
    "  Development of a neural network poker AI,",
    "  capable of playing Limit Texas Hold’em",
    "",
    "===============================================",
    "   BA (Hons) Physics - University of Oxford",
    "===============================================",
    "Grade: 2:2              [Sept 2011 - June 2014]",
    "",
    "Modules:",
    "  - Flows, Fluctuations & Complexity",
    "  - Quantum, Atomic & Molecular Physics",
    "  - Thermal Physics",
    "  - Astrophysics",
    "  - Sub-Atomic Physics",
    "  - Condensed-Matter",
    "  - Electromagnetism",
    "  - Optics",
    "  - Mathematical Methods",
    "",
    "Group Industrial Project:",
    "  Developed and created, as a team of 6,",
    "  an apparatus capable of measuring thermal ",
    "  conductivity at liquid nitrogen temperatures.",
    "",
    "  This project received the Gibbs Prize for",
    "  Best Group Project Presentation.",
    "",
    "===============================================",
    "       Parmiter's School, Hertfordshire",
    "===============================================",
    "                        [Sept 2004 - June 2011]",
    "A-Levels:",
    "  - Mathematics ............................ A",
    "  - Further Mathematics .................... A*",
    "  - Systems and Controls ................... A",
    "  - Physics ................................ A*",
    "",
    "GCSEs:",
    "  13 GCSEs at grade A or A*,",
    "  including Maths and English",
  ];
  return response.join("\n");
}

function runSkills() {
  let response = [
    "I am proficient in the following areas:",
    "",
    "    [",
    "        Python,",
    "        JavaScript,",
    "        Node.JS,",
    "        Vue.JS,",
    "        Java,",
    "        C#,",
    "        git",
    "    ]",
  ];
  return response.join("\n");
}

function runContact() {
  let response = [
    "You can contact me using one of the following methods:",
    "",
    `  - <a href="mailto:${getEmail()}">Email: ${getEmail()}</a>`,
    `  - <a href="tel:${getMobile()}">Mobile: ${getMobile()}</a>`,
    "",
    "Alternatively, contact me via social media:",
    '  - <a href="https://www.linkedin.com/in/samuel-gillespie">LinkedIn</a>',
    '  - <a href="https://github.com/Pluckerpluck">GitHub</a>',
  ];
  return response.join("\n");
}

//    ######  ######## ######## ##     ## ########
//   ##    ## ##          ##    ##     ## ##     ##
//   ##       ##          ##    ##     ## ##     ##
//    ######  ######      ##    ##     ## ########
//         ## ##          ##    ##     ## ##
//   ##    ## ##          ##    ##     ## ##
//    ######  ########    ##     #######  ##

export default {
  setup() {
    const terminalWelcomeText = "Welcome! Type `help` for more information.";
    const terminalElement = ref(null);
    const prompt = ref("> ");
    let messages = reactive([
      {
        html: terminalWelcomeText,
      },
      {
        action: "",
      },
    ]);

    // Shortcut to the last message
    const lastMessage = () => {
      if (messages.length == 0) {
        return {};
      } else {
        return messages[messages.length - 1];
      }
    };
    const updateScroll = () => {
      // Wait until the character prints to scroll to the bottom
      nextTick(() => {
        terminalElement.value.scrollTo(0, terminalElement.value.scrollHeight);
      });
    };

    const updateTerminal = (message, complete) => {
      if (lastMessage().html == undefined) {
        messages.push({
          html: "",
        });
      }

      lastMessage().html = message;

      if (complete) {
        messages.push({
          action: "",
        });
      }

      updateScroll();
    };

    //    ######     ###    ########  ######## ##     ## ########  ########
    //   ##    ##   ## ##   ##     ##    ##    ##     ## ##     ## ##
    //   ##        ##   ##  ##     ##    ##    ##     ## ##     ## ##
    //   ##       ##     ## ########     ##    ##     ## ########  ######
    //   ##       ######### ##           ##    ##     ## ##   ##   ##
    //   ##    ## ##     ## ##           ##    ##     ## ##    ##  ##
    //    ######  ##     ## ##           ##     #######  ##     ## ########

    let keyDown = (e) => {
      // This makes sure we're still mounted
      // TODO: Properly unbind this
      if (terminalElement.value == null) return;

      // Start by disabling the default action is we capture it
      if (isPrintableKeyCode(e.keyCode) || e.keyCode == 8 || e.keyCode == 13) {
        e.preventDefault();
      }

      if (lastMessage().action != undefined) {
        // The enter key has been pressed
        if (e.keyCode == 13) {
          // Run my command and print the output!
          let response = runCommand(lastMessage().action);

          // Special clear command
          if (response == null) {
            // Remove all existing messages and prep the welcome msg
            messages.length = 0;
            response = terminalWelcomeText;
          }

          // Write the latest response to the terminal
          writeMarkdownToTerminal(response, updateTerminal);
        }

        // Backspace is pressed
        else if (e.keyCode == 8) {
          // Only delete if we have something to delete
          if (lastMessage().action) {
            lastMessage().action = lastMessage().action.slice(0, -1);
          }
        }

        // See if we can print it, otherwise do nothing
        else if (isPrintableKeyCode(e.keyCode)) {
          // Append the key onto the latest action
          lastMessage().action += e.key;

          // Incase we drop onto the next line
          updateScroll();
        }
      }
    };

    // Begin listening for key presses
    onMounted(() => {
      window.addEventListener("keydown", keyDown);
    });

    // Cleanup if needed
    onUnmounted(() => {
      window.removeEventListener("keydown", keyDown);
    });

    return {
      terminalElement,
      messages,
      prompt,
    };
  },
};
</script>

<style lang="scss">
.has-cursor .terminal-message {
  &:last-child .terminal-action::after {
    content: "█";
    animation: terminal-caret 1s steps(1) infinite;
  }
}

@keyframes terminal-caret {
  50% {
    opacity: 0;
  }
}
</style>

<style scoped lang="scss">
.terminal-wrapper {
  // Limits the width based on the height
  max-width: calc(100vh * 1.33 - 28rem);
  margin: auto;
}

.terminal-shell {
  position: relative;
  background-color: black;
  background-image: radial-gradient(rgba(0, 150, 0, 0.75), black 120%);
  margin-top: 3vh;
  color: white;
  font: 1.3rem Inconsolata, monospace;
  text-shadow: 0 0 5px #c8c8c8;
  width: 100%;
  padding-top: 75%;
}

.terminal-contents {
  overflow-y: scroll;
  position: absolute;
  top: 4%;
  right: 4%;
  left: 9%;
  bottom: 6%;
}

.terminal-overlay {
  position: absolute;
  top: -13%;
  left: -13%;
  right: -13%;
  bottom: -13%;
  overflow: hidden;
  background: url("~@/assets/terminal.png");
    // repeating-linear-gradient(
    //   0deg,
    //   rgba(black, 0.15),
    //   rgba(black, 0.15) 1px,
    //   transparent 1px,
    //   transparent 2px
    // );
  background-size: 100% 100%;
  pointer-events: none;
  z-index: 200;
}

.terminal-message {
  font: 1.3rem Inconsolata, monospace;
  color: #0fb300;
  font-size: 0.875em;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin-top: 1rem;

  ::v-deep(a) {
    color: #c3f975;

    &:hover {
      color: white;
    }
  }
}

::selection {
  background: #0080ff;
  text-shadow: none;
}
</style>
