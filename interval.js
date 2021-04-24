function intervalContruction(interval, note, direction) {//function DONE
    //длина без дублирования 19
    const listNotesSemitons = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'E#', 'Fb', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B',
        'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'E#', 'Fb', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'];
    //длина без дублирования 7
    const listNotesDegrees = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const listIntervalsValues = [[1, 2], [2, 2], [3, 3], [4, 3], [5, 4], [7, 5], [8, 6], [9, 6], [10, 7], [11, 7], [12, 8]];
    const listIntervalsName = ['m2', 'M2', 'm3', 'M3', 'P4', 'P5', 'm6', 'M6', 'm7', 'M7', 'P8'];
    const listSemitons = ['C', 2, 'D', 2, 'E', 1, 'F', 2, 'G', 2, 'A', 2, 'B', 1, 'C', 2, 'D', 2, 'E', 1, 'F', 2, 'G', 2, 'A', 2, 'B', 1, 'C'];

    //находим интервал между degrees и semitons
    let degreesInterval = listIntervalsValues[listIntervalsName.indexOf(interval)][1] - 1;
    let semitonInterval = listIntervalsValues[listIntervalsName.indexOf(interval)][0];

    //находим конечную ноту в зависимости от direction
    let finalNote, indexFinalNoteInlistNotesDegrees;

    if (direction === 'asc') {
        indexFinalNoteInlistNotesDegrees = listNotesDegrees.indexOf(note.split('')[0]) + degreesInterval;
        finalNote = listNotesDegrees[indexFinalNoteInlistNotesDegrees];
    } else {
        indexFinalNoteInlistNotesDegrees = listNotesDegrees.indexOf(note.split('')[0]) - degreesInterval < 0 ?
            listNotesDegrees.indexOf(note.split('')[0]) - degreesInterval + 7 ://если индекс меньше 0, то сдвигаем на все октавы
            listNotesDegrees.indexOf(note.split('')[0]) - degreesInterval;

        finalNote = listNotesDegrees[indexFinalNoteInlistNotesDegrees];
    }

    //находим semitons в зависимости от direction
    let IndexNoteInListSemitons = listSemitons.indexOf(note.split('')[0]);
    let finalNoteInListSemitons = listSemitons.indexOf(finalNote);
    let intervalSubmassivSemitons;
    let endOfNote;

    //учитываем окончание note для semitons
    switch (note.substr(1)) {
        case 'bb': endOfNote = 2; break;
        case 'b': endOfNote = 1; break;
        case '': endOfNote = 0; break;
        case '#': endOfNote = -1; break;
        case '##': endOfNote = -2; break;
    }

    if (direction === 'asc') {
        //для функции slice, важен порядок агрументов, интервал не поменяется
        if (IndexNoteInListSemitons > finalNoteInListSemitons) {
            i = IndexNoteInListSemitons;
            IndexNoteInListSemitons = finalNoteInListSemitons;
            finalNoteInListSemitons = i;
        }

        let submassivListSemitons = listSemitons.slice(IndexNoteInListSemitons, finalNoteInListSemitons);

        //сумма всех цифр в массиве
        intervalSubmassivSemitons = submassivListSemitons.filter(el => typeof el === 'number').reduce((a, b) => a + b);

        //если разница между semitons из listIntervalsValues и intervalSubmassivSemitons с поправкой на endOfNote
        //слишком большая (больше 2), то сдвигаем ноту и пересчитываем ещё раз 
        if (listIntervalsValues[listIntervalsName.indexOf(interval)][0] - intervalSubmassivSemitons - endOfNote > 2) {
            IndexNoteInListSemitons += 14;

            if (IndexNoteInListSemitons > finalNoteInListSemitons) {
                i = IndexNoteInListSemitons;
                IndexNoteInListSemitons = finalNoteInListSemitons;
                finalNoteInListSemitons = i;
            }

            submassivListSemitons = listSemitons.slice(IndexNoteInListSemitons, finalNoteInListSemitons);
            intervalSubmassivSemitons = submassivListSemitons.filter(el => typeof el === 'number').reduce((a, b) => a + b);
        }

        switch (listIntervalsValues[listIntervalsName.indexOf(interval)][0] - intervalSubmassivSemitons - endOfNote) {
            case -2: return finalNote + 'bb'; break;
            case -1: return finalNote + 'b'; break;
            case 0: return finalNote; break;
            case 1: return finalNote + '#'; break;
            case 2: return finalNote + '##'; break;
            default: return listIntervalsValues[listIntervalsName.indexOf(interval)][0] - intervalSubmassivSemitons - endOfNote; break;
        }

    } else {
        if (IndexNoteInListSemitons < finalNoteInListSemitons) {
            IndexNoteInListSemitons += 14;
        }

        let submassivSemitons = listSemitons.slice(finalNoteInListSemitons, IndexNoteInListSemitons);
        //сумма всех цифр в массиве
        intervalSubmassivSemitons = submassivSemitons.filter(el => typeof el === 'number').reduce((a, b) => a + b);

        switch (intervalSubmassivSemitons - listIntervalsValues[listIntervalsName.indexOf(interval)][0] - endOfNote) {
            case -2: return finalNote + 'bb'; break;
            case -1: return finalNote + 'b'; break;
            case 0: return finalNote; break;
            case 1: return finalNote + '#'; break;
            case 2: return finalNote + '##'; break;
        }
    }
}
//Cbb Cb C C# C## Dbb Db D D# D## Ebb Eb E E# E## Fbb Fb F F# F## Gbb Gb G G# G## Abb Ab A A# A## Bbb Bb B B# B##
// m2 - Minor Second - 1 semitone, 2 degrees
// M2 - Major Second - 2 semitones, 2 degrees
// m3 - Minor Third - 3 semitones, 3 degrees
// M3 - Major Third - 4 semitones, 3 degrees
// P4 - Perfect Fourth - 5 semitones, 4 degrees
// P5 - Perfect Fifth - 7 semitones, 5 degrees
// m6 - Minor Sixth - 8 semitones, 6 degrees
// M6 - Major Sixth - 9 semitones, 6 degrees
// m7 - Minor Seventh - 10 semitones, 7 degrees
// M7 - Major Seventh - 11 semitones, 7 degrees
// P8 - Perfect Octave - 12 semitones, 8 degrees

