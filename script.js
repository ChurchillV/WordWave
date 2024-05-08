let openMenuButton = document.getElementById('open-menu-button');
let closeMenuButton = document.getElementById('close-menu-button');
let sidebar = document.getElementById('sidebar');
let menuItems = document.querySelectorAll('.menu-item');
let mainBody = document.getElementById('main-body');
let alertBox = document.getElementById('alert-box');
let resetButton = document.getElementById('reset-button');

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

// Function to display alert box on winning
function displaySuccess() {
    document.body.classList.add('bg-slate-400');
    alertBox.classList.remove('hidden');
    alertBox.classList.add('grid');

    // Loop through each input tile and set contenteditable to false
    userTiles.forEach(tile => {
        tile.contentEditable = 'false';
    });  
}

// Remove the alert box once the ok button is clicked
document.getElementById('ok-button').addEventListener('click', function() {
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
                } else if (answer.includes(userInput)) {
                    console.log('Yellow');
                    tile.classList.add('bg-yellow-500'); // 🟨 
                } else {
                    console.log('Red');
                    tile.classList.add('bg-red-500'); // 🔴
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
 * Reset all tiles to original color and clear text
 */
function resetTiles() {
    userTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.remove('bg-green-500', 'bg-yellow-500', 'bg-red-500', 'text-white');
            tile.innerText = '';
        }, index*500);
    })

    userTiles[0].focus();
}


async function validateAnswer(input) {
    await analyseAnswer();

    if(/^[a-zA-Z]{5}/.test(input)) {
        input.toLowerCase() == answer ? displaySuccess()
                                      : alert('Not quite the answer')
    } else {
        alert("That's not a word");
    }

    resetTiles();
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