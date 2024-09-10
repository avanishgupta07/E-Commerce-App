import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useAppStore } from "../../store/appStore";
import productsData from "../data/products.json"; // Adjust the path as needed

const DetailPage = () => {
  const navigate = useNavigate();
  const { addCart } = useAppStore();
  const [singleProduct, setSingleProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const getSingleProduct = () => {
        try {
          const product = productsData.find((item) => item.id === parseInt(id));
          setSingleProduct(product);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };
      getSingleProduct();
    }
  }, [id]);

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center w-full min-h-screen bg-gray-100">
        <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md flex flex-col md:flex-row gap-10 transition-transform transform hover:scale-105">
          {singleProduct ? (
            <>
              <div className="flex justify-center items-center w-full md:w-1/2 h-80 md:h-auto">
                <img
                  src={singleProduct?.image}
                  className="object-contain h-full w-full rounded-lg shadow-lg"
                  alt={singleProduct?.title}
                />
              </div>
              <div className="flex flex-col gap-4 w-full md:w-1/2">
                <div className="text-gray-500 text-sm font-medium">
                  {singleProduct?.category}
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {singleProduct?.title}
                </h1>
                <div className="text-2xl text-red-500 font-semibold">
                  ₹{Math.ceil(singleProduct?.price * 81)}
                </div>
                <div className="text-lg text-gray-600">
                  Rating:{" "}
                  <span className="font-bold">{singleProduct?.rating?.rate}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {singleProduct?.description}
                </p>
                <div className="text-lg font-medium text-gray-600">
                  Quantity:{" "}
                  <span className="font-bold">
                    {singleProduct?.rating?.count} nos
                  </span>
                </div>
                <div className="flex gap-4 mt-6">
                  <button className="flex-1 bg-sky-600 text-white py-3 rounded-lg shadow-lg text-lg font-medium hover:bg-sky-700 transition-all">
                    Buy Now
                  </button>
                  <button
                    onClick={() => addCart(singleProduct, navigate)}
                    className="flex-1 bg-teal-600 text-white py-3 rounded-lg shadow-lg text-lg font-medium hover:bg-teal-700 transition-all"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center w-full h-96 text-2xl font-semibold text-gray-700">
              No Items Found
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DetailPage;
