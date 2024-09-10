import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import ProductCard from "../components/ProductCard";
import productsData from "../data/products.json"; // Adjust the path as needed

const Hero = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      // Simulating a delay to mimic fetching data
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProducts(productsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <section className="grid py-10 grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products?.map((item, id) => (
          <ProductCard item={item} key={id} />
        ))}
      </section>
    </Layout>
  );
};

export default Hero;
