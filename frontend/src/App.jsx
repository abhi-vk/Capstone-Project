import './App.css';
import { Login, Register, Home, Products, AddressPage } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Footer from './components/footer'; // Make sure to import your Footer component

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="app-wrapper"> {/* Wrapper for the entire layout */}
          <div className="content-wrapper"> {/* Wrapper for content and footer */}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/address" element={<AddressPage />} />
            </Routes>
          </div>
          <Footer /> {/* Footer at the bottom */}
        </div>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