//\\\\\\\\\\\\\\\\\\\\\\\\\\-----EXAMPLE-----\\\\\\\\\\\\\\\
//   Let's find m2 (2nd degree, 1 semitone) from Fb: To find a second degree is easy: (F G) - G is the second note from F.
// Now count semitones: from Fb to G is 3 semitones. This is way too much, we need just one. SO we have to lower G by 2 semitones. To do so, add two flat 'b' signs to G note: Gbb.
// At m2 distance from Fb is the note Gbb.
//\\\\\\\\\\\\\\\\\\\\\\\\\\

//\\\\\\\\\\\\\\\\\
// console.log(
//     intervalContruction('M2', 'C', 'asc') === 'D',//D 
//     intervalContruction('P5', 'B', 'asc') === 'F#',//F#
//     intervalContruction('m2', 'Bb', 'dsc') === 'A',//A
//     intervalContruction('m2', 'D#', 'asc') === 'E',//E
//     intervalContruction('P4', 'G#', 'dsc') === 'D#',//D#
//     intervalContruction('m3', 'B', 'dsc') === 'G#',//G#
//     intervalContruction('m2', 'Fb', 'asc') === 'Gbb',//Gbb
//     intervalContruction('M2', 'E#', 'dsc') === 'D#',//D#
//     intervalContruction('P4', 'E', 'dsc') === 'B',//B
//     intervalContruction('M7', 'G', 'asc') === 'F#',//F#
//     intervalContruction('M3', 'Cb', 'dsc') === 'Abb',//Abb
// )
//\\\\\\\\\\\\\\\\\\

