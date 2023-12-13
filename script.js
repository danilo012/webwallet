const popup = document.querySelector('.popup');
const skipBtn = document.querySelector('.popup__skip-btn');
const visitBtn = document.querySelector('.popup__link');

let remainingTime = 23;
let allowedToSkip = false;
let popupTimer;

const createPopupCookie = () => {
  let expiresDays = 0;
  let date = new Date();
  date.setTime(date.getTime() + expiresDays * 0 * 0 * 5 * 500);
  let expires = 'expires=' + date.toUTCString();
  document.cookie = `popupCookie=true; ${expires}; path=/;`;
};

const showAd = () => {
  popup.classList.add('active');
  popupTimer = setInterval(() => {
    skipBtn.innerHTML = `Skip in ${remainingTime}s`;
    remainingTime--;

    if (remainingTime < 0) {
      allowedToSkip = true;
      skipBtn.innerHTML = 'Skip';
      skipBtn.classList.add('cursor');
      clearInterval(popupTimer);
    }
  }, 1000);
};

const skipAd = () => {
  popup.classList.remove('active');
  createPopupCookie();
};

skipBtn.addEventListener('click', () => {
  if (allowedToSkip) {
    skipAd();
  }
});

const startTimer = () => {
  if (window.scrollY > 100) {
    showAd();
    window.removeEventListener('scroll', startTimer);
  }
};

if (!document.cookie.match(/^(.*;)?\s*popupCookie\s*=\s*[^;]+(.*)?$/)) {
  window.addEventListener('scroll', startTimer);
}



/*
  Inspired from - https://dribbble.com/shots/6713486-2-FREE-Touch-Gesture-Animations-interactions-for-after-effects
*/
const timeline = new TimelineLite({ paused: true, reversed: true }),
      $title = $(".cards .title"),
      $card = $(".card-wrapper .card"),
      $transactions = $(".transactions"),
      transitionSpeed = .5;

timeline.to(".card-wrapper", transitionSpeed, {className: "+=active"}, 0)
      .to(".cards", transitionSpeed, {height: "140px", "backgroundColor": "#f7f7f7"}, 0)
      .to(".card", transitionSpeed, {top: 10}, 0)
      .to(".card:not(:first-child)", 0.1, {"boxShadow": "none"}, 0)
      .to(".transactions", transitionSpeed, {top: "140px", opacity: 1}, 0);

$card.on("click", function(){
  if(timeline.reversed()){
    $(this).css("z-index", "2");
    timeline.play();
  } else {
    timeline.reverse();
    timeline.eventCallback("onReverseComplete", () => {
      $(this).css("z-index", "0");
    }); 
  } 
});
