import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './Assets/style/main.css';
import HomePage from './pages/HomePage/HomePage'
import SignInPage from './pages/SignInPage/SignInPage';
import UserPage from './pages/UserPage/UserPage';
import Footer from './components/Footer/Footer';
import { Provider } from 'react-redux';
import store from './Redux/store';
import PrivateRoute from './Redux/PrivateRoute';
// import ErrorPage from './pages/ErrorPage/ErrorPage'
import reportWebVitals from './reportWebVitals';
import Header from './components/Header/Header';

// Créez une racine (root) avec createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Utilisez la méthode render sur la nouvelle racine
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Sign-in" element={<SignInPage />} />
          {/* Route protégé*/}
          <Route 
            path="/userPage" 
            element={
              <PrivateRoute>
                <UserPage />
              </PrivateRoute>
           } />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
        <Footer />
      </Router>
    </Provider>   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
