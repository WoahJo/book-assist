let bookshelf = [];
const ftitle = document.getElementById('title'); 
const fauthor = document.getElementById('author');
const fpages = document.getElementById('pages');
const fread = document.getElementById('read');
const fsubmit = document.getElementById('submit-book');
const form = document.getElementById('book-form');
const addBook = document.querySelector('.add');
const fcancel = document.getElementById('close-book');
const cardField = document.querySelector('.card-field');

function Book(title, author, pages, read) {
    //TODO create a constructor that takes the input from the popup and creates an object
    this.title = title, 
    this.author = author,
    this.pages = pages,
    this.read = read
}

function toBookshelf() {
    //TODO create a function that sends the created object to the 
    bookshelf.unshift(new Book(ftitle.value, fauthor.value, fpages.value, fread.checked));

    const cardDiv = document.createElement('div');
    cardDiv.className = "card";

    const btitleH1 = document.createElement('h1');
    btitleH1.className = "btitle";
    btitleH1.textContent = ftitle.value;

    const bauthorH2 = document.createElement('h2');
    bauthorH2.className = "bauthor"; 
    bauthorH2.textContent = fauthor.value;

    const bpagesP = document.createElement('p');
    bpagesP.className = "bpages";
    bpagesP.textContent = `${fpages.value} page(s)`;

    const actionDiv = document.createElement('div');
    actionDiv.className = "action-buttons";
    
    const readButton = document.createElement('button');
    readButton.className = "bread";
    readButton.textContent = "Read";

    const removeButton = document.createElement('button');
    removeButton.className = "remove";
    removeButton.textContent = "Remove";

    cardField.appendChild(cardDiv);
    cardDiv.appendChild(btitleH1);
    cardDiv.appendChild(bauthorH2);
    cardDiv.appendChild(bpagesP);
    cardDiv.appendChild(actionDiv);
    actionDiv.appendChild(readButton);
    actionDiv.appendChild(removeButton);
}

addBook.addEventListener("click", function(e){
    form.style.display = "block";
});

fsubmit.addEventListener("click", function(e){
    if(!fpages.value || fpages.value < 0){
        alert('Positive number please!');
    }
    if(!ftitle.value || !fauthor.value){
        alert("Please enter a title and an author.");
    }
    else{toBookshelf(); form.reset();}
});

fcancel.addEventListener("click", function(e){
    form.style.display = "none";
})