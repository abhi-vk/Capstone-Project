import './App.css'
import { Login, Register , Home} from './pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
         
          
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
