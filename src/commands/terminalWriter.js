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

export function isPrintableKeyCode(keyCode) {
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
