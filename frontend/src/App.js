// // frontend/src/App.js
// import React from 'react';
// import { Route, Switch } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';

// function App() {
//   return (
//     <Switch>
//       <Route path="/login">
//         <LoginFormPage />
//       </Route>
//     </Switch>
//   );
// }

// export default App;

// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage"
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AudioPlayer from "./components/AudioPlayer";
import Discover from "./components/Discover";
import { getSongs } from "./store/songs"
import Upload from "./components/Upload";
import EditSong from "./components/EditSong";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restore()).then(() => setIsLoaded(true));
    dispatch(getSongs())
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Discover />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/songs/:songId">
            <AudioPlayer />

          </Route>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route exact path="/songs/:songId/edit">
            <EditSong />
          </Route>
        </Switch>

      )}
    </>
  );
}

export default App;
