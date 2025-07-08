let reelsFirst = true; // tracks if this is the first reel shown to the user
let mode = "button";   // tracks the current mode
let mathData = {     // tracks information for math mode
  level: 0,
  questionsAnswered: 0
};
const mathProblems = [
  /*
  A list of lists of objects
  Each sublist is a different level of problems
  Each question looks like this:
  { question: String, validAnswers: List of Strings }
  Answers are strings for compairsons and some may have multiple solutions
  All answers are rounded to 2 decimal places if there is a fractional component 
  */
  
  [{question: "1 + 1", possibleAnswers: ["2"]}, // Addition and Subtraction
   {question: "2 + 2", possibleAnswers: ["4"]},
   {question: "7 + 8", possibleAnswers: ["15"]},
   {question: "7 + 2", possibleAnswers: ["9"]},
   {question: "6 + 1", possibleAnswers: ["7"]},
   {question: "3 + 12", possibleAnswers: ["15"]},
   {question: "11 + 5", possibleAnswers: ["16"]},
   {question: "2.5 + 1.5", possibleAnswers: ["4"]},
   {question: "1.5 + 3", possibleAnswers: ["4.5"]},
   {question: "13 + 0", possibleAnswers: ["13"]},
   {question: "1 - 1", possibleAnswers: ["0"]},
   {question: "7 - 4", possibleAnswers: ["3"]},
   {question: "10 - 5", possibleAnswers: ["5"]},
   {question: "11 - 10", possibleAnswers: ["1"]},
   {question: "10 - 13", possibleAnswers: ["-3", "- 3"]},
   {question: "1 - 14", possibleAnswers: ["-13", "- 13"]},
   {question: "8 - 9", possibleAnswers: ["-1", "- 1"]},
   {question: "13 - 1", possibleAnswers: ["12"]},
   {question: "10 - 10", possibleAnswers: ["0"]},
   {question: "6 - 14", possibleAnswers: ["-8", "- 8"]}],
   
  [{question: "1 ⋅ 1", possibleAnswers: ["1"]}, // Multiplication and Division
   {question: "2 ⋅ 2", possibleAnswers: ["4"]},
   {question: "3 ⋅ 3", possibleAnswers: ["9"]},
   {question: "4 ⋅ 4", possibleAnswers: ["16"]},
   {question: "2 ⋅ 3", possibleAnswers: ["6"]},
   {question: "4 ⋅ 0", possibleAnswers: ["0"]},
   {question: "6 ⋅ 7", possibleAnswers: ["42"]},
   {question: "7 ⋅ 8", possibleAnswers: ["56"]},
   {question: "-4 ⋅ 9", possibleAnswers: ["-36", "- 36"]},
   {question: "-10 ⋅ -12", possibleAnswers: ["120"]},
   {question: "1 ÷ 1", possibleAnswers: ["1"]},
   {question: "10 ÷ 5", possibleAnswers: ["2"]},
   {question: "9 ÷ 3", possibleAnswers: ["3"]},
   {question: "12 ÷ 4", possibleAnswers: ["3"]},
   {question: "-90 ÷ 10", possibleAnswers: ["-9", "- 9"]},
   {question: "1 ÷ 2", possibleAnswers: ["0.5", ".5", "0.50"]},
   {question: "3 ÷ 4", possibleAnswers: ["0.75", ".75"]},
   {question: "100 ÷ 2", possibleAnswers: ["50"]},
   {question: "56 ÷ 7", possibleAnswers: ["8"]},
   {question: "144 ÷ 12", possibleAnswers: ["12"]}],

  [{question: "3 + 5 + 4", possibleAnswers: ["12"]}, // PEMDAS questions
   {question: "10 - 5 - 2", possibleAnswers: ["3"]},
   {question: "3 + 5 - 4", possibleAnswers: ["4"]},
   {question: "10 - 6 + 1", possibleAnswers: ["5"]},
   {question: "3 ⋅ 2 + 5", possibleAnswers: ["11"]},
   {question: "3 ⋅ (2 + 5)", possibleAnswers: ["21"]},
   {question: "(3 + 7) ÷ 2", possibleAnswers: ["5"]},
   {question: "1 + 1 - 1 ⋅ 1 ÷ 1", possibleAnswers: ["1"]},
   {question: "(1 + 2 - 3 + 4 ÷ 10) ⋅ 0", possibleAnswers: ["0"]},
   {question: "14 ÷ 7 ⋅ 3 + 5", possibleAnswers: ["11"]},
   {question: "18 ÷ 3 - 7 + 2 ⋅ 5", possibleAnswers: ["9"]},
   {question: "25 - 2 ⋅ (2 ⋅ 6 - 2)", possibleAnswers: ["5"]},
   {question: "40 + 8 - 1 ⋅ (15 - 2 ⋅ 3)", possibleAnswers: ["39"]},
   {question: "1 + 1 ⋅ 0", possibleAnswers: ["1"]},
   {question: "90 ÷ 10 + 5 ⋅ 2", possibleAnswers: ["19"]},
   {question: "9 + 10", possibleAnswers: ["19"]},
   {question: "20 ⋅ 10 + 2 ÷ 2", possibleAnswers: ["201"]},
   {question: "100 ÷ (5 ⋅ 2 + 1 - 1)", possibleAnswers: ["10"]},
   {question: "99 ÷ (10 ⋅ 2 ÷ (1 + 1) + 1)", possibleAnswers: ["9"]},
   {question: "10 ⋅ (1 + 4) - 10 ÷ 5", possibleAnswers: ["48"]}],

  [{question: "x - 1 = 0", possibleAnswers: ["1"]}, // Basic algebra
   {question: "3x - 6 = 0", possibleAnswers: ["2"]},
   {question: "10x + 20 = 0", possibleAnswers: ["-2", "- 2"]},
   {question: "3x - 3 = 3", possibleAnswers: ["2"]},
   {question: "3x = 24", possibleAnswers: ["8"]},
   {question: "3x + 2 = 14", possibleAnswers: ["4"]},
   {question: "x - 2 = 5", possibleAnswers: ["7"]},
   {question: "2x = 8", possibleAnswers: ["4"]},
   {question: "16 - 2x = 5x + 9", possibleAnswers: ["1"]},
   {question: "2(2x + 1) = 18", possibleAnswers: ["4"]},
   {question: "x - 20 = 4 - 3x", possibleAnswers: ["6"]},
   {question: "30x - 60 = 0", possibleAnswers: ["2"]},
   {question: "x + 10 = 32", possibleAnswers: ["22"]},
   {question: "4x - 10 = 10", possibleAnswers: ["5"]},
   {question: "2x + 3x = 10", possibleAnswers: ["2"]},
   {question: "10(2x + 3) = 15(x + 7)", possibleAnswers: ["15"]},
   {question: "5x - 6 = 3x - 8", possibleAnswers: ["-1", "- 1"]},
   {question: "x + 2 = 2x - 5", possibleAnswers: ["7"]},
   {question: "3 - x = 2x", possibleAnswers: ["1"]},
   {question: "2x + 2 = 3x + 3", possibleAnswers: ["-1", "- 1"]}],

  [{question: "x² - 5x + 6 = 0", possibleAnswers: ["2, 3", "2,3", "3, 2", "3,2"]}, // Quadratics (maybe a few easier cubics)
   {question: "x² - 36 = 0", possibleAnswers: ["6,-6", "6, -6", "-6,6", "-6, 6"]},
   {question: "x² + 5x - 14 = 0", possibleAnswers: ["2,-7", "2, -7", "-7,2", "-7, 2"]},
   {question: "x² - 14x + 48 = 0", possibleAnswers: ["6,8", "6, 8", "8,6", "8, 6"]},
   {question: "x³ + 2x² - 3x = 0", possibleAnswers: ["-3,0,1", "-3,1,0", "1,-3,0", "1,0,-3", "0,1,-3", "0,-3,1", "-3, 0, 1", "-3, 1, 0", "1, -3, 0", "1, 0, -3", "0, 1, -3", "0, -3, 1"]},
   {question: "(x - 2)² = 0", possibleAnswers: ["2"]},
   {question: "x² + 14x - 51 = 0", possibleAnswers: ["3,-17", "3, -17", "-17,3","-17, 3"]},
   {question: "x² + 6x + 8 = 0", possibleAnswers: ["-2,-4", "-2, -4", "-4,-2", "-4, -2"]},
   {question: "x² - 12x + 11 = 0", possibleAnswers: ["1,11", "1, 11", "11,1", "11, 1"]},
   {question: "x² - 20x + 100 = 0", possibleAnswers: ["10"]},
   {question: "x² + 10x + 25 = 0", possibleAnswers: ["-5", "- 5"]},
   {question: "x² - 200x + 10,000 = 0", possibleAnswers: ["100"]},
   {question: "x² - 5x - 14 = 0", possibleAnswers: ["7,-2", "7, -2", "-2,7", "-2, 7"]},
   {question: "4x² - 8x = 0", possibleAnswers: ["0,2", "0, 2", "2,0", "2, 0"]},
   {question: "x² + 4x + 3 = 0", possibleAnswers: ["-3,-1", "-3, -1", "-1,-3", "-1, -3"]},
   {question: "(x - 9)(x - 2) = 0", possibleAnswers: ["2,9", "2, 9", "9,2", "9, 2"]},
   {question: "(x + 1)(x - 1) = 0", possibleAnswers: ["-1,1", "-1, 1", "1,-1", "1, -1"]},
   {question: "(x - 10)(x + 9) = 0", possibleAnswers: ["-9,10", "-9, 10", "10,-9", "10, -9"]},
   {question: "(x - 1000)(x + 1) = 0", possibleAnswers: ["-1,1000", "-1, 1000", "1000,-1", "1000, -1"]},
   {question: "(x - 99)(x - 9900) = 0", possibleAnswers: ["99,9900", "99, 9900", "9900,99","9900, 99"]}],
];

