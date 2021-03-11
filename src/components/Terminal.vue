<template>
  <div class="terminal">
    <pre ref="terminalElement"><output class="output">{{terminalContent}}{{cursor}}</output></pre>
  </div>
</template>

<script>
import { onMounted, ref, nextTick } from "vue";

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
    "om"
  ]
  return response.join("")
}

function getMobile() {
  let response = [
    "+44",
    "7",
    "81",
    "7",
    " ",
    "89",
    "0",
    "98",
    "4",
  ]
  return response.join("")
}

function runCommand(command) {

  let splitCommand = command.split(" ")
  let baseCommand = splitCommand[0].toLowerCase()

  let commandArgs = splitCommand.slice(1)
  let response = ["\n"]

  switch (baseCommand){
    case "help":
      response.push("Available Commands:")
      response.push("  - about        ->  Learn a little bit about me")
      response.push("  - experience   ->  Learn about my work experience")
      response.push("  - education    ->  Learn about what I studied")
      response.push("  - projects     ->  Learn about some of my projects")
      response.push("  - skills       ->  Learn about my skills")
      response.push("  - certificates ->  My licenses & certifications")
      response.push("  - contact      ->  Contact me!")
      response.push("  - clear        ->  Clears the terminal")
      break
    case "skills":
      response.push(runSkills(commandArgs))
      break
    case "education":
      response.push(runEducation(commandArgs))
      break
    case "contact":
      response.push(runContact(commandArgs))
      break
    case "":
      // In this case, we don't need a new line to start
      response = [""]
      break
    case "clear":
      // Special case, return null to indicate clear
      return null
    default:
      response.push("Unrecognized command. Type `help` for a list of commands.")
  }

  response.push("\n> ")
  return response.join("\n")
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
    "  including Maths and English"
  ]
  return response.join("\n")
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
    "  > skills <skillName>"
  ]
  return response.join("\n")
}

function runContact() {
  let response = [
    "You can contact me using one of the following methods:",
    "",
    `  - [Email: ${getEmail()}](mailto:${getEmail()})`,
    `  - Mobile: ${getMobile()}`,
    "",
    "Alternatively, contact me via social media:",
    "  - [LinkedIn](https://www.linkedin.com/in/samuel-gillespie)",
    "  - [GitHub](https://github.com/Pluckerpluck)",
  ]
  return response.join("\n")
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
    const terminalWelcomeText = "Welcome! Type `help` for more information.\n\n> "
    const terminalContent = ref(terminalWelcomeText);
    const canType = ref(true);
    const terminalElement = ref(null);
    const terminalCursorActive = ref(true)
    const cursor = ref("")

    setInterval(() => {
      if (!terminalCursorActive.value) return

      if (cursor.value.length == 1) {
        cursor.value = ""
      } else {
        cursor.value = "█"
      }
    }, 500)

    // This command gets filled by the user
    let command = ""



    let writeToTerminal = (text) => {
      // Disable typing from the user
      canType.value = false
      terminalCursorActive.value = false
      cursor.value = "█"

      // Convert the command into a stack
      let stack = text.split("")
      stack = stack.reverse()

      let typer = setInterval(function(){

          // We need this look becuase setInterval has a min interval
          for (let i = 0; i < 2; i++) {
            let letter = stack.pop()

            // We're done, exit and re-enable typing!
            if (letter == undefined) {
              clearInterval(typer)
              canType.value = true
              terminalCursorActive.value = true
              return
            }

            // Add the letter
            terminalContent.value += letter
          }


          //Wait until the character prints to scroll to the bottom
          nextTick(() => {
            terminalElement.value.scrollTo(0, terminalElement.value.scrollHeight);
          })
      },5);
    }


    //    ######     ###    ########  ######## ##     ## ########  ########
    //   ##    ##   ## ##   ##     ##    ##    ##     ## ##     ## ##
    //   ##        ##   ##  ##     ##    ##    ##     ## ##     ## ##
    //   ##       ##     ## ########     ##    ##     ## ########  ######
    //   ##       ######### ##           ##    ##     ## ##   ##   ##
    //   ##    ## ##     ## ##           ##    ##     ## ##    ##  ##
    //    ######  ##     ## ##           ##     #######  ##     ## ########

    let keyDown = (e) => {

      // This makes sure we're still mounted
      if (terminalElement.value == null) return

      if (canType.value) {

        // The enter key has been pressed
        if (e.keyCode == 13) {

          // Run my command and print the output!
          let response = runCommand(command)

          // Clear the command to prepare for the next one
          command = ""

          // Special clear command
          if (response == null) {
            terminalContent.value = ""
            terminalElement.value.scrollTo(0, 0)
            writeToTerminal(terminalWelcomeText)
            return
          }

          writeToTerminal(response)

          // Wait until the character prints to scroll to the bottom
          nextTick(() => {
            terminalElement.value.scrollTo(0, terminalElement.value.scrollHeight);
          })
        }

        // Backspace is pressed
        else if (e.keyCode == 8) {
          // Only allow backspaces if we have a command being typed
          if (command.length > 0) {
            command = command.slice(0, command.length - 1)
            terminalContent.value = terminalContent.value.slice(0, terminalContent.value.length - 1)
          }

          // Get the latest position before scrolling to the bottom
          nextTick(() => {
            terminalElement.value.scrollTo(0, terminalElement.value.scrollHeight);
          })

          // Don't navigate away because of the default functionality!
          e.preventDefault();
        }

        // See if we can print it, otherwise do nothing
        else if (isPrintableKeyCode(e.keyCode)) {
          // Add the key to the terminal window
          terminalContent.value += e.key;

          // Add the key to the active command
          command += e.key;

          // Get the latest position before scrolling to the bottom
          nextTick(() => {
            terminalElement.value.scrollTo(0, terminalElement.value.scrollHeight);
          })

          // Stop the keys propogating to anywhere else on the page
          e.preventDefault();

        }

      } else {
        // Even if typing is disabled, captured the key presses
        if (
          isPrintableKeyCode(e.keyCode)
          || e.keyCode == 8
          || e.keyCode == 13
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
      cursor
    };
  },
};
</script>

<style scoped lang="scss">
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
