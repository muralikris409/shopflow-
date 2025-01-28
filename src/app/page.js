 import { useDispatch } from "react-redux";
import { Carousel } from "./_components/Carousel";
import Header from "./_components/header/Header";
import ProductCard from "./_components/ProductCard";
import { fetchData } from "./_lib/categoryReducer";
// import { getProducts } from "./data/ProductService";
import Products from "./(application)/products/Products";
import ProductCarousel from "./_components/ProductCarousel";
import {getClearanceSaleProducts, getFlashDeals, getLimitedTimeOffers, getProducts, getTrendingProducts } from "./(application)/_service/ProductService";
import FlashDeal from "./_components/Deals"; 
import Deals from "./_components/Deals";
import NewArrivals from "./_components/NewArrivals";
import ViewAllProductsButton from "./_components/ViewAllProducts";

export default async function Home()  {
  let products = [];
  let error = null;
  try { 
    products = await getProducts(1);
  } catch (err) {
    error = err;
    console.log(err)
  }
  products=products.data;
  console.log(products)
  return (
    <>
   <div className="flex flex-col lg:flex-row">
        <Carousel />
    
        
</div>
<div>
<NewArrivals/>
</div>
<div className="flex flex-col lg:flex-row">
<Deals title={"Flash Deals"} fetchData={getFlashDeals}/>
<Deals title={"Trending Products"} fetchData={getTrendingProducts}/>
        
</div>




      <ProductCarousel title={"Picks for you"} href={"/products"}>
  {products && products?.length > 0 ? ( 
    products.slice(0, 10).map((product, i) => (
      <ProductCard product={product} key={product.id || i} />
    ))
  ) : (
    <p className="text-gray-500">No products available.</p>
  )}
</ProductCarousel>
<div className="flex flex-col lg:flex-row">
<Deals title={"Limited Time Offers"} fetchData={getLimitedTimeOffers}/>
<Deals title={"Clearance Sale"} fetchData={getClearanceSaleProducts}/>
        
</div>
<ViewAllProductsButton/>
    </>
  );
}
