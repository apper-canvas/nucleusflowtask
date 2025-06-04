import tasksData from '../mockData/tasks.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let tasks = [...tasksData]

export const taskService = {
  async getAll() {
    await delay(300)
    return [...tasks]
  },

  async getById(id) {
    await delay(200)
    const task = tasks.find(t => t.id === id)
    return task ? { ...task } : null
  },

  async create(taskData) {
    await delay(400)
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    tasks = [...tasks, newTask]
    return { ...newTask }
  },

  async update(id, updateData) {
    await delay(300)
    const index = tasks.findIndex(t => t.id === id)
    if (index === -1) throw new Error('Task not found')
    
    const updatedTask = {
      ...tasks[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    }
    tasks = tasks.map(t => t.id === id ? updatedTask : t)
    return { ...updatedTask }
  },

  async delete(id) {
    await delay(250)
    const index = tasks.findIndex(t => t.id === id)
    if (index === -1) throw new Error('Task not found')
    
    tasks = tasks.filter(t => t.id !== id)
    return true
  }
}