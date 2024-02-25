import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './constants/routes';
//Pages imports
import Login from './pages/Login';
import SettingsPage from './pages/Settings';
import CalculatorPage from './pages/Calculator';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<CalculatorPage />} />
        <Route path={routes.login} element={<Login />} />
        <Route
          path={routes.setting}
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
