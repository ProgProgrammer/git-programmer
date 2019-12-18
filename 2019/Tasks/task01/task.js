window.addEventListener('load', main);
window.onresize = main;

function main() {
    const numbers = document.getElementsByClassName("number");
    const input_Window = document.getElementsByClassName("label-span-window");
    const button_Enter = document.querySelector(".button");
    const button_Reset = document.querySelector(".reset");
    let number_Round = 0;
    const object = {};
    object.number_Made = false;
    object.input_NoValidate = false;
    const number_Min = numbers[0];
    const number_Max = numbers[1];

    for (let i = 0; i < numbers.length - 1; i++) {
        numbers[i].oninput = function () {
            if (checkInputs(numbers, object, input_Window, number_Min, number_Max, "part", i) === false) {
                return;
            }
        }
    }

    button_Enter.addEventListener('click', () => {
        if (checkInputs(numbers, object, input_Window, number_Min, number_Max, "all") === false) {
            return;
        }
        if (object.number_Made === false) {
            let number_Random = number_Min.value - 0.5 + Math.random() * (number_Max.value - number_Min.value + 1);
            number_Round = Math.round(number_Random);
            if (number_Round >= 0) {
                object.number_Made = true;
            }
        }

        if (Number(numbers[2].value) < number_Round) {
            numbers[3].setAttribute("value", "Число меньше рандомного");
        } else if (Number(numbers[2].value) > number_Round) {
            numbers[3].setAttribute("value", "Число больше рандомного");
        } else {
            numbers[3].setAttribute("value", "Угадал");
            object.number_Made = false;
            number_Round = 0;
            resetInputs(numbers, input_Window, 2);
            return;
        }
    });

    button_Reset.addEventListener('click', () => {
        object.number_Made = false;
        number_Round = 0;
        resetInputs(numbers, input_Window, 1);
        return;
    });
}

function checkInputs(numbers, object, input_Window, number_Min, number_Max, word, i) {
    for (let i = 0; i < numbers.length - 1; i++) {
        if (word == "all") {
            if (numbers[i].value == "") {
                numbers[i].style.borderColor = "red";
                object.input_NoValidate = true;
            }
            if (i == numbers.length - 2 && object.input_NoValidate === true) {
                object.input_NoValidate = false;
                return false;
            }
        }
    }

    if (numbers[0].value == "" &&
        input_Window[0].innerText == "Число больше максимального") {
        numbers[0].style.borderColor = "black";
        input_Window[0].style.display = "none";
    } else if (numbers[1].value == "" &&
        input_Window[1].innerText == "Число меньше минимального") {
        numbers[1].style.borderColor = "black";
        input_Window[1].style.display = "none";
    }

    if (i !== undefined) {
        if (numbers[i].value < 0 || numbers[i].value > 100) {
            numbers[i].style.borderColor = "red";
            input_Window[i].innerText = "Допускаются числа от 0 до 100";
            input_Window[i].style.display = "flex";
            if (i == 0 && input_Window[1].innerText == "Число меньше минимального") {
                numbers[1].style.borderColor = "black";
                input_Window[1].style.display = "none";
            } else if (i == 1 && input_Window[0].innerText == "Число больше максимального") {
                numbers[0].style.borderColor = "black";
                input_Window[0].style.display = "none";
            }
            return false;
        } else if (numbers[i].value >= 0 && numbers[i].value <= 100 &&
            numbers[i].style.borderColor == "red") {
            numbers[i].style.borderColor = "black";
            input_Window[i].style.display = "none";
        }
    }


    if (Number(number_Min.value) > Number(number_Max.value) &&
        number_Min.value != "" && number_Max.value != "" &&
        number_Min.value >= 0 && number_Min.value <= 100 &&
        number_Max.value >= 0 && number_Max.value <= 100) {
        number_Min.style.borderColor = "red";
        number_Max.style.borderColor = "red";
        input_Window[0].style.display = "flex";
        input_Window[1].style.display = "flex";
        input_Window[0].innerText = "Число больше максимального";
        input_Window[1].innerText = "Число меньше минимального";
        return false;
    } else if (Number(number_Min.value) <= Number(number_Max.value) &&
        input_Window[0].innerText != "Допускаются числа от 0 до 100" &&
        input_Window[1].innerText != "Допускаются числа от 0 до 100") {
        number_Min.style.borderColor = "black";
        number_Max.style.borderColor = "black";
        input_Window[0].style.display = "none";
        input_Window[1].style.display = "none";
    }

    if (numbers[0].style.borderColor == "red" || numbers[1].style.borderColor == "red" ||
        numbers[2].style.borderColor == "red") {
        return false;
    }
}

function resetInputs(numbers, input_Window, a) {
    for (let i = 0; i < numbers.length - a; i++) {
        numbers[i].value = "";
        numbers[i].style.borderColor = "black";
        input_Window[i].style.display = "none";
    }

    if (a == 1) {
        numbers[numbers.length - a].setAttribute("value", "");
    }
}
