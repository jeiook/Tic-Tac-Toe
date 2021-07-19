const Gameboard = (() => {
	const board = ['o', null, 'o', 
					null, 'x', null, 
					'o', null, 'o'];
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
		}
		divs.forEach(e => {
			gameDiv.appendChild(e);
		});
	};
	return {
		initBoard,
	};
})();

const Interaction = (() => {
	const main = () => {
		DOMGenerator.initBoard();
	};
	return {
		main,
	};
})();

Interaction.main();
