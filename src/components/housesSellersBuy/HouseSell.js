import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import {startSaveHouse, startUploading, startDeleting, saveHouse, deleteHouseBuy} from '../../action/houses';

export const HouseSell = () => {
    const dispatch = useDispatch();
    const {user, uid:userId } = useSelector(state => state.auth);

    const {typeUserInfo} = user;
    const {isSeller} = typeUserInfo[0];

    const {active}= useSelector(state => state.houses);

    const editActive = {...active};

    const {url, colonia, description, id, uid} = active;

    const handlePhoto = () => {
        Swal.fire('Teléfono: 123456')
    };

    const handleEdit = async() => {
        const { value: formValues } = await Swal.fire({
            title: 'Ingresa tus datos',
            html:
            '<div>Colonia</div>'+
            '<input id="colonia1" className="swal2-input" />' +
            '<div>Descripción</div>' +
            '<input id="description1" className="swal2-input" />',
            focusConfirm: false,
            allowOutsideClick: false,
            preConfirm: () => {
            return [document.getElementById('colonia1').value, document.getElementById('description1').value]
            }
        });
        
        const editedHouse = {
            ...editActive,
            colonia: formValues[0],
            description: formValues[1]
        }
        
        dispatch(startSaveHouse(editedHouse));

        
    };

    const handleEditPhoto = async() => {
        const { value: file } = await Swal.fire({
            allowOutsideClick: false,
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
                imageAlt: 'The uploaded picture'
              })
            }
            reader.readAsDataURL(file);
        }
        dispatch(startUploading(file));
    }

    const handleDelete = () => {
        dispatch(startDeleting(id));
    };

    const handleRequest = () => {
        Swal.fire('Solicitud enviada')
    };


    const handleKeep = () => {
        dispatch(saveHouse(active));
    };

    const handleDeleteBuy = () => {
        dispatch(deleteHouseBuy(id))
    }

    return (
        <div className='screen__sell-content'> 
            <div
            className='screen__entry-picture-sell'
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url(${url})`,
            }}
            ></div>
            <div className='screen__entry-body-sell'>
                <p className='screen__entry-content-sell'>Colonia: {colonia}</p>
                <p className='screen__entry-title-sell'>{description}</p>
            </div>
            { isSeller ? (  (userId === uid) ? (
                    <div className='btn__main'>
                        <button className='btn btn-costume' onClick={handleEdit}> Editar </button>
                        <button className='btn btn-costume' onClick={handleEditPhoto}> Editar foto </button>
                        <button className='btn btn-danger' onClick={handleDelete}> Eliminar </button>
                        <button className='btn btn-costume' onClick={handlePhoto}> Contactar fotografo </button>
                    
                    </div>
                ) : (
                    <div className='btn__main'>
                        <button className='btn btn-costume' onClick={handleRequest}> Contactar al vendedor </button>
                    </div>
                )
            ) : (
                <div className='btn__main'>
                    <button className='btn btn-costume' onClick={handleKeep}> Guardar </button>
                    <button className='btn btn-danger' onClick={handleDeleteBuy}> Eliminar </button>
                    <button className='btn btn-costume' onClick={handleRequest}> Contactar al vendedor </button>
                </div>
            )}
        </div>
    )
}
