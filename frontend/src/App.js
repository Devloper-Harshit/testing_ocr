import OCR from "./components/OCR";
import Camera from "./pages/Camera";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import Register from "./pages/Register";

import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      

     <BrowserRouter>
        <Routes>
            <Route exact path='/home' element={<Home/>}/>
            <Route exact path='/Login' element={<Login/>}/>
            <Route exact path='/Register' element={<Register/>}/>
            <Route exact path='/' element={<Camera/>}/>
            {/* <Route exact path='/Camera' element={<Camera/>}/> */}
            <Route exact path='/OCR' element={<OCR/>}/>
            <Route exact path='*' element={<NoPage/>}/>
            
        </Routes>
    </BrowserRouter>


    


    {/* <Camera/> */}

    </div>
  );
}


export default App;
