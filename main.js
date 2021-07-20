const Gameboard = (() => {
	const board = [null, null, null, 
					null, null, null, 
					null, null, null];
	const _size = 9;
	const size = () => _size;
	const at = (i) => board[i];
	const setAt = (i, val) => {
		board[i] = val;
	};
	const rowAt = (i) => [board[i * 3], board[i * 3 + 1], board[i * 3 + 2]];
	const colAt = (i) => [board[i], board[i + 3], board[i + 6]];
	const forwardDiag = () => [board[2], board[4], board[6]]; // '/' diag
	const backDiag = () => [board[0], board[4], board[8]]; // '\' diag
	const toString = () => {
		let str = "";
		board.forEach(e => {
			str += `${e} `;
		});
		return str.trim();
	};
	const print = () => {
		console.log(toString());
	};
	const reset = () => {
		for (let i = 0; i < board.length; i++) {
			board[i] = null;
		}
	};
	return {
		size,
		at,
		setAt,
		rowAt,
		colAt,
		forwardDiag,
		backDiag,
		toString,
		print,
		reset,
	};
})();

const DOMGenerator = (() => {
	const gameDiv = document.querySelector("#game");
	const resetBtn = document.querySelector("#reset");
	const statusDiv = document.querySelector("#status");
	const initBoard = () => {
		divs = [];
		for (let i = 0; i < Gameboard.size(); i++) {
			divs.push(document.createElement('div'));
			divs[i].id = i;
			divs[i].classList.add("grid-item");
			divs[i].textContent = Gameboard.at(i);
			divs[i].onclick = (e) => {
				Interaction.updateBoard(i);
			};
		}
		divs.forEach(e => {
			gameDiv.appendChild(e);
		});
		resetBtn.onclick = (e) => {
			Interaction.reset();	
		};
	};
	const refreshRender = (i, val) => {
		const box = document.getElementById(i);
		box.textContent = val;
	};
	const refreshRenderAll = () => {
		for (let i = 0; i < Gameboard.size(); i++) {
			document.getElementById(i).textContent = Gameboard.at(i);
		}
		statusDiv.textContent = null;
	}
	const showEndScreen = (winner) => {
		statusDiv.textContent = `Game over! Player ${winner} is the winner!`;
	};
	return {
		initBoard,
		refreshRender,
		refreshRenderAll,
		showEndScreen,
	};
})();

const Interaction = (() => {
	let _turn = 'x';
	let _playing = true;
	const turn = () => _turn;
	const endTurn = () => {
		if (_turn == 'x') {
			_turn = 'o';
		} else {
			_turn = 'x';
		}
	};
	const playing = () => _playing;
	const stopPlaying = () => _playing = false;
	const threeInARow = (arr) => {
		return arr[0] && arr[0] == arr[1] && arr[0] == arr[2];
	}
	const isEndState = () => {
		for (let i = 0; i < 3; i++) {
			if (threeInARow(Gameboard.rowAt(i)) 
				|| threeInARow(Gameboard.colAt(i))) {
				return true;
			}
		}
		return threeInARow(Gameboard.forwardDiag()) 
			|| threeInARow(Gameboard.backDiag());
	};
	const updateBoard = (i) => {
		if (playing() && !Gameboard.at(i)) {
			Gameboard.setAt(i, turn());
			DOMGenerator.refreshRender(i, turn());
			if (isEndState()) {
				stopPlaying();
				DOMGenerator.showEndScreen(turn());
				return;
			}
			endTurn();
		}
	};
	const reset = () => {
		_turn = 'x';
		_playing = true;
		Gameboard.reset();
		DOMGenerator.refreshRenderAll();
	};
	const main = () => {
		DOMGenerator.initBoard();
	};
	return {
		updateBoard,
		reset,
		main,
	};
})();

Interaction.main();
