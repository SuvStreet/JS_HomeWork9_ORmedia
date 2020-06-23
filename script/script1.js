let cat = document.getElementById('cat');
let dog = document.getElementById('dog');
let flag = true; // выбраны коты или собаки true = коты
/* let countLike = 0;
let like = true; */

let saveURL;

let arrSaveImg = new Array;

function animals(status, url){
    this.status = status,
    this.url = url
};


let divOpacitiContent = document.getElementById('content');
let divOpacitiInterview = document.getElementById('interview');
let divOpacitiResultInfo = document.getElementById('resultInfo');

const CAT_IMG = 'https://api.thecatapi.com/v1/images/search?size=full';
const DOG_IMG = 'https://api.thedogapi.com/v1/images/search';

pageSurfing('resultInfo');
/*addPictureCat(CAT_IMG); */

// событие нажатие на кнопку коты 
cat.addEventListener('click', () => {
    pageSurfing('interview');
    addPictureCat(CAT_IMG);
    flag = true;
    arrSaveImg = [];
});

// событие нажатие на кнопку собаки 
dog.addEventListener('click', () => {
    pageSurfing('interview');
    addPictureDog(DOG_IMG);
    flag = false;
    arrSaveImg = [];
});

function pageSurfing(link){
    switch(link){
        case 'content':
            divOpacitiContent.style.display = 'flex';
            divOpacitiInterview.style.display = 'none';
            divOpacitiResultInfo.style.display = 'none';
        break;
        case 'interview':
            divOpacitiContent.style.display = 'none';
            divOpacitiInterview.style.display = 'flex';
            divOpacitiResultInfo.style.display = 'none';
        break;
        case 'resultInfo':
            divOpacitiContent.style.display = 'none';
            divOpacitiInterview.style.display = 'none';
            divOpacitiResultInfo.style.display = 'flex';
        break;
    }
}

// обработчик на нажатие "Нравится"
document.getElementById('likeBtn').addEventListener('click', () =>{
    pressLike(saveURL);
});

// обработчик на нажатие "Не нравится"
document.getElementById('dislikeBtn').addEventListener('click', () =>{
    pressDislike(saveURL);
});

// обработчик на нажатие "Результаты"
document.getElementById('resultBtn').addEventListener('click', () =>{
    pageSurfing('resultInfo');
    console.log(arrSaveImg);
    /* localStorage.setItem('test', JSON.stringify(arrSaveImg)) */
});

// обработчик на нажатие "Назад"
document.getElementById('returnBtn').addEventListener('click', () =>{
    pageSurfing('content');
});

function pressLike(url){
    if(flag === true){
        let cat = new animals(true, url);
        arrSaveImg.push(cat);
        addPictureCat(CAT_IMG);
    }
    else{
        let dog = new animals(true, url);
        arrSaveImg.push(dog);
        addPictureDog(DOG_IMG);
    }

    /* countLike++; */
}

function pressDislike(url){
    if(flag === true){
        let cat = new animals(false, url);
        arrSaveImg.push(cat);
        addPictureCat(CAT_IMG);
    }
    else{
        let dog = new animals(false, url);
        arrSaveImg.push(dog);
        addPictureDog(DOG_IMG);
    }
}

//добавление котов
function addPictureCat(url){
    fetch(url).then(response =>{
        response.json().then(data => {
            let strucktCat = document.getElementById('imgPosition');
            let img = document.createElement('img');
            img.src = data[0].url;
            img.alt = 'cat';

            saveURL = data[0].url;

            img.onload = () => {
                strucktCat.innerHTML = '';
                strucktCat.appendChild(img);
            };

            
            // console.log(data);
        });
    });
};

//добавление собак
function addPictureDog(url){
    fetch(url).then(response =>{
        response.json().then(data => {
            let strucktDog = document.getElementById('imgPosition');
            let img = document.createElement('img');
            img.src = data[0].url;
            img.alt = 'dog';

            saveURL = data[0].url;

            img.onload = () => {
                strucktDog.innerHTML = '';
                strucktDog.appendChild(img);
            };
            // console.log(data);
        });
    });
};

//////////////////////////////////////

let x = JSON.parse(localStorage.getItem('test'));
for(let i = 0; i < x.length; i++){
    let animal = new animals(x[i].status, x[i].url);
    arrSaveImg.push(animal);
}

/* console.log(arrSaveImg); */

for(let i = 0; i < arrSaveImg.length; i++){
    document.getElementById('pictureAll').innerHTML +=
    `<div class="imgAnimal" id='imgAnimal${i}'>
        <div  ${arrSaveImg[i].status === true ? `class="imgAssessmentTrue"><i class="fas fa-thumbs-up"></i>` : `class="imgAssessmentFalse"><i class="fas fa-thumbs-down"></i>`}</div>
        <img src=${arrSaveImg[i].url} alt='animal'></img>
    </div>`;
}

for(let i = 0; i < arrSaveImg.length; i++){
    document.getElementById(`imgAnimal${i}`).addEventListener('click', () =>{
        see(i);
    })
}

function see(i){
        /* document.getElementById('see').innerHTML = ''; */
        document.getElementById('see').innerHTML = 
        `<div class="seeImg">
            <img src=${arrSaveImg[i].url} alt='animal'></img>
        </div>`;
}
