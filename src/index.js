import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import 'react-multi-carousel/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Registration from './pages/register';
import Login from './pages/login';
import App from './App';
import CreatePlan from './pages/createPlan';
import MyRecipe from './pages/myRecipe';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <UserProvider>
            <div>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/login" element={<Login />} />
                    <Route path='/createPlan' element={<CreatePlan />} />
                    <Route path='/myRecipe' element={<MyRecipe />} />
                    <Route path="/register" element={<Registration />} />
                </Routes>
            </div>
        </UserProvider>
    </Router>

);


    