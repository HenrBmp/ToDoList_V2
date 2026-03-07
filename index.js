import { PopUp } from "./scripts/pop-up.js";
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
RESET_NAME_BTN.addEventListener(
    "click",
    function ResetName(){
        localStorage.clear("username");
        location.reload();
    }
);
const RESET_TASKS_BTN = document.getElementById("reset-tasks");
RESET_TASKS_BTN.addEventListener(
    "click",
    function ResetTasks(){
        localStorage.clear("tasklist");
        location.reload();
    }
);
const CREATE_TASK_BTN = document.getElementById("create-btn");
CREATE_TASK_BTN.addEventListener(
    "click",
    function addTask(){
        event.preventDefault();
        const DESC_INPUT = document.getElementById("description-entry");
        const DATE_INPUT = document.getElementById("validity-entry");
        if (!DESC_INPUT.value) {
            PopUp("Descrição inválida.");
            return
        } else if (!DESC_INPUT.value) {
            PopUp("Data inválida.");
            return;
        } else if (!DESC_INPUT.value && !DESC_INPUT.value) {
            PopUp("Descrição e data inválidas.");
            return;
        }
        const DATE_OBJECT = DATE_INPUT.valueAsDate;
        const NOW = new Date;
        const THIS_TASK_OBJECT = {
            "description": DESC_INPUT.value,
            "epoch": DATE_OBJECT.getTime(),
            "subOrder": 0,
            "isDone": false,
            "isOverdue": DATE_OBJECT.getTime() < NOW.getTime() ? false : true
        };
        const tasklist = JSON.parse(localStorage.getItem("tasklist"));
        tasklist.forEach(target_task => {
            if (
                THIS_TASK_OBJECT.description === target_task.description &&
                THIS_TASK_OBJECT.epoch === target_task.epoch &&
                THIS_TASK_OBJECT.subOrder === target_task.subOrder
            ) PopUp("Esta tarefa já existe.");
        });
    }
)