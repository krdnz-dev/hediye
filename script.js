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
   BAŞA SAR
===================================================== */

const replay =
  document.getElementById("replay");


if (replay) {

  replay.addEventListener(
    "click",
    () => {

      stopFinalRain();

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


  /* OTOMATİK GEÇİŞ */

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


  /* NOKTALAR */

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


/* SENİN MEKTUBUN */

const letterMessage =
`Seninle beraber öyle bir ilişki yaşayalım ki bunca zaman söylenen Leyla ile Mecnun, Aslı ile Kerem gibilerinin yanına Ceren ile Polat da eklensin.

Seni bir süre değil, bir ömür sevmek istiyorum.

Bir sürü anı biriktirip arşivi doldurmaya, her daim hayatımda olmaya ne dersin?`;


let letterOpened = false;

let typingTimer = null;


/* =====================================================
   MEKTUBU SIFIRLA
===================================================== */

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


/* =====================================================
   DAKTİLO
===================================================== */

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


      /* Yazı alanını otomatik aşağı takip ettir */

      const wrapper =
        document.querySelector(
          ".letter-text-wrapper"
        );


      if (wrapper) {

        wrapper.scrollTop =
          wrapper.scrollHeight;

      }


      /* YAZI BİTTİ */

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


/* =====================================================
   ZARFI AÇ
===================================================== */

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


  /* Zarf açıldıktan sonra yazmaya başla */

  setTimeout(() => {

    startTypewriter();

  }, 1000);

}


/* ZARFA TIKLAMA */

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


  /* Yatay konum */

  item.style.left =
    Math.random() *
    100 +
    "%";


  /* Boyut */

  const size =
    14 +
    Math.random() *
    18;


  item.style.fontSize =
    size +
    "px";


  /* Hız */

  const duration =
    3 +
    Math.random() *
    4;


  item.style.animationDuration =
    duration +
    "s";


  /* Şeffaflık */

  item.style.opacity =
    .5 +
    Math.random() *
    .5;


  finalRain.appendChild(
    item
  );


  /* Temizle */

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


  /* İlk yağmur */

  for (
    let i = 0;
    i < 18;
    i++
  ) {

    setTimeout(() => {

      createRainItem();

    }, i * 100);

  }


  /* Sürekli yağmur */

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


    /* Butonlarda kalp patlamasın */

    if (
      e.target.closest("button")
    ) {
      return;
    }


    /* Zarfta kendi animasyonu var */

    if (
      e.target.closest(".envelope")
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