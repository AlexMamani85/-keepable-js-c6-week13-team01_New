// primer objetivo es consumir la data de trash que existe en mi localStorage

const trashArrLocal = JSON.parse(localStorage.getItem("trash")); // [{},{}]
const containerTrash = document.querySelector(".containerTrash");

trashArrLocal.map((trashElement) => {
  const noteCard = document.createElement("div");
  const titleCard = document.createElement("h5"); // <h5></h5>
  const bodyCard = document.createElement("p");
  const deleteButton = document.createElement("input");
  // el setAttribute es para agregar atributos a nuestros elementos
  noteCard.setAttribute("id", trashElement.id); // <div id="25642154624"></div>
  deleteButton.type = "button"; // <input type="button" ></input>
  deleteButton.value = "Delete"; // <input type="button" value="Delete" ></input>
  // una destructuring de valores
  const { title, body } = trashElement;
  noteCard.classList.add("cardNote");

  titleCard.textContent = `${title}`; // <h5></h5>
  bodyCard.textContent = `${body}`;
  // notecard es un div y le estamos agregando el h5 y el p
  noteCard.append(titleCard, bodyCard, deleteButton);

  containerTrash.append(noteCard);
  const { id } = trashElement; // 6136714

  deleteButton.addEventListener("click", () => {
    console.log("jiji");
    // initialState = initialState.filter((n) => n.id !== id); // 6136714)); // []
    // localStorage.setItem("notes", JSON.stringify(initialState));
    // trashArr.push(note);
    // localStorage.setItem("trash", JSON.stringify(trashArr));
    // noteCard.remove();
    // location.reload();
  });
});
