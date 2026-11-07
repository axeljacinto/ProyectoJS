import { api } from './cliente.js';

export const authApi = {
  registro: (datos) => api.post('/auth/registro', datos),
  login: (credenciales) => api.post('/auth/login', credenciales),
  logout: () => api.post('/auth/logout'),
  obtenerPerfil: () => api.get('/auth/perfil'),
};

export const categoriasApi = {
  listar: (todas = false) => api.get(`/categorias?todas=${todas}`),
  obtener: (id) => api.get(`/categorias/${id}`),
  crear: (datos) => api.post('/categorias', datos),
  actualizar: (id, datos) => api.patch(`/categorias/${id}`, datos),
  eliminar: (id) => api.delete(`/categorias/${id}`),
};

export const marcasApi = {
  listar: (todas = false) => api.get(`/marcas?todas=${todas}`),
  obtener: (id) => api.get(`/marcas/${id}`),
  crear: (datos) => api.post('/marcas', datos),
  actualizar: (id, datos) => api.patch(`/marcas/${id}`, datos),
  eliminar: (id) => api.delete(`/marcas/${id}`),
};

export const componentesApi = {
  listar: (params = {}) => api.get('/componentes', { params }),
  obtenerPorId: (id) => api.get(`/componentes/${id}`),
  crear: (datos) => api.post('/componentes', datos),
  actualizar: (id, datos) => api.patch(`/componentes/${id}`, datos),
  eliminar: (id) => api.delete(`/componentes/${id}`),
};

