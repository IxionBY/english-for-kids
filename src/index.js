import { cards, menu, statistic } from './cards';

const switcher = document.querySelector('.switch');
const allNavItems = document.querySelectorAll('.nav-item');
const MENU = document.getElementById('nav-menu');
const startBtn = document.querySelector('.start-btn');
const repeatBtn = document.querySelector('.repeat-btn');
const checked = document.getElementById('menu-toggle');
const cardContainer = document.querySelector('.card-container');
const rating = document.querySelector('.rating');
const navStat = document.querySelector('.statistics');
const appWrapper = document.querySelector('.app-wrapper');
const statDiv = document.querySelector('.statistic');
const closeStatBtn = document.querySelector('.close-stat-btn');
const resetStatBtn = document.querySelector('.reset-stat-btn');
const statisticObj = (localStorage.getItem('statisticObjLocal')) ? JSON.parse(localStorage.getItem('statisticObjLocal')) : statistic;

let pageFlag = cards[0];
let playMode = false;
let currentSound;
let countFalse;
let audio = [];
let i = -1;

function cardConstructor () {
    const doubleCard = document.createElement('div');
    doubleCard.classList.add('double-card');
    cardContainer.appendChild(doubleCard);

    const doubleCardFront = document.createElement('div');
    doubleCardFront.classList.add('double-card-front');
    doubleCard.appendChild(doubleCardFront);

    const doubleCardFrontImg = document.createElement('img');
    doubleCardFrontImg.classList.add('double-card-front-img');
    doubleCardFront.appendChild(doubleCardFrontImg);

    const doubleCardFrontText = document.createElement('div');
    doubleCardFrontText.classList.add('double-card-front-text');
    doubleCardFront.appendChild(doubleCardFrontText);

    const cardAudio = document.createElement('audio');
    cardAudio.classList.add('card-audio');
    doubleCardFront.appendChild(cardAudio);

    const doubleCardBack = document.createElement('div');
    doubleCardBack.classList.add('double-card-back');
    doubleCard.appendChild(doubleCardBack);

    const doubleCardBackImg = document.createElement('img');
    doubleCardBackImg.classList.add('double-card-back-img');
    doubleCardBack.appendChild(doubleCardBackImg);

    const doubleCardBackText = document.createElement('div');
    doubleCardBackText.classList.add('double-card-back-text');
    doubleCardBack.appendChild(doubleCardBackText);

    const rotate = document.createElement('div');
    rotate.classList.add('rotate');
    doubleCard.appendChild(rotate);
}

function createRows (category, word, translation, stat) {
    const tableStatistic = document.querySelector('.statistic-table > tbody');
    const tableRow = document.createElement('tr');
    tableStatistic.appendChild(tableRow);

    const tableCategory = document.createElement('td');
    tableCategory.classList.add('category');
    tableRow.appendChild(tableCategory);
    tableCategory.textContent = category;

    const tableWord = document.createElement('td');
    tableWord.classList.add('word');
    tableRow.appendChild(tableWord);
    tableWord.textContent = word;

    const tableTranslate = document.createElement('td');
    tableTranslate.classList.add('translate');
    tableRow.appendChild(tableTranslate);
    tableTranslate.textContent = translation;

    const tableTrain = document.createElement('td');
    tableTrain.classList.add('train');
    tableRow.appendChild(tableTrain);
    tableTrain.textContent = stat.train;

    const tableCorrect = document.createElement('td');
    tableCorrect.classList.add('correct');
    tableRow.appendChild(tableCorrect);
    tableCorrect.textContent = stat.correct;

    const tableWrong = document.createElement('td');
    tableWrong.classList.add('wrong');
    tableRow.appendChild(tableWrong);
    tableWrong.textContent = stat.wrong;

    const tableWrongPer = document.createElement('td');
    tableWrongPer.classList.add('percent');
    tableRow.appendChild(tableWrongPer);
    const percent = 100 * stat.wrong / (stat.wrong + stat.correct);
    tableWrongPer.textContent = (percent) ? `${Math.round(percent)}%` : '0%';
}

