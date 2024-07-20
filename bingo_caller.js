function playRecordedAudio(letter, number) {
    // Base URL for the audio files on your GitHub repository
    const baseURL = 'https://github.com/barock7/Friends/blob/main/audio-clips';

    // Construct the URL for the letter audio file
    const audioLetterURL = `${baseURL}/${letter}.mp3`;
    console.log(`Playing letter audio from URL: ${audioLetterURL}`);

    // Construct the URL for the number audio file
    const audioNumberURL = `${baseURL}/${letter}${number}.mp3`;
    console.log(`Playing number audio from URL: ${audioNumberURL}`);

    // Create audio objects
    const audioLetter = new Audio(audioLetterURL);
    const audioNumber = new Audio(audioNumberURL);

    // Play the letter audio first
    audioLetter.play();

    // Once the letter audio finishes, play the number audio
    audioLetter.addEventListener('ended', () => {
        console.log(`Finished playing letter audio. Now playing number audio from URL: ${audioNumberURL}`);
        audioNumber.play();
    });

    // Error handling for audio playback
    audioLetter.addEventListener('error', (e) => {
        console.error(`Error playing letter audio: ${e}`);
    });

    audioNumber.addEventListener('error', (e) => {
        console.error(`Error playing number audio: ${e}`);
    });
}

