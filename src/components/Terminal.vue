<template>
  <div class="terminal-shell">
    <div class="terminal-overlay"></div>
    <div class="terminal-contents has-cursor" ref="terminalElement">
      <div
        class="terminal-message"
        v-for="message in messages"
        :key="message.id"
      >
        <div v-if="message.html" class="terminal-response" v-html="message.html">
        </div>
        <div v-if="message.action !== undefined" class="terminal-action">
          {{ prompt }}{{ message.action }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, nextTick } from "vue";
import { writeMarkdownToTerminal } from "@/commands/terminalWriter";

function isPrintableKeyCode(keyCode) {
  let valid =
    (keyCode > 47 && keyCode < 58) || // number keys
    keyCode == 32 || // spacebar
    // keyCode == 13 || //return key(s) (if you want to allow carriage returns)
    (keyCode > 64 && keyCode < 91) || // letter keys
    (keyCode > 95 && keyCode < 112) || // numpad keys
    (keyCode > 185 && keyCode < 193) || // ;=,-./` (in order)
    (keyCode > 218 && keyCode < 223); // [\]' (in order)

  return valid;
}

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
  let response = ["+44", "7", "81", "7", " ", "89", "0", "98", "4"];
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
    "<div style=\"text-align:center\">I'm Samuel Gillespie!",
    "<img src=\"/images/photo.png\" alt=\"It's ME!\">",
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
    "        'Python', 'JavaScript', 'Node.JS',",
    "         'Vue.JS', 'Java', 'C#', 'git'",
    "    ]",
    "",
    "For more information, use the command:",
    "  > skills <skillName>",
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
    "  - <a href=\"https://www.linkedin.com/in/samuel-gillespie\">LinkedIn</a>",
    "  - <a href=\"https://github.com/Pluckerpluck\">GitHub</a>",
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
    const terminalContent = ref(terminalWelcomeText);
    const terminalElement = ref(null);
    const prompt = ref("> ");
    let messages = ref([
      {
        html: terminalWelcomeText,
      },
      {
        action: "",
      },
    ]);

    // Shortcut to the last message
    const lastMessage = () => {
      if (messages.value.length == 0) {
        return {};
      } else {
        return messages.value[messages.value.length - 1];
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
        messages.value.push({
          html: "",
        });
      }

      lastMessage().html = message;

      if (complete) {
        messages.value.push({
          action: "",
        });
      }

      updateScroll();
    };

    // This command gets filled by the user
    let command = "";

    //    ######     ###    ########  ######## ##     ## ########  ########
    //   ##    ##   ## ##   ##     ##    ##    ##     ## ##     ## ##
    //   ##        ##   ##  ##     ##    ##    ##     ## ##     ## ##
    //   ##       ##     ## ########     ##    ##     ## ########  ######
    //   ##       ######### ##           ##    ##     ## ##   ##   ##
    //   ##    ## ##     ## ##           ##    ##     ## ##    ##  ##
    //    ######  ##     ## ##           ##     #######  ##     ## ########

    let keyDown = (e) => {
      // This makes sure we're still mounted
      if (terminalElement.value == null) return;

      if (lastMessage().action != undefined) {
        // The enter key has been pressed
        if (e.keyCode == 13) {
          // Run my command and print the output!
          let response = runCommand(command);

          // Clear the command to prepare for the next one
          command = "";

          // Special clear command
          if (response == null) {
            // Remove all existing messages
            messages.value = [];

            // Clear and re-write to terminal
            terminalContent.value = "";
            writeMarkdownToTerminal(terminalWelcomeText, updateTerminal);
            //writeToTerminal(terminalWelcomeText);

            return;
          }

          writeMarkdownToTerminal(response, updateTerminal);

          updateScroll();
        }

        // Backspace is pressed
        else if (e.keyCode == 8) {
          if (lastMessage().action) {
            let typedAction = lastMessage().action;
            lastMessage().action = typedAction.slice(0, typedAction.length - 1);
          }

          // Only allow backspaces if we have a command being typed
          if (command.length > 0) {
            command = command.slice(0, command.length - 1);
            terminalContent.value = terminalContent.value.slice(
              0,
              terminalContent.value.length - 1
            );
          }

          // Get the latest position before scrolling to the bottom
          nextTick(() => {
            terminalElement.value.scrollTo(
              0,
              terminalElement.value.scrollHeight
            );
          });

          // Don't navigate away because of the default functionality!
          e.preventDefault();
        }

        // See if we can print it, otherwise do nothing
        else if (isPrintableKeyCode(e.keyCode)) {
          // Add the key to the terminal window
          terminalContent.value += e.key;

          let typedAction = lastMessage().action;

          typedAction = typedAction + e.key;
          lastMessage().action = typedAction;

          // Add the key to the active command
          command += e.key;

          // Get the latest position before scrolling to the bottom
          nextTick(() => {
            terminalElement.value.scrollTo(
              0,
              terminalElement.value.scrollHeight
            );
          });

          // Stop the keys propogating to anywhere else on the page
          e.preventDefault();
        }
      } else {
        // Even if typing is disabled, captured the key presses
        if (
          isPrintableKeyCode(e.keyCode) ||
          e.keyCode == 8 ||
          e.keyCode == 13
        ) {
          e.preventDefault();
        }
      }
    };

    // Begin listening for key presses
    onMounted(() => {
      window.addEventListener("keydown", keyDown);
    });

    return {
      terminalContent,
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
.terminal-shell {
  position: relative;
  background-color: black;
  background-image: radial-gradient(rgba(0, 150, 0, 0.75), black 120%);
  margin: 0;
  overflow: hidden;
  color: white;
  font: 1.3rem Inconsolata, monospace;
  text-shadow: 0 0 5px #c8c8c8;
  height: 70vh;
  padding: 1.5rem;
}

.terminal-contents {
  height: 100%;
  overflow: auto;
}

.terminal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem;
  overflow: hidden;
  background: repeating-linear-gradient(
    0deg,
    rgba(black, 0.15),
    rgba(black, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
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

.terminal {
  position: relative;
  background-color: black;
  background-image: radial-gradient(rgba(0, 150, 0, 0.75), black 120%);
  margin: 0;
  overflow: hidden;
  color: white;
  font: 1.3rem Inconsolata, monospace;
  text-shadow: 0 0 5px #c8c8c8;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      0deg,
      rgba(black, 0.15),
      rgba(black, 0.15) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
  }
}
::selection {
  background: #0080ff;
  text-shadow: none;
}

.output {
  padding-bottom: 1rem;
}

pre {
  background-color: transparent;
  margin: 0;
  height: 70vh;
}
</style>
