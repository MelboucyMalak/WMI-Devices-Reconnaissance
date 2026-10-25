import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AllDevices from './pages/AllDevices';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/devices" replace />} />
          <Route path="devices" element={<AllDevices />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
