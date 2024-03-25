const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

// Milestone 1 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
// Milestone 2 - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo. Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.
// 1. Formattare le date in formato italiano (gg/mm/aaaa)
// 2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
// 3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.

const postContainer = document.getElementById("container")
posts.forEach((singlePost) => createPostTemplate(singlePost))

const allLikeButton = document.querySelectorAll(".js-like-button")

const likedPost = []

allLikeButton.forEach((singleLikeButton) => {
    singleLikeButton.addEventListener("click", function(event){
        //per evitare che la pagina torni in alto a causa dell'href
        event.preventDefault();
        //aggiunge la classe per il colore al bottone cliccato
        this.className.includes("like-button--liked") ? this.classList.remove("like-button--liked") : this.classList.add("like-button--liked");

        //identifica l'id del post e lo pusha nell'array
        const thisId = this.dataset.postid;
        if (likedPost.includes(thisId)){
            let thisPostIndex = likedPost.indexOf(thisId);
            likedPost.splice(thisPostIndex, 1);
        } else {
            likedPost.push(thisId)
        }

        //identifica il counter del post e lo aumenta di 1
        const counter = document.querySelector(`#like-counter-${thisId}`)
        counter.innerHTML = likedPost.includes(thisId) ? parseInt(counter.innerHTML) + 1 : parseInt(counter.innerHTML) - 1;
    })
})

//FUNCTIONS
//Funzione che prende un oggetto, destruttura le sue chiavi e le usa per compilare un template, il quale poi viene appeso in pagina
//postInfo -> Object
function createPostTemplate(postInfo) {
    const {id, content, media, author, likes, created} = postInfo;
    const {name, image} = author;
    //converto il formato della data
    const reversedDate = created.split("-").reverse().join("/");

    //verifico la presenza dell'immagine
    const profilePic = hasImageOrNot(image, name);

    let post = `<div class="post">
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    ${profilePic}                
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${name}</div>
                    <div class="post-meta__time">${reversedDate}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${content}</div>
        <div class="post__image">
            <img src="${media}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#" data-postid="${id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                </div>
            </div> 
        </div>            
    </div>`

    postContainer.innerHTML += post;
}

//funzione che verifica se viene effettivamente passata un'immagine o no e sulla base di ciò genera un template contenente o l'immagine o le iniziali ricavate dal nome
//image, name
function hasImageOrNot(image, name){
    const initials = name.split(' ').map((item) => item[0]).join('');
    const userImg = image ? `<img class="profile-pic" src="${image}" alt="${name}">` : `<div class="profile-pic-default"><span>${initials}</span></div>`;

    return userImg;
}