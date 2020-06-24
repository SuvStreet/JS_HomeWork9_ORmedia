let catBtn = document.getElementById('cat');
let dogBtn = document.getElementById('dog');
let flag = true; // выбраны коты или собаки true = коты
let saveURL; // сохроняем а потом передаём в кнопку нравится или нет
let arrSaveImg = new Array; // массив который хранит все наши картинки

// будет хранить лайки и адрес картинки
function animals(status, url){
    this.status = status,
    this.url = url
};

let divOpacitiContent = document.getElementById('content');
let divOpacitiInterview = document.getElementById('interview');
let divOpacitiResultInfo = document.getElementById('resultInfo');

const CAT_IMG = 'https://api.thecatapi.com/v1/images/search?size=full';
const DOG_IMG = 'https://api.thedogapi.com/v1/images/search';

// загрузка страницы по умолчанию
document.addEventListener("DOMContentLoaded", ()=>{
    pageSurfing('content');
});

// событие нажатие на кнопку коты 
catBtn.addEventListener('click', () => {
    pageSurfing('interview');
    addPictureCat(CAT_IMG);
    flag = true;
    arrSaveImg = [];
    localStorage.setItem('test', JSON.stringify(arrSaveImg));
});

// событие нажатие на кнопку собаки 
dogBtn.addEventListener('click', () => {
    pageSurfing('interview');
    addPictureDog(DOG_IMG);
    flag = false;
    arrSaveImg = [];
    localStorage.setItem('test', JSON.stringify(arrSaveImg));
});

// выбор отображение страницы
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
    localStorage.setItem('test', JSON.stringify(arrSaveImg));
    resultImg();
});

// обработчик на нажатие "Назад"
document.getElementById('returnBtn1').addEventListener('click', () =>{
    pageSurfing('content');
});

// нажатие лайка у котов или собак
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
}

// нажатие дизлайка у котов или собак
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

// анимационная загрузка
function loading(){
    document.getElementById('imgPosition').innerHTML =
    `<div class="cssload-box-loading"></div>`;
}

//добавление котов
function addPictureCat(url){
    loading();
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
    loading();
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

// вывод результаты опроса
function resultImg(){

    document.getElementById('infoLikeDislike').innerHTML = ''; // очищаем див с лайками и дизлайками
    document.getElementById('positionGridCard').innerHTML = ''; // очищаем миниатюры
    document.getElementById('see').innerHTML = ''; // очищаем большую выбранную картинку
    

    if(arrSaveImg.length != 0){
        let x = JSON.parse(localStorage.getItem('test'));
        arrSaveImg = []; // очищаем массив, что бы не создовать копии старых картинок
        
        // обнуляем счётчики
        let countLike = 0;
        let countDislike = 0;

        // считаем лайки и дизлайки
        for(let i = 0; i < x.length; i++){
            let animal = new animals(x[i].status, x[i].url);
            arrSaveImg.push(animal);
            
            if(x[i].status === true){
                countLike++;
            }
            else{
                countDislike++;
            }
        }

        // вывод число лайков и дизлайков
        for(let i = 0; i < x.length; i++){
        document.getElementById('infoLikeDislike').innerHTML =
            `<div class='countLike'><span>${countLike}</span><i class="fas fa-thumbs-up"></i></div>
            <div class='countDislike'><span>${countDislike}</span><i class="fas fa-thumbs-down"></i></div>`;
        }

        // выводим в миниатюре картинки на них лайки и дизлайки
        for(let i = 0; i < arrSaveImg.length; i++){
            document.getElementById('positionGridCard').innerHTML +=
            `<div class="imgAnimal" id='imgAnimal${i}'>
                <div  ${arrSaveImg[i].status === true ? `class="imgAssessmentTrue"><i class="fas fa-thumbs-up"></i>` : `class="imgAssessmentFalse"><i class="fas fa-thumbs-down"></i>`}</div>
                <img src=${arrSaveImg[i].url} alt='animal'></img>
            </div>`;
        }

        // выводим подсказывающий текст
        document.getElementById('see').innerHTML =
        `<div class="promptText">
            <p>Нажмите на миниатюру что бы увеличить фотографию</p>
        </div>`;

        // обрабочкик нажатие фото
        for(let i = 0; i < arrSaveImg.length; i++){
            document.getElementById(`imgAnimal${i}`).addEventListener('click', () =>{
                see(i);
            })
        };
    }
    else{
        // выводит анимацию и текст с предупреждением
        document.getElementById('see').innerHTML = 
        `<div class="voidPicture">
            <div class="cssload-container">
                <div class="cssload-cord cssload-leftMove">
                    <div class="cssload-ball"></div>
                </div>
                <div class="cssload-cord">
                    <div class="cssload-ball"></div>
                </div>
                <div class="cssload-cord">
                    <div class="cssload-ball"></div>
                </div>
                <div class="cssload-cord">
                    <div class="cssload-ball"></div>
                </div>
                <div class="cssload-cord">
                    <div class="cssload-ball"></div>
                </div>
                <div class="cssload-cord">
                    <div class="cssload-ball"></div>
                </div>
                <div class="cssload-cord cssload-rightMove">
                    <div class="cssload-ball"></div>
                </div>
                <div class="cssload-shadows">
                    <div class="cssload-leftShadow"></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div class="cssload-rightShadow"></div>
                </div>
            </div>
        </div>
        <div class="messageEmptyArray">
            <p>Тут пока пусто, может попробуете для начала оценить картинку?!</p>
        </div>`;
    }

    // кнопка назад
    document.getElementById(`returnBtn2`).addEventListener('click', () =>{
    pageSurfing('interview');
    });
}

// выводит выбранную фотографию на большой экран
function see(i){
    document.getElementById('see').innerHTML = 
    `<div class="seeImg">
        <img src=${arrSaveImg[i].url} alt='animal'></img>
    </div>`;
};