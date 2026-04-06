import PopUp from "./scripts/pop-up.js";
import addTask from "./scripts/add-task.js";
import loadTasks from "./scripts/load-task.js";

if (!localStorage.getItem("username")) {
    PopUp(
        "Insira um nome.",
        "Pronto",
        () => {
            const NAME_INPUT = document.createElement("input");
            NAME_INPUT.type = "text";
            NAME_INPUT.id = "pop-up-txt-input";
            return [NAME_INPUT];
        },
        () => {
            const NAME_INPUT = document.getElementById("pop-up-txt-input");
            const NAME = NAME_INPUT.value;
            const USERNAME_PLACE = document.getElementById("user");
            USERNAME_PLACE.innerHTML = NAME;
            localStorage.setItem("username", NAME);
        },
        false,
    );
} else {
    const USERNAME = localStorage.getItem("username");
    const USERNAME_PLACE = document.getElementById("user");
    USERNAME_PLACE.innerHTML = USERNAME;
}
if (!localStorage.getItem("tasklist")) {
    localStorage.setItem("tasklist", "[]");
}
loadTasks(JSON.parse(localStorage.getItem("tasklist")));
function ResetName() {
    PopUp(
        "Insira um nome.",
        "Pronto",
        () => {
            const NAME_INPUT = document.createElement("input");
            NAME_INPUT.type = "text";
            NAME_INPUT.id = "pop-up-txt-input";
            return [NAME_INPUT];
        },
        () => {
            const NAME_INPUT = document.getElementById("pop-up-txt-input");
            const NAME = NAME_INPUT.value;
            const USERNAME_PLACE = document.getElementById("user");
            USERNAME_PLACE.innerHTML = NAME;
            localStorage.setItem("username", NAME);
        },
        false,
    );
}
document.getElementById("reset-name").addEventListener("click", ResetName);
function ResetTasks() {
    localStorage.setItem("tasklist", "[]");
    document.querySelector("#tasks").innerHTML = "";
}
document.getElementById("reset-tasks").addEventListener("click", ResetTasks);
async function CreateTask() {
    event.preventDefault();
    const description = document.getElementById("description-entry").value;
    const date = document.getElementById("validity-entry").value;
    const tasklist = await addTask(description, Date.parse(date));
    if (tasklist) loadTasks(tasklist);
}
document.getElementById("create-btn").addEventListener("click", CreateTask);
