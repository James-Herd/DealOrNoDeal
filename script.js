let playersCaseNumber;
let playersCaseDollarValue;
let openedCases = 0;
let casesAndTheirDollarValues = [];
let gameInstruction = document.getElementById("gameInstruction");

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

    gameInstruction.innerText = "Select Your Case";
  });
})();

function selectedCase(caseNumber) {
  openedCases++;

  for (let i = 0; i <= 25; i++) {
    if (casesAndTheirDollarValues[i][0] === caseNumber) {
      casesAndTheirDollarValues[i][0] = null;
    }
  }

  if (playersCaseNumber !== undefined) {
    unhighlightSelectedDollarValueFromSideBar(caseNumber);
    displayDollarValueOfSelectedCase(caseNumber);
    updateGameInstructionPanel();

    return;
  }

  setupPlayersCaseNumberAndDollarValue(caseNumber);
}

function updateGameInstructionPanel() {
  switch (openedCases) {
    case 2:
      gameInstruction.innerText = "5 Cases To Open";
      break;
    case 3:
      gameInstruction.innerText = "4 Cases To Open";
      break;
    case 4:
      gameInstruction.innerText = "3 Cases To Open";
      break;
    case 5:
      gameInstruction.innerText = "2 Cases To Open";
      break;
    case 6:
      gameInstruction.innerText = "1 Case To Open";
      break;
    case 7:
      gameInstruction.innerText = "Deal Or No Deal!!";

      deactivateRemainingCases();
      break;
  }
}

function deactivateRemainingCases() {
  for (let i = 0; i < casesAndTheirDollarValues.length + 1; i++) {
    if (casesAndTheirDollarValues[i][0] !== null) {
      let caseToDisableTemporarily = document.getElementById("case-" + (i + 1));
      caseToDisableTemporarily.style.opacity = "0.4";
      caseToDisableTemporarily.style.pointerEvents = "none";
    }
  }
}

function setupPlayersCaseNumberAndDollarValue(caseNumber) {
  playersCaseNumber = caseNumber;
  playersCaseDollarValue = casesAndTheirDollarValues[caseNumber][1];

  let playersSelectedCase = document.getElementById("playersSelectedCase");
  playersSelectedCase.innerText = playersCaseNumber;

  let playersCaseNumberToUnhighlight = document.getElementById(
    "case-" + caseNumber
  );

  playersCaseNumberToUnhighlight.style.opacity = 0.4;
  playersCaseNumberToUnhighlight.style.pointerEvents = "none";

  gameInstruction.innerText = "6 Cases To Open";
}

function unhighlightSelectedDollarValueFromSideBar(caseNumber) {
  let sideBarDollarValueToUnhighlight = document.getElementById(
    "dollar-value-" + casesAndTheirDollarValues[caseNumber][1]
  );

  sideBarDollarValueToUnhighlight.style.opacity = "0.4";
}

function displayDollarValueOfSelectedCase(caseNumber) {
  let dollarValueOfSelectedCase = casesAndTheirDollarValues[caseNumber][1];
  let caseNumberToShowDollarValue = document.getElementById(
    "case-" + caseNumber
  );

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
