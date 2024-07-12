let playersCaseNumber;
let playersCaseDollarValue;
let openedCases = 0;
let casesAndTheirDollarValues = [];
let gameInstructionPanel = document.getElementById("gameInstructionPanel");
let dealButton = document.getElementById("dealButton");
let bankOfferPanel = document.getElementById("bankOfferPanel");
let noDealButton = document.getElementById("noDealButton");
let bankOfferAmount = document.getElementById("bankOfferAmount");
let imageUrls = ["bean-3.gif", "bean-5.gif", "bean-6.gif", "bean-10.gif"];
let calculatedBankOfferAmount = 0;
let playersSelectedCase = document.getElementById("playersSelectedCase");
let noDealBanner = document.getElementById("noDealBanner");
let animateCSSClassNames = [
  "bounce",
  "flash",
  "pulse",
  "rubberBand",
  "shakeX",
  "shakeY",
  "headShake",
  "swing",
  "tada",
  "wobble",
  "jello",
  "heartBeat",
  "backInDown",
  "backInLeft",
  "backInRight",
  "backInUp",
  "bounceIn",
  "bounceInDown",
  "bounceInLeft",
  "bounceInRight",
  "bounceInUp",
  "fadeIn",
  "fadeInDown",
  "fadeInDownBig",
  "fadeInLeft",
  "fadeInLeftBig",
  "fadeInRight",
  "fadeInRightBig",
  "fadeInUp",
  "fadeInUpBig",
  "fadeInTopLeft",
  "fadeInTopRight",
  "fadeInBottomLeft",
  "fadeInBottomRight",
  "flip",
  "flipInX",
  "flipInY",
  "lightSpeedInRight",
  "lightSpeedInLeft",
  "rotateIn",
  "rotateInDownLeft",
  "rotateInDownRight",
  "rotateInUpLeft",
  "rotateInUpRight",
  "jackInTheBox",
  "rollin",
  "zoomIn",
  "zoomInDown",
  "zoomInLeft",
  "zoomInRight",
  "zoomInUp",
  "slideInDown",
  "slideInLeft",
  "slideInRight",
  "slideInUp",
];

// game initialization
(function assignDollarValuesToCases() {
  let caseNumbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26,
  ];

  let gameDollarValues = [
    0.5, 1, 2, 5, 10, 20, 50, 100, 150, 200, 250, 500, 750, 1000, 2000, 3000,
    5000, 7500, 10000, 20000, 30000, 40000, 50000, 75000, 100000, 200000,
  ];

  caseNumbers.forEach((caseNumber) => {
    let matchedPair = [];
    let randomNumber = Math.floor(Math.random() * gameDollarValues.length);

    matchedPair.push(caseNumber, gameDollarValues[randomNumber]);

    casesAndTheirDollarValues.push(matchedPair);

    gameDollarValues.splice(randomNumber, 1);

    gameInstructionPanel.innerHTML =
      "<p>Select Your </p><span class='case caseText'>Case</span>";
  });
})();

function selectedCase(caseNumber) {
  if (playersCaseNumber !== undefined) {
    unhighlightSelectedDollarValueFromSideBar(caseNumber);
    displayDollarValueOfSelectedCase(caseNumber);
    updateGameInstructionPanel(caseNumber);

    return;
  }

  setupPlayersCaseNumberAndDollarValue(caseNumber);
}

function setupPlayersCaseNumberAndDollarValue(caseNumber) {
  playersCaseNumber = caseNumber;
  playersCaseDollarValue = casesAndTheirDollarValues[caseNumber - 1][1];
  playersSelectedCase.innerText = playersCaseNumber;

  let playersCaseNumberToUnhighlight = document.getElementById(
    "case-" + caseNumber
  );

  playersCaseNumberToUnhighlight.style.opacity = 0.4;
  playersCaseNumberToUnhighlight.style.pointerEvents = "none";

  gameInstructionPanel.innerHTML =
    "<span class='case'>6</span> <p>Cases To Open</p>";
}

