import { useState, useEffect } from 'react'
//import {carList} from '../../constants'
import CarCard from '../CarCard/CarCard'
import { Car } from '../../utils/types';



interface CarListProps {
    carNFT: Car[];
  }
  
  const CarList = ({ carNFT }: CarListProps) => {
    return (
        <div className="row">
          {carNFT.map((car, i) => (
            <CarCard car={car} key={i} /> // Use CarCard for each car
          ))}
        </div>
      );
    }
export default CarList