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
const clear = document.querySelector('.clear');
const confirmModal = document.querySelector('.confirm-modal');
const confirmDelete = document.querySelector('.confirm-delete');
const cancelDelete = document.querySelector('.cancel-delete');
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
    if(storageAvailable('localStorage')){
        getBookshelf = localStorage.getItem('strBookshelf');
        parseBookshelf = JSON.parse(getBookshelf);
        // bookshelf = [];
        if(parseBookshelf.length > 0){
            populateField();
        }
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
            let index = bookshelf.findIndex(element => {
                if(element.title === btitleH1.textContent){
                    return true;
                }
            });
            bookshelf[index].read = true;
            if(storageAvailable('localStorage')){
                strBookshelf = JSON.stringify(bookshelf);
                localStorage.setItem('strBookshelf', strBookshelf);
            }
            
        }
        else{
            newReadButton.textContent = "Unread";
            let index = bookshelf.findIndex(element => {
                if(element.title === btitleH1.textContent){
                    return true;
                }
            });
            bookshelf[index].read = false;
            if(storageAvailable('localStorage')){
                strBookshelf = JSON.stringify(bookshelf);
                localStorage.setItem('strBookshelf', strBookshelf);
            }
        }
    });
    
    newRemoveButton.addEventListener("click", function(e){
        let index = bookshelf.findIndex(element => {
            if(element.title === btitleH1.textContent){
                return true;
            }
        });
        bookshelf.splice(index, 1);
        cardField.removeChild(cardDiv);
        if(storageAvailable('localStorage')){
            strBookshelf = JSON.stringify(bookshelf);
            localStorage.setItem('strBookshelf', strBookshelf);
    
        }
    });

    if(storageAvailable('localStorage')){
        strBookshelf = JSON.stringify(bookshelf);
        localStorage.setItem('strBookshelf', strBookshelf);

    }
}

function populateField(){
    for(let i = 0; i < parseBookshelf.length; i++){
        bookshelf.push(new Book(parseBookshelf[i].title, parseBookshelf[i].author, parseBookshelf[i].pages, parseBookshelf[i].read));
        const parseCard = document.createElement('div');
        const parseH1 = document.createElement('h1'); 
        const parseH2 = document.createElement('h2'); 
        const parseP = document.createElement('p'); 
        const parseRead = document.createElement('button');
        const parseRemove = document.createElement('button');
        const parseButtons = document.createElement('div');
        

        parseCard.className = "card";
        parseButtons.className = "action-buttons";
        
        parseH1.className = "btitle";
        parseH1.textContent = parseBookshelf[i].title;
        parseCard.appendChild(parseH1);
        cardField.appendChild(parseCard);

        parseH2.className = "bauthor";
        parseH2.textContent = parseBookshelf[i].author;
        parseCard.appendChild(parseH2);
        cardField.appendChild(parseCard);

        parseP.className = "bpages";
        parseP.textContent = parseBookshelf[i].pages + " page(s)";
        parseCard.appendChild(parseP);
        cardField.appendChild(parseCard);

        parseRead.className = "bread";
        parseRead.classList.add("hasRead");
        if(parseBookshelf[i].read){
            parseRead.classList.add("hasRead");
            parseRead.textContent = "Read it!";
            
        }
        if(!parseBookshelf[i].read){
            parseRead.className = "bread";
            parseRead.textContent = "Unread";}

        parseRead.addEventListener("click", function(e){
            parseRead.classList.toggle("hasRead");
            if(parseRead.textContent == "Unread"){
                parseRead.textContent = "Read it!";
                parseBookshelf[i].read = true;
                bookshelf[i].read = true;

                if(storageAvailable('localStorage')){
                    strBookshelf = JSON.stringify(bookshelf);
                    localStorage.setItem('strBookshelf', strBookshelf);
                }
            }
            else{
                parseRead.textContent = "Unread";
                parseBookshelf[i].read = false;
                bookshelf[i].read = false;
                if(storageAvailable('localStorage')){
                    strBookshelf = JSON.stringify(bookshelf);
                    localStorage.setItem('strBookshelf', strBookshelf);
                }
            }
        });
        
        cardField.appendChild(parseCard);
        parseCard.appendChild(parseButtons);
        parseButtons.appendChild(parseRead);

        parseRemove.className = "remove";
        parseRemove.textContent = "Remove";

        cardField.appendChild(parseCard);
        parseCard.appendChild(parseButtons);
        parseButtons.appendChild(parseRemove);

        parseRemove.addEventListener("click", function(e){
            
            cardField.removeChild(parseCard);
            parseBookshelf.splice(i, 1);
            bookshelf.splice(i, 1);
            if(storageAvailable('localStorage')){
                strBookshelf = JSON.stringify(bookshelf);
                localStorage.setItem('strBookshelf', strBookshelf);        
            }
            
        });
        
    }       
}

function Book(title, author, pages, read) {
    this.title = title, 
    this.author = author,
    this.pages = pages,
    this.read = read
}

function toBookshelf() {
    bookshelf.push(new Book(ftitle.value, fauthor.value, fpages.value, fread.checked));
    createElements();

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
    modal.style.display = "block";
    ftitle.focus();
});

clear.addEventListener("click", function(e){
    if(!cardField.lastChild && parseBookshelf.length > 0){
        return;
    }
    if(bookshelf.length > 0 || parseBookshelf.length > 0){
        confirmModal.style.display = "block";
        confirmDelete.addEventListener("click", e => {
            localStorage.clear();
            bookshelf.length = 0; 
            while(cardField.lastChild){
                cardField.removeChild(cardField.lastChild);
            }
            confirmModal.style.display = "none";
        });
        cancelDelete.addEventListener("click", e => {confirmModal.style.display = "none"});
    }
    
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
    modal.style.display = "none";
});

window.addEventListener("click", function(e){
    if(e.target == modal){
        modal.style.display = "none";
    }
});
