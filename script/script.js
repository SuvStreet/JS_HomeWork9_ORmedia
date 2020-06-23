const CAT_IMG = 'https://api.thecatapi.com/v1/images/search?size=full';
const DOG_IMG = 'https://api.thedogapi.com/v1/images/search';

let saveUrlImg = 0; //хранит url картинки
let arrSaveImg = new Array; // массив сохранённый картинок

console.log(saveUrlImg);

// событие нажатие на кнопку коты 
document.getElementById('catsBtn').addEventListener('click', () => {
    addPictureCat(CAT_IMG);
});

// событие нажатие на кнопку собаки 
document.getElementById('dogsBtn').addEventListener('click', () => {
    addPictureDog(DOG_IMG);
});

// при наачльной загрузке страницы загружается по умолчанию коты
document.addEventListener("DOMContentLoaded", ()=>{
    addPictureCat(CAT_IMG);
    btnAssessment();
});

// анимационная загрузка
function loading(){
    document.getElementById('imgPosition').innerHTML =
    `<div class="cssload-thecube">
        <div class="cssload-cube cssload-c1"></div>
        <div class="cssload-cube cssload-c2"></div>
        <div class="cssload-cube cssload-c4"></div>
        <div class="cssload-cube cssload-c3"></div>
    </div>`;
}

// кнопки с лайками и дисами
function btnAssessment(){
    let divBtnLike = document.getElementById('formAssessment');

    divBtnLike.innerHTML =
    `<button class="likeBtn" id="likeBtn"><i class="fas fa-thumbs-up"></i> Нравится</button>
    <button class="dislikeBtn" id="dislikeBtn"><i class="fas fa-thumbs-down"></i> Не нравится</button>
    <button class="interviewBtn" id="interviewBtn">Завершить опрос</button>`;

    document.getElementById('likeBtn').addEventListener('click', () =>{
        pressLike();
    });

    document.getElementById('dislikeBtn').addEventListener('click', () =>{
        pressDislike();
    });

    document.getElementById('interviewBtn').addEventListener('click', () =>{
        wresultIntervie();
    });

    /* `<input type="button" class="likeBtn" id="likeBtn" value='Нравится'/>
    <input type="button" class="dislikeBtn" id="dislikeBtn" value="Не нравится" />` */
}

function pressLike(){
    let countLike = 0;
    let saveImgLike = saveUrlImg;

    arrSaveImg.push(saveImgLike);


}

function wresultIntervie(){
    console.log(arrSaveImg);
}

//добавление котов
function addPictureCat(url){
    loading();
    
    console.log(saveUrlImg);

    fetch(url).then(response =>{
        response.json().then(data => {
            let strucktCat = document.getElementById('imgPosition');
            let img = document.createElement('img');
            img.src = data[0].url;
            img.alt = 'cat';

            arrSaveImg.push(data[0].url);
            

            img.onload = () => {
                strucktCat.innerHTML = '';
                strucktCat.appendChild(img);

                

                

                if(data[0].breeds.length !== 0){
                    document.getElementById('poroda').innerHTML = 
                    `<span class="spanCat">Порода: </span>${data[0].breeds[0].name}`;
                    document.getElementById('lifeWeight').innerHTML = 
                    `<span class="spanCat">Продолжнительность жизни: </span>${data[0].breeds[0].life_span} лет`;
                }
                else{
                    document.getElementById('poroda').innerHTML = 
                    `<span class="spanCat">Порода: </span>Н/Д`;
                    document.getElementById('lifeWeight').innerHTML = 
                    `<span class="spanCat">Продолжнительность жизни: </span>Н/Д`;
                }
            };
            // console.log(data);
        });
    });
};

console.log(arrSaveImg);

//добавление собак
function addPictureDog(url){
    loading();
    fetch(DOG_IMG).then(response =>{
        response.json().then(data => {
            let strucktDog = document.getElementById('imgPosition');
            let img = document.createElement('img');
            img.src = data[0].url;
            img.alt = 'dog';

            img.onload = () => {
                strucktDog.innerHTML = '';
                strucktDog.appendChild(img);
                if(data[0].breeds.length !== 0){
                    document.getElementById('poroda').innerHTML = 
                    `<span class="spanDog">Порода: </span>${data[0].breeds[0].name}`;
                    document.getElementById('lifeWeight').innerHTML = 
                    `<span class="spanDog">Вес: </span>${data[0].breeds[0].weight.metric} кг`;  
                }
                else{
                    document.getElementById('poroda').innerHTML = 
                    `<span class="spanDog">Порода: </span>Н/Д`;
                    document.getElementById('lifeWeight').innerHTML = 
                    `<span class="spanDog">Вес: </span>Н/Д`;
                }
            };
            // console.log(data);
        });
    });
};

