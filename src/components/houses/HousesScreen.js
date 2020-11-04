import React from 'react'
import { useSelector } from 'react-redux'
import { HouseSell } from '../housesSellersBuy/HouseSell'
import { AllHouses } from './AllHouses'
import { SideBar } from './SideBar'
import { SideBarBuy } from './SideBarBuy'

export const HousesScreen = () => {
  const { active } = useSelector((state) => state.houses);
  const {user} = useSelector(state => state.auth);

  const {typeUserInfo} = user;
  const {isSeller} = typeUserInfo[0];



    return (
      <div className='screen__main-content animate__animated animate__fadeIn animate__faster'>
        { isSeller ?  (
          <> 
            <SideBar />
            <main>{active ? <HouseSell /> : <AllHouses />}</main>
          </>
        )
        : (
            <> 
              <SideBarBuy />
              <main>
              {active ? <HouseSell /> : <AllHouses />}
              </main>
            </>
        )}
        
      </div>
    )
}
