import React from 'react'
import {Switch , Route} from 'react-router-dom'
import { ThemeProvider } from 'styled-components';
// import Nav from './Components/Nav';
import Started from './Pages/Started';
import Show from './Pages/Show';
import Home from './Pages/Home';

const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
       <Switch>
        <Route exact={true} path="/"> <Home/> </Route>
        <Route exact={true} path="/started"> <Started/> </Route>
        <Route exact path="/show/:id"> <Show/> </Route>
        <Route> Not Found</Route>
      </Switch>
    </ThemeProvider>
    
   
  );
}

export default App;