// Example usage
playRecordedAudio('B', '3');
playRecordedAudio('B', '6');
playRecordedAudio('B', '8');
playRecordedAudio('B', '9');
playRecordedAudio('B', '10');
playRecordedAudio('B', '11');
playRecordedAudio('B', '12');
playRecordedAudio('B', '13');
playRecordedAudio('B', '14');
playRecordedAudio('B', '15');
playRecordedAudio('I', '16');
playRecordedAudio('I', '17');
playRecordedAudio('I', '18');
playRecordedAudio('I', '19');
playRecordedAudio('I', '20');
playRecordedAudio('I', '21');
playRecordedAudio('I', '22');
playRecordedAudio('I', '23');
playRecordedAudio('I', '24');
playRecordedAudio('I', '25');
playRecordedAudio('I', '26');
playRecordedAudio('I', '27');
playRecordedAudio('I', '28');
playRecordedAudio('I', '29');
playRecordedAudio('I', '30');
playRecordedAudio('N', '31');
playRecordedAudio('N', '32');
playRecordedAudio('N', '33');
playRecordedAudio('N', '34');
playRecordedAudio('N', '35');
playRecordedAudio('N', '36');
playRecordedAudio('N', '37');
playRecordedAudio('N', '38');
playRecordedAudio('N', '39');
playRecordedAudio('N', '40');
playRecordedAudio('N', '41');
playRecordedAudio('N', '42');
playRecordedAudio('N', '43');
playRecordedAudio('N', '44');
playRecordedAudio('N', '45');
playRecordedAudio('G', '46');
playRecordedAudio('G', '47');
playRecordedAudio('G', '48');
playRecordedAudio('G', '49');
playRecordedAudio('G', '50');
playRecordedAudio('G', '51');
playRecordedAudio('G', '52');
playRecordedAudio('G', '53');
playRecordedAudio('G', '54');
playRecordedAudio('G', '55');
playRecordedAudio('G', '56');
playRecordedAudio('G', '57');
playRecordedAudio('G', '58');
playRecordedAudio('G', '59');
playRecordedAudio('G', '60');
playRecordedAudio('O', '61');
playRecordedAudio('O', '62');
playRecordedAudio('O', '63');
playRecordedAudio('O', '64');
playRecordedAudio('O', '65');
playRecordedAudio('O', '66');
playRecordedAudio('O', '67');
playRecordedAudio('O', '68');
playRecordedAudio('O', '69');
playRecordedAudio('O', '70');
playRecordedAudio('O', '71');
playRecordedAudio('O', '72');
playRecordedAudio('O', '73');
playRecordedAudio('O', '74');
playRecordedAudio('O', '75');
document.addEventListener('DOMContentLoaded', () => {
    const intervalSelect = document.getElementById('interval-select');
    const callNumberButton = document.getElementById('call-number-button');
    const playPauseButton = document.getElementById('play-pause-button');
    const endGameButton = document.getElementById('end-game-button');
    const checkWinnerButton = document.getElementById('check-winner-button');
    const calledNumberElement = document.getElementById('called-number');
    const calledNumbersContainer = document.getElementById('called-numbers-container');
    const totalBetAmountElement = document.getElementById('total-bet-amount');
    const countdownElement = document.getElementById('countdown');
    const totalCallsElement = document.getElementById('total-calls');
    const winnerModalBody = document.getElementById('winner-modal-body');
    const rows = {
        B: document.getElementById('row-B'),
        I: document.getElementById('row-I'),
        N: document.getElementById('row-N'),
        G: document.getElementById('row-G'),
        O: document.getElementById('row-O')
    };

    const numbers = {
        B: Array.from({ length: 15 }, (_, i) => i + 1),
        I: Array.from({ length: 15 }, (_, i) => i + 16),
        N: Array.from({ length: 15 }, (_, i) => i + 31),
        G: Array.from({ length: 15 }, (_, i) => i + 46),
        O: Array.from({ length: 15 }, (_, i) => i + 61),
    };

    const calledNumbers = new Set();
    let intervalId = null;
    let paused = false;
    let totalCalls = 0;
    let countdownValue = 0;

    const ballColors = {
        B: 'red',
        I: 'orange',
        N: 'yellow',
        G: 'green',
        O: 'blue'
    };

    function initializeBoard() {
        for (const [letter, nums] of Object.entries(numbers)) {
            for (const num of nums) {
                const div = document.createElement('div');
                div.classList.add('number');
                div.textContent = num;
                div.dataset.number = `${letter}${num}`;
                rows[letter].appendChild(div);
            }
        }
    }

    function getRandomNumber() {
        const availableNumbers = [];
        for (const [letter, nums] of Object.entries(numbers)) {
            for (const num of nums) {
                const number = `${letter}${num}`;
                if (!calledNumbers.has(number)) {
                    availableNumbers.push(number);
                }
            }
        }
        if (availableNumbers.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        return availableNumbers[randomIndex];
    }

    function callNumber() {
        const number = getRandomNumber();
        if (!number) return;
        calledNumbers.add(number);
        totalCalls += 1;

        // Save the called numbers to localStorage
        localStorage.setItem('called_numbers', JSON.stringify(Array.from(calledNumbers)));

        const [letter, num] = [number[0], parseInt(number.slice(1))];
        const numberElement = [...rows[letter].children].find(
            (div) => parseInt(div.textContent) === num
        );
        numberElement.classList.add('called');

        calledNumberElement.innerHTML = `<div class="ball ${letter.toLowerCase()}" ><span>${letter}</span><span>${num}</span></div>`;
        const calledNumberItem = document.createElement('div');
        calledNumberItem.classList.add('called-number-item', letter.toLowerCase());
        calledNumberItem.innerHTML = `<span>${letter}</span><span>${num}</span>`;

        // Show only the 4 most recently called numbers
        if (calledNumbersContainer.children.length >= 4) {
            calledNumbersContainer.removeChild(calledNumbersContainer.firstChild);
        }
        calledNumbersContainer.appendChild(calledNumberItem);

        totalCallsElement.textContent = `Total Calls: ${totalCalls}`;
        startCountdown();
        playRecordedAudio(letter, num);
    }

    function startCountdown() {
        countdownValue = parseInt(intervalSelect.value);
        countdownElement.textContent = countdownValue;

        const countdownInterval = setInterval(() => {
            if (countdownValue > 1) {
                countdownValue -= 1;
                countdownElement.textContent = countdownValue;
            } else {
                clearInterval(countdownInterval);
            }
        }, 1500);
    }

    function endGame() {
        // Record the bet amount at the end of the game
        recordBetAmount();

        // Clear localStorage
        localStorage.removeItem('called_numbers');
        localStorage.removeItem('bingo_boards');
        localStorage.removeItem('selected_boards');
        localStorage.removeItem('bet_amount');

        // Reset the game state
        calledNumbers.clear();
        calledNumberElement.textContent = '';
        calledNumbersContainer.innerHTML = '';
        totalCalls = 0;
        totalCallsElement.textContent = `Total Calls: ${totalCalls}`;
        countdownElement.textContent = '';

        // Reset board UI
        Object.keys(rows).forEach(letter => {
            while (rows[letter].firstChild) {
                rows[letter].removeChild(rows[letter].firstChild);
            }
        });

        // Reinitialize the board
        initializeBoard();

        // Redirect to select_board.html
        window.location.href = 'index.html';
    }

    function startCallingNumbers() {
        const interval = parseInt(intervalSelect.value) * 1500;
        callNumber();
        intervalId = setInterval(() => {
            if (!paused) callNumber();
        }, interval);
    }

    function stopCallingNumbers() {
        clearInterval(intervalId);
    }

    function checkWinner() {
        const boardNumber = parseInt(document.getElementById('board-number-input').value);
        if (isNaN(boardNumber) || boardNumber < 1) {
            showModal('Please enter a valid board number.');
            return;
        }

        const boards = JSON.parse(localStorage.getItem('bingo_boards'));
        const selectedIndices = JSON.parse(localStorage.getItem('selected_boards'));
        const calledNumbersSet = new Set(JSON.parse(localStorage.getItem('called_numbers')));

        if (!boards || boardNumber > boards.length) {
            showModal('Board number not found.');
            return;
        }

        if (!selectedIndices.includes(boardNumber - 1)) {
            showModal(`Board number ${boardNumber} is not registered.`);
            return;
        }

        const board = boards[boardNumber - 1];
        const winningPattern = checkBoard(board);
        const hasWon = winningPattern !== null;
        showModal(`ካርቴላ ${boardNumber} ${hasWon ? 'ዘግቷል!😎' : 'አልዘጋም!😡'}`, board, calledNumbersSet, hasWon ? winningPattern : []);
        playPopupSound(hasWon);
    }

    function checkBoard(board) {
        const winningPatterns = [
            // Horizontal patterns
            [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]],
            [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4]],
            [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4]],
            [[3, 0], [3, 1], [3, 2], [3, 3], [3, 4]],
            [[4, 0], [4, 1], [4, 2], [4, 3], [4, 4]],
            // Vertical patterns
            [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]],
            [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1]],
            [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2]],
            [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3]],
            [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
            // Diagonal patterns
            [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]],
            [[0, 4], [1, 3], [2, 2], [3, 1], [4, 0]],
            // Adjacent to free cell diagonal patterns
            [[1, 1], [2, 2], [3, 3], [1, 3], [3, 1]],
            // Corners and free spot patterns
            [[0, 0], [0, 4], [2, 2], [4, 0], [4, 4]],
            // Full board pattern
            [...Array(5).keys()].flatMap(i => [...Array(5).keys()].map(j => [i, j]))
        ];

        for (const pattern of winningPatterns) {
            if (pattern.every(([r, c]) => calledNumbers.has(`${'BINGO'[c]}${board[r][c]}`) || board[r][c] === 'FREE')) {
                return pattern;
            }
        }
        return null;
    }

    function showModal(message, board = null, calledNumbersSet = null, winningPattern = []) {
        winnerModalBody.innerHTML = `<p>${message}</p>`;
        if (board) {
            const boardElement = renderBingoBoard(board, calledNumbersSet, winningPattern);
            winnerModalBody.appendChild(boardElement);
        }
        $('#winnerModal').modal('show');
    }

    function renderBingoBoard(board, calledNumbersSet, winningPattern = []) {
        const boardContainer = document.createElement('div');
        boardContainer.classList.add('bingo-board', 'shadow-sm', 'rounded', 'mb-4');

        const headers = ['B', 'I', 'N', 'G', 'O'];
        const headerClasses = ['header-b', 'header-i', 'header-n', 'header-g', 'header-o'];
        headers.forEach((header, index) => {
            const headerCell = document.createElement('div');
            headerCell.textContent = header;
            headerCell.classList.add('header', headerClasses[index]);
            boardContainer.appendChild(headerCell);
        });

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const cellElement = document.createElement('div');
                cellElement.textContent = board[i][j];
                const cellValue = board[i][j];

                if (cellValue === 'FREE') {
                    cellElement.classList.add('free');
                } else {
                    const cellId = `${headers[j]}${cellValue}`;
                    if (winningPattern.some(([r, c]) => r === i && c === j)) {
                        cellElement.classList.add('winning-cell');
                    } else if (calledNumbersSet.has(cellId)) {
                        cellElement.classList.add('called-cell');
                    }
                }
                boardContainer.appendChild(cellElement);
            }
        }

        return boardContainer;
    }

    function recordBetAmount() {
        const selectedIndices = JSON.parse(localStorage.getItem('selected_boards'));
        const betAmount = localStorage.getItem('bet_amount');
        const currentDate = new Date().toLocaleString();
        const branchEmail = localStorage.getItem('branch_email'); // Assume branch email is stored in localStorage
    
        if (selectedIndices && selectedIndices.length > 0 && betAmount) {
            const totalBetAmount = selectedIndices.length * parseFloat(betAmount);
            const profit = totalBetAmount * 0.2; // 20% profit
    
            let betHistory = JSON.parse(localStorage.getItem('bet_history')) || [];
            betHistory.push({
                branchEmail,
                date: currentDate,
                amount: totalBetAmount.toFixed(2),
                totalCalls,
                totalPlayers: selectedIndices.length,
                profit: profit.toFixed(2)
            });
            localStorage.setItem('bet_history', JSON.stringify(betHistory));
        }
    }
    


    function displayTotalBetAmount() {
        const selectedIndices = JSON.parse(localStorage.getItem('selected_boards'));
        const betAmount = localStorage.getItem('bet_amount');
        if (selectedIndices && selectedIndices.length > 0 && betAmount) {
            const totalBetAmount = selectedIndices.length * parseFloat(betAmount);
            const reducedBetAmount = totalBetAmount * 0.8; // Calculate 20% less
            totalBetAmountElement.innerHTML = `<span>ደራሽ:</span><span>${reducedBetAmount.toFixed(2)}</span>`;
        } else {
            totalBetAmountElement.innerHTML = 'ደራሽ: 0';
        }
    }

    function playPopupSound(isClear) {
        const clearSound = document.getElementById('clear-result-sound');
        const unclearSound = document.getElementById('unclear-result-sound');
        console.log('Playing sound:', isClear ? 'clear' : 'unclear');
        if (isClear) {
            clearSound.play().catch(e => console.log('Failed to play clear sound:', e));
        } else {
            unclearSound.play().catch(e => console.log('Failed to play unclear sound:', e));
        }
    }

    callNumberButton.addEventListener('click', startCallingNumbers);
    playPauseButton.addEventListener('click', () => {
        paused = !paused;
        playPauseButton.textContent = paused ? 'Resume' : 'Pause';
    });
    endGameButton.addEventListener('click', endGame);
    checkWinnerButton.addEventListener('click', checkWinner);

    initializeBoard();
    displayTotalBetAmount();
});
