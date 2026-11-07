import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  withCredentials: true, // Envía y recibe la cookie httpOnly con el JWT
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para atrapar respuestas de error
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Si la sesión expira o es inválida, se emite un evento para limpiar el estado
    if (error.response?.status === 401) {
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }

    const payload = error.response?.data || {
      ok: false,
      error: {
        codigo: 'ERROR_CONEXION',
        mensaje: error.message || 'No se pudo conectar con el servidor',
      },
    };

    return Promise.reject(payload);
  }
);

