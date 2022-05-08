import { Suspense } from 'react'
import useSWR from 'swr'
// @ts-ignore
const fetcher = (...args) => fetch(...args).then(res => res.json())

const Home = () => {
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

  return (
    <p>
      Welcome <span>{data.data.name}</span>
    </p>
  )
}

const Todos = () => {
  const { data } = useSWR('https://run.mocky.io/v3/97ac7310-e54d-469c-95c2-567db7e98148', fetcher, { suspense: true })
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

export default Home
