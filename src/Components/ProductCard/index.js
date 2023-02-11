import React from "react";
import Image from "next/image";
import {getProductImageUrl} from "@/helpers/imageHelper";
import { Poppins } from "@next/font/google"

const poppins = Poppins({ weight: ["500"],subsets: ["latin"] })

const ProductCard = ({productData}) => {
  return (
    <div className={"product"}>
      <div className={"productImageWrapper"}>
        <Image src={getProductImageUrl(productData?.image)} alt={productData?.name} layout="fill" className={"productImage"} />
      </div>
      <div className={"productInfo"}>
        <div className={"productInfoTitle"}>{productData.name}</div>
        <div className={"productInfoBrand"}>{productData.brand}</div>
      </div>
      <div className={poppins.className + " productInfoPrice"}>${productData.price}</div>
    </div>
  );
};

export default ProductCard;
