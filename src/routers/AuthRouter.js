import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreenBuy } from '../components/auth/RegisterScreenBuy';
import { RegisterScreenSeller } from '../components/auth/RegisterScreenSeller';

export const AuthRouter = () => {
    return (
    <div className='auth__main'>
      <div className='auth__box-container'>
        <Switch>
          <Route path='/auth/login' component={LoginScreen} />
          <Route path='/auth/registerbuy' component={RegisterScreenBuy} />
          <Route path='/auth/registerseller' component={RegisterScreenSeller} />
          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </div>
    )
}
