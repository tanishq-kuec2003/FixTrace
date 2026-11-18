import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddAsset from './pages/AddAsset';
import EditAsset from './pages/EditAsset';

const Register = () => <div style={{ padding: '20px' }}><h2>Register Page</h2></div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Replace the placeholder with the real component */}
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/add-asset" element={<AddAsset />} />

        <Route path="/edit-asset" element={<EditAsset />} />
        
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;