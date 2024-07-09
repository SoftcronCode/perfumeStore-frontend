import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Home from "./components/Home/Home";
import Contact from './components/PublicPages/Contact';
import About from './components/PublicPages/About';
import UserDashboard from "./components/UserDashboard/UserDashboard";
import Wishlist from "./components/PublicPages/Wishlist";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Cart from "./components/Cart/Cart";
import CheckoutPage from "./components/Checkout/CheckoutPage";
import OrderSuccess from "./components/PublicPages/OrderSuccess";
import PaymentPending from "./components/PublicPages/PaymentPending";
import Shop from './components/Shop/Shop';


function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order" element={<OrderSuccess />} />
          <Route path="/confirm-order" element={<PaymentPending />} />
          <Route path="/product-detail/:productId" element={<ProductDetail />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
