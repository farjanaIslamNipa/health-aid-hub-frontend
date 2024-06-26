import {useNavigate} from "react-router-dom";
import { TSupply } from "../types";
import Button from "./ui/Button";
import defaultImage from '../assets/images/default-img.jpg'
import {isValidURL} from "../utils/validUrl";

const SupplyCard = ({ supply }: { supply: TSupply }) => {
  const navigate = useNavigate()

  return (
    <div className="p-4 rounded-md cursor-pointer hover:shadow-lg transition-all ease-out duration-500 relative bg-white dark:bg-black dark:bg-opacity-25"
    >
      <div className="flex justify-center items-end rounded-xl bg-white">
        <div className="h-[250px] w-auto rounded-xl">
          {
            (supply?.img && isValidURL(supply?.img))? <img
            src={supply?.img}
            alt=""
            className="h-full w-full object-cover rounded-xl"
          />

          :
          <img
          src={defaultImage}
          alt=""
          className="h-full w-full object-cover pt-5"
          />
          }

        </div>
      </div>
      <p className="font-semibold text-lg pt-5 pb-2 leading-5 capitalize">
        {supply?.title}
      </p>
      <p className="text-sm capitalize">
        <b>Category:</b> {supply?.category}
      </p>
      <p className="text-sm">
        <b>Quantity:</b> {supply?.quantity}
      </p>
      <div className="py-6">
        <Button onClick={() => navigate(`/supplies/${supply?._id}`)} variant="outline" className="text-sm absolute bottom-4 bg-white dark:bg-brand dark:text-white">
          View Details
        </Button>
      </div>
    </div>
  );
};

export default SupplyCard;
