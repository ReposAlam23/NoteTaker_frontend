import './App.css';
import Signup from './components/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './components/Signin';
import Home from './components/Home';

function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />}/>
        <Route path="/signup" element={<Signup />} />
        <Route path='/home' element={<Home />} />
      </Routes>
      </BrowserRouter>     
     
    </div>
  );
}

export default App;
