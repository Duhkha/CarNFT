// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ICarNFT {
    //function ownerOf(uint8 tokenId) external view returns (address);
    function transferFrom(address from, address to, uint256 tokenId) external;
}

contract TurboTradeMarketplace {
    ICarNFT public carNFT;
    address payable public admin; 

    struct Car {
        uint256 price;
        string name;
        bool isListed;
    }
    mapping(uint256 => Car) public cars;
    uint8 public totalListed; // Track the total number of listed cars

    event CarListed(uint256 indexed tokenId, uint256 price, string name);
    event CarPriceUpdated(uint256 indexed tokenId, uint256 newPrice);
    event CarSold(uint256 indexed tokenId, address buyer);
    event CarDelisted(uint256 indexed tokenId);

    constructor(address _carNFT) {
        carNFT = ICarNFT(_carNFT);
        admin = payable(msg.sender); 
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier isListed(uint256 tokenId) {
        require(cars[tokenId].isListed, "Car is not listed");
        _;
    }

    function listCar(uint256 tokenId, uint256 price, string memory name) external onlyAdmin {
        //require(carNFT.ownerOf(tokenId) == admin, "Admin must own the car to list it");
        cars[tokenId] = Car(price, name, true);
        totalListed++;
        emit CarListed(tokenId, price, name);
    }

    function updateCarPrice(uint256 tokenId, uint256 newPrice) external onlyAdmin isListed(tokenId) {
        cars[tokenId].price = newPrice;
        emit CarPriceUpdated(tokenId, newPrice);
    }

    function delistCar(uint256 tokenId) external onlyAdmin isListed(tokenId) {
        cars[tokenId].isListed = false;
        totalListed--;
        emit CarDelisted(tokenId);
    }

    function buyCar(uint256 tokenId) external payable isListed(tokenId) {
        Car memory car = cars[tokenId];
        require(msg.value >= car.price, "Incorrect payment amount");

        carNFT.transferFrom(admin, msg.sender, tokenId);
        admin.transfer(msg.value); // Transfer Ether to the admin
        cars[tokenId].isListed = false;
        totalListed--;
        emit CarSold(tokenId, msg.sender);
    }

    function getListing(uint256 tokenId) external view returns (Car memory) {
        return cars[tokenId];
    }

    function getAllListedCars() external view returns (uint256[] memory, uint256[] memory, string[] memory) {
    uint256 totalCars = 0;
    for (uint256 i = 0; i < totalListed; i++) {
        if (cars[i].isListed) {
            totalCars++;
        }
    }

    uint256[] memory ids = new uint256[](totalCars);
    uint256[] memory prices = new uint256[](totalCars);
    string[] memory names = new string[](totalCars);

    uint256 index = 0;
    for (uint256 i = 0; i < totalListed; i++) {
        if (cars[i].isListed) {
            ids[index] = i;
            prices[index] = cars[i].price;
            names[index] = cars[i].name;
            index++;
        }
    }

    return (ids, prices, names);
}
}
