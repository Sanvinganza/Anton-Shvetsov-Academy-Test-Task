function intervalContruction(arr){//['P4', 'G#', 'dsc']	D#
    let [interval, note, direction] = arr;
    const semitones = ['C' ,2 ,'D' ,2 ,'E',1 ,'F' ,2 ,'G' ,2 ,'A' ,2 ,'B' ,1 ,'C'];   
    const listNotes = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const listValueIntervals = [[1 ,2], [2 ,2], [3 ,3], [4 ,3], [5 ,4], [7 ,5], [8 ,6], [9 ,6], [10 ,7], [11 ,7], [12 ,8]];
    const listNameIntervals = ['m2', 'M2', 'm3', 'M3', 'P4', 'P5', 'm6', 'M6', 'm7', 'M7', 'P8'];
    
    note = note.split('')[0];
   
    let numberInterval = listValueIntervals[listNameIntervals.indexOf(interval)];
    let resultNote = listNotes[listNotes.indexOf(note) + numberInterval[1] - 1];
    let semitonsFirstNote = semitones
              .slice(semitones.indexOf(note) - 1, semitones.indexOf(note) + numberInterval[0] + 1)
              .filter(el => { if (typeof el === 'number') return el; })
              .reduce( (a, b) => {return a + b;});
    let intervalSeminotes = numberInterval[0] - semitonsFirstNote;
    if (direction === 'dsc') intervalSeminotes = -intervalSeminotes;
  
     switch(intervalSeminotes){
        case -2 : return resultNote + 'bb';
        case -1 : return resultNote + 'b';
        case 0 : return resultNote;
        case 1 : return resultNote + '#';
        case 2 : return resultNote + '##';
      }    
}

console.log(intervalContruction(['P5', 'A#', 'asc']))//Fbb

function intervalIdentification(){

}