let array_of_strings = [
            ['-', '-', '-'],
            ['-', '-', '-'],
            ['-', '-', '-']
        ];

function getAllLines(matrix) {
    let lines = '';
    let array_letters = "";
    let array_letters_right_left = "";
    let result;
    let number_string_diagonal = array_of_strings.length;

    for (let i = 0; i < array_of_strings.length; i++) {
        const part_array_of_strings = array_of_strings[i];
        array_letters = "";

        for (let a = 0; a < part_array_of_strings.length; a++) {
            array_letters = array_letters + part_array_of_strings[a];
            console.log(array_letters);
            result = array_letters;

            if (array_letters.length == part_array_of_strings.length) {
                if (result === "XXX") {
                    const x = "X";
                    return x;
                } else if (result === "OOO") {
                    const o = 0;
                    return o;
                }
                array_letters = "";
            }
        }
    }

    for (let i = 0; i < array_of_strings.length; i++) {
        array_letters = "";

        for (let a = 0; a < array_of_strings.length; a++) {
            const part_array_of_strings = array_of_strings[a];
            array_letters = array_letters + part_array_of_strings[i];
            result = array_letters;

            if (array_letters.length == part_array_of_strings.length) {
                if (result === "XXX") {
                    const x = "X";
                    return x;
                } else if (result === "OOO") {
                    const o = 0;
                    return o;
                }
                array_letters = "";
            }
        }
    }

    for (let i = 0; i < array_of_strings.length; i++) {
        const part_array_of_strings = array_of_strings[i];
        number_string_diagonal--;
        array_letters = array_letters + part_array_of_strings[i];
        result = array_letters;

        if (array_letters.length == part_array_of_strings.length) {

            if (result === "XXX") {
                const x = "X";
                return x;
            } else if (result === "OOO") {
                const o = 0;
                return o;
            }
            array_letters = "";
        }

        array_letters_right_left = array_letters_right_left + part_array_of_strings[number_string_diagonal];
        result = array_letters_right_left;

        if (array_letters_right_left.length == part_array_of_strings.length) {
            if (result === "XXX") {
                const x = "X";
                return x;
            } else if (result === "OOO") {
                const o = 0;
                return o;
            }
            array_letters_right_left = "";
        }
    }
}