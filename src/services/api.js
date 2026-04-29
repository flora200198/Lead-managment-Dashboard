/**
 * services/api.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralised Axios instance.
 * When you wire up your Node/Express backend, set VITE_API_BASE_URL in .env:
 *   VITE_API_BASE_URL=http://localhost:5000/api
 *
 * The proxy in vite.config.js forwards /api → localhost:5000 in development,
 * so relative paths work out of the box once the backend is running.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import axios from 'axios'

// ── Base instance ─────────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ── Request interceptor (attach JWT when ready) ───────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('crm_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// ── Response interceptor (global error handling) ─────────────────────────────
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred'
    return Promise.reject(new Error(message))
  }
)

// ── Leads endpoints ───────────────────────────────────────────────────────────
export const leadsApi = {
  /** GET /api/leads?status=Hot&page=1&limit=20 */
  getAll: (params = {}) => api.get('/leads', { params }),

  /** GET /api/leads/:id */
  getById: (id) => api.get(`/leads/${id}`),

  /** POST /api/leads */
  create: (data) => api.post('/leads', data),

  /** PUT /api/leads/:id */
  update: (id, data) => api.put(`/leads/${id}`, data),

  /** DELETE /api/leads/:id */
  remove: (id) => api.delete(`/leads/${id}`),

  /** GET /api/leads/stats */
  getStats: () => api.get('/leads/stats'),
}

export default api
