import type { Game, Move } from '@interfaces/game'
import {
	calculateIsPlayable,
	calculateIsWinner,
	updateBoard,
} from '@utils/gameHelpers'
import {
	createContext,
	FC,
	ReactNode,
	Reducer,
	useCallback,
	useContext,
	useReducer,
} from 'react'

type Context = Game & {
	onGameReset: VoidFunction
	onPlayerMove: (move: Move) => Promise<void>
}
export const GameContext = createContext<Context | undefined>(undefined)

type Action =
	| { payload?: Partial<Game>; type: 'INITIAL' }
	| { payload: Move; type: 'PLAYING' }
	| { payload?: Partial<Game>; type: 'STALEMATE' }
	| { payload?: Partial<Game>; type: 'WINNER' }
	| { payload?: undefined; type: 'ERR0R-01' }

const reducer: Reducer<Game, Action> = (state, { payload, type }) => {
	switch (type) {
		case 'ERR0R-01':
			return {
				...state,
				message: 'You cannot play there!',
				player: state.player,
			}
		case 'INITIAL':
			return INITIAL_STATE
		case 'PLAYING':
			// eslint-disable-next-line no-case-declarations
			const board = updateBoard(state.board, payload)

			if (state.move >= 4 && state.status !== 'WINNER') {
				const isWinner = calculateIsWinner(board, state.player)
				return {
					...state,
					board,
					message: isWinner ? `Player ${state.player} Wins!` : undefined,
					move: state.move + 1,
					player: state.player === 'O' ? 'X' : 'O',
					status: isWinner ? 'WINNER' : 'PLAYING',
				}
			}
			if (state.move === 9 && state.status !== 'WINNER') {
				return {
					...state,
					board,
					message: 'Stalemate! Please reset the board and try again.',
					move: state.move + 1,
					player: state.player === 'O' ? 'X' : 'O',
					status: 'STALEMATE',
				}
			}
			return {
				...state,
				board,
				message: undefined,
				move: state.move + 1,
				player: state.player === 'O' ? 'X' : 'O',
				status: 'PLAYING',
			}
		default:
			return state
	}
}

const INITIAL_STATE: Game = {
	board: [
		['', '', ''],
		['', '', ''],
		['', '', ''],
	],
	move: 0,
	player: 'X',
	status: 'INITIAL',
}

export const GameProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

	const onPlayerMove = useCallback(
		async (move: Move) => {
			if (state.status === 'WINNER') return
			if (state.move < 1) {
				dispatch({ payload: move, type: 'PLAYING' })
			} else {
				const isPlayable = await calculateIsPlayable(state.board, move)

				if (isPlayable) {
					dispatch({ payload: move, type: 'PLAYING' })
				} else {
					dispatch({ type: 'ERR0R-01' })
				}
			}
		},
		[state.board, state.move, state.status]
	)

	const onGameReset = () =>
		dispatch({ payload: INITIAL_STATE, type: 'INITIAL' })

	return (
		<GameContext.Provider value={{ ...state, onGameReset, onPlayerMove }}>
			{children}
		</GameContext.Provider>
	)
}

export const useGame = () => {
	const ctx = useContext(GameContext)

	if (typeof ctx === 'undefined') {
		throw new Error('useGame must be used within context of GameProvider')
	}

	return ctx
}
