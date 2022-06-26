import type { Board, Move, Player } from '@interfaces/game'

export const calculateIsPlayable = async (board: Board, move: Move) => {
	const { index } = move
	return Promise.resolve(board.flat()[index].length === 0)
}
export const calculateIsWinner = (board: Board, player: Player) => {
	// Row wins
	if (
		board[0][0] === player &&
		board[0][1] === player &&
		board[0][2] === player
	)
		return true
	if (
		board[1][0] === player &&
		board[1][1] === player &&
		board[1][2] === player
	)
		return true
	if (
		board[2][0] === player &&
		board[2][1] === player &&
		board[2][2] === player
	)
		return true
	// Column wins
	if (
		board[0][0] === player &&
		board[1][0] === player &&
		board[2][0] === player
	)
		return true
	if (
		board[0][1] === player &&
		board[1][1] === player &&
		board[2][1] === player
	)
		return true
	if (
		board[0][2] === player &&
		board[1][2] === player &&
		board[2][2] === player
	)
		return true
	// Diagonal wins
	if (
		board[0][0] === player &&
		board[1][1] === player &&
		board[2][2] === player
	)
		return true
	if (
		board[0][2] === player &&
		board[1][1] === player &&
		board[2][0] === player
	)
		return true
	return false
}

export const updateBoard = (board: Board, { index, player }: Move): Board => {
	const arr = board.flat()

	arr.fill(
		player,
		index === arr.length ? index - 1 : index,
		index === arr.length ? undefined : index + 1
	)

	return [
		[arr[0], arr[1], arr[2]],
		[arr[3], arr[4], arr[5]],
		[arr[6], arr[7], arr[8]],
	]
}
