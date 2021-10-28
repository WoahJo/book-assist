let bookshelf = [];
const ftitle = document.getElementById('title'); 
const fauthor = document.getElementById('author');
const fpages = document.getElementById('pages');
const fread = document.getElementById('read');
const fsubmit = document.getElementById('submit-book');
const form = document.getElementById('book-form');
const addBook = document.querySelector('.add');
const fcancel = document.getElementById('close-book');

function Book(title, author, pages, read) {
    //TODO create a constructor that takes the input from the popup and creates an object
    this.title = title; 
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function toBookshelf() {
    //TODO create a function that sends the created object to the 
    bookshelf.push(new Book(ftitle.value, fauthor.value, fpages.value, fread.checked));

}

addBook.addEventListener("click", function(e){
    form.style.display = "block";
});

fsubmit.addEventListener("click", function(e){
    if(!fpages.value){
        console.log('number please!');
    }
    else{toBookshelf(); form.reset();}
});

fcancel.addEventListener("click", function(e){
    form.style.display = "none";
})