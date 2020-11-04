import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import validator from 'validator';
import { startRegisterWithEmailPasswordNameBuy } from '../../action/auth';

import { useForm } from '../../hooks/useForm';


export const RegisterScreenBuy = () => {
    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formValues;

    const isSeller = false;

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFromValid()) {
            dispatch(startRegisterWithEmailPasswordNameBuy(email, password, name, isSeller));
        }
    };

    const isFromValid = () => {
        if (name.trim().length === 0) {
            Swal.fire('Error','El nombre es requerido','error');
          return false;
        } else if (!validator.isEmail(email)) {
            Swal.fire('Error','El email no es valido','error');
          return false;
        } else if (password !== password2 || password.length < 5) {
            Swal.fire('Error','La contraseña debe de ser cuando menos de 6 caracteres y ser igual a la segunda contrase{a','error');
          return false;
        }
        return true;
      };

    return (
    <>
      <h3 className='auth__title'>Registro para compradores</h3>
      <form className='animate__animated animate__fadeIn animate__faster' onSubmit={handleRegister}>
        <input
          type='text'
          placeholder='Name'
          name='name'
          className='auth__input'
          autoComplete='off'
          value={name}
          onChange={handleInputChange}
        />
        <input
          type='text'
          placeholder='Email'
          name='email'
          className='auth__input'
          autoComplete='off'
          value={email}
          onChange={handleInputChange}
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          className='auth__input'
          value={password}
          onChange={handleInputChange}
        />
        <input
          type='password'
          placeholder='Confirm password'
          name='password2'
          className='auth__input'
          value={password2}
          onChange={handleInputChange}
        />
        <button type='submit' className='btn btn-primary btn-block mb-5'>
          Login
        </button>

        <Link to='/auth/login' className='link'>
          ¿Ya eres usuario?
        </Link>
      </form>
    </>
    )
}
