import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Login, Register, Home, Products, AddressPage } from './pages';
import { Toaster } from 'react-hot-toast';
import Footer from './components/footer'; // Make sure to import your Footer component
import { CartProvider } from "./context/cartContext";

const isProduction = process.env.NODE_ENV === 'production'; // Check if in production

function App() {
  return (
    <>
      {isProduction ? (
        <HashRouter>  {/* Use HashRouter for production */}
          <div className="app-wrapper">
            <CartProvider>
              <div className="content-wrapper">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/address" element={<AddressPage />} />
                </Routes>
              </div>
            </CartProvider>
            <Footer />
          </div>
        </HashRouter>
      ) : (
        <BrowserRouter>  {/* Use BrowserRouter for local development */}
          <div className="app-wrapper">
            <CartProvider>
              <div className="content-wrapper">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/address" element={<AddressPage />} />
                </Routes>
              </div>
            </CartProvider>
            <Footer />
          </div>
        </BrowserRouter>
      )}
      <Toaster />
    </>
  );
}

export default App;
