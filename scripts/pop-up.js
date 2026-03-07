async function PopUp(msg, sendLabel, inputCallback, sendActionCallback) {
    const BLUR_DIV = document.createElement("div");
    BLUR_DIV.id = "blur-box";
    document.getElementById("root").appendChild(BLUR_DIV);

    const POP_UP = document.createElement("div");
    POP_UP.id = "pop-up";
    BLUR_DIV.appendChild(POP_UP);

    const HEAD_MSG = document.createElement("h2");
    HEAD_MSG.id = "pop-up-msg";
    HEAD_MSG.innerHTML = msg;
    POP_UP.appendChild(HEAD_MSG);

    const inputs = await inputCallback();
    inputs.forEach(input => POP_UP.appendChild(input));

    if (sendLabel) {
        const ACTION_BUTTON = document.createElement("button");
        ACTION_BUTTON.id = "sendAction-btn";
        ACTION_BUTTON.innerHTML = sendLabel;
        ACTION_BUTTON.addEventListener(
            "click",
            () => {
                sendActionCallback();
                document.getElementById("blur-box").remove();
            }
        );
        POP_UP.appendChild(ACTION_BUTTON);

        const CANCEL_BUTTON = document.createElement("button");
        CANCEL_BUTTON.id = "cancel-btn";
        CANCEL_BUTTON.innerHTML = "Cancelar";
        CANCEL_BUTTON.addEventListener(
            "click",
            () => document.getElementById("blur-box").remove()
        );
        POP_UP.appendChild(CANCEL_BUTTON);
    } else {
        const CONFIRM_BUTTON = document.createElement("button");
        CONFIRM_BUTTON.id = "confirm-btn";
        CONFIRM_BUTTON.innerHTML = "Ok";
        CONFIRM_BUTTON.addEventListener(
            "click",
            () => document.getElementById("blur-box").remove()
        );
        POP_UP.appendChild(CONFIRM_BUTTON);
    }

};

export { PopUp };