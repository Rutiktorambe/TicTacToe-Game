let currentPlayer = "";
const nought = "⭕";
const cross = "❌";
const currentPlayerEle = document.querySelector("#current-player");
const overlayEle = document.querySelector(".overlay");
const winnerMsgEle = document.querySelector(".winner-message");
const restartEle = document.querySelector(".restart");
const GRID_ITEMS = document.querySelectorAll(".grid-item");
const WINNING_COMBOS = [
    // Left / Right
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	
    // Top / Down
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	
    // Diagonal
	[0, 4, 8],
	[2, 4, 6]
];

function init() {
    currentPlayer = cross;
    _showCurrentPlayer();
}

function reset() {
    overlayEle.classList.toggle("game-over");
    winnerMsgEle.innerText = '';
    GRID_ITEMS.forEach((item) => {
        item.innerText = '';
    });

    init();
}

function _changeCurrentPlayer() {
	return currentPlayer = currentPlayer === cross ? nought : cross;
}

function _showCurrentPlayer() {
    currentPlayerEle.innerText = currentPlayer;
}

function _checkWin() {
	return WINNING_COMBOS.some(combo => {
        return combo.every(c => { 
            return GRID_ITEMS[c].innerText == currentPlayer;
        });
    });
}

function _checkDraw() {
    return [...GRID_ITEMS].every(item => {
        return item.innerText.includes(cross) || item.innerText.includes(nought);
    });
}

GRID_ITEMS.forEach((item) => {
	item.addEventListener("click", e => {
        if(e.currentTarget.innerText) return;
		e.currentTarget.innerText = currentPlayer;
        if(_checkDraw()) {
            winnerMsgEle.innerText = `It's a Draw!`
            overlayEle.classList.toggle("game-over");
            return;
        }
        
        if(_checkWin()) {
            winnerMsgEle.innerText = `${currentPlayer} Wins!`
            overlayEle.classList.toggle("game-over");
            return;
        }
        _changeCurrentPlayer();
        _showCurrentPlayer();
	});
});

restartEle.addEventListener("click", () => {
    reset();
});

init();