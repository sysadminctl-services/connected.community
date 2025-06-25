import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MainLayout } from './layouts/MainLayout';
import { CondominiumsPage } from './pages/CondominiumsPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      {/* Rutas Protegidas */}
      <Route element={<ProtectedRoute />}>
        {/* Todas las rutas anidadas aquí estarán protegidas */}
        {/* y usarán el MainLayout como su esqueleto */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/condominiums" element={<CondominiumsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;