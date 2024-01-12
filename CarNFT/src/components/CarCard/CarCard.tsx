import { Link } from "react-router-dom";
import { Car } from "../../utils/types";
import { useState } from "react";




type Props = {
  car: Car;
};

const CarCard = ({ car }: Props) => {
  // Convert price from Wei to Ether for display
  //const priceInEth = ethers.utils.formatEther(car.price);

  return (
    <div className="col-12 col-md-3 m-3">
      <Link to={`/${car.tokenId}`} style={{ textDecoration: 'none' }}>
        <div className="card">
          <div className="card-body">
            <img src={`${car.img}?w=248&fit=crop&auto=format`} className="card-img-top car-image" />
            <h5 className="card-title">{car.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Price: {car.price} Wei</h6>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CarCard;