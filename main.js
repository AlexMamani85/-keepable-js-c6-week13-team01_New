const form = document.querySelector("form");
const title = document.querySelector("#title-input");
const body = document.querySelector("#body");
const containerNotes = document.querySelector(".containerNotes");

let initialState = [];
let trashArr = [];

const noteStorage = JSON.parse(localStorage.getItem("notes"));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newNote = {
    id: Date.now(),
    title: "",
    body: "",
  };
  // destructuring object
  newNote.title = title.value;
  newNote.body = body.value;

  initialState.push(newNote);
  localStorage.setItem("notes", JSON.stringify(initialState));
  createElement(newNote);
});

// note = {}
function createElement(note) {
  const noteCard = document.createElement("div");
  const titleCard = document.createElement("h5"); // <h5></h5>
  const bodyCard = document.createElement("p");
  const deleteButton = document.createElement("input");
  noteCard.setAttribute("id", note.id);
  deleteButton.type = "button";
  deleteButton.value = "Delete";
  const { title, body } = note;
  noteCard.classList.add("cardNote");
  titleCard.textContent = `${title}`;
  bodyCard.textContent = `${body}`;
  noteCard.append(titleCard, bodyCard, deleteButton);
  containerNotes.append(noteCard);
  const { id } = note;

  deleteButton.addEventListener("click", () => {
    initialState = initialState.filter((n) => n.id !== id);
    localStorage.setItem("notes", JSON.stringify(initialState));
    trashArr.push(note);
    localStorage.setItem("trash", JSON.stringify(trashArr));
    noteCard.remove();
    // location.reload();
  });
}
