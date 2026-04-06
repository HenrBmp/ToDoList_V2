import PopUp from "./pop-up.js";
export default async function addTask(description, dateAsNumber, isDone = false) {
    if (!description && !dateAsNumber) {
        PopUp(
            "Descrição e data inválidas.",
            "Ok",
            () => {},
            () => {},
            true,
        );
        return;
    } else if (!description) {
        PopUp(
            "Descrição inválida.",
            "Ok",
            () => {},
            () => {},
            true,
        );
        return;
    } else if (!dateAsNumber) {
        PopUp(
            "Data inválida.",
            "Ok",
            () => {},
            () => {},
            true,
        );
        return;
    }
    const THIS_TASK_OBJECT = {
        description,
        epoch: dateAsNumber,
        subOrder: 0,
        isDone,
        isOverdue: dateAsNumber < Date.now(),
    };
    const tasklist = JSON.parse(localStorage.getItem("tasklist"));
    const task_already_exists = tasklist.some(function CheckRepeatedTask(target_task) {
        THIS_TASK_OBJECT.description === target_task.description &&
            THIS_TASK_OBJECT.epoch === target_task.epoch;
    });
    if (task_already_exists) {
        PopUp(
            "Esta tarefa já existe.",
            "Ok",
            () => {},
            () => {},
            true,
        );
        return;
    }
    tasklist.forEach(function CheckOrder(target) {
        if (target.epoch === THIS_TASK_OBJECT.epoch) {
            THIS_TASK_OBJECT.subOrder = target.subOrder + 1;
        }
    });
    tasklist.push(THIS_TASK_OBJECT);
    tasklist.sort((taskA, taskB) => taskA.epoch - taskB.epoch);
    localStorage.setItem("tasklist", JSON.stringify(tasklist));
    return tasklist;
}
