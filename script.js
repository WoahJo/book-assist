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
    
    const newReadButton = document.createElement('button');
    const cardDiv = document.createElement('div');
    const btitleH1 = document.createElement('h1');
    const bauthorH2 = document.createElement('h2');
    const bpagesP = document.createElement('p');
    const actionDiv = document.createElement('div');
    const newRemoveButton = document.createElement('button');
    
    cardDiv.className = "card";
    
    btitleH1.className = "btitle";
    btitleH1.textContent = ftitle.value;

    bauthorH2.className = "bauthor"; 
    bauthorH2.textContent = fauthor.value;

    bpagesP.className = "bpages";
    bpagesP.textContent = `${fpages.value} page(s)`;

    actionDiv.className = "action-buttons";
    
    (fread.checked) ? newReadButton.className = "bread hasRead" : newReadButton.className = "bread";
    newReadButton.textContent = "Read";

    newRemoveButton.className = "remove";
    newRemoveButton.textContent = "Remove";

    cardField.appendChild(cardDiv);
    cardDiv.appendChild(btitleH1);
    cardDiv.appendChild(bauthorH2);
    cardDiv.appendChild(bpagesP);
    cardDiv.appendChild(actionDiv);
    actionDiv.appendChild(newReadButton);
    actionDiv.appendChild(newRemoveButton);
}

addBook.addEventListener("click", function(e){
    form.reset();
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
});

const readButton = document.querySelector('.bread');
readButton.addEventListener("click", () => readButton.classList.toggle("hasRead"));