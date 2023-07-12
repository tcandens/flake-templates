import { useState } from 'react'
import { selectAllTasks, fetchTasks, createTask, store } from '@/lib/store'
import { useFetcher, Form, type ActionFunctionArgs, useSubmit, useLoaderData, type LoaderFunctionArgs } from 'react-router-dom'
import clsx from 'clsx'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const query = url.searchParams.get('query')
  const { dispatch, getState } = store
  await dispatch(fetchTasks())
  let tasks = selectAllTasks(getState().tasks)
  if (query && tasks) {
    tasks = tasks.filter((task) => task.name.includes(query))
  }

  return {
    tasks,
    query,
  }
}

export const action = async function action({ request, params }: ActionFunctionArgs) {
  throw new Error('oopsies')
  const formdata = await request.formData()
  const name = formdata.get('name')?.toString()
  const { dispatch } = store
  if (name) {
    const result = dispatch(createTask({ name })).unwrap()
    console.log('created', result)
  }
  return { tasks: [] }
}

export function Component() {
  const [name, setName] = useState('')

  // const status = useAppSelector(selectTaskStatus)
  const { query, tasks } = useLoaderData() as Awaited<ReturnType<typeof loader>>
  const fetcher = useFetcher()

  const submit = useSubmit()
  return (
    <div className={clsx(fetcher.state === 'loading' && 'opacity-20', 'flex flex-col gap-3 p-3')}>
      <h2>Tasks</h2>
      <Form id="search-form" role="search">
        <input 
          className="p-2 border border-slate-500 rounded-md"
          name="query"
          id="query"
          type="search"
          placeholder="Search tasks"
          aria-label="Search tasks"
          defaultValue={query ?? ''}
          onChange={(e) => {
            submit(e.currentTarget.form)
          }}
        />
      </Form>
      {tasks && tasks.map((task) => (
        <div key={task.id}>
          <span>{task.name}</span>
        </div>
      ))}
      <fetcher.Form id="add-form" method="post" onSubmit={() => setName('')}>
        <input type="text" name="name" placeholder="Task name" value={name} onChange={(e) => setName(e.target.value)} /> 
        <button type="submit">Add</button>
      </fetcher.Form>

    </div>
  )
}

Component.displayName = 'Home'

export default Component
