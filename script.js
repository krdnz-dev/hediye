/* =====================================================
EKRAN GEÇİŞLERİ
===================================================== */

const screens =
document.querySelectorAll(".screen");

let currentScreen = 0;

function showScreen(index) {

if (
index < 0 ||
index >= screens.length
) {
return;
}

screens.forEach((screen, i) => {


screen.classList.toggle(
  "active",
  i === index
);


});

currentScreen = index;

/* FINAL */

if (
screens[index].classList.contains("final")
) {


startFinalRain();


} else {


stopFinalRain();


}

/* MEKTUP */

if (index === 3) {


resetLetter();


}

}

/* =====================================================
BUTONLAR
===================================================== */

document
.querySelectorAll("[data-next]")
.forEach(button => {


button.addEventListener(
  "click",
  () => {

    const next =
      Number(button.dataset.next);

    showScreen(next);

  }
);


});

/* =====================================================
BAŞA DÖN
===================================================== */

const replay =
document.getElementById("replay");

if (replay) {

replay.addEventListener(
"click",
() => {


  stopFinalRain();

  closeGames();

  showScreen(0);

}


);

}

/* =====================================================
FOTOĞRAF GALERİSİ
===================================================== */

const slider =
document.querySelector(".photo-slider");

const dots =
document.querySelectorAll(".dot");

if (slider) {

let currentPhoto = 0;

function updateDots() {


const index =
  Math.round(
    slider.scrollLeft /
    slider.clientWidth
  );

currentPhoto = index;

dots.forEach((dot, i) => {

  dot.classList.toggle(
    "active",
    i === index
  );

});


}

slider.addEventListener(
"scroll",
updateDots
);

setInterval(() => {


currentPhoto++;

if (
  currentPhoto >=
  slider.children.length
) {

  currentPhoto = 0;

}

slider.scrollTo({

  left:
    currentPhoto *
    slider.clientWidth,

  behavior: "smooth"

});


}, 4000);

dots.forEach(
(dot, index) => {


  dot.addEventListener(
    "click",
    () => {

      currentPhoto = index;

      slider.scrollTo({

        left:
          index *
          slider.clientWidth,

        behavior: "smooth"

      });

    }
  );

}


);

}

/* =====================================================
MEKTUP
===================================================== */

const envelope =
document.getElementById("envelope");

const envelopeHint =
document.getElementById(
"envelopeHint"
);

const typewriterText =
document.getElementById(
"typewriterText"
);

const signature =
document.getElementById(
"signature"
);

const letterNext =
document.getElementById(
"letterNext"
);

const letterMessage =
`Seninle beraber öyle bir ilişki yaşayalım ki bunca zaman söylenen Leyla ile Mecnun, Aslı ile Kerem gibilerinin yanına Ceren ile Polat da eklensin.

Seni bir süre değil, bir ömür sevmek istiyorum.

Bir sürü anı biriktirip arşivi doldurmaya, her daim hayatımda olmaya ne dersin?`;

let letterOpened = false;

let typingTimer = null;

function resetLetter() {

if (!envelope) {
return;
}

envelope.classList.remove(
"open"
);

if (envelopeHint) {


envelopeHint.style.opacity =
  "1";


}

if (typewriterText) {


typewriterText.textContent =
  "";


}

if (signature) {


signature.style.opacity =
  "0";


}

if (letterNext) {


letterNext.classList.remove(
  "show"
);


}

letterOpened = false;

if (typingTimer) {


clearInterval(
  typingTimer
);

typingTimer = null;


}

}

function startTypewriter() {

if (!typewriterText) {
return;
}

typewriterText.textContent =
"";

let character = 0;

typingTimer =
setInterval(() => {


  typewriterText.textContent =
    letterMessage.slice(
      0,
      character
    );

  character++;

  const wrapper =
    document.querySelector(
      ".letter-text-wrapper"
    );

  if (wrapper) {

    wrapper.scrollTop =
      wrapper.scrollHeight;

  }

  if (
    character >
    letterMessage.length
  ) {

    clearInterval(
      typingTimer
    );

    typingTimer =
      null;

    setTimeout(() => {

      if (signature) {

        signature.style.opacity =
          "1";

      }

      if (letterNext) {

        letterNext.classList.add(
          "show"
        );

      }

    }, 500);

  }

}, 32);


}

