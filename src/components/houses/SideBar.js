import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { startLogout } from '../../action/auth';
import { startInactive, startNewHouse, startUploading } from '../../action/houses';
import { MyHouses } from '../housesSellersBuy/MyHouses';


export const SideBar = () => {
    const { name } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(startLogout());
    };

    const handleAddNew = async() => {

        const { value: formValues } = await Swal.fire({
            title: 'Ingresa tus datos',
            html:
            '<div>Colonia</div>'+
            '<input id="colonia" className="swal2-input" />' +
            '<div>Descripción</div>' +
            '<input id="description" className="swal2-input" />',
            focusConfirm: false,
            allowOutsideClick: false,
            preConfirm: () => {
            return [document.getElementById('colonia').value, document.getElementById('description').value]
            }
        });


        dispatch(startNewHouse(formValues));

        const { value: file } = await Swal.fire({
            title: 'Seleciona una foto',
            input: 'file',
            inputAttributes: {
              'accept': 'image/*',
              'aria-label': 'Upload your profile picture'
            }
          });
          
          
          if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
              Swal.fire({
                title: 'Subiste esta foto',
                imageUrl: e.target.result,
                imageAlt: 'The uploaded picture',
                allowOutsideClick: false,
              })
            }
            reader.readAsDataURL(file);
          }
        
        dispatch(startUploading(file));
    };

    const handleReturn = () => {
        dispatch(startInactive());
        
    };


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
            <div className='screen__new-entry' onClick={handleAddNew}>
                <i className='fas fa-laptop-house fa-5x'></i>
                <p className='mt-5'>Nueva casa</p>
            </div>
            <MyHouses />
            <button className='btn btn-costume' onClick={handleReturn}> Todas las casas </button>
            <Link to='/auth/registerbuy2' className='link'>
                Continuar con el registro...
            </Link>
        </aside>
    )
}
