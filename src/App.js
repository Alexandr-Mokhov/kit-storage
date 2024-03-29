import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setLoggedIn } from './store/slices/loggedInSlice';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Main from './components/Main/Main';
import ProtectedRouteElement from './components/ProtectedRoute/ProtectedRoute';
import Preloader from './components/Preloader/Preloader';
import Footer from './components/Footer/Footer';
import './App.css';

export default function App() {
  const loggedIn = useSelector(state => state.loggedIn.loggedIn);
  const isLoad = useSelector(state => state.isLoad.isLoad);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    //** при входе если есть токен - не просим повторную авторизацию и навигейтим на главную страницу */
    if (localStorage.getItem('token')) {
      dispatch(setLoggedIn(true));
      navigate('/', { replace: true });
    }
  }, [dispatch, navigate])

  return (
    <div className="page">
      {isLoad && <Preloader />}
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <ProtectedRouteElement element={Main} loggedIn={loggedIn} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

