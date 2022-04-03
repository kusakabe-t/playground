import ReactDOM from 'react-dom/client'
import React, { Suspense } from 'react'
import fetchData from "./api/fetchData";

const userInfo = fetchData(
		'https://run.mocky.io/v3/d6ac91ac-6dab-4ff0-a08e-9348d7deed51'
)

const todoLists = fetchData(
		'https://run.mocky.io/v3/8a33e687-bc2f-41ea-b23d-3bc2fb452ead'
)

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
		const userDetails = userInfo.read()

		return (
				<p>
						Welcome <span>{userDetails.name}</span>
				</p>
		)
}

const Todos = () => {
		const todos: { id: string; title: string }[] = todoLists.read()

		const renderTodos = todos.map((todo) => {
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
