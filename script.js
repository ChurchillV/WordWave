let openMenuButton = document.getElementById('open-menu-button');
let closeMenuButton = document.getElementById('close-menu-button');
let sidebar = document.getElementById('sidebar');
let menuItems = document.querySelectorAll('.menu-item');
let mainBody = document.getElementById('main-body');
let alertBox = document.getElementById('alert-box');
let modalIcon = document.getElementById('modal-icon');
let modalInfo = document.getElementById('modal-info');
let resetButton = document.getElementById('reset-button');
let okButton = document.getElementById('ok-button');

// Arrays of letters entered by the user
const greenLetters = [];
const yellowLetters = [];
const redLetters = [];

// Display the number of letters of each colour
document.querySelectorAll('.green-letters').innerText = greenLetters.length;
document.querySelectorAll('.yellow-letters').innerText = yellowLetters.length;
document.querySelectorAll('.red-letters').innerText = redLetters.length;


// No functionality for sidebar items yet
menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', function() {
        alert('Not availiable yet');
    })
})


// Sidebar menu toggling logic 
openMenuButton.addEventListener('click', function() {
    sidebar.classList.remove('hidden');
})

closeMenuButton.addEventListener('click', function() {
    sidebar.classList.add('hidden');
})


// Temporary answer (For testing)
const answer = 'logic';

// User input logic
// Store all rows of user input
const rows = document.querySelectorAll('.guess-row');
const userTiles = document.querySelectorAll('.user-input-tile');

// Submit button appears once a user fills a row
let submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', function() {
    console.log(word);
    validateAnswer(word);
    submitButton.classList.add('hidden');
})

// Function to focus the first tile of the next row
function focusFirstTileOfNextRow(currentRow) {
    const nextRow = currentRow.nextElementSibling;
    if (nextRow) {
        const firstTile = nextRow.querySelector('.user-input-tile');
        if (firstTile) {
            firstTile.focus();
        }
    }
}

const successMessage = "<p>Congratulations <span class='text-2xl'>🎊</span></p><p>You win</p>";
const successIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='7em' height='7em' viewBox='0 0 24 24'><path fill='currentColor' d='M2 22L7 8l9 9zm12.55-9.45L13.5 11.5l7.525-7.525L23.55 6.5L22.5 7.55l-1.475-1.475zm-4-4L9.5 7.5l1.45-1.45l-1.5-1.5L10.5 3.5l2.55 2.55zm2 2L11.5 9.5l4.475-4.475L13.5 2.55l1.05-1.05l3.525 3.525zm4 4L15.5 13.5l3.525-3.525L22.55 13.5l-1.05 1.05l-2.475-2.475z'/></svg>"
const incorrectAnswerMessage = "<p>Not quite the answer</p>";
const failureIcon = "<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'><path stroke-linecap='round' stroke-linejoin='round' d='M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z' /></svg>"

// Function to display alert box on winning
function displaySuccess() {
    alertBox.classList.remove('hidden');
    alertBox.classList.add('grid');
    okButton.classList.remove('hidden');
    modalIcon.innerHTML = successIcon;
    modalIcon.classList.add('bg-green-500');
    modalInfo.innerHTML = successMessage;

    document.body.classList.add('bg-slate-400');

    // Loop through each input tile and set contenteditable to false
    userTiles.forEach(tile => {
        tile.contentEditable = 'false';
    });  
}

// Function to notify user of a wrong answer
function displayError() {
    alertBox.classList.remove('hidden');
    alertBox.classList.add('grid');
    modalIcon.innerHTML = failureIcon;
    modalIcon.classList.add('bg-red-300');
    modalInfo.innerHTML = incorrectAnswerMessage;
    
    document.body.classList.add('bg-slate-400');
    setTimeout(() => {
        alertBox.classList.add('hidden');
        alertBox.classList.remove('grid');
        document.body.classList.remove('bg-slate-400');
    }, 1000);
}



