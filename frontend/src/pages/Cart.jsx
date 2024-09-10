import React, { useEffect } from "react";
import Layout from "./../layout/Layout";
import CartCard from "../components/CartCard";
import { useAppStore } from "../../store/appStore";
import { useNavigate } from "react-router-dom";
import { PiSmileySadFill } from "react-icons/pi";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, getUserCart, user } = useAppStore();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    getUserCart();
  }, [user, navigate, getUserCart]);

  const displayCart = cart?.map((item, index) => (
    <CartCard item={item} key={index} />
  ));

  const initialValue = 0;
  const total = Math.ceil(
    cart?.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      initialValue
    ) * 81
  );

  return (
    <Layout>
      <div className="flex flex-col min-h-screen p-4 gap-6 md:flex-row lg:p-12">
        {/* Cart Items */}
        <div className="w-full md:w-2/3 lg:w-3/5 bg-white shadow-lg rounded-lg p-6">
          <div className="mb-6 flex flex-col bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
            <h3 className="text-lg text-gray-600">Total Items: {cart?.length}</h3>
          </div>
          <div className="flex flex-col gap-4">{displayCart}</div>
          {!cart?.length && (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-2xl font-bold text-gray-800">Cart is empty</p>
              <PiSmileySadFill size={40} color="gray" />
            </div>
          )}
        </div>
        
        {/* Cart Summary */}
        {cart?.length > 0 && (
          <div className="w-full md:w-1/3 lg:w-2/5 bg-white shadow-lg rounded-lg p-6">
            <div className="flex flex-col bg-gray-200 p-4 rounded-lg mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
              <h3 className="text-lg text-gray-600">Review our order policy</h3>
            </div>
            <div className="bg-blue-600 p-4 rounded-lg text-white mb-4">
              <h3 className="text-lg font-bold">Payment Information</h3>
              <p>You can pay securely for this order.</p>
            </div>
            <div className="flex flex-col gap-2 bg-gray-100 p-4 rounded-lg">
              <h2 className="text-xl font-bold border-b pb-2 text-gray-800">
                Total Price: ₹{total}
              </h2>
              <h3 className="text-gray-600 border-b pb-2">Distributor Price - ₹20</h3>
              <h3 className="text-gray-600">Discount: ₹40</h3>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
