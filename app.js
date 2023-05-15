/* eslint-disable prefer-const */
// eslint-disable-next-line no-unused-vars

let myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype.toggleStatus = () => {
  this.status = !this.status;
};
let btnText;
function render() {
  let libraryElement = document.querySelector("#library");
  libraryElement.innerHTML = " ";
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let btnClass;
    if (book.status === "Completed") {
      btnText = "Read";
      btnClass = "read";
    } else {
      btnText = "Not Read";
      btnClass = "notread";
    }
    let bookCard = document.createElement("div");
    bookCard.setAttribute("class", "card");
    bookCard.innerHTML = `<div class="bookInfo">
    <h2 class="title">${book.title}</h2>
    <h5 class="author">by ${book.author}</h5>
    <p class="pages">${book.pages} pages</p>
  </div>
  <div class="cardButtons">
    <button class="${btnClass}" id="statusBtn" onclick="toggleStatus(${i})"><p id="statusBtnText">${btnText}</p></button>
    <button class="delete" onclick="removeBook(${i})"><p id="deleteBtnText">Delete</p></button>
  </div>
  <div class="statusDiv">
    <p id="bookStatus">${book.status}</p>
  </div>`;
    libraryElement.appendChild(bookCard);
  }
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  render();
}

function toggleStatus(index) {
  myLibrary[index].toggleStatus();
  let btnText = document.querySelector("#statusBtnText");
  let btn = document.querySelector("#statusBtn");
  let bookStatus = document.querySelector("#bookStatus");
  if (btnText.innerHTML === "Read") {
    btnText.innerHTML = "Not Read";
    bookStatus.innerHTML = "Not Finished";
    btn.classList.remove("read");
    btn.classList.add("notread");
  } else {
    btnText.innerHTML = "Read";
    bookStatus.innerHTML = "Completed";
    btn.classList.add("read");
    btn.classList.remove("notread");
  }
  console.log(btnText.innerHTML);
}

function rotateButton() {
  let button = document.querySelector("#showAddBookForm");
  button.classList.toggle("rotateClockwise");
}

function AddBookToLibrary() {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let status = document.querySelector(".readStatus").checked;
  if (status === true) {
    status = "Completed";
  } else {
    status = "Not Finished";
  }
  let newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
  console.log(myLibrary);
  render();
  let form = document.querySelector("#bookFormSection");
  form.classList.toggle("hidden");
  rotateButton();
}

const addBookBtn = document.querySelector("#addBookBtn");
addBookBtn.addEventListener("click", () => {
  // eslint-disable-next-line no-restricted-globals
  event.preventDefault();
  AddBookToLibrary();
});

const showAddBookForm = document.querySelector("#showAddBookForm");
showAddBookForm.addEventListener("click", () => {
  const formSection = document.querySelector("#bookFormSection");
  formSection.classList.toggle("hidden");
  rotateButton();
});
