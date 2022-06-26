import './index.css'

import { GameProvider } from '@contexts/GameContext'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<GameProvider>
			<App />
		</GameProvider>
	</StrictMode>
)
