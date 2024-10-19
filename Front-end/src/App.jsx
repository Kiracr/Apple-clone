import { useState } from 'react'
import Youtube from './Components/Youtube/Youtube';
import { Route,Routes } from 'react-router-dom';
import "./bootstrap.css";
import "./Style.css";

// Home page
import SharedLayout from './Components/SharedLayout/SharedLayout';
import Main from './Components/Main/Main';


// Indivdual Pages

import Iphone from "./Components/Pages/Iphone/iphone";
import Mac from "./Components/Pages/Mac/Mac";
import Ipad from "./Components/Pages/Ipad/Ipad";
import Music from "./Components/Pages/Music/Music";
import Cart from "./Components/Pages/Cart/Cart";
import Support from "./Components/Pages/Support/Support";
import TV from "./Components/Pages/TV/TV";
import Watch from "./Components/Pages/Watch/Watch";
import Four04 from "./Components/Pages/Four04/Four04";
import Productpage from "./Components/Pages/Productpage/Productpage";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
         
          <Route path='/' element={<SharedLayout/>} >
          <Route path='/' element={<Main/>} />
          <Route path='iphone' element={<Iphone/>} />
          <Route path='iphone/:pid' element={<Productpage/>} />
          <Route path='mac' element={<Mac/>} />
          <Route path='ipad' element={<Ipad/>} />
          <Route path='watch' element={<Watch/>} />
          <Route path='tv' element={<TV/>} />
          <Route path='music' element={<Music/>} />
          <Route path='support' element={<Support/>} />
          <Route path='cart' element={<Cart/>} />
          <Route path='*' element={<Four04/>} />

          </Route>

    </Routes>
	
    </>
  )
}

export default App
