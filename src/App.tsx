import { ErrorBoundary } from '@components/ErrorBoundary'
import { LoadingOverlay } from '@components/LoadingOverlay'
import { useGame } from '@contexts/GameContext'
import { Player } from '@interfaces/game'
import { Suspense } from 'react'

function App() {
	const { board, message, move, onGameReset, onPlayerMove, player } = useGame()

	const dynamicStyles = (symbol: Player) => {
		if (symbol === 'O') {
			return 'bg-amber-100 text-amber-700 rounded-full'
		}
		if (symbol === 'X') {
			return 'bg-indigo-100 text-indigo-700 rounded-full'
		}
		return ''
	}
	return (
		<ErrorBoundary>
			<Suspense fallback={<LoadingOverlay />}>
				<div className='container flex flex-col py-8 mx-auto space-y-6 w-full max-w-screen-lg min-h-screen'>
					<header className='flex flex-col grow-0 shrink justify-center items-center space-y-4'>
						<h1 className='text-3xl'>Welcome to Tic-Tac-Toe</h1>
						<span className='text-xl'>It is player {player}&apos;s turn</span>
						{move > 0 && (
							<button
								className='py-2 px-6 bg-slate-400 rounded-lg'
								onClick={onGameReset}
							>
								Reset
							</button>
						)}
						{message && (
							<span className='text-xl tracking-wider text-red-500'>
								{message}
							</span>
						)}
					</header>
					<main className='grid flex-1 grid-cols-3 gap-6 place-content-center place-items-center mx-auto w-max'>
						{board.flat().map((symbol, index) => (
							<button
								className={`text-9xl h-60 w-60 font-semibold bg-slate-600 rounded-3xl ${dynamicStyles(
									symbol as Player
								)}`}
								key={index}
								onClick={async () => onPlayerMove({ index, player })}
							>
								{symbol}
							</button>
						))}
					</main>
					<footer className='flex grow-0 shrink justify-between'>
						<span>All Content © {new Date().getFullYear()}</span>
						<span>Cody Brunner</span>
					</footer>
				</div>
			</Suspense>
		</ErrorBoundary>
	)
}

export default App
