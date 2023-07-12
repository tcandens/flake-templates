import { configureStore, createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import axios from 'axios'
import { useSelector, useDispatch, type TypedUseSelectorHook } from 'react-redux'
import { Task, TaskInput, TaskOutput } from '@grndcrps/app/models/task'

const client = axios.create({
  baseURL: new URL('/api', window.location.origin).toString(),
})

export const tasksAdapter = createEntityAdapter<Task>({
  selectId: (task) => task.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

export const { selectAll: selectAllTasks } = tasksAdapter.getSelectors()

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, thunkAPI) => {
  const response = await client.get<Task[]>('/task')
  return response.data
})

export const createTask = createAsyncThunk('tasks/createTask', async (task: TaskInput, thunkAPI) => {
  const response = await client.post<TaskOutput>('/task', task)
  return {
    id: response.data.id,
    ...task
  } as Task
})

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    ...tasksAdapter.getInitialState(),
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      tasksAdapter.setAll(state, action.payload)
    })
    builder.addCase(createTask.fulfilled, (state, action) => {
      tasksAdapter.addOne(state, action.payload)
    })
  }
})

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksSlice.reducer,
  },
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
