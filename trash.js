// primer objetivo es consumir la data de trash que existe en mi localStorage

const trashArrLocal = JSON.parse(localStorage.getItem("trash")); // [{},{}]
const containerTrash = document.querySelector(".containerTrash");

trashArrLocal.map((trashElement) => {
  const noteCard = document.createElement("div");
  const titleCard = document.createElement("h5"); // <h5></h5>
  const bodyCard = document.createElement("p");
  const actionsButtons = document.createElement("div");
  const deleteButton = document.createElement("input");
  const recoveryNote = document.createElement("input");
  recoveryNote.type = "button"; // <input type=""
  noteCard.style.backgroundColor = trashElement.color;

  // el setAttribute es para agregar atributos a nuestros elementos
  noteCard.setAttribute("id", trashElement.id); // <div id="25642154624"></div>
  deleteButton.type = "button"; // <input type="button" ></input>
  deleteButton.value = "Delete"; // <input type="button" value="Delete" ></input>
  recoveryNote.value = "recovery";

  // una destructuring de valores
  const { title, body } = trashElement;
  noteCard.classList.add("cardNote");

  titleCard.textContent = `${title}`; // <h5></h5>
  bodyCard.textContent = `${body}`;
  // notecard es un div y le estamos agregando el h5 y el p

  actionsButtons.append(deleteButton, recoveryNote);
  noteCard.append(titleCard, bodyCard, actionsButtons);

  containerTrash.append(noteCard);
  const { id } = trashElement; // 6136714

  deleteButton.addEventListener("click", () => {
    const deleteNote = trashArrLocal.filter((note) => note.id !== id);
    localStorage.setItem("trash", JSON.stringify(deleteNote));
    noteCard.remove();

    // initialState = initialState.filter((n) => n.id !== id); // 6136714)); // []
    // trashArr.push(note);
    // localStorage.setItem("trash", JSON.stringify(trashArr));
    // location.reload();
  });

  recoveryNote.addEventListener("click", () => {
    const recoverLocal = trashArrLocal.filter((note) => note.id === id); // [{}]
    // tengo que quitar el objeto del trash local
    const deleteNote = trashArrLocal.filter((note) => note.id !== id);
    // console.log(deleteNote);
    const notesLocal = JSON.parse(localStorage.getItem("notes"));
    notesLocal.push(recoverLocal[0]);
    localStorage.setItem("notes", JSON.stringify(notesLocal));
    localStorage.setItem("trash", JSON.stringify(deleteNote));
    noteCard.remove();
  });
});
