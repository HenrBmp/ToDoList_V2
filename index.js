import { PopUp } from "./scripts/pop-up.js";
if (!localStorage.getItem("username")) {
    PopUp(
        "Insira um nome.",
        "Pronto",
        async () => {
            // gerar input de texto
            return [ /* input aqui */];
        },
        () => {
            // capturar valor do input e mandar para o span
        }
    );
}
if (!localStorage.getItem("tasklist")) {
    localStorage.setItem("tasklist", "[]");
}