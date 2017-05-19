// Variable instantiation
var words = ["spayed", "neutered", "claws", "hairball", "kneading", "cheezburger"];
var wrongImageSrcs = ["notail.jpg", "3legs.jpg", "2legs.jpg", "oneleg.jpg", "nolegs.jpg", "head.jpg"];
var dashes = [];
var word;
var index = 0;
var numCorrect;
var numWrong;
var numGuessesRemaining;

// Web Elements
var numCorrectGuesses = document.getElementById("correct");
var numWrongGuesses = document.getElementById("incorrect");
var numRemainingGuesses = document.getElementById("remaining");
var wordArea = document.getElementById("word");

// Updates the tallies for correct, incorrect, and num remaining
var updateGuessCounts = function () {
    numCorrectGuesses.textContent = numCorrect;
    numWrongGuesses.textContent = numWrong;
    numRemainingGuesses.textContent = numGuessesRemaining;
};

// Resets counters when new game started
var initializeGuessCounts = function () {
    numCorrect = 0;
    numWrong = 0;
    numGuessesRemaining = 7;
    updateGuessCounts();
};

// Updates the word area as letters are revealed
var updateWord = function () {
    wordArea.textContent = dashes.join("");
};

// Checks to see if guessed letter is present in word
var checkForAndRevealLetter = function (guess) {
    for (var i = 0; i < word.length; i++) {
        if (word[i] == guess) dashes[i] = guess.toUpperCase();
    }
    updateWord();
};

// Check if the visible string is the correct word
var hasWon = function () {
    return (dashes.join("").toLowerCase() === word);
};

// Check if num guesses is 0
var hasLost = function () {
    return numGuessesRemaining == 0;
};

var addImageToModal = function (src) {
    $("#catImg").attr("src", "css/images/"+src)
};

var changeElementText = function (id, text) {
    $("#" + id).text(text);
};

var displayMsgModal = function () {
    $('#myModal').modal('show');
};


// If guess was right
var guessedRight = function () {
    numCorrect++;
    updateGuessCounts();
    if (hasWon()) {
        setTimeout(function () {
            changeElementText("userMsg", "U SAVED KITTEH!!!");
            changeElementText("okBtn", "YAY!!!");
            addImageToModal("win.jpg");
            displayMsgModal();
        }, 0);
    }
};

// If guess was wrong
var guessedWrong = function () {
    numWrong++;
    numGuessesRemaining--;
    updateGuessCounts();
    if (hasLost()) {
        changeElementText("userMsg", "U KILLED KITTEH!!!");
        addImageToModal("dead.jpg");
        displayMsgModal();
    }
    else {
        addImageToModal(wrongImageSrcs[numWrong-1]);
        displayMsgModal();
    }
};

// Displays a new word
var displayNewWord = function () {
    initializeGuessCounts();
    $('.disabled').removeClass('disabled');
    if (index < words.length) {
        word = words[index];
        console.log(word);
        dashes = new Array(word.length).fill('-');
        index++;
        updateWord();
    } else {
        alert("OUT OF WORDS!")
    }
};

// Triggers when user clicks letter to guess
var guessLetter = function (guess) {
    guess = guess.toLowerCase();
    if (word.indexOf(guess) != -1) {
        checkForAndRevealLetter(guess);
        guessedRight();
    } else {
        guessedWrong();
    }
};

// Handles enabling and disabling of buttons as they are clicked
$(function () {
    $('.btn-custom').on('click', function (evt) {
        if (!hasWon() && !hasLost() && !$(evt.target).hasClass('disabled')) {
            guessLetter(evt.target.innerText);
            $(evt.target).addClass('disabled');
            changeElementText("userMsg", "HOOMAN! LOOK WAT U DID TO KITTEH!!!");
            changeElementText("okBtn", "OMG SO SORRY");
        }
    });
});
