import { PopUp } from "./scripts/pop-up.js";
if (!localStorage.getItem("username")) {
    PopUp(
        "Insira um nome.",
        "Pronto",
        async () => {
            const NAME_INPUT = document.createElement("input");
            NAME_INPUT.type = "text";
            NAME_INPUT.id = "pop-up-txt-input";
            return [ NAME_INPUT ];
        },
        () => {
            const NAME_INPUT = document.getElementById("pop-up-txt-input");
            const NAME = NAME_INPUT.value;

            const USERNAME_PLACE = document.getElementById("user");
            USERNAME_PLACE.innerHTML = NAME;
            localStorage.setItem("username", NAME);
        }
    );
}
if (!localStorage.getItem("tasklist")) {
    localStorage.setItem("tasklist", "[]");
}