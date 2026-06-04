import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const api = axios.create({ baseURL: API_URL })

// Attach JWT token to admin requests
api.interceptors.request.use((config) => {
  const token = Cookies.get('admin_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Public APIs ──────────────────────────────────────────────────────────────
export const getProfile   = () => api.get('/api/profile').then(r => r.data)
export const getProjects  = (params?: { featured?: boolean; category?: string }) =>
  api.get('/api/projects', { params }).then(r => r.data)
export const getProject   = (slug: string) => api.get(`/api/projects/${slug}`).then(r => r.data)
export const getSkills    = () => api.get('/api/skills/grouped').then(r => r.data)
export const getBlogs     = () => api.get('/api/blogs').then(r => r.data)
export const getBlog      = (slug: string) => api.get(`/api/blogs/${slug}`).then(r => r.data)
export const getCaseStudies = () => api.get('/api/case-studies').then(r => r.data)
export const getAIProjects  = () => api.get('/api/ai-projects').then(r => r.data)
export const submitContact  = (data: any) => api.post('/api/contact', data).then(r => r.data)

// ── Admin Auth ───────────────────────────────────────────────────────────────
export const adminLogin = async (username: string, password: string) => {
  const res = await api.post('/api/auth/login', { username, password })
  Cookies.set('admin_token', res.data.access_token, { expires: 1 })
  return res.data
}
export const adminLogout = () => Cookies.remove('admin_token')
export const isAdminLoggedIn = () => !!Cookies.get('admin_token')

// ── Admin Stats ──────────────────────────────────────────────────────────────
export const getStats    = () => api.get('/api/admin/stats').then(r => r.data)
export const getMessages = () => api.get('/api/admin/messages').then(r => r.data)
export const markMsgRead = (id: number) => api.put(`/api/admin/messages/${id}/read`)
export const deleteMsg   = (id: number) => api.delete(`/api/admin/messages/${id}`)

// ── Admin Profile ─────────────────────────────────────────────────────────────
export const updateProfile = (data: any) => api.put('/api/admin/profile', data).then(r => r.data)

// ── Admin Projects ────────────────────────────────────────────────────────────
export const createProject = (data: any) => api.post('/api/admin/projects', data).then(r => r.data)
export const updateProject = (id: number, data: any) => api.put(`/api/admin/projects/${id}`, data).then(r => r.data)
export const deleteProject = (id: number) => api.delete(`/api/admin/projects/${id}`)

// ── Admin Skills ──────────────────────────────────────────────────────────────
export const createSkill = (data: any) => api.post('/api/admin/skills', data).then(r => r.data)
export const updateSkill = (id: number, data: any) => api.put(`/api/admin/skills/${id}`, data).then(r => r.data)
export const deleteSkill = (id: number) => api.delete(`/api/admin/skills/${id}`)

// ── Admin Blogs ───────────────────────────────────────────────────────────────
export const getAdminBlogs = () => api.get('/api/admin/blogs').then(r => r.data)
export const createBlog    = (data: any) => api.post('/api/admin/blogs', data).then(r => r.data)
export const updateBlog    = (id: number, data: any) => api.put(`/api/admin/blogs/${id}`, data).then(r => r.data)
export const deleteBlog    = (id: number) => api.delete(`/api/admin/blogs/${id}`)

// ── Admin Case Studies ────────────────────────────────────────────────────────
export const createCaseStudy = (data: any) => api.post('/api/admin/case-studies', data).then(r => r.data)
export const updateCaseStudy = (id: number, data: any) => api.put(`/api/admin/case-studies/${id}`, data).then(r => r.data)
export const deleteCaseStudy = (id: number) => api.delete(`/api/admin/case-studies/${id}`)

// ── Admin AI Projects ─────────────────────────────────────────────────────────
export const createAIProject = (data: any) => api.post('/api/admin/ai-projects', data).then(r => r.data)
export const updateAIProject = (id: number, data: any) => api.put(`/api/admin/ai-projects/${id}`, data).then(r => r.data)
export const deleteAIProject = (id: number) => api.delete(`/api/admin/ai-projects/${id}`)

export default api
