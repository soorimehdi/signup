import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Homepage from './pages/homepage';
import Signin from './pages/signin';
import Signup from './pages/signup';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/homepage' element={<Homepage/>}/>
      <Route path='/' element={<Navigate to = '/signup' />}/>
    </Routes>

    </BrowserRouter>
  );
}

export default App;
