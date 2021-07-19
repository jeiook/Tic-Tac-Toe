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
		toString,
		print,
		reset,
	};
})();

const DOMGenerator = (() => {
	const gameDiv = document.querySelector("#game");
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
	};
	const refreshRender = (i, val) => {
		const box = document.getElementById(i);
		box.textContent = val;
	}
	return {
		initBoard,
		refreshRender
	};
})();

const Interaction = (() => {
	let _turn = 'x'
	const turn = () => _turn;
	const endTurn = () => {
		if (_turn == 'x') {
			_turn = 'o';
		} else {
			_turn = 'x';
		}
	};
	const updateBoard = (i) => {
		if (!Gameboard.at(i)) {
			Gameboard.setAt(i, turn());
			DOMGenerator.refreshRender(i, turn());
			endTurn();
		}
	}
	const main = () => {
		DOMGenerator.initBoard();
	};
	return {
		updateBoard,
		main,
	};
})();

Interaction.main();
