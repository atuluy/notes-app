const fs = require("fs");
const chalk = require("chalk");

// addNote

const addNote = (title, body) => {
  const notes = loadNotes();

  // const duplicateNotes = notes.filter(note => note.title === title);
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });

    saveNotes(notes);
    console.log(chalk.green.inverse("Note added"));
  } else {
    console.log(chalk.red.inverse("Note title already exists"));
  }
};

// removeNote

const removeNote = title => {
  const notes = loadNotes();

  const keptNotes = notes.filter(note => note.title !== title);

  if (keptNotes.length === notes.length) {
    console.log(chalk.bgRed("No note found!"));
  } else {
    console.log(chalk.bgGreen("Note removed!"));
    saveNotes(keptNotes);
  }
};

// listNotes

const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.blue.inverse("Your notes"));

  notes.forEach(note => console.log(note.title));
};

// readNote

const readNote = title => {
  const notes = loadNotes();

  const noteToRead = notes.find(note => note.title === title);

  if (!noteToRead) {
    console.log(chalk.red.inverse("No note found."));
  } else {
    console.log(chalk.blue.inverse(noteToRead.title));
    console.log(noteToRead.body);
  }
};

// saveNotes

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

// loadNotes

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
