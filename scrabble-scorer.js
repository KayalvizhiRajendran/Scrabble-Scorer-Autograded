// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

let oldScrabbleScorer = {
   name: "Scrabble",
   Description: "The traditional scoring algorithm.",
   scorerFunction: function (word) {
      word = word.toUpperCase();
      let letterPoints = "";

      for (let i = 0; i < word.length; i++) {

         for (const pointValue in oldPointStructure) {

            if (oldPointStructure[pointValue].includes(word[i])) {
               letterPoints += `Points for '${word[i]}': ${pointValue}\n`
            }

         }
      }
      return letterPoints;
   }
};

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let word;
function initialPrompt() {
   word = input.question("Let's play some scrabble! Enter a word:");
   //console.log(oldScrabbleScorer(word));
   //console.log(simpleScorer(word));
   //console.log(vowelBonusScorer(word));
   // console.log("Let's play some scrabble! Enter a word:");
};

let transform = function (oldPointStructure) {
   let newStructure = {};

   for (const key in oldPointStructure) {

      const element = oldPointStructure[key];
      if (element.length > 0) {
         for (let index = 0; index < element.length; index++) {
            const value = element[index].toLowerCase();
            newStructure[value] = Number(key);
         }
      }
   }
   return newStructure;
}

let newPointStructure = transform(oldPointStructure);

let scrabbleScorer = function (word, newPointStructure) {
   let letters = word.toLowerCase().split("");
   let score = 0;
   for (let index = 0; index < letters.length; index++) {
      let element = letters[index];
      score = score + newPointStructure[element];
   }
   return score;
}

let scrabbleScorerObj = {
   name: "New Scrable Scorer",
   Description: "Created function",
   scorerFunction: scrabbleScorer
};

let simpleScorer = function (word) {
   let letters = word.split("");
   return letters.length;
}

let simpleScorerObj = {
   name: "Simple Scorer",
   Description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
};

let vowelBonusScorer = function (word) {
   let score = 0;
   let letters = word.split("");
   let vowels = ['a', 'e', 'i', 'o', 'u'];
   for (let index = 0; index < letters.length; index++) {
      if (vowels.includes(letters[index].toLowerCase())) {
         score = score + 3;
      } else {
         score = score + 1;
      }
   }
   return score;
}

let vowelBonusScorerObj = {
   name: "Bonus Vowels",
   Description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
};

let scoringAlgorithms = [simpleScorerObj, vowelBonusScorerObj, scrabbleScorerObj];


let scorerPrompt = function () {
   let scoringMethod = input.question("Which scoring algorithm would you like to use? \n 0 - Simple: One point per character \n 1 - Vowel Bonus: Vowels are worth 3 points \n 2 - Scrabble: Uses scrabble point system \n Enter 0, 1, or 2: ");
   while (scoringMethod != "0" && scoringMethod != "1" && scoringMethod != "2") {
      scoringMethod = input.question("Please enter a valid scoring choice..!! \n \n 0 - Simple: One point per character \n 1 - Vowel Bonus: Vowels are worth 3 points \n 2 - Scrabble: Uses scrabble point system \n Enter 0, 1, or 2: ")
   }
   return scoringAlgorithms[scoringMethod];
}

function runProgram() {
   initialPrompt();
   let scoringMethod = scorerPrompt();
   console.log(`The score for '${word}' is ${scoringMethod.scorerFunction(word, this.newPointStructure)}`);
   //console.log(this.newPointStructure);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