// Remove the alert box once the ok button is clicked
okButton.addEventListener('click', function() {
    alertBox.classList.remove('grid');
    alertBox.classList.add('hidden');
    document.body.classList.remove('bg-slate-400');

    resetButton.classList.remove('hidden');
})

resetButton.addEventListener('click', function() {
    location.reload();
})

/**
 * Iterate through each tile and check whether it matches the letter at
 * the corresponding index.
// 🟩 - In the word, correct position
// 🟨 - In the word, wrong position
// 🔴 - Not in the word
 * 
 */
async function analyseAnswer() {
    // Create a promise to handle the asynchronous setTimeout calls
    return new Promise(resolve => {
        userTiles.forEach((tile, index) => {
            const letter = answer[index];
            const userInput = tile.innerText.trim().toLowerCase();
            console.log('Checking');
            
            setTimeout(() => {
                tile.classList.add('text-white');
                if (userInput === letter) {
                    tile.classList.add('bg-green-500'); // 🟩
                    if(!greenLetters.includes(userInput)) {
                        greenLetters.push(userInput); 
                        document.querySelector('.green-letters').textContent = greenLetters.length;
                        document.querySelector('.green-letters-2').textContent = greenLetters.length;
                        console.log("done");
                        console.log(greenLetters);
                    }
                } else if (answer.includes(userInput)) {
                    tile.classList.add('bg-yellow-500'); // 🟨 
                    if(!yellowLetters.includes(userInput)) {
                        yellowLetters.push(userInput); 
                        document.querySelector('.yellow-letters').textContent = yellowLetters.length;
                        document.querySelector('.yellow-letters-2').textContent = yellowLetters.length;
                        console.log("done");
                        console.log(yellowLetters);
                    }
                } else {
                    tile.classList.add('bg-red-500'); // 🔴
                    if(!redLetters.includes(userInput)) {
                        redLetters.push(userInput); 
                        document.querySelector('.red-letters').textContent = redLetters.length;
                        document.querySelector('.red-letters-2').textContent = redLetters.length;
                        console.log("done");
                        console.log(redLetters);
                    }
                }

                // Resolve the promise after all setTimeout calls are completed
                if (index+1 === userTiles.length) {
                    setTimeout(()=> {
                        resolve();
                    }, 1000);
                }
            }, index * 500);
        });
    });
}

/**
 * Reset all tiles to original color and clear text in case of incorrect answer
 */
function resetTiles() {
    displayError(); 
    userTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.remove('bg-green-500', 'bg-yellow-500', 'bg-red-500', 'text-white');
            tile.innerText = '';
        }, index * 10);
    })

    userTiles[0].focus();
}


async function validateAnswer(input) {
    await analyseAnswer();

    if(/^[a-zA-Z]{5}/.test(input)) {
        input.toLowerCase() == answer ? displaySuccess()
                                      : resetTiles();
    } else {
        alert("That's not a word");
    }
}

let word = '';
let isValidationComplete = false;


// Handle keypress events for each row in the grid
rows.forEach((row, index) => {
    const tiles = Array.from(row.querySelectorAll('.user-input-tile'));

    row.addEventListener('keypress', event => {
        const currentIndex = tiles.findIndex(tile => tile === document.activeElement);

        if (event.key.length === 1 && /^[a-zA-Z]$/.test(event.key)) {
            event.preventDefault();
            if (currentIndex < tiles.length) {
                tiles[currentIndex].innerText = event.key.toUpperCase();
                const nextIndex = currentIndex + 1;

                if (nextIndex < tiles.length) {
                    tiles[nextIndex].focus();

                } else {
                    word = tiles.map(tile => tile.innerText.trim()).join('');
                    console.log(word);
                    submitButton.classList.remove('hidden');
                    if(submitButton.classList.contains('hidden')) {
                        focusFirstTileOfNextRow(row);
                    }
                }
            }
        } else if (event.key === 'Enter') {
            focusFirstTileOfNextRow(row);
        }
    });

    // Focus the first tile of the first row initially
    if (index === 0) {
        const firstTile = row.querySelector('.user-input-tile');
        if (firstTile) {
            firstTile.focus();
        }
    }
});