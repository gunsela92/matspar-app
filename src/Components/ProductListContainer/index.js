import React from "react";
import ProductCard from "@/Components/ProductCard";

const ProductListContainer = ({productList}) => {
  return (
    <>
      {productList?.length > 0 && (
        <div className={"productListContainer"}>
          {productList.map((product, index) => (
            <ProductCard key={index} productData={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductListContainer;
