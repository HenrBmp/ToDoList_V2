import { PopUp } from "./scripts/pop-up.js";
if (!localStorage.getItem(username)) {
    PopUp(
        "Insira um nome.",
        "Pronto",
        () => {
            // gerar input de texto
        },
        () => {
            // capturar valor do input e mandar para o span
        }
    );
}