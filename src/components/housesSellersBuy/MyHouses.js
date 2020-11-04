import React from 'react';
import { useSelector } from 'react-redux';
import {MyHouse} from './MyHouse';

export const MyHouses = () => {
    const {houses} = useSelector((state) => state.houses)
    // console.log('houses', houses)
    return (
        <div className='screen__entries'>
            {houses.map((house) => (
                <MyHouse key={house.id} {...house} />
            ))}
        </div>
    )
}
