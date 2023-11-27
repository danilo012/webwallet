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

const textElement = document.getElementById("text");
const copyButton = document.getElementById("copy");

const copyText = (e) => {
  window.getSelection().selectAllChildren(textElement);
  document.execCommand("copy");
  e.target.setAttribute("tooltip", "Copied! ✅");
};

const resetTooltip = (e) => {
  e.target.setAttribute("tooltip", "Copy to clipboard");
};

copyButton.addEventListener("click", (e) => copyText(e));
copyButton.addEventListener("mouseover", (e) => resetTooltip(e));
