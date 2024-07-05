let playersCaseNumber;
let playersCaseDollarValue;
let casesAndTheirDollarValues = [];

// game initialization
// assign game dollar values randomly to all cases
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
  });
})();

function selectedCase(caseNumber) {
  if (playersCaseNumber !== undefined) {
    return;
  }

  playersCaseNumber = caseNumber;
  playersCaseDollarValue = casesAndTheirDollarValues[caseNumber][1];

  let playersSelectedCase = document.getElementById("playersSelectedCase");
  playersSelectedCase.innerText = playersCaseNumber + 1; // zero index work around
}
