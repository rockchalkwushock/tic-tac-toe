import { ErrorBoundary } from '@components/ErrorBoundary'
import { LoadingOverlay } from '@components/LoadingOverlay'
import { Home } from '@pages/Home'
import { Suspense } from 'react'

function App() {
	return (
		<ErrorBoundary>
			<Suspense fallback={<LoadingOverlay />}>
				<Home />
			</Suspense>
		</ErrorBoundary>
	)
}

export default App
