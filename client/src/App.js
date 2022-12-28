import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider } from './components/AuthProvider';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate replace to="/signup" />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<AuthProvider>
          <Login />
        </AuthProvider>} />
        <Route path="/home" element={<AuthProvider>
          <Home />
        </AuthProvider>} />
      </Routes>


    </BrowserRouter>
  );
}

export default App;
