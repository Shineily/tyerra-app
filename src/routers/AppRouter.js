import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { firebase } from '../firebase/firebase-config';
import { PrivateRoute } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';
import { HousesScreen } from '../components/houses/HousesScreen';
import { AuthRouter } from './AuthRouter'
import { login } from '../action/auth';
import { startLoadingHouses } from '../action/houses';
import { getUserInfo } from '../action/ui';

export const AppRouter = () => {
    const dispatch = useDispatch();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
          if (user?.uid) {
            dispatch(login(user.uid, user.displayName));
            setIsLoggedIn(true);
            dispatch(startLoadingHouses(user.uid));
            dispatch(getUserInfo(user.uid));
          } else {
            setIsLoggedIn(false);
          }
        });
      }, [dispatch, setIsLoggedIn]);

    return (
        <Router>
        <div>
            <Switch>
                <PublicRouter 
                    path='/auth'
                    component={AuthRouter}
                    isAuthenticated={isLoggedIn}
                />
                <PrivateRoute
                    exact
                    path='/'
                    component={HousesScreen}
                    isAuthenticated={isLoggedIn}
                />
                <Redirect to='/auth/login' />
            </Switch>
        </div>
      </Router>
    )
}
