import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import { NavbarProvider } from './components/NaavBaarContext';
import { Route, Routes } from 'react-router-dom';

// Common / Components
import UserLogin from './Screens/UserLogin';
import Home from './components/Home';
import AdminLogin from './Screens/AdminLogin';
import DeliveryLogin from './Screens/DeliveryLogin';
import Register from './Screens/Register';
import DeliveryRegister from './Screens/DeliveryRegister';
import Logout from './components/Logout';
import About from './components/About';
import Contact from './components/Contact';
import LandingPage from './components/LandingPage';

// Admin
import Dashboard from './Admin/Dashboard';
import Agents from './Admin/Agents';
import Customers from './Admin/Customers';
import Packages from './Admin/Packages';

// Delivery
import DeliveryAgentHome from './Delivery/DeliveryAgenHome';
import CompletedOrders from './Delivery/CompletedOrders';
import AvailableOrders from './Delivery/AvailableOrders';
import CurrentOrders from './Delivery/CurrentOrders';
import Profile from './Delivery/Profile';

// User
import UserHomePage from './User/UserHomePage';
import Bookfor from './User/BookFor';
import TwoWheelerPage from './User/TwoWheelerPage';
import TruckPage from './User/TruckPage';
import UProfile from './User/UProfile';
import UOrders from './User/UOrders';

// Secure Routing 
import ProtectedRoute from './Auths/ProtectedRoute';

// Toast Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();
  const isDeliveryPage = location.pathname.startsWith('/delivery');

  const [completedOrders] = useState([]);
  const [availableOrders] = useState([]);
  const [currentOrders] = useState([]);

  const acceptOrder = (orderId) => {
    toast.success(`Order ${orderId} accepted!`);
  };

  const completeOrder = (orderId) => {
    toast.info(`Order ${orderId} completed!`);
  };


  return (
    <div className="container-fluid">
      <NavbarProvider>
        <div className={isDeliveryPage ? 'delivery-page' : ''}>
          <Routes>
            {/* Root Page */}
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<LandingPage />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/logout' element={<Logout />} />


            <Route path='/user' element={<UserLogin />} />
            <Route path='/register' element={<Register />} />
            <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
              <Route path='/user-home' element={<UserHomePage />} />
              <Route path='/user-profile' element={<UProfile />} />
              <Route path='/user-bookfor' element={<Bookfor />} />
              <Route path='/user-two-wheeler' element={<TwoWheelerPage />} />
              <Route path='/user-truck' element={<TruckPage />} />
              <Route path='/user-orders' element={<UOrders />} />
            </Route>


            <Route path='/delivery' element={<DeliveryLogin />} />
            <Route path='/delivery-register' element={<DeliveryRegister />} />
            <Route element={<ProtectedRoute allowedRoles={["delivery_partner"]} />}>
              <Route path='/delivery-agent-home' element={<DeliveryAgentHome />} />
              <Route path='/delivery-completed-orders' element={<CompletedOrders completedOrders={completedOrders} />} />
              <Route path="/delivery-available-orders" element={<AvailableOrders availableOrders={availableOrders} acceptOrder={acceptOrder} />} />
              <Route path="/delivery-current-orders" element={<CurrentOrders currentOrders={currentOrders} completeOrder={completeOrder} />} />
              <Route path='/delivery-profile' element={<Profile />} />
            </Route>


            <Route path='/admin' element={<AdminLogin />} />
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path='/admin-dashboard' element={<Dashboard />} />
              <Route path='/admin-agents' element={<Agents />} />
              <Route path='/admin-customers' element={<Customers />} />
              <Route path='/admin-packages' element={<Packages />} />
            </Route>
          </Routes>
        </div>
      </NavbarProvider>
      <ToastContainer autoClose={2000} position="top-right" />
    </div>
  );
}

export default App;