function openLetter() {

if (letterOpened) {
return;
}

letterOpened = true;

envelope.classList.add(
"open"
);

if (envelopeHint) {


envelopeHint.style.opacity =
  "0";


}

setTimeout(() => {


startTypewriter();


}, 1000);

}

if (envelope) {

envelope.addEventListener(
"click",
openLetter
);

}

/* =====================================================
FINAL YAĞMURU
===================================================== */

const finalRain =
document.getElementById(
"finalRain"
);

let rainInterval = null;

const rainSymbols = [

"♥",
"♡",
"❤",

"🌸",
"🌷",
"🌹",
"🌺",

"✿",
"❀",

"✨"

];

function createRainItem() {

if (!finalRain) {
return;
}

const item =
document.createElement(
"span"
);

item.className =
"rain-item";

item.textContent =
rainSymbols[
Math.floor(
Math.random() *
rainSymbols.length
)
];

item.style.left =
Math.random() *
100 +
"%";

const size =
14 +
Math.random() *
18;

item.style.fontSize =
size +
"px";

const duration =
3 +
Math.random() *
4;

item.style.animationDuration =
duration +
"s";

item.style.opacity =
.5 +
Math.random() *
.5;

finalRain.appendChild(
item
);

setTimeout(() => {


item.remove();


}, (duration + 1) * 1000);

}

function startFinalRain() {

if (!finalRain) {
return;
}

finalRain.classList.add(
"active"
);

for (
let i = 0;
i < 18;
i++
) {


setTimeout(() => {

  createRainItem();

}, i * 100);


}

if (!rainInterval) {


rainInterval =
  setInterval(() => {

    createRainItem();

  }, 180);


}

}

function stopFinalRain() {

if (!finalRain) {
return;
}

finalRain.classList.remove(
"active"
);

if (rainInterval) {


clearInterval(
  rainInterval
);

rainInterval = null;


}

finalRain.innerHTML =
"";

}

/* =====================================================
EKRANA DOKUNUNCA KALP
===================================================== */

document.addEventListener(
"click",
function (e) {


if (
  e.target.closest("button")
) {
  return;
}

if (
  e.target.closest(".envelope")
) {
  return;
}

if (
  e.target.closest(".games-overlay")
) {
  return;
}

const heartCount = 5;

for (
  let i = 0;
  i < heartCount;
  i++
) {

  const heart =
    document.createElement(
      "span"
    );

  heart.innerHTML =
    "♥";

  heart.className =
    "click-heart";

  const offsetX =
    (Math.random() - .5) *
    50;

  const offsetY =
    (Math.random() - .5) *
    20;

  heart.style.left =
    e.clientX +
    offsetX +
    "px";

  heart.style.top =
    e.clientY +
    offsetY +
    "px";

  heart.style.fontSize =
    14 +
    Math.random() * 12 +
    "px";

  heart.style.animationDuration =
    1.2 +
    Math.random() * .7 +
    "s";

  document.body.appendChild(
    heart
  );

  setTimeout(() => {

    heart.remove();

  }, 2000);

}


}
);

/* =====================================================
OYUNLAR MENÜSÜ
===================================================== */

const gamesOverlay =
document.getElementById(
"gamesOverlay"
);

const continueBtn =
document.getElementById(
"continueBtn"
);

const gamesClose =
document.getElementById(
"gamesClose"
);

const gameMenu =
document.getElementById(
"gameMenu"
);

function openGames() {

if (!gamesOverlay) {
return;
}

gamesOverlay.classList.add(
"show"
);

showGameMenu();

}

function closeGames() {

if (!gamesOverlay) {
return;
}

gamesOverlay.classList.remove(
"show"
);

stopSnake();
stopCatchGame();

}

