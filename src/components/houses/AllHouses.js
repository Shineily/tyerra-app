import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeHouse } from '../../action/houses';

export const AllHouses = () => {
    const {allHouses} = useSelector(state => state.houses);
    const dispatch = useDispatch();

    const handleClick = ({id, description, colonia, url, uid}) => {
        dispatch(activeHouse(id, {
            description, colonia, url, uid
        }));
    }



    return (
        <div className='houses__houses-main'>
            <input
                className='houses__search-input'
                type='text'
                placeholder='Buscar casa'
                autoComplete='off'
                />
            <h1>Conoce todas las casa que tenemos para ti</h1>
            <div className='houses__houses-content'>
                {allHouses.map( house => (
                    <div className='houses__house-content' key={`${house.id}+${house.id}`} onClick={() => handleClick(house)}>
                        <h3>Colonia {house.colonia}</h3>
                        <img className='houses__house-images' src={house.url} alt='casas' width='300px' height='200px' />
                        <span>Descripción {house.description}</span>
                    </div>
                ))};
            </div>
        </div>
    )
}