function fillingCard (page, mode) {
    for (let j = 0; j < page.length; j++) {
        const allDoubleCards = document.querySelectorAll('.double-card');
        startBtn.classList.remove('display-none');
        repeatBtn.classList.add('none');
        allDoubleCards.forEach((element) => element.classList.remove('locked'));
        if (mode === false) {
            if (page === cards[0]) {
                allNavItems.forEach((element) => element.classList.remove('active'));
                allNavItems[0].classList.add('active');
                allDoubleCards[j].querySelector('.double-card-front-img').src = page[j].image;
                allDoubleCards[j].querySelector('.double-card-front-text').textContent = page[j].word;
                allDoubleCards[j].querySelector('.rotate').classList.add('none');
                allDoubleCards[j].classList.remove('card-cover');
                allDoubleCards[j].querySelector('.double-card-front-img').classList.remove('main-img');
                allDoubleCards[j].querySelector('.double-card-front').classList.remove('main-double-card-front-play');
                allDoubleCards[j].querySelector('.double-card-front-text').classList.remove('none');
                document.querySelectorAll('.double-card-front').forEach((element) => element.classList.remove('innactive'));
                allDoubleCards[j].querySelector('.double-card-front-img').classList.add('main-img');
                allDoubleCards[j].querySelector('.double-card-front').classList.add('main-double-card-front-train');
            } else {
                allDoubleCards[j].querySelector('.double-card-front-img').src = page[j].image;
                allDoubleCards[j].querySelector('.double-card-back-img').src = page[j].image;
                allDoubleCards[j].querySelector('.double-card-front-text').textContent = page[j].word;
                allDoubleCards[j].querySelector('.double-card-back-text').textContent = page[j].translation;
                allDoubleCards[j].querySelector('.card-audio').src = page[j].audioSrc;
                allDoubleCards[j].classList.remove('card-cover');
                allDoubleCards[j].querySelector('.double-card-front-text').classList.remove('none');
                allDoubleCards[j].querySelector('.double-card-back-text').classList.remove('none');
                allDoubleCards[j].querySelector('.double-card-front-img').classList.remove('main-img');
                allDoubleCards[j].querySelector('.double-card-front').classList.remove('main-double-card-front-play');
                allDoubleCards[j].querySelector('.double-card-front').classList.remove('main-double-card-front-train');
                allDoubleCards[j].querySelector('.rotate').classList.remove('none');
                document.querySelectorAll('.double-card-front').forEach((element) => element.classList.remove('innactive'));
                startBtn.classList.add('none');
            }
        } else {
            if (page === cards[0]) {
                allNavItems.forEach((element) => element.classList.remove('active'));
                allNavItems[0].classList.add('active');
                allDoubleCards[j].querySelector('.double-card-front-img').src = page[j].image;
                allDoubleCards[j].querySelector('.double-card-front-text').textContent = page[j].word;
                allDoubleCards[j].classList.remove('card-cover');
                allDoubleCards[j].querySelector('.double-card-front-img').classList.remove('main-img');
                allDoubleCards[j].querySelector('.double-card-front').classList.remove('main-double-card-front-train');
                allDoubleCards[j].querySelector('.double-card-front-text').classList.remove('none');
                document.querySelectorAll('.double-card-front').forEach((element) => element.classList.remove('innactive'));
                allDoubleCards[j].querySelector('.double-card-front-img').classList.add('main-img');
                allDoubleCards[j].querySelector('.double-card-front').classList.add('main-double-card-front-play');
                allDoubleCards[j].querySelector('.rotate').classList.add('none');
                startBtn.classList.add('none');
            } else {
                allDoubleCards[j].querySelector('.double-card-front-img').src = page[j].image;
                allDoubleCards[j].classList.add('card-cover');
                allDoubleCards[j].querySelector('.double-card-front-img').classList.remove('main-img');
                allDoubleCards[j].querySelector('.double-card-front').classList.remove('main-double-card-front-train');
                allDoubleCards[j].querySelector('.double-card-front').classList.remove('main-double-card-front-play');
                startBtn.classList.remove('none');
                allDoubleCards[j].querySelector('.double-card-front-text').classList.add('none');
                allDoubleCards[j].querySelector('.double-card-back-text').classList.add('none');
                allDoubleCards[j].querySelector('.rotate').classList.add('none');
                document.querySelectorAll('.double-card-front').forEach((element) => element.classList.add('innactive'));
            }
        }
    }
    deleteElements(rating);
    audio = [];
    pageFlag.forEach((element) => {
        audio.push(element.audioSrc);
    });
    shuffle(audio);
}

function addStar (starFlag) {
    const img = document.createElement('img');
    img.classList.add('star');
    img.src = starFlag ? 'img/star-win.svg' : 'img/star.svg';
    rating.appendChild(img);
}

function navigation (menuItem, page) {
    menuItem.addEventListener('click', (event) => {
        pageFlag = page;
        fillingCard(page, playMode);
        MENU.querySelectorAll('a').forEach((element) => element.classList.remove('active'));
        event.target.classList.add('active');
        checked.checked = false;
    });
}

function rotateButtonClick (rotate, allDoubleCards) {
    rotate.addEventListener('click', () => {
        allDoubleCards.classList.add('flip');
        allDoubleCards.addEventListener('mouseleave', () => {
            allDoubleCards.classList.remove('flip');
        });
    });
}

function shuffle (array) {
    array.sort(() => Math.random() - 0.5);
}

