import React from 'react'
import { useDispatch } from 'react-redux'
import { activeHouse } from '../../action/houses';

export const MyHouse = ({id, description, colonia, url, uid}) => {
    const dispatch = useDispatch();

    
    const handleEntryClick = () => {
      dispatch(activeHouse(id, {
        description, colonia, url, uid
      }));
    };
    
    return (
    <div className='screen__entry pointer animate__animated animate__fadeIn animate__faster' onClick={handleEntryClick} >
      {url && (
        <div
          className='screen__entry-picture'
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url(${url})`,
          }}
        ></div>
      )}
      <div className='screen__entry-body'>
        <p className='screen__entry-title'>{description}</p>
        <p className='screen__entry-content'>{colonia}</p>
      </div>
    </div>
    )
}