//\\\\\\\\\\\\\\\\\\\\
//1. находим ноту 1 и 2 из списка listNotesDegrees и записываем их индексы в indexFirstInListNotesDegrees и indexSecondInListNotesDegrees,
//если мы просматриваем ноты вперед direction='asc', то индекс первой ноты будет больше, чем второй,
//если нет, то сдвигаем массив на его длинну, тк массив продублирован для этой цели
//Итог: получаем интервал между нотами = degreesInterval
// пример:
//есть входной массив ['B', 'F#', 'asc'], есть ответ P5
//индексы нот B и F равны 1 и 5, находим разницу между ними degreesInterval и прибавляем 1 (тк счёт до второй ноты начинается с 1)
//из массива listIntervalsValues находим подмассив, которые имеет второй элемент равные 5 (для нашего примера, этот подмассив =  [7, 5])
//которому соответствует P5(для первого элемента из массива listIntervalsName соответствует первый элемент массива listIntervalsValues,
//смотреть подсказу: Подсказка соотношений интервалов и их значений)
//2. находим окончания нот, чтобы посчитать поправку. Виды окончание 'bb', 'b', '', '#' , '##'
//окончания нужны чтобы посчитать поправку(что это такое, дальше будет понятно в примере)
//есть входной массив ['B', 'F#', 'asc'], есть ответ P5, у первой ноты окончание равно '',
//а второй имеет окончание '#', это значит что нота  'F' отличаются от на 'F#' на 1 semiton назад(посмотеть массив listNotesSemitons)
//Пример 'C', 'C#', 'C##/Dbb', 'Db', 'D', 'D#', 'D##' 
//поправка между 'C' и 'Db' равна 1 semitons вперед, а искомы элемент из массива listIntervalsValues равен [1, 2] = m2
//поправка между ['C', 'D']	равна 2 semitons M2
//\\\\\\\\\\\\\\\\\\\

//\\\\\\\\\\\\\\\\
//Подсказка соотношений интервалов и их значений
//['m2',  'M2',   'm3',   'M3',   'P4',   'P5',   'm6',   'M6',   'm7',    'M7',    'P8'];
//[[1, 2], [2, 2], [3, 3], [4, 3], [5, 4], [7, 5], [8, 6], [9, 6], [10, 7], [11, 7], [12, 8]]
//\\\\\\\\\\\\\\\\

function intervalIdentification(first, second, direction = 'asc') {//function dont pass all tests 
    const listNotesSemitons = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'E#', 'Fb', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B',
        'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'E#', 'Fb', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'];
    //listNotesDegrees.length = 7
    const listNotesDegrees = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const listIntervalsValues = [[1, 2], [2, 2], [3, 3], [4, 3], [5, 4], [7, 5], [8, 6], [9, 6], [10, 7], [11, 7], [12, 8]];
    const listIntervalsName = ['m2', 'M2', 'm3', 'M3', 'P4', 'P5', 'm6', 'M6', 'm7', 'M7', 'P8'];
    const listSemitons = ['C', 2, 'D', 2, 'E', 1, 'F', 2, 'G', 2, 'A', 2, 'B', 1, 'C', 2, 'D', 2, 'E', 1, 'F', 2, 'G', 2, 'A', 2, 'B', 1, 'C'];
    let degrees;

    if (direction == 'asc') {
        degrees = listNotesDegrees
            .slice(listNotesDegrees.indexOf(first.slice('')[0]), listNotesDegrees.indexOf(second.slice('')[0]))
            .length + 1;
    } else {
        //direction == 'dsc'
        degrees = listNotesDegrees
            .slice(listNotesDegrees.indexOf(second.slice('')[0]), listNotesDegrees.indexOf(first.slice('')[0]))
            .length + 1;
    }

    let semiton,
        indexFirstInlistSemitons = listSemitons.indexOf(first.split('')[0]),
        indexSecondInlistSemitons = listSemitons.indexOf(second.split('')[0]);

    if (direction == 'asc') {

        if (indexSecondInlistSemitons < indexFirstInlistSemitons) {
            indexSecondInlistSemitons += 19;
        }

        semiton = listSemitons
            .slice(indexFirstInlistSemitons, indexSecondInlistSemitons)
            .filter(el => { return typeof el === 'number' })
            .reduce((a, b) => { return a + b })
            ;
    } else {
        //direction == 'dsc'
        if (indexSecondInlistSemitons < indexFirstInlistSemitons) {
            indexSecondInlistSemitons += 19;
        }

        console.log(indexSecondInlistSemitons, indexFirstInlistSemitons)
        semiton = listSemitons
            .slice(indexSecondInlistSemitons, indexFirstInlistSemitons)
            // .filter(el => {return typeof el === 'number'})
            // .reduce((a, b) => {return a + b})
            ;
    }

    let countEndOfNotes, endOfNoteFirst, endOfNoteSecond;

    switch (first.substr(1)) {
        case 'bb': endOfNoteFirst = 2; break;
        case 'b': endOfNoteFirst = 1; break;
        case '': endOfNoteFirst = 0; break;
        case '#': endOfNoteFirst = -1; break;
        case '##': endOfNoteFirst = -2; break;
    }

    switch (second.substr(1)) {
        case 'bb': endOfNoteSecond = 2; break;
        case 'b': endOfNoteSecond = 1; break;
        case '': endOfNoteSecond = 0; break;
        case '#': endOfNoteSecond = -1; break;
        case '##': endOfNoteSecond = -2; break;
    }

    if (direction == 'dsc') {
        endOfNoteFirst = -endOfNoteFirst;
    } else {
        endOfNoteSecond = -endOfNoteSecond;
    }

    semiton = semiton + endOfNoteFirst + endOfNoteSecond;

    let result;

    listIntervalsValues.forEach((el, index) => {
        if (el[0] == semiton && el[1] == degrees) {
            result = listIntervalsName[index];
        }
    });
    // console.log(semiton,degrees)
    return result;
}

// ['C', 'D']	M2
// ['B', 'F#', 'asc']	P5
// ['Fb', 'Gbb']	m2
// ['G', 'F#', 'asc']	M7
// ['Bb', 'A', 'dsc']	m2
// ['Cb', 'Abb', 'dsc']	M3
// ['G#', 'D#', 'dsc']	P4
// ['E', 'B', 'dsc']	P4
// ['E#', 'D#', 'dsc']	M2
// ['B', 'G#', 'dsc']	m3

//['m2',    'M2',   'm3',   'M3',  ' P4',   'P5',   'm6',   'M6',   'm7',    'M7',    'P8'];
//[[1, 2], [2, 2], [3, 3], [4, 3], [5, 4], [7, 5], [8, 6], [9, 6], [10, 7], [11, 7], [12, 8]]

// console.log(intervalIdentification('B', 'F#', 'asc'))//	P5 5
// console.log(intervalIdentification('Bb', 'A', 'dsc'))//m2 2
// console.log(intervalIdentification('G', 'F#', 'asc'))//M7 7
// console.log(intervalIdentification('Cb', 'Abb', 'dsc'))//M3 3
// console.log(intervalIdentification('G#', 'D#', 'dsc'))//P4 4
// console.log(intervalIdentification('E', 'B', 'dsc'))//P4 4
// console.log(intervalIdentification('E#', 'D#', 'dsc'))//M2 2
// console.log(intervalIdentification('Fb', 'Gbb'))//m2 2
// console.log(intervalIdentification('B', 'F#', 'asc'))//	P5 5