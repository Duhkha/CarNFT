import React, { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { Car } from "../utils/types";
import { ethers } from 'ethers';
import { Modal } from 'react-bootstrap';

type Props = {
    carNFT: Car[];
    buyCar: (tokenId: number, price: number) => Promise<void>;
};


const CarPage = ({ carNFT,buyCar }: Props) => {
    const { tokenId } = useParams();
    const car = carNFT.find(c => c.tokenId === Number(tokenId));
    const [showModal, setShowModal] = useState(false);
    
 

    if (!car) {
        return <p>The requested NFT does not exist.</p>;
    }

    const handleBuy = () => {
        const priceInWei = car.price
        buyCar(car.tokenId, priceInWei);
    };

    const toggleModal = () => setShowModal(!showModal);

    return (
        <div className="col-12 col-md-3 m-3">
            <Link className="btn btn-info mb-2" to="/">Back to Home Page</Link>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{car.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Price: {car.price} Wei</h6>
                    <img src={car.img} alt={car.name} style={{ width: '100%', cursor: 'pointer' }} onClick={toggleModal} />
                    <button onClick={handleBuy}>Buy CarNFT</button>
                </div>
            </div>
            <a href={car.externalUrl} target="_blank" rel="noopener noreferrer">More Information</a>

            <Modal show={showModal} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{car.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={car.img} alt={car.name} style={{ width: '100%' }} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CarPage;
