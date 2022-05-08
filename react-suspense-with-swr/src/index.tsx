import ReactDOM from 'react-dom/client'
import { Suspense } from 'react'
import useSWR from 'swr'
// @ts-ignore
const fetcher = (...args) => fetch(...args).then(res => res.json())

const App = () => {
		return (
						<Suspense fallback={<p>Loading user details...</p>}>
								<UserWelcome />
						</Suspense>
		)
}

const UserWelcome = () => {
		const { data } = useSWR('https://run.mocky.io/v3/d6ac91ac-6dab-4ff0-a08e-9348d7deed51', fetcher, { suspense: true })

		return <span>{data.data.name}</span>
}

const rootElement: any = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
