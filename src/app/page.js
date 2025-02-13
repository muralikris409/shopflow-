import { Carousel, CustomCarousel } from "./_components/Carousel";
import ProductCard from "./_components/ProductCard";

import ProductCarousel from "./_components/ProductCarousel";
import {getClearanceSaleProducts, getFlashDeals, getLimitedTimeOffers, getProducts, getTrendingProducts } from "./_service/ProductService";
import Deals from "./_components/Deals";
import NewArrivals from "./_components/NewArrivals";
import ViewAllProductsButton from "./_components/ViewAllProducts";
import BannerSection from "./_components/Banner";

export default async function Home()  {
  let products = [];
  let error = null;
  try { 
    products = await getProducts(1);
  } catch (err) {
  
    console.log(err)
  }
  products=products.data;
  console.log(products)
  return (
    <>
   <div className="flex flex-col items-center">
  <div className="w-full  mb-1 p-2 md:p-4 bg-gray-100 rounded-lg shadow-md">
    <BannerSection />
  </div>
  <div className="w-full p-1 md:p-4 bg-white rounded-lg shadow-md">
    <CustomCarousel />
  </div>
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
