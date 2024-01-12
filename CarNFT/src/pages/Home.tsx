import CarList from "../components/CarList"
import { Car } from "../utils/types";

interface HomeProps {
  carNFT: Car[];
}


const Home = ({ carNFT }: HomeProps) => {
  return (
    <div>
      <CarList carNFT={carNFT} />
    </div>
  );
}


export default Home