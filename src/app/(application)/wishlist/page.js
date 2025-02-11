'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { loadWishlist, addOrRemoveProductFromWishlist } from '../../_service/WishListService';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Loader } from '@/app/_components/Loader';

const Wishlist = () => {
  console.log("Wishlist component loaded");
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = useSelector((state) => state.userData?.token);
  const { toast } = useToast();
  const fetchWishlist = async () => {
    
    try {
      const wishlistProducts = await loadWishlist( token);
      setProducts(wishlistProducts);
    } catch (err) {
      setError("Failed to load wishlist. Please try again later.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load wishlist. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

   

    fetchWishlist();
  }, [ token, toast]);

  const handleRemoveProduct = useCallback(async (productId) => {
    if (!token) return;


    try {
      await addOrRemoveProductFromWishlist( productId, token);
      fetchWishlist();      
      toast({
        title: "Success",
        description: "Product removed from wishlist successfully.",
      });
    } catch (err) {
      console.log(err)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove product from wishlist. Please try again later.",
      });
    }
  }, [ token, toast]);

  const wishlistContent = useMemo(() => {
    if (loading) return (<><Loader/></>);
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!products.length) return <p className="text-center text-gray-500">Your wishlist is empty.</p>;

    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products.map(({ product }) => (
          <WishlistTile key={product.productId} product={product} onRemoveProduct={handleRemoveProduct} />
        ))}
      </div>
    );
  }, [loading, error, products, handleRemoveProduct]);

  return (
    <section className="w-full min-h-screen mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Your Wishlist</h2>
        {wishlistContent}
      </div>
    </section>
  );
};

export default Wishlist;

const WishlistTile = React.memo(({ product, onRemoveProduct }) => {
  const router = useRouter();
  return (
    <Card className="overflow-hidden hover:scale-105 transition-transform bg-white shadow-xl rounded-lg">
      <div className="relative">
        <img
          className="h-48 w-full object-cover rounded-t-lg"
          src={product.image || "/_assets/image.png"}
          alt={product.name}
          loading="lazy"
        />
        <Button
          variant="ghost"
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          onClick={() => onRemoveProduct(product.id)}
        >
          <X className="h-5 w-5 text-gray-600" />
        </Button>
      </div>
      <CardContent>
        <CardTitle className="cursor-pointer text-lg font-semibold hover:text-blue-600" onClick={() => router.push(`/product/${product.productId}`)}>
          {product.name}
        </CardTitle>
        <p className="text-sm text-gray-500">Brand: {product.brand}</p>
        <p className="text-sm text-gray-500 truncate">{product.description}</p>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-gray-500 line-through">${product.actualPrice}</p>
          <p className="text-lg text-orange-500 font-semibold">${product.offerPrice}</p>
          <p className="text-sm text-green-500">({product.discountPercentage}% off)</p>
        </div>
        <div className="flex items-center mt-2">
          <Star className="h-5 w-5 text-yellow-500" />
          <p className="text-sm text-gray-500 ml-1">{product.rating} / 5</p>
        </div>
      </CardContent>
    </Card>
  );
});
