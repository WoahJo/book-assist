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
const duplicate = document.querySelector('.duplicate');
const modal = document.querySelector('.modal');
let strBookshelf;
let getBookshelf;
let parseBookshelf;

function storageAvailable(type){
    let storage;
    try {
        storage = window[type];
        let x = 'test';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e){
        return e instanceof DOMException && (e.code === 22 || e.code ===1014 || e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && (storage && storage.length !== 0);
    }
}

window.onload = function(){
    if(storageAvailable('localStorage') && localStorage.length > 0){
        alert(localStorage.length);
        getBookshelf = localStorage.getItem('strBookshelf');
        parseBookshelf = JSON.parse(getBookshelf);
        console.log(parseBookshelf);
        populateField();
    }
};

function createElements(){
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

    if(fread.checked){
        newReadButton.className = "bread";
        newReadButton.classList.add("hasRead");
        newReadButton.textContent = "Read it!";
    }
    if(!fread.checked){
        newReadButton.className = "bread";
        newReadButton.textContent = "Unread";
    }
    
    newRemoveButton.className = "remove";
    newRemoveButton.textContent = "Remove";
    
    cardField.appendChild(cardDiv);
    cardDiv.appendChild(btitleH1);
    cardDiv.appendChild(bauthorH2);
    cardDiv.appendChild(bpagesP);
    cardDiv.appendChild(actionDiv);
    actionDiv.appendChild(newReadButton);
    actionDiv.appendChild(newRemoveButton);

    newReadButton.addEventListener("click", function(e){
        newReadButton.classList.toggle("hasRead");
        if(newReadButton.textContent == "Unread"){
            newReadButton.textContent = "Read it!";
        }
        else{newReadButton.textContent = "Unread";}
    });
    
    newRemoveButton.addEventListener("click", function(e){
        let index = bookshelf.findIndex(element => {
            if(element.title === btitleH1.textContent){
                return true;
            }
        });
        cardField.removeChild(cardDiv);
        bookshelf.splice(bookshelf[index], 1);
    });

    if(storageAvailable('localStorage')){
        strBookshelf = JSON.stringify(bookshelf);
        localStorage.setItem('strBookshelf', strBookshelf);

    }
}

function populateField(){
    for(let i = 0; i < parseBookshelf.length; i++){
        bookshelf.unshift(new Book(parseBookshelf[i]. title, parseBookshelf[i].author, parseBookshelf[i].pages, parseBookshelf[i].read));
        const parseCard = document.createElement('div');
        const parseH1 = document.createElement('h1'); 
        const parseH2 = document.createElement('h2'); 
        const parseP = document.createElement('p'); 
        const parseRead = document.createElement('button');
        const parseRemove = document.createElement('button');
        

        
        parseH1.className = "btitle";
        parseCard.className = "card";
        parseH1.textContent = parseBookshelf[i].title;
        parseCard.appendChild(parseH1);
        cardField.appendChild(parseCard);

    }       
}

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
    createElements();
    // const newReadButton = document.createElement('button');
    // const cardDiv = document.createElement('div');
    // const btitleH1 = document.createElement('h1');
    // const bauthorH2 = document.createElement('h2');
    // const bpagesP = document.createElement('p');
    // const actionDiv = document.createElement('div');
    // const newRemoveButton = document.createElement('button');
    
    // cardDiv.className = "card";
    
    // btitleH1.className = "btitle";
    // btitleH1.textContent = ftitle.value;
    
    // bauthorH2.className = "bauthor"; 
    // bauthorH2.textContent = fauthor.value;
    
    // bpagesP.className = "bpages";
    // bpagesP.textContent = `${fpages.value} page(s)`;
    
    // actionDiv.className = "action-buttons";

    // if(fread.checked){
    //     newReadButton.className = "bread";
    //     newReadButton.classList.add("hasRead");
    //     newReadButton.textContent = "Read it!";
    // }
    // if(!fread.checked){
    //     newReadButton.className = "bread";
    //     newReadButton.textContent = "Unread";
    // }
    
    // newRemoveButton.className = "remove";
    // newRemoveButton.textContent = "Remove";
    
    // cardField.appendChild(cardDiv);
    // cardDiv.appendChild(btitleH1);
    // cardDiv.appendChild(bauthorH2);
    // cardDiv.appendChild(bpagesP);
    // cardDiv.appendChild(actionDiv);
    // actionDiv.appendChild(newReadButton);
    // actionDiv.appendChild(newRemoveButton);

    // newReadButton.addEventListener("click", function(e){
    //     newReadButton.classList.toggle("hasRead");
    //     if(newReadButton.textContent == "Unread"){
    //         newReadButton.textContent = "Read it!";
    //     }
    //     else{newReadButton.textContent = "Unread";}
    // });
    
    // newRemoveButton.addEventListener("click", function(e){
    //     let index = bookshelf.findIndex(element => {
    //         if(element.title === btitleH1.textContent){
    //             return true;
    //         }
    //     });
    //     cardField.removeChild(cardDiv);
    //     bookshelf.splice(bookshelf[index], 1);
    // });

    // if(storageAvailable('localStorage')){
    //     strBookshelf = JSON.stringify(bookshelf);
    //     localStorage.setItem('strBookshelf', strBookshelf);

    // }

}


function double(){
    for(let i = bookshelf.length - 1; i >= 0; i--){
        if(bookshelf[i].title == ftitle.value){
            return true;
        }
    }
}
addBook.addEventListener("click", function(e){
    form.reset();
    // form.style.display = "flex";
    modal.style.display = "block";
    ftitle.focus();
});



fsubmit.addEventListener("click", function(e){
    if(double()){
        duplicate.style.display = "block";
        ftitle.focus();
    }
    if(form.checkValidity() && fpages.value >= 0 && !double()){
        toBookshelf();
        form.reset();
        ftitle.focus();
        duplicate.style.display = "none";
    }
    else{form.reportValidity();}
});

fcancel.addEventListener("click", function(e){
    duplicate.style.display = "none";
    // form.style.display = "none";
    modal.style.display = "none";
});

window.addEventListener("click", function(e){
    if(e.target == modal){
        modal.style.display = "none";
        // form.style.display = "none";
    }
});
