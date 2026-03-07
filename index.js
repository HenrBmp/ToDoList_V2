import { PopUp } from "./scripts/pop-up.js";
import { addTask } from "./scripts/add-task.js";
if (!localStorage.getItem("username")) {
    PopUp(
        "Insira um nome.",
        "Pronto",
        () => {
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
} else {
    const USERNAME = localStorage.getItem("username")
    const USERNAME_PLACE = document.getElementById("user");
    USERNAME_PLACE.innerHTML = USERNAME;
}
if (!localStorage.getItem("tasklist")) {
    localStorage.setItem("tasklist", "[]");
}
const RESET_NAME_BTN = document.getElementById("reset-name");
function ResetName(){
    localStorage.clear("username");
    location.reload();
};
RESET_NAME_BTN.addEventListener(
    "click",
    ResetName()
);
function ResetTasks(){
    localStorage.clear("tasklist");
    location.reload();
};
const RESET_TASKS_BTN = document.getElementById("reset-tasks");
RESET_TASKS_BTN.addEventListener(
    "click",
    ResetTasks()
);
const CREATE_TASK_BTN = document.getElementById("create-btn");
CREATE_TASK_BTN.addEventListener(
    "click",
    addTask()
)