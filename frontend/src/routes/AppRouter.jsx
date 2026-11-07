import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

// Páginas
import { Inicio } from '../pages/Inicio';
import { Catalogo } from '../pages/Catalogo';
import { DetalleComponente } from '../pages/DetalleComponente';
import { Login } from '../pages/Login';
import { Registro } from '../pages/Registro';
import { GestionComponentes } from '../pages/admin/GestionComponentes';
import { FormularioComponente } from '../pages/admin/FormularioComponente';
import { GestionUsuarios } from '../pages/admin/GestionUsuarios';

export function AppRouter() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Inicio />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/componentes/:id" element={<DetalleComponente />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      {/* Vendedor y Administrador */}
      <Route
        path="/admin/componentes"
        element={
          <ProtectedRoute rolesPermitidos={['VENDEDOR', 'ADMIN']}>
            <GestionComponentes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/componentes/nuevo"
        element={
          <ProtectedRoute rolesPermitidos={['VENDEDOR', 'ADMIN']}>
            <FormularioComponente />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/componentes/:id/editar"
        element={
          <ProtectedRoute rolesPermitidos={['VENDEDOR', 'ADMIN']}>
            <FormularioComponente />
          </ProtectedRoute>
        }
      />

      {/* Solo Administrador */}
      <Route
        path="/admin/usuarios"
        element={
          <ProtectedRoute rolesPermitidos={['ADMIN']}>
            <GestionUsuarios />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

