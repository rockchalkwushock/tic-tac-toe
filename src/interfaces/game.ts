export type Maybe<T> = T | string
export type Board = [
	[Maybe<Player>, Maybe<Player>, Maybe<Player>],
	[Maybe<Player>, Maybe<Player>, Maybe<Player>],
	[Maybe<Player>, Maybe<Player>, Maybe<Player>]
]
export type Player = 'O' | 'X'
export type Status = 'INITIAL' | 'PLAYING' | 'STALEMATE' | 'WINNER'

export type Move = {
	index: number
	player: Player
}
export type Game = {
	board: Board
	message?: string
	move: number
	player: Player
	status: Status
}
