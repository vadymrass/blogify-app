import React from 'react';
import { Collapse, responsiveFontSizes, ThemeProvider } from '@material-ui/core';
import { theme } from '../src/styles/config';
import AppBar from './components/Header';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import Contributors from './components/Contributors';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';
import Home from './components/Home';
import { SnackbarProvider } from 'notistack';
import Preload from './components/Preload/Content';
import MyProfile from './components/MyProfile';
import AddNewPost from './components/AddNewPost';
import LoginPage from './components/Auth/Login';
import RegisterPage from './components/Auth/Register';
import PostContent from './components/SinglePost';

const App = () => {
   const user = useSelector((state: any) => state.userReducer.user);
   const myTheme = responsiveFontSizes(theme);

   return (
      <SnackbarProvider
         maxSnack={4}
         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
         TransitionComponent={Collapse}
      >
         <ThemeProvider theme={myTheme}>
            {user ? (
               <Router>
                  <AppBar />
                  <Switch>
                     <Route exact path='/' component={Home} />
                     <Route path='/profile' component={MyProfile} />
                     <Route path='/about' component={About} />
                     <Route path='/contact' component={Contact} />
                     <Route path='/contributors' component={Contributors} />
                     <Route path='/add-new-post' component={AddNewPost} />
                     <Route path='/post/:_id/:slug' component={PostContent} />
                     <Redirect to='/' />
                  </Switch>
               </Router>
            ) : (
               <Router>
                  <AppBar />
                  <Switch>
                     <Route exact path='/' component={Preload} />
                     <Route path='/about' component={About} />
                     <Route path='/contact' component={Contact} />
                     <Route path='/contributors' component={Contributors} />
                     <Route path='/sign-in' component={LoginPage} />
                     <Route path='/sign-up' component={RegisterPage} />
                     <Redirect to='/' />
                  </Switch>
               </Router>
            )}
            <Footer />
         </ThemeProvider>
      </SnackbarProvider>
   );
};

export default App;
