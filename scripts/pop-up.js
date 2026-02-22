async function PopUp(msg, sendLabel, inputCallback, sendActionCallback) {
    const BLUR_DIV = document.createElement("div");
    BLUR_DIV.id = "blur-box";
    const POP_UP = document.createElement("div");
    POP_UP.setAttribute("id", "pop-up");
    BLUR_DIV.appendChild(POP_UP);

    const HEAD_MSG = document.createElement("h2");
    HEAD_MSG.id = "pop-up-msg";
    HEAD_MSG.innerHTML = msg;

    inputCallback();

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

    const CANCEL_BUTTON = document.createElement("button");
    CANCEL_BUTTON.id = "calcel-btn";
    CANCEL_BUTTON.innerHTML = "Cancelar";
    CANCEL_BUTTON.addEventListener(
        "click",
        () => document.getElementById("blur-box").remove()
    );
};

export { PopUp };