const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await saveNotes(notes);
  console.log(chalk.bgGreen("Note was added!"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function removeNote(id) {
  console.log("id:", id);
  const notes = await getNotes();
  const newNotes = notes.filter((item) => item.id !== id);
  await saveNotes(newNotes);
  console.log(chalk.bgYellow(`Remove note by id:, ${id}`));
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("Here is the list of notes:"));
  notes.forEach((note) => {
    console.log(chalk.blueBright(note.id), chalk.blue(note.title));
  });
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
};
