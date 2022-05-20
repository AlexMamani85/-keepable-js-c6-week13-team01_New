// estamos seleciconando elementos que existen en el dom
const form = document.querySelector("form");
const title = document.querySelector("#title-input"); // <input>
const body = document.querySelector("#body");
// este containerNotes que es un div vacio, estamos agregando cada NoteGrid
const containerNotes = document.querySelector(".containerNotes");
const actionsButtons = document.querySelector(".actionsButtons");
const colorFormInput = document.querySelector(".actionsButtons select");
// variables
let initialState = []; //[{},{},{}] // aquí guardaremos objectos de los notes [{},{}]
let trashArr = []; // aquí guardaremos temporalmente los notes eliminados [{}, {}]
let noteNumber = 0;
const noteStorage = JSON.parse(localStorage.getItem("notes"));

const colorInput = colorElement(
  [
    {
      id: "white",
      colorValue: "#FFFF",
    },
    { id: "red", colorValue: "#F28B82" },
    {
      id: "yellow",
      colorValue: "#FBBC04",
    },
    {
      id: "yellow2",
      colorValue: "#FBBC04",
    },
    { id: "green", colorValue: "#CCFF90" },
    {
      id: "skyblue",
      colorValue: "#A7FFEB",
    },
    { id: "skyblue2", colorValue: "#CBF0F8" },
    {
      id: "purple",
      colorValue: "#AECBFA",
    },
    {
      id: "purple2",
      colorValue: "#D7AEFB",
    },
    {
      id: "pink",
      colorValue: "#FDCFE8",
    },
  ],
  `element-${noteNumber}`
);

// console.log(colorInput);
actionsButtons.classList.add("debug");

actionsButtons.append(colorInput);
// console.log(actionsButtons);

colorFormInput.addEventListener("click", (e) => {
  const colorContainer = document.querySelector(`#element-${noteNumber}`);
  console.log(e.target.value);
  form.style.backgroundColor = e.target.value;
  // colorContainer.classList.toggle("block");
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const newNote = {
    id: `note-${String(Date.now()).slice(-5, -1)}`, //1617
    title: "",
    body: "",
    color: "", // "" === falsy
  };

  // console.log(newNote.title);
  // const title = newNote.title;
  // const body = newNote.body
  // const {title, body} = note
  newNote.title = title.value; // article 1
  newNote.body = body.value;
  newNote.color = colorFormInput.value;
  // console.log({ newNote });

  if (newNote.color) {
    form.style.backgroundColor = `${newNote.color}`;
  }

  /* 
    newNote = {
      id: 25642154624,
      title: "title 1"
      body: "yahdjajd"
    }
  */

  // guardamos información, []
  initialState.push(newNote);
  localStorage.setItem("notes", JSON.stringify(initialState));
  createElement(newNote); // crea la estructura html de ese newNote
  // setear los valores del formulario
  title.value = "";
  body.value = "";
  form.style.backgroundColor = "#fff";

  console.log({ noteStorage });
});

// color = [], |
function colorElement(colors, idNoteCard, idCard) {
  // console.log({ idCard });
  const colorContainer = document.createElement("div");
  colorContainer.setAttribute("id", idNoteCard);
  colorContainer.classList.add("colorContainer");
  colors.map((colorItem) => {
    const colorRadius = document.createElement("div");
    colorRadius.classList.add("radiusColor");
    colorRadius.setAttribute("id", colorItem.id);
    colorRadius.style.backgroundColor = colorItem.colorValue;
    // colorRadius.classList.add("hidden");
    colorContainer.append(colorRadius);
    colorRadius.addEventListener("click", () => {
      // console.log(colorItem.colorValue);
      const noteCard = document.querySelector(`#${idCard}`);
      noteCard.style.backgroundColor = colorItem.colorValue;
      // console.log(colorItem.colorValue);
    });
  });

  return colorContainer;
}

/* 
 newNote = {
      id: 25642154624,
      title: "title 1"
      body: "yahdjajd",
      color: #e1e1e1
    }
*/
function createElement(note = {}) {
  console.log({ note });
  const uniqueNumberColor = noteNumber + 1;
  noteNumber += 1;

  // aquí estamos creando elementos
  const noteCard = document.createElement("div");
  const titleCard = document.createElement("h5"); // <h5></h5>
  const bodyCard = document.createElement("p");
  const deleteButton = document.createElement("input");
  const colorButton = document.createElement("input");
  noteCard.style.backgroundColor = `${note.color}`;

  // el setAttribute es para agregar atributos a nuestros elementos
  noteCard.setAttribute("id", note.id); // <div id="25642154624"></div>
  deleteButton.type = "button"; // <input type="button" ></input>
  deleteButton.value = "Delete"; // <input type="button" value="Delete" ></input>
  colorButton.value = "Color";
  colorButton.type = "button"; // <input type="checkbox"
  // una destructuring de valores
  const { title, body } = note;
  noteCard.classList.add("cardNote");

  titleCard.textContent = `${title}`; // <h5></h5>
  bodyCard.textContent = `${body}`;
  const colorContent = colorElement(
    [
      {
        id: "white",
        colorValue: "#FFFF",
      },
      { id: "red", colorValue: "#F28B82" },
      {
        id: "yellow",
        colorValue: "#FBBC04",
      },
      {
        id: "yellow2",
        colorValue: "#FBBC04",
      },
      { id: "green", colorValue: "#CCFF90" },
      {
        id: "skyblue",
        colorValue: "#A7FFEB",
      },
      { id: "skyblue2", colorValue: "#CBF0F8" },
      {
        id: "purple",
        colorValue: "#AECBFA",
      },
      {
        id: "purple2",
        colorValue: "#D7AEFB",
      },
      {
        id: "pink",
        colorValue: "#FDCFE8",
      },
    ],
    `element-${noteNumber}`,
    note.id
  );
  // console.log(colorContent);

  // notecard es un div y le estamos agregando el h5 y el p
  noteCard.append(titleCard, bodyCard, colorButton, deleteButton, colorContent);

  const { id } = note; // 6136714
  containerNotes.classList.add("debug");
  containerNotes.append(noteCard);

  deleteButton.addEventListener("click", () => {
    initialState = initialState.filter((n) => n.id !== id); // 6136714)); // []
    localStorage.setItem("notes", JSON.stringify(initialState));
    trashArr.push(note);
    localStorage.setItem("trash", JSON.stringify(trashArr));
    noteCard.remove();
    // location.reload();
  });

  colorButton.addEventListener("click", () => {
    const colorContainer = document.querySelector(
      `#element-${uniqueNumberColor}`
    );
    console.log(colorContainer);
    colorContainer.classList.toggle("block");
  });
}

console.log({ noteStorage });
noteStorage.map((noteItem) => {
  const getNoteItem = createElement(noteItem);
  console.log({ getNoteItem });
  // console.log(createElement(noteItem));

  // const newNoteItem = createElement(noteItem);
  // containerNotes.append({ newNoteItem });
  // console.log(newNoteItem);
});
