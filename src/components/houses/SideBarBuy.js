import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../../action/auth';
import { startInactive } from '../../action/houses';
import { MyHouses } from '../housesSellersBuy/MyHouses';

export const SideBarBuy = () => {
    const { name } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(startLogout());
    };

    const handleReturn = () => {
        dispatch(startInactive())
    }


    return (
        <aside className='screen__sidebar'>
            <div className='screen__sidebar-navbar'>
                <h3 className='mt-5'>
                <i className='far fa-user'></i>
                <span> {name}</span>
                </h3>
                <button className='btn' onClick={handleLogout}>
                <i className='fas fa-sign-out-alt'> </i>
                Logout
                </button>
            </div>
            <div className='screen__new-entry' >
                <i className='fas fa-laptop-house fa-5x'></i>
                <p className='mt-5'>Casas Guardadas</p>
            </div>
            <MyHouses />
            <button className='btn btn-costume' onClick={handleReturn}> Todas las casas </button>
            <Link to='/auth/registerbuy2' className='link'>
                Continuar con el registro...
            </Link>
        </aside>
    )
}
