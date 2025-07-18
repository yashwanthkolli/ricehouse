import LandingSection from './Components/LandingSection/LandingSection';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Menu from './Components/Menu/Menu';
import AboutUsSection from './Components/AboutUsSection/AboutUsSection';
import MapSection from './Components/MapSection/MapSection';
import ContactUsSection from './Components/ContactUsSection/ContactUsSection';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import LoginIcon from './Components/LoginIcon/LoginIcon';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import Wholesale from './Pages/Wholesale/Wholesale';
import { ToastContainer } from 'react-toastify';
import Product from './Pages/Product/Product';
import Cart from './Pages/Cart/Cart';
import Retail from './Pages/Retail/Retail';
import TandC from './Pages/Policy/TandC';
import ReturnPolicy from './Pages/Policy/ReturnPolicy';
import PrivacyPolicy from './Pages/Policy/PrivacyPolicy';
import ShippingPolicy from './Pages/Policy/ShippingPolicy';
import OrderStatus from './Pages/OrderStatus/OrderStatus';
import Orders from './Pages/Orders/Orders';
import Profile from './Pages/Profile/Profile';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import AdminLogin from './Pages/AdminLogin/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import DeleteAccount from './Pages/DeleteUserAccount/DeleteUserAccount';
import UniversalContactSection from './Components/UniversalContactSection/UniversalContactSection';

function App() {
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div className="App">
      <UniversalContactSection />
      <ToastContainer position='bottom-right' />
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/wholesale' element={<Wholesale />} />
        <Route path='/retail' element={<Retail />} />
        <Route path='/product/:type/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/tandc' element={<TandC />} />
        <Route path='/returnpolicy' element={<ReturnPolicy />} />
        <Route path='/privacypolicy' element={<PrivacyPolicy />} />
        <Route path='/shippingpolicy' element={<ShippingPolicy />} />
        <Route path='/status/:orderId' element={<OrderStatus />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/auth/resetpassword/:resetToken' element={<ResetPassword />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin' element={<AdminDashboard />} />
        {/* <Route path='/service/:serviceName' exact component={ServicePage} /> */}
        <Route path='/auth/delete/user' element={<DeleteAccount />} />
      </Routes>
    </div>
  );
}

const HomePage = () => {
  return(
    <>
      <Menu />
      <LoginIcon />
      <LandingSection />
      <AboutUsSection />
      <MapSection />
      <ContactUsSection />
    </>  
  )
}

export default App;