function showGameMenu() {

document
.querySelectorAll(".game-box")
.forEach(box => {


  box.classList.remove(
    "active"
  );

});


if (gameMenu) {


gameMenu.style.display =
  "flex";


}

}

if (continueBtn) {

continueBtn.addEventListener(
"click",
openGames
);

}

if (gamesClose) {

gamesClose.addEventListener(
"click",
closeGames
);

}

/* =====================================================
OYUN MENÜSÜ
===================================================== */

const snakeChoice =
document.getElementById(
"snakeChoice"
);

const catchChoice =
document.getElementById(
"catchChoice"
);

const boredChoice =
document.getElementById(
"boredChoice"
);

function openGame(gameId) {

if (gameMenu) {


gameMenu.style.display =
  "none";


}

document
.querySelectorAll(".game-box")
.forEach(box => {


  box.classList.remove(
    "active"
  );

});


const game =
document.getElementById(
gameId
);

if (game) {


game.classList.add(
  "active"
);


}

}

if (snakeChoice) {

snakeChoice.addEventListener(
"click",
() => {


  openGame("snakeGame");

  resetSnake();

}


);

}

if (catchChoice) {

catchChoice.addEventListener(
"click",
() => {


  openGame("catchGame");

  resetCatchGame();

}


);

}

if (boredChoice) {

boredChoice.addEventListener(
"click",
() => {


  openGame("boredGame");

  resetBoredGame();

}


);

}

document
.querySelectorAll("[data-game-back]")
.forEach(button => {


button.addEventListener(
  "click",
  () => {

    stopSnake();
    stopCatchGame();
    showGameMenu();

  }
);


});

/* =====================================================

1. YILAN OYUNU
   ===================================================== */

const snakeCanvas =
document.getElementById(
"snakeCanvas"
);

const snakeScoreEl =
document.getElementById(
"snakeScore"
);

const snakeMessage =
document.getElementById(
"snakeMessage"
);

const snakeRestart =
document.getElementById(
"snakeRestart"
);

let snakeCtx = null;

let snake = [];

let snakeFood = {
x: 5,
y: 5
};

let snakeDirection = {
x: 1,
y: 0
};

let nextSnakeDirection = {
x: 1,
y: 0
};

let snakeScore = 0;

let snakeTimer = null;

const snakeGrid = 18;

if (snakeCanvas) {

snakeCtx =
snakeCanvas.getContext(
"2d"
);

}

function resizeSnakeCanvas() {

if (!snakeCanvas) {
return;
}

const rect =
snakeCanvas.getBoundingClientRect();

const size =
Math.min(
rect.width,
rect.height
);

const dpr =
window.devicePixelRatio || 1;

snakeCanvas.width =
size * dpr;

snakeCanvas.height =
size * dpr;

snakeCtx.setTransform(
dpr,
0,
0,
dpr,
0,
0
);

drawSnake();

}

function randomSnakeFood() {

let position;

do {


position = {

  x:
    Math.floor(
      Math.random() *
      snakeGrid
    ),

  y:
    Math.floor(
      Math.random() *
      snakeGrid
    )

};


} while (
snake.some(
part =>
part.x === position.x &&
part.y === position.y
)
);

snakeFood =
position;

}

function resetSnake() {

stopSnake();

snake = [


{ x: 9, y: 9 },
{ x: 8, y: 9 },
{ x: 7, y: 9 }


];

snakeDirection = {
x: 1,
y: 0
};

nextSnakeDirection = {
x: 1,
y: 0
};

snakeScore = 0;

if (snakeScoreEl) {


snakeScoreEl.textContent =
  "0";


}

if (snakeMessage) {


snakeMessage.textContent =
  "Başlamak için \"Oyunu Başlat\"a dokun.";


}

randomSnakeFood();

resizeSnakeCanvas();

}

