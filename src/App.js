import React from 'react';
import './App.css';
import Router1 from "./router/Router";
import { ModalProvider } from "./components/login/ModalContext";
import { Provider, Consumer } from "./components/context/Authcontext";
import NotLoggedRouter from './router/NotLoggedRouter';
import FooterPage from "./components/home/FooterPage";


function App() {
  return (
    <div className="App">
      <ModalProvider>
        <Provider>
          <Consumer>
            {({ isLoggedIn }) => (isLoggedIn ? <Router1 /> : <NotLoggedRouter/>)}
          </Consumer>
    
        </Provider>
      </ModalProvider>
        <FooterPage/>
    </div>
  );
}

export default App;
