export function writeMarkdownToTerminal(text, onTick) {

    // Convert the command into a stack
    let stack = text.split("");
    stack = stack.reverse();

    let message = ""

    let writer = setInterval(function () {
        // We need this look because setInterval has a min interval
        for (let i = 0; i < 2; i++) {
            let letter = stack.pop();

            // We're done, exit
            if (letter == undefined) {
                clearInterval(writer)
                onTick(message, true)
                return;
            }

            // Add the letter
            message += letter;
        }

        onTick(message, false)
    }, 5);
}
