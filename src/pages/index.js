import Head from "next/head"
import { Raleway } from "@next/font/google"
import HeadBar from "@/Components/HeadBar";
import styles from "@/styles/Home.module.css"
import Tabs from "@/Components/Tabs";
import {useEffect, useState} from "react";
import ProductListContainer from "@/Components/ProductListContainer";
import {getHomeProducts} from "@/Services/product-services";

const raleWay = Raleway({ subsets: ["latin"] })

export default function Home(props) {
  const [productList, setProductList] = useState([]);

  const handleProducts = (products) => {
    setProductList(products?.payload?.products);
  }

  useEffect(() => {
    if (props?.data?.payload?.products) {
      setProductList(props?.data?.payload?.products)
    }
  }, [props]);

  return (
    <>
      <Head>
        <title>Matspar App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={raleWay.className}>
        <HeadBar setProducts={handleProducts} productList={productList}/>
        <h3 className={styles.homeTitle}>Find your favorite products now.</h3>
        <Tabs />
        <ProductListContainer productList={productList} />
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const data = await getHomeProducts(); // maybe this is unnecessary but i wanted to show some random products when the page loads
  return { props: { data } }
}
