import './App.scss';
import React, {useContext, useEffect} from 'react'
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import { Route, Switch} from 'react-router-dom';
import User from './Components/User/User';
import Favourites from './Components/Favourites/Favourties';
import {AuthContext} from './Context/auth-context';
import Auth from './Components/Auth/Auth';
import Logout from './Components/Logout/Logout';
import AnimePreview from './Components/AnimePrieview/AnimePreview';
import Search from './Components/Search/Search';

function App() {

  const {idToken, checkAuthentication} = useContext(AuthContext)

  useEffect(() => {
    checkAuthentication()
  }, [checkAuthentication])

  let routes = <>
    <Route path="/search" exact component={Search}/>
    <Route path={`/anime-preview/:id`} exact component={AnimePreview}/>
    <Route path="/login" component={Auth}/>
    <Route path="/" exact component={Home}/>
  </>

  if(idToken !=null) {
    routes = (
      <>
        <Route path="/search" exact component={Search}/>
        <Route path={`/anime-preview/:id`} exact component={AnimePreview}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/favourites" component={Favourites}/>
        <Route path="/user" component={User}/>
        <Route path="/login" component={Auth}/>
        <Route path="/" exact component={Home}/>
      </>
    )
  }
  
  let content = (
    <Layout>
      <Switch>
        {routes}
      </Switch>
    </Layout>
  )
  
  return content
}

export default App;
