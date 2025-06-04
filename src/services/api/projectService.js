import projectsData from '../mockData/projects.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let projects = [...projectsData]

export const projectService = {
  async getAll() {
    await delay(250)
    return [...projects]
  },

  async getById(id) {
    await delay(180)
    const project = projects.find(p => p.id === id)
    return project ? { ...project } : null
  },

  async create(projectData) {
    await delay(350)
    const newProject = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    projects = [...projects, newProject]
    return { ...newProject }
  },

  async update(id, updateData) {
    await delay(300)
    const index = projects.findIndex(p => p.id === id)
    if (index === -1) throw new Error('Project not found')
    
    const updatedProject = {
      ...projects[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    }
    projects = projects.map(p => p.id === id ? updatedProject : p)
    return { ...updatedProject }
  },

  async delete(id) {
    await delay(250)
    const index = projects.findIndex(p => p.id === id)
    if (index === -1) throw new Error('Project not found')
    
    projects = projects.filter(p => p.id !== id)
    return true
  }
}