import { useState,useEffect } from 'react'
import './App.css'
import {About,Home,NotFound} from './pages'
import { Route, Routes } from 'react-router-dom'
import Navbar from "./components/Navbar"
import CarPage from './pages/CarPage'
import { Car,NFTMetadata } from "./utils/types";

import { ethers } from 'ethers';
import { carNFTAddress, carNFTABI, marketplaceAddress, marketplaceABI } from './constants';
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
    provider: any
    signer: any
  }
}



function App() {
  const [addresses, setAddresses] = useState<string[]>([]);
  const [carNFT, setCarNFT] = useState<Car[]>([]);


  const connect = async () => {
    if (window.ethereum) {
      window.provider = new ethers.BrowserProvider(window.ethereum);
      let addresses = await window.provider.send("eth_requestAccounts", []);
      window.signer = await window.provider.getSigner();

      if (addresses && Array.isArray(addresses)) {
        setAddresses(addresses);
        getAllListedCars();
      }
    }
  }
  

  const getAllListedCars = async () => {
    const contract = new ethers.Contract(marketplaceAddress, marketplaceABI, window.signer);
    let cars = await contract.getAllListedCars();
    console.log(cars)

    const carsData: Car[] = [];
  for (let i = 0; i < cars[0].length; i++) {
    const tokenId = Number(cars[0][i]);
    const price = Number(cars[1][i]);
    const name = cars[2][i];
    const metadata  = await fetchNFTMetadata(tokenId); // Fetch and wait for the image URL

    const car: Car = { 
      tokenId, 
      price, 
      name, 
      img: metadata.img, 
      externalUrl: metadata.externalUrl
    };
    carsData.push(car);
  }

    console.log(carsData);
    setCarNFT(carsData);
  }

  async function fetchNFTMetadata(tokenId: number): Promise<NFTMetadata> {
    const nftContract = new ethers.Contract(carNFTAddress, carNFTABI, window.signer);
    try {
      const tokenURI = await nftContract.tokenURI(tokenId);
      const httpURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
      const response = await fetch(httpURL);
      const metadata = await response.json();
      const imageIPFSLink = metadata.image;
      const imageHTTPLink = imageIPFSLink.replace("ipfs://", "https://ipfs.io/ipfs/");
      const externalUrl = metadata.external_url || ''; 
      return { img: imageHTTPLink, externalUrl };
    } catch (error) {
      console.error(`Error fetching metadata for token ${tokenId}:`, error);
      return { img: '', externalUrl: '' };     }
  }

  async function buyCar(tokenId: number, price: number) {
    if (!window.ethereum) {
      alert("Please install MetaMask to proceed.");
      return;
    }
  
    try {
      const contract = new ethers.Contract(marketplaceAddress, marketplaceABI, window.signer);
  
      const transaction = await contract.buyCar(tokenId, { value: price });
      await transaction.wait();
      
      alert("Transaction successful!");
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed.");
    }
  }
  





  

  
  

  return (
    <>
      {addresses.length === 0 && (
        <div>
          <button id="connect" onClick={connect}>Connect to MetaMask</button>
        </div>
      )}
      {addresses.length > 0 && (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home carNFT={carNFT}  />} />
            <Route path="/home" element={<Home carNFT={carNFT}/>} />
            <Route path="/:tokenId" element={<CarPage carNFT={carNFT} buyCar={buyCar} />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App
