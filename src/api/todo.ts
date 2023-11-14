import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001'
})

export type Todo = {
  id?: number
  userId: number
  title: string
  priority: number
  completed: boolean
}

export default {
  list: async () => {
    const { data } = await api.get('/todos?userId=1')

    return data
  },
  get: async (id: Todo['id']) => {
    const { data } = await api.get(`/todos/${id}`)

    return data
  },
  create: async (item: Todo) => {
    const { data } = await api.post('/todos', item)

    return data
  },
  update: async (id: Todo['id'], item: Partial<Todo>) => {
    const { data } = await api.patch(`/todos/${id}`, item)

    return data
  },
  delete: async (id: Todo['id']) => await api.delete(`/todos/${id}`)
}
