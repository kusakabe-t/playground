import ReactDOM from 'react-dom/client'
import { Suspense } from 'react'
import useSWR from 'swr'
// @ts-ignore
const fetcher = (...args) => fetch(...args).then(res => res.json())

const App = () => {
		return (
				<div>
						<h2>Simple Todo</h2>

						<Suspense fallback={<p>Loading user details...</p>}>
								<UserWelcome />
						</Suspense>

						<Suspense fallback={<p>Loading Todos...</p>}>
								<Todos />
						</Suspense>
				</div>
		)
}

const UserWelcome = () => {
		const { data } = useSWR('https://run.mocky.io/v3/d6ac91ac-6dab-4ff0-a08e-9348d7deed51', fetcher, { suspense: true })

		console.warn('welcome', data)

		return (
				<p>
						Welcome <span>{data.data.name}</span>
				</p>
		)
}

const Todos = () => {
		const { data } = useSWR('https://run.mocky.io/v3/8a33e687-bc2f-41ea-b23d-3bc2fb452ead', fetcher, { suspense: true })
		console.warn('todos', data)

		const renderTodos = data.data.map((todo) => {
				return (
						<li key={todo.id}>
								{todo.title}
						</li>
				)
		})

		return (
				<div>
						<h3>Todos</h3>
						<ol>{renderTodos}</ol>
				</div>
		)
}

const rootElement: any = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
