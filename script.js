// Sidebar menu toggling logic 
let openMenuButton = document.getElementById('open-menu-button');
let closeMenuButton = document.getElementById('close-menu-button');
let sidebar = document.getElementById('sidebar');
let menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', function() {
        alert('Not availiable yet');
    })
})

openMenuButton.addEventListener('click', function() {
    sidebar.classList.remove('hidden');
})

closeMenuButton.addEventListener('click', function() {
    sidebar.classList.add('hidden');
})

const answer = 'logic';

// User input logic
// Store all rows of user input
const rows = document.querySelectorAll('.guess-row');
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

function validateAnswer(input) {
    if(/^[a-zA-Z]{5}/.test(input)) {
        input.toLowerCase() == answer ? alert('Congratulations!! You win')
                                      : alert('Not quite the answer')
    } else {
        alert("That's not a word");
    }
}

let word = '';
let isValidationComplete = false;

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

    // Disable all input tiles except those in the current row
    row.addEventListener('focusin', () => {
        rows.forEach(otherRow => {
            if (otherRow !== row) {
                otherRow.querySelectorAll('.user-input-tile').forEach(tile => {
                    tile.disabled = true;
                });
            }
        });
    });

    // Enable all input tiles when the row loses focus
    row.addEventListener('focusout', () => {
        rows.forEach(otherRow => {
            otherRow.querySelectorAll('.user-input-tile').forEach(tile => {
                tile.disabled = false;
            });
        });
    });

    // Focus the first tile of the first row initially
    if (index === 0) {
        const firstTile = row.querySelector('.user-input-tile');
        if (firstTile) {
            firstTile.focus();
        }
    }
});