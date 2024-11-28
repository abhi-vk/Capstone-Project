import './App.css';
import { Login, Register, Home, Products, AddressPage, CheckoutPage,OrderSuccess, PaymentPage } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Footer from './components/footer'; // Make sure to import your Footer component
import { CartProvider } from "./context/cartContext";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="app-wrapper"> {/* Wrapper for the entire layout */}
        <CartProvider>
          <div className="content-wrapper"> {/* Wrapper for content and footer */}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/address" element={<AddressPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order" element={<OrderSuccess />} />
              <Route path="/payment" element={<PaymentPage />} />
            </Routes>
          </div>
          </CartProvider>
          <Footer /> {/* Footer at the bottom */}
        </div>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
