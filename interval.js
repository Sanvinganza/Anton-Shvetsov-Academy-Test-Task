function intervalContruction(arr) {//['P4', 'G#', 'dsc']	D#
  let [interval, note, direction] = arr;
  const semitones = ['C', 1, 'C#', 'Db', 1, 'D', 1, 'D#', 'Eb', 1, 'E', 'E#', 1, 'Fb', 'F', 1, 'F#', 'Gb', 1, 'G', 1, 'G#', 'Ab', 1, 'A', 1, 'A#', 'Bb', 1, 'B', 1];
  const listNotes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const listValueIntervals = [[1, 2], [2, 2], [3, 3], [4, 3], [5, 4], [7, 5], [8, 6], [9, 6], [10, 7], [11, 7], [12, 8]];
  const listNameIntervals = ['m2', 'M2', 'm3', 'M3', 'P4', 'P5', 'm6', 'M6', 'm7', 'M7', 'P8'];

  let intervalDegrees = listValueIntervals[listNameIntervals.indexOf(interval)][1];
  let intervalSemitones = listValueIntervals[listNameIntervals.indexOf(interval)][0];
  let answer;

  if (direction === 'asc') {
    if (intervalDegrees + listNotes.indexOf(note.split('')[0]) - 1 > listNotes.length) {
      answer = listNotes[intervalDegrees + listNotes.indexOf(note.split('')[0]) - 1 - listNotes.length]
    } else {
      answer = listNotes[intervalDegrees + listNotes.indexOf(note.split('')[0]) - 1]
    }
  } else {
    if (listNotes.indexOf(note.split('')[0]) - intervalDegrees + 1 < 0) {
      answer = listNotes[intervalDegrees + listNotes.indexOf(note.split('')[0]) - 1 + listNotes.length]
    } else {
      answer = listNotes[listNotes.indexOf(note.split('')[0]) - intervalDegrees + 1];
    }
  }

  let element = note;
  let index = semitones.indexOf(note);
  let listSemitones = [];

  if (direction === 'asc') {
    while (element !== answer) {
      if (index >= semitones.length) index = 0;

      listSemitones.push(semitones[index]);
      element = semitones[index];
      index++;
    }
  } else {
    while (element !== answer) {
      if (index <= 0) index = semitones.length;

      listSemitones.push(semitones[index]);
      element = semitones[index];
      index--;
    }
  }

  let semitons_Interval = listSemitones
    .filter(el => { if (typeof el === 'number') return el; })
    .reduce((a, b) => { return a + b; });

  switch (intervalSemitones - semitons_Interval) {
    case -2: return answer + 'bb'; break;
    case -1: return answer + 'b'; break;
    case 0: return answer; break;
    case 1: return answer + '#'; break;
    case 2: return answer + '##'; break;
  }
}

function intervalIdentification(arr) {
  let [firstNote, secondNote, direction = 'asc'] = arr;
  const semitones = ['C', 1, 'C#', 'Db', 1, 'D', 1, 'D#', 'Eb', 1, 'E', 'E#', 1, 'Fb', 'F', 1, 'F#', 'Gb', 1, 'G', 1, 'G#', 'Ab', 1, 'A', 1, 'A#', 'Bb', 1, 'B', 1];
  const listNotes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const listValueIntervals = [[1, 2], [2, 2], [3, 3], [4, 3], [5, 4], [7, 5], [8, 6], [9, 6], [10, 7], [11, 7], [12, 8]];
  const listNameIntervals = ['m2', 'M2', 'm3', 'M3', 'P4', 'P5', 'm6', 'M6', 'm7', 'M7', 'P8'];
  
  if(firstNote.split('').length === 3)firstNote = firstNote.split('').slice(0, 2).join('');
  if(secondNote.split('').length === 3)secondNote = secondNote.split('').slice(0, 2).join('');
  
  let note = firstNote.split('')[0],
    intervalDegrees = 0,
    index = listNotes.indexOf(firstNote.split('')[0]);

  if (direction === 'asc') {
    while (note !== secondNote.split('')[0]) {
      intervalDegrees++;
      note = listNotes[index];
      if (index > listNotes.length - 1) index = 0;
      index++;
    }
  } else {
    while (note !== secondNote) {
      intervalDegrees++;
      note = listNotes[index];
      if (index < 0) index = listNotes.length;
      index--;
    }
  }
  
  let listIntervalSemitones = [];
  index = semitones.indexOf(firstNote);
  note = firstNote;

  if (direction === 'asc') {
    while (note !== secondNote) {
      listIntervalSemitones.push(note);
      note = semitones[index];
      if (index > semitones.length - 1) index = 0;
      index++;
    }
  } else {
    while (note !== secondNote) {
      listIntervalSemitones.push(note);
      note = semitones[index];
      if (index < 0) index = semitones.length;
      index--;
    }
  }
  
  let intervalSemitones = listIntervalSemitones
    .filter(el => { if (typeof el === 'number') return el; })
    .reduce((a, b) => { return a + b; });
  
  let indexValueIntevals = listValueIntervals
    .map((el, index) => {
      //console.log(el[1] , intervalSemitones , el[0] , intervalDegrees)
       if (el[1] === intervalSemitones && el[0] === intervalDegrees ||
           el[0] === intervalSemitones && el[1] === intervalDegrees) {
        return index;
      }
     })
    .filter(function(x) { return x !== undefined })[0]

  return listNameIntervals[indexValueIntevals];
}