const unscrambleWordList = [
  "crisp", "bucket", "mystery", "goblin", "arcade", "sneeze", "lizard", "jumble", "orbit", "punch",
  "twig", "hazard", "quartz", "flip", "engine", "marble", "sphinx", "velvet", "drift", "toxic",
  "plume", "snatch", "quirky", "zebra", "plank", "nugget", "blaze", "vortex", "scoff", "bunker",
  "gadget", "moist", "sketch", "churn", "crypt", "lunar", "basil", "gnome", "yacht", "thump",
  "wreck", "swoop", "crayon", "vivid", "grasp", "mimic", "blunt", "plush", "sting", "whisk",
  "oxide", "banter", "croak", "jungle", "glint", "fraud", "hatch", "spook", "dwarf", "clash",
  "prism", "brisk", "slump", "hoard", "grind", "scoop", "vault", "spurt", "bribe", "kneel",
  "slosh", "creek", "nudge", "twirl", "crack", "drone", "clamp", "forge", "zesty", "pearl",
  "quill", "hurry", "swamp", "cling", "pouch", "smirk", "glide", "snarl", "squint", "cabin",
  "blurt", "joust", "glove", "trunk", "gravy", "chant", "quirk", "flick", "slant", "torch"
];



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "tabChange" && (request.url.includes("shorts") || request.url.includes("reels"))) {
    // Get the video on the page
    let short = getVideo(request.url.includes("shorts") ? "shorts" : "reels");

    const dialog = createDialog(short);
    document.body.appendChild(dialog);

    // Show the dialog
    if (request.url.includes("reels") && reelsFirst) {
      // This stops the dialog from appearing twice on reels
      reelsFirst = false;
    } 
    else {
      dialog.showModal();

      // Prevent scrolling while dialog is open
      document.addEventListener("keydown", preventScroll, true);

      // Play the metallic sound
      new Audio(chrome.runtime.getURL("../media/metalhit.mp3")).play();
    }

    // Pause the video (if the short takes too long to load it may not be here so we check for it)
    if (short) {
      short.pause();
    } 
    else if (message !== "buttonClicked ") {
      // Resets the first reel if we left the reels page
      reelsFirst = true;
    }
  }

  if (request.message === "buttonClicked") {
    mode = request.mode;
    mathLevel = 0;
  }
});

function createDialog(short) {
  // Create diaog
  const dialog = document.createElement("dialog");
  dialog.id = "popup";
  dialog.style.backgroundImage = `url(${chrome.runtime.getURL("media/metalBackground.jpg")})`;

  // BUTTON MODE
  if (mode === "button") {
    // Create button and add the click event
    const button = document.createElement("button");
    button.id = "closePopup";
    button.onclick = () => {
      closeDialogCommon(short, dialog);
    };
    // Defocus the button to prevent the user from just pressing enter
    button.onfocus = () => {
      button.blur();
    };
    button.textContent = "X";

    // Put the button in a random position
    button.style.marginLeft = `${Math.random() * 100}%`;
    button.style.marginTop = `${Math.random() * 20}%`;

    // Hide the button and show the button later
    button.style.display = "none";
    setTimeout(() => {
      button.style.display = "block";
    }, 3000);

    dialog.appendChild(button);
  }

  // MATH MODE
  else if (mode === "math") {
    const container = document.createElement("div");
    container.id = "mathContainer";

    // Get current problem
    const mathProblem = mathProblems[mathData.level][randomNumber(0, 20)];

    // Create question element
    const question = document.createElement("p");
    question.id = "mathQuestion"
    question.textContent = mathProblem.question
    container.appendChild(question)

    // Create answer box
    const answerBox = document.createElement("input");
    answerBox.id = "mathAnswer";
    answerBox.type = "text";
    if (mathData.level >= 3) {
      answerBox.placeholder = "Enter all answers as a comma separated list...";
    }
    container.appendChild(answerBox);

    // Create answer buttons
    const button = document.createElement("button");
    button.id = "mathButton"
    button.textContent = "Submit"
    button.onclick = () => {
      if (mathProblem.possibleAnswers.includes(answerBox.value.trim())) {
        closeDialogCommon(short, dialog);

        // Next level logic
        mathData.questionsAnswered++;
        if (mathData.questionsAnswered >= 10) {
          mathData.questionsAnswered = 0;
          
          mathData.level = mathData.level < 4 ? mathData.level + 1 : 4; // Increments the level to a max level of 4
        }
      }
      else {
        answerBox.value = "";
      }
    };

    container.appendChild(button);
    dialog.appendChild(container);
  }

  // WORD UNSCRAMBLE
  else if (mode === "unscramble") {
    const word = unscrambleWordList[randomNumber(0,99)];
    const scrambled = scrambleWord(word);

    const container = document.createElement("div");
    container.id = "unscrContainer";

    const docWord = document.createElement("p");
    docWord.id = "unscrWord"
    docWord.textContent = scrambled;
    container.appendChild(docWord);

    const textBox = document.createElement("input");
    textBox.type = "text";
    textBox.id = "unscrAnswer"
    container.appendChild(textBox);

    const unscrButton = document.createElement("button");
    unscrButton.id = "unscrButton";
    unscrButton.textContent = "Submit";
    unscrButton.onclick = () => {
      if (textBox.value.toLowerCase().trim() === word) {
        closeDialogCommon(short, dialog);
      }
      else {
        textBox.value = "";
      }
    }
    container.appendChild(unscrButton);

    dialog.appendChild(container);
  }

  // REACTION TIME
  else if (mode === "reaction") {
    const reactionCutoff = 250;

    const bg = document.createElement("div");
    bg.id = "reactBg";
    bg.className = "red";

    const text = document.createElement("div");
    text.id = "reactText";

    ["Click the button as fast as possible when the background turns green",
      `Must beat a ${reactionCutoff}ms reaction time to close`,
      "Click start to begin"
    ].forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      text.appendChild(p);
    })

    bg.appendChild(text);

    const button = document.createElement("button");
    button.textContent = "Start";
    button.onclick = () => {
      text.remove();
      button.textContent = "";

      button.onclick = () => {};

      setTimeout(() => {
        bg.className = "green";
        let t1 = new Date();

        button.onclick = () => {
          let t2 = new Date();
          let reactionTime = t2.getTime() - t1.getTime()
          
          const reaction = document.createElement("p");
          reaction.textContent = `${reactionTime} ms`;
          bg.appendChild(reaction);

          button.textContent = reactionTime <= reactionCutoff ? "Close" : "Try Again";
          button.onclick = () => {
            closeDialogCommon(short, dialog);
            if (reactionTime > reactionCutoff) {
              const dialog = createDialog(short);
              document.body.appendChild(dialog);
              dialog.showModal();
              short.pause();
            }
          }
        }
      }, randomNumber(3000, 7000))
    }
    bg.appendChild(button);

    dialog.appendChild(bg);
  }
  return dialog;
}

// Generates a random number between min inclusive and max inclusive
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Takes a word and scrambles it without modifying the original word
function scrambleWord(word) {
  let letters = word.split(""); 

  // Fisher-Yates shuffle
  let currentIndex = letters.length;
  while (currentIndex > 0) {
    // Get the random index
    let randomIndex = randomNumber(0, currentIndex);

    // Swap current with random
    [letters[currentIndex], letters[randomIndex]] = [letters[randomIndex], letters[currentIndex]];

    currentIndex--;    
  }

  return letters.join("");
}

function getVideo(site) {
  let short;
  if (site === "shorts") {
    // There are 2 video elements so we find the one with the src
    short = Array.from(document.querySelectorAll("video")).filter(
      (video) => video.src
    )[0];
  } else if (site === "reels") {
    // Many, many reels are loaded at a time so we find the currently playing one
    document.querySelectorAll("video").forEach((vid) => {
      if (!vid.paused) {
        short = vid;
      }
    });
  }

  return short;
}

function preventScroll(evt) {
  const blockedKeys = ['ArrowUp', 'ArrowDown'];
  if (blockedKeys.includes(evt.key)) {
    evt.stopImmediatePropagation();
    evt.preventDefault();
  }
}

function closeDialogCommon(short, dialog) {
  if (short) {
    short.play();
  }
  
  dialog.remove(); // Prevents the dialogs from polluting the dom with many hidden dialog boxes
  document.removeEventListener("keydown", preventScroll, true); // Allows scrolling when dialog is closed
}
