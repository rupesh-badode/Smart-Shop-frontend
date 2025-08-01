import './App.css';
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Shop from './pages/Shop.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Contact from './pages/Contact.jsx';
import BecomeSeller from './pages/BecomeSeller.jsx';
import SignUp from './auth/SignUp.jsx';
import Cart from './pages/Cart.jsx';
import Register from './auth/SelllerRegistration.jsx';
import Login from './auth/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Order from './pages/Order.jsx';
import Buy from './pages/Buy.jsx';
import Profile from './pages/Profile.jsx';
function App() {
  return (
    <>
    <BrowserRouter>
     <Header/>
     <div className='pt-5 mt-4'> 
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/shop' element={<Shop/>} />
        <Route path='/shop/:id' element={<ProductDetail/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/seller' element={<BecomeSeller/>}  />
        <Route path='/seller/register' element={<Register/>} />
        <Route path='/signup'  element={<SignUp/>} />
        <Route path='/login'  element={<Login/>}/>
        <Route path='/profile' element={<Profile/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/buy' element={<Buy/>}  />
        <Route path='/order' element={<Order/>} />
      </Routes>
     </div>
     <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