function drawSnake() {

if (!snakeCtx || !snakeCanvas) {
return;
}

const size =
snakeCanvas.getBoundingClientRect().width;

const cell =
size / snakeGrid;

snakeCtx.clearRect(
0,
0,
size,
size
);

/* Yem */

snakeCtx.font =
`${cell * .75}px Arial`;

snakeCtx.textAlign =
"center";

snakeCtx.textBaseline =
"middle";

snakeCtx.fillText(
"❤️",
snakeFood.x * cell + cell / 2,
snakeFood.y * cell + cell / 2
);

/* Yılan */

snake.forEach(
(part, index) => {


  const padding =
    index === 0
      ? cell * .08
      : cell * .13;

  snakeCtx.fillStyle =
    index === 0
      ? "#ff5c9a"
      : "#ff91b5";

  snakeCtx.beginPath();

  snakeCtx.roundRect(
    part.x * cell + padding,
    part.y * cell + padding,
    cell - padding * 2,
    cell - padding * 2,
    cell * .2
  );

  snakeCtx.fill();

}


);

}

function snakeLoop() {

snakeDirection =
nextSnakeDirection;

const head = {
x:
snake[0].x +
snakeDirection.x,


y:
  snake[0].y +
  snakeDirection.y


};

/* Duvara çarpma */

if (
head.x < 0 ||
head.x >= snakeGrid ||
head.y < 0 ||
head.y >= snakeGrid
) {


snakeGameOver();

return;


}

/* Kendine çarpma */

if (
snake.some(
part =>
part.x === head.x &&
part.y === head.y
)
) {


snakeGameOver();

return;


}

snake.unshift(
head
);

/* Yem */

if (
head.x === snakeFood.x &&
head.y === snakeFood.y
) {


snakeScore++;

if (snakeScoreEl) {

  snakeScoreEl.textContent =
    snakeScore;

}

randomSnakeFood();


} else {


snake.pop();


}

drawSnake();

}

function startSnake() {

stopSnake();

if (snakeMessage) {


snakeMessage.textContent =
  "Yakalan! ❤️";


}

snakeTimer =
setInterval(
snakeLoop,
145
);

}

function stopSnake() {

if (snakeTimer) {


clearInterval(
  snakeTimer
);

snakeTimer =
  null;


}

}

function snakeGameOver() {

stopSnake();

if (snakeMessage) {


snakeMessage.textContent =
  `Oyun bitti! Puanın: ${snakeScore} ❤️`;


}

}

if (snakeRestart) {

snakeRestart.addEventListener(
"click",
() => {


  resetSnake();
  startSnake();

}


);

}

document
.querySelectorAll(
".snake-controls button"
)
.forEach(button => {


button.addEventListener(
  "click",
  () => {

    const dir =
      button.dataset.dir;

    changeSnakeDirection(
      dir
    );

  }
);


});

function changeSnakeDirection(dir) {

const directions = {


up: {
  x: 0,
  y: -1
},

down: {
  x: 0,
  y: 1
},

left: {
  x: -1,
  y: 0
},

right: {
  x: 1,
  y: 0
}


};

const wanted =
directions[dir];

if (!wanted) {
return;
}

/* 180 derece dönmeyi engelle */

if (
wanted.x === -snakeDirection.x &&
wanted.y === -snakeDirection.y
) {
return;
}

nextSnakeDirection =
wanted;

}

document.addEventListener(
"keydown",
e => {


const keys = {

  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right"

};

if (
  keys[e.key]
) {

  e.preventDefault();

  changeSnakeDirection(
    keys[e.key]
  );

}


}
);

window.addEventListener(
"resize",
resizeSnakeCanvas
);

/* =====================================================
2. KALPLERİ YAKALA
===================================================== */

const catchArea =
document.getElementById(
"catchArea"
);

const catchScoreEl =
document.getElementById(
"catchScore"
);

const catchStart =
document.getElementById(
"catchStart"
);

const catchStartBtn =
document.getElementById(
"catchStartBtn"
);

const catchMessage =
document.getElementById(
"catchMessage"
);

let catchScore = 0;

let catchRunning = false;

let catchInterval = null;

let catchGameOverLayer = null;

const catchSymbols = [
"❤️",
"💗",
"💖",
"🌸",
"🌷",
"🌹",
"🌺",
"🌼"
];

function resetCatchGame() {

stopCatchGame();

catchScore = 0;

if (catchScoreEl) {


catchScoreEl.textContent =
  "0";


}

if (catchMessage) {


catchMessage.textContent =
  "Kırık kalbe sakın dokunma! 💔";


}

if (catchStart) {


catchStart.style.display =
  "flex";


}

if (catchArea) {


catchArea
  .querySelectorAll(
    ".falling-item, .catch-pop, .catch-game-over"
  )
  .forEach(
    el => el.remove()
  );


}

}

function startCatchGame() {

if (!catchArea) {
return;
}

catchRunning = true;

if (catchStart) {


catchStart.style.display =
  "none";


}

if (catchMessage) {


catchMessage.textContent =
  "Yakalamaya başla! ❤️";


}

catchInterval =
setInterval(
createFallingItem,
650
);

}

function stopCatchGame() {

catchRunning = false;

if (catchInterval) {


clearInterval(
  catchInterval
);

catchInterval =
  null;


}

}

function createFallingItem() {

if (
!catchRunning ||
!catchArea
) {
return;
}

const item =
document.createElement(
"span"
);

item.className =
"falling-item";

const isBroken =
Math.random() < .16;

if (isBroken) {


item.classList.add(
  "broken"
);

item.textContent =
  "💔";


} else {


item.textContent =
  catchSymbols[
    Math.floor(
      Math.random() *
      catchSymbols.length
    )
  ];


}

const size =
25 +
Math.random() *
15;

item.style.fontSize =
size +
"px";

item.style.left =
Math.random() *
85 +
"%";

const duration =
2.5 +
Math.random() *
2;

item.style.animationDuration =
duration +
"s";

let caught =
false;

item.addEventListener(
"pointerdown",
e => {


  e.preventDefault();

  if (
    caught ||
    !catchRunning
  ) {
    return;
  }

  caught = true;


  if (isBroken) {

    endCatchGame();

    return;

  }


  catchScore++;

  if (catchScoreEl) {

    catchScoreEl.textContent =
      catchScore;

  }


  showCatchPoints(
    item,
    "+1 ❤️"
  );

  item.remove();

}


);

catchArea.appendChild(
item
);

setTimeout(() => {


if (
  !caught &&
  item.parentNode
) {

  item.remove();

}


}, (duration + .5) * 1000);

}

function showCatchPoints(
item,
text
) {

if (!catchArea) {
return;
}

const pop =
document.createElement(
"span"
);

pop.className =
"catch-pop";

pop.textContent =
text;

pop.style.left =
item.offsetLeft +
"px";

pop.style.top =
item.offsetTop +
"px";

catchArea.appendChild(
pop
);

setTimeout(
() => pop.remove(),
700
);

}

function endCatchGame() {

catchRunning = false;

if (catchInterval) {


clearInterval(
  catchInterval
);

catchInterval =
  null;


}

if (catchMessage) {


catchMessage.textContent =
  "Kırık kalbe bastın! 💔";


}

const layer =
document.createElement(
"div"
);

layer.className =
"catch-game-over show";

layer.innerHTML = `


<div style="font-size:45px;">
  💔
</div>

<h3>Yandın!</h3>

<p>
  Kırık kalbe dokundun.<br>
  Puanın: <strong>${catchScore}</strong>
</p>

<button class="game-restart">
  Tekrar Dene
</button>


`;

const restart =
layer.querySelector(
".game-restart"
);

restart.addEventListener(
"click",
() => {


  layer.remove();

  resetCatchGame();

  startCatchGame();

}


);

catchArea.appendChild(
layer
);

}

if (catchStartBtn) {

catchStartBtn.addEventListener(
"click",
startCatchGame
);

}

/* =====================================================
3. SIKILDIYSAN BAS
===================================================== */

const boredButton =
document.getElementById(
"boredButton"
);

const boredPlayArea =
document.getElementById(
"boredPlayArea"
);

const reallyBoredButton =
document.getElementById(
"reallyBoredButton"
);

const kissButton =
document.getElementById(
"kissButton"
);

const boredTitle =
document.getElementById(
"boredTitle"
);

const boredText =
document.getElementById(
"boredText"
);

let boredAttempts = 0;

let reallyAttempts = 0;

function resetBoredGame() {

boredAttempts = 0;

reallyAttempts = 0;

if (boredButton) {


boredButton.style.left =
  "50%";

boredButton.style.top =
  "50%";

boredButton.style.transform =
  "translate(-50%, -50%)";

boredButton.style.display =
  "block";

boredButton.textContent =
  "Sıkıldıysan bas";


}

if (reallyBoredButton) {


reallyBoredButton.classList.remove(
  "show"
);


}

if (kissButton) {


kissButton.classList.remove(
  "show"
);


}

if (boredTitle) {


boredTitle.textContent =
  "Sıkıldıysan bas 😏";


}

if (boredText) {


boredText.textContent =
  "Hadi bakalım, yakalayabilecek misin?";


}

}

function moveBoredButton() {

if (
!boredButton ||
!boredPlayArea
) {
return;
}

boredAttempts++;

const areaWidth =
boredPlayArea.clientWidth;

const areaHeight =
boredPlayArea.clientHeight;

const buttonWidth =
boredButton.offsetWidth;

const buttonHeight =
boredButton.offsetHeight;

const maxX =
Math.max(
5,
areaWidth -
buttonWidth -
5
);

const maxY =
Math.max(
5,
areaHeight -
buttonHeight -
5
);

const x =
Math.random() *
maxX;

const y =
Math.random() *
maxY;

boredButton.style.left =
x +
"px";

boredButton.style.top =
y +
"px";

boredButton.style.transform =
"none";

if (boredAttempts >= 3) {


boredButton.style.display =
  "none";

reallyBoredButton.classList.add(
  "show"
);

if (boredTitle) {

  boredTitle.textContent =
    "Tamam tamam... 😏";

}

if (boredText) {

  boredText.textContent =
    "Şimdi gerçekten sıkıldıysan aşağıdakine bas.";

}


}

}

if (boredButton) {

boredButton.addEventListener(
"pointerdown",
e => {


  e.preventDefault();

  moveBoredButton();

}


);

}

function moveReallyBoredButton() {

if (
!reallyBoredButton ||
!boredPlayArea
) {
return;
}

reallyAttempts++;

const areaWidth =
boredPlayArea.clientWidth;

const areaHeight =
boredPlayArea.clientHeight;

const buttonWidth =
reallyBoredButton.offsetWidth;

const buttonHeight =
reallyBoredButton.offsetHeight;

const x =
Math.random() *
Math.max(
5,
areaWidth -
buttonWidth -
5
);

const y =
Math.random() *
Math.max(
5,
areaHeight -
buttonHeight -
5
);

reallyBoredButton.style.position =
"absolute";

reallyBoredButton.style.left =
x +
"px";

reallyBoredButton.style.top =
y +
"px";

if (reallyAttempts >= 3) {


reallyBoredButton.classList.remove(
  "show"
);

kissButton.classList.add(
  "show"
);

if (boredTitle) {

  boredTitle.textContent =
    "Artık kaçış yok... ❤️";

}

if (boredText) {

  boredText.textContent =
    "Son bir şey kaldı.";

}


}

}

if (reallyBoredButton) {

reallyBoredButton.addEventListener(
"pointerdown",
e => {


  e.preventDefault();

  moveReallyBoredButton();

}


);

}

/* =====================================================
ÖPERSEN ÇIKABİLİRSİN
===================================================== */

if (kissButton) {

kissButton.addEventListener(
"click",
() => {


  stopFinalRain();

  closeGames();

  showScreen(0);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


);

}

/* =====================================================
BAŞLANGIÇ
===================================================== */

resetSnake();

resetCatchGame();

resetBoredGame();
