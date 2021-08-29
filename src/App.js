import Header from "./component/header/Header";
import MainPage from "./component/main-page/MainPage";
import Navabar from "./component/navabar/Navabar";
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import { useState } from "react";
function App() {
  const [isMenu, setIsMenu] = useState(false)
  const showMenu = () => {
    setIsMenu(!isMenu)
  }
  return (
    <Router>
      <div className="App">
        <Navabar isMenu={isMenu} showMenu={showMenu} />
        <div className='main-page'>
          <Header showMenu={showMenu} isMenu={isMenu} />
          <MainPage />
        </div>
      </div>





    </Router>
  );
}

export default App;