function updateGameInstructionPanel(caseNumber) {
  openedCases++;

  for (let i = 0; i <= 25; i++) {
    if (casesAndTheirDollarValues[i][0] === caseNumber) {
      casesAndTheirDollarValues[i][0] = null;
    }
  }

  switch (openedCases) {
    case 1:
      gameInstructionPanel.innerHTML =
        "<span class='case'>5</span><p> Cases To Open</p>";
      break;
    case 7:
    case 2:
      gameInstructionPanel.innerHTML =
        "<span class='case'>4</span><p> Cases To Open</p>";
      break;
    case 12:
    case 8:
    case 3:
      gameInstructionPanel.innerHTML =
        "<span class='case'>3</span><p> Cases To Open</p>";
      break;
    case 16:
    case 13:
    case 9:
    case 4:
      gameInstructionPanel.innerHTML =
        "<span class='case'>2</span><p> Cases To Open</p>";
      break;
    case 19:
    case 17:
    case 14:
    case 10:
    case 5:
      gameInstructionPanel.innerHTML =
        "<span class='case'>1</span><p> Case To Open</p>";
      break;
    //case 25:
    case 24:
    case 23:
    case 22:
    case 21:
    case 20:
    case 18:
    case 15:
    case 11:
    case 6:
      gameInstructionPanel.innerHTML =
        "<p class='dealOrNoDeal'>Deal Or No Deal!</p>";

      deactivateRemainingCases();
      showBankOfferPanel();
      calculateBankOfferAmount();
      activateDealAndNoDealButtons();
      break;

    case 25:
      displayDollarValueOfSelectedCase(playersCaseNumber);

      let paragraphYes = dealButton.querySelector("p");
      paragraphYes.textContent = "Yes";

      let paragraphNo = noDealButton.querySelector("p");
      paragraphNo.textContent = "No";

      let paragraphPlayAgain = bankOfferPanel.querySelector("p");
      paragraphPlayAgain.textContent = "Play Again?";

      let hideSpan = bankOfferPanel.querySelector("span");
      hideSpan.style.display = "none";

      gameInstructionPanel.innerHTML =
        "<span class='case'>0</span><p> Cases To Open</p>";

      dealButton.classList.add("activateButton");
      noDealButton.classList.add("activateButton");
      paragraphYes.addEventListener("click", resetGame);
      paragraphNo.addEventListener("click", untilNextTime);
  }
}

function resetGame() {}

async function untilNextTime() {
  bankOfferAmount.style.display = "inline";
  bankOfferAmount.style.backgroundImage = "url()";
  bankOfferAmount.style.backgroundImage = "url(gifs/bean-10.gif)";
  await sleep(3000);
  bankOfferAmount.style.display = "none";

  let x = bankOfferPanel.querySelector("p");
  x.textContent = "Until Next Time... Bye!";
}

function deactivateRemainingCases() {
  for (let i = 0; i < casesAndTheirDollarValues.length; i++) {
    if (casesAndTheirDollarValues[i][0] !== null) {
      let caseToDisableTemporarily = document.getElementById("case-" + (i + 1));

      caseToDisableTemporarily.classList.add("unactive");
      caseToDisableTemporarily.style.pointerEvents = "none";
    }
  }
}

function showBankOfferPanel() {
  let randomNumber = Math.floor(Math.random() * imageUrls.length);
  let backGroundImageUrl = imageUrls[randomNumber];

  bankOfferPanel.classList.add("highlight");
  bankOfferAmount.style.backgroundImage =
    "url(gifs/" + backGroundImageUrl + ")";
}

async function activateDealAndNoDealButtons() {
  await sleep(3500);

  dealButton.classList.add("activateButton");
  noDealButton.classList.add("activateButton");

  bankOfferAmount.style.backgroundImage = "url()";
  bankOfferAmount.innerHTML = "$" + calculatedBankOfferAmount.toString();
}

async function noDealContinueGame() {
  bankOfferAmount.innerHTML = "";
  bankOfferAmount.style.backgroundImage = "url()";
  bankOfferAmount.style.backgroundImage = "url(gifs/bean-7.gif";

  let randeomNumber = Math.floor(Math.random() * animateCSSClassNames.length);
  let animationClassToAdd = animateCSSClassNames[randeomNumber];

  noDealBanner.classList.add(
    "animate__animated",
    "animate__" + animationClassToAdd
  );
  noDealBanner.classList.add("display");

  await sleep(3500);

  for (let i = 0; i < casesAndTheirDollarValues.length; i++) {
    if (casesAndTheirDollarValues[i][0] !== null) {
      let caseToReenable = document.getElementById("case-" + (i + 1));

      caseToReenable.classList.remove("unactive");
      caseToReenable.style.pointerEvents = "all";
    }
  }

  bankOfferAmount.style.backgroundImage = "";
  noDealBanner.classList.remove("display");
  noDealBanner.classList.remove("animate__" + animationClassToAdd);

  switch (openedCases) {
    case 6:
      gameInstructionPanel.innerHTML =
        "<span class='case'>5</span><p> Cases To Open</p>";
      break;
    case 11:
      gameInstructionPanel.innerHTML =
        "<span class='case'>4</span><p> Cases To Open</p>";
      break;
    case 15:
      gameInstructionPanel.innerHTML =
        "<span class='case'>3</span><p> Cases To Open</p>";
      break;
    case 18:
      gameInstructionPanel.innerHTML =
        "<span class='case'>2</span><p> Cases To Open</p>";
      break;
    case 24:
    case 23:
    case 22:
    case 21:
    case 20:
      gameInstructionPanel.innerHTML =
        "<span class='case'>1</span><p> Case To Open</p>";
      break;
  }
  disableDealAndNoDealButtons();
  unhighlightBankOfferPanel();
}

function disableDealAndNoDealButtons() {
  dealButton.classList.remove("activateButton");
  noDealButton.classList.remove("activateButton");
}

function unhighlightBankOfferPanel() {
  bankOfferPanel.classList.remove("highlight");
}

function calculateBankOfferAmount() {
  calculatedBankOfferAmount = 0;

  for (let i = 0; i < casesAndTheirDollarValues.length; i++) {
    if (casesAndTheirDollarValues[i][0] !== null) {
      calculatedBankOfferAmount += casesAndTheirDollarValues[i][1];
    }
  }

  calculatedBankOfferAmount = calculatedBankOfferAmount / (26 - openedCases);

  let randomPercentAmount = Math.floor(Math.random() * (40 - 5 + 1)) + 5; // random number between 5 & 20

  let randomAmountToSubtract =
    (calculatedBankOfferAmount * randomPercentAmount) / 100;

  calculatedBankOfferAmount = Math.floor(
    calculatedBankOfferAmount - randomAmountToSubtract
  ).toLocaleString();

  return calculatedBankOfferAmount;
}

function unhighlightSelectedDollarValueFromSideBar(caseNumber) {
  let sideBarDollarValueToUnhighlight = document.getElementById(
    "dollar-value-" + casesAndTheirDollarValues[caseNumber - 1][1] // -1 for zero indexing bug otherwise
  );

  sideBarDollarValueToUnhighlight.style.opacity = "0.4";
}

function displayDollarValueOfSelectedCase(caseNumber) {
  let caseNumberToShowDollarValue;
  if (caseNumber === playersCaseNumber) {
    // reveal players case dollar value aat end of game
    caseNumberToShowDollarValue = document.getElementById(
      "playersSelectedCase"
    );
  } else {
    caseNumberToShowDollarValue = document.getElementById("case-" + caseNumber);
  }

  let dollarValueOfSelectedCase = casesAndTheirDollarValues[caseNumber - 1][1]; // -1 for zero indexing bug otherwise

  caseNumberToShowDollarValue.innerText =
    "$" + dollarValueOfSelectedCase.toLocaleString();
  caseNumberToShowDollarValue.style.fontSize = "1.8em";
  caseNumberToShowDollarValue.style.color = "#fff";
  caseNumberToShowDollarValue.style.pointerEvents = "none";
  caseNumberToShowDollarValue.style.fontWeight = "600";

  if (dollarValueOfSelectedCase < 1000) {
    caseNumberToShowDollarValue.style.backgroundColor = "lightskyblue";
  } else if (
    dollarValueOfSelectedCase >= 1000 &&
    dollarValueOfSelectedCase < 30000
  ) {
    caseNumberToShowDollarValue.style.backgroundColor = "rgb(255,69,0)";
  } else {
    caseNumberToShowDollarValue.style.backgroundColor = "#22bb45";
  }
}

// helper functions
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