function playAudio (cardAudio) {
    const audio = new Audio();
    audio.src = cardAudio;
    audio.load();
    audio.play();
}

function deleteElements (element) {
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}

function game (arrAudio) {
    i++;
    if (i < 8) {
        document.querySelector('.audio-game').src = arrAudio[i];
        playAudio(arrAudio[i]);
        return arrAudio[i];
    } else {
        pageFlag = cards[0];
        if (countFalse === 0) {
            document.querySelector('.app-wrapper').classList.add('display-none');
            document.getElementById('body').classList.add('success');
            playAudio('audio/success.mp3');
            setTimeout(showResult, 3000);
            fillingCard(cards[0], playMode);
        } else {
            document.querySelector('.app-wrapper').classList.add('display-none');
            document.getElementById('body').classList.add('failure');
            playAudio('audio/failure.mp3');
            setTimeout(showResult, 3000);
            fillingCard(cards[0], playMode);
        }
    }
    i = -1;
}

function showResult () {
    document.getElementById('body').classList.remove('success');
    document.getElementById('body').classList.remove('failure');
    document.querySelector('.app-wrapper').classList.remove('display-none');
}

for (let i = 0; i < 8; i++) {
    cardConstructor();
}

fillingCard(pageFlag, playMode);

for (let i = 0; i < allNavItems.length; i++) {
    navigation(allNavItems[i], cards[i], menu[i]);
}

const rotateButtons = document.querySelectorAll('.rotate');
const allDoubleCards = document.querySelectorAll('.double-card');

for (let i = 0; i < 8; i++) {
    rotateButtonClick(rotateButtons[i], allDoubleCards[i]);
}

switcher.addEventListener('mouseup', () => {
    if (playMode === false) {
        playMode = true; 
    } else {
        playMode = false;
    }
    fillingCard(pageFlag, playMode);
    checked.checked = false;
})

repeatBtn.addEventListener('mouseup', () => {
    playAudio(currentSound);
    checked.checked = false;
})

startBtn.addEventListener('mouseup', () => {
    currentSound = game(audio);
    repeatBtn.classList.remove('none');
    startBtn.classList.add('display-none');
    document.querySelectorAll('.double-card-front').forEach((element) => (element).classList.remove('innactive'));
    checked.checked = false;
    countFalse = 0;
})

const audioCardSrc = document.querySelectorAll('.card-audio');
document.querySelectorAll('.double-card-front').forEach((element, i) => {
    element.addEventListener('click', () => {
        checked.checked = false;
        if (pageFlag !== cards[0] && playMode === false) {
            statisticObj.forEach((element) => {
                if (pageFlag[i].word === element.word) {
                    element.train++;
                }
            });
            playAudio(audioCardSrc[i].src);
        } else if (pageFlag === cards[0]) {
            pageFlag = cards[i + 1];
            fillingCard(pageFlag, playMode);
            allNavItems.forEach((element) => element.classList.remove('active'));
            allNavItems[i + 1].classList.add('active');
            checked.checked = false;
        } else if (pageFlag[i].audioSrc !== currentSound){
            statisticObj.forEach((element) => {
                if (pageFlag[i].word === element.word){
                    element.wrong++;
                }
            });
            playAudio('audio/error.mp3');
            addStar(false);
            countFalse++;
        } else {
            statisticObj.forEach((element) => {
                if (pageFlag[i].word === element.word){
                    element.correct++;
                }
            });
            allDoubleCards[i].classList.add('locked');
            addStar(true);
            currentSound = game(audio);
            playAudio('audio/correct.mp3');
        }
    });
});

navStat.addEventListener('click', () => {
    const statisticTable = document.querySelector('tbody');
    deleteElements(statisticTable);
    appWrapper.classList.add('display-none');
    statDiv.classList.remove('display-none');
    closeStatBtn.classList.remove('display-none');
    resetStatBtn.classList.remove('display-none');

    let k = 0;
    for (let i = 1; i < cards.length; i++){
        const category = menu[i];
        cards[i].forEach((element) => {
            const word = element.word;
            const translation = element.translation;
            createRows(category, word, translation, statisticObj[k]);
            k++;
        });
    }
});

closeStatBtn.addEventListener('click', () => {
    appWrapper.classList.remove('display-none');
    navStat.classList.remove('active');
    statDiv.classList.add('display-none');
    closeStatBtn.classList.add('display-none');
    resetStatBtn.classList.add('display-none');
});

let testflag = false;
resetStatBtn.addEventListener('mouseup', () => {
    testflag = true;
    alert('Statistic cleared, reload page pls');
});

window.addEventListener('unload', () =>{
    if (testflag) {
        localStorage.clear();
    } else {
        localStorage.setItem('statisticObjLocal', JSON.stringify(statisticObj));
    }
});
