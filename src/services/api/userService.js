import usersData from '../mockData/users.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let users = [...usersData]

export const userService = {
  async getAll() {
    await delay(200)
    return [...users]
  },

  async getById(id) {
    await delay(150)
    const user = users.find(u => u.id === id)
    return user ? { ...user } : null
  },

  async create(userData) {
    await delay(300)
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    users = [...users, newUser]
    return { ...newUser }
  },

  async update(id, updateData) {
    await delay(250)
    const index = users.findIndex(u => u.id === id)
    if (index === -1) throw new Error('User not found')
    
    const updatedUser = {
      ...users[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    }
    users = users.map(u => u.id === id ? updatedUser : u)
    return { ...updatedUser }
  },

  async delete(id) {
    await delay(200)
    const index = users.findIndex(u => u.id === id)
    if (index === -1) throw new Error('User not found')
    
    users = users.filter(u => u.id !== id)
    return true
  }
}