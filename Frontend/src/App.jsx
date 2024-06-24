// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home/Home';
import Dashboard from './pages/DashBoard/Dashboard';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import { Provider } from 'react-redux';
import store from './store/store';
import PrivateRoute from './components/PrivateRoute';
import Donate from './pages/Donate';
import Symptoms from './pages/Symptoms';
import Prevention from './pages/Prevention';
import NotFound from './components/PageNotFound/NotFound';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<PrivateRoute />}>
           
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/symptoms' element={<Symptoms/>}/>
            <Route path='/stay-safe' element={<Prevention/>}/>
            
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
