import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";

const ProductCard = ({ item }) => {
  const { addCart } = useAppStore();
  const navigate = useNavigate();

  const productName = (name) =>
    name.length > 20 ? `${name.substring(0, 20)}...` : name;

  const handleNavigate = () => navigate(`/product/${item.id}`);

  return (
    <div className="flex flex-col items-center bg-white relative justify-between p-4 shadow-lg rounded-lg transition-transform transform hover:scale-105">
      <div
        className="h-[350px] w-full cursor-pointer overflow-hidden rounded-lg"
        onClick={handleNavigate}
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="py-4 text-center">
        <h2
          className="cursor-pointer text-lg font-semibold text-gray-800 hover:text-sky-600 transition-colors"
          onClick={handleNavigate}
        >
          {productName(item.title)}
        </h2>
        <h2 className="mt-2 text-xl font-bold text-red-500">
          ₹{Math.ceil(item.price * 81)}
        </h2>
      </div>
      <button
        onClick={() => addCart(item, navigate)}
        className="mt-4 w-full rounded-lg bg-sky-600 py-2 text-white font-medium hover:bg-sky-700 transition-all"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;
