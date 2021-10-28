import Header from "./component/header/Header";
import MainPage from "./component/main-page/MainPage";
import Navabar from "./component/navabar/Navabar";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css'
import { useContext, useState } from "react";
import ProductManager from "./manager/ProductManager";
import User from "./manager/auth/User";
import Login from "./manager/auth/Login";
import { GlobalContext } from "./GlobalContext";
import Seller from "./seller/Seller";
import Orders from "./manager/orders/Orders";
function App() {
  const [isMenu, setIsMenu] = useState(false)
  const showMenu = () => {
    setIsMenu(!isMenu)
  }
  const context = useContext(GlobalContext)
  const [isLogin] = context.isLogin

  return (
    <Router>

      {
        isLogin
          ?

          <div className="App">
            <Navabar isMenu={isMenu} showMenu={showMenu} />
            <div className='main-page'>
              <Header showMenu={showMenu} isMenu={isMenu} />
              <Switch>
                <Route path='/home' component={MainPage} exact />
                <Route path='/product-manager' component={ProductManager} />
                <Route path='/user' component={User} />
                <Route path='/orders' component={Orders} />

              </Switch>

            </div>

          </div>
          :
          <Route path='/' component={Login} exact />



      }
      <Redirect to='/' />
    </Router>
  );
}

export default App;
