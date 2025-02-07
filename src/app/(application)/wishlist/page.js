'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { loadWishlist, addOrRemoveProductFromWishlist } from '../../_service/WishListService';
import { setProductData } from '../../_lib/utilReducer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const userId = useSelector((state) => state.session.user?.id);
  const token = useSelector((state) => state.session.token);
  const { toast } = useToast();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (userId) {
          const wishlistProducts = await loadWishlist(userId, token);
          setProducts(wishlistProducts);
        }
      } catch (err) {
        setError('Failed to load wishlist. Please try again later.');
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load wishlist. Please try again later.",
        });
      }
    };

    fetchWishlist();
  }, [userId, token, toast]);

  const handleRemoveProduct = async (productId) => {
    try {
      if (userId) {
        setProducts((prevProducts) => prevProducts.filter((product) => product.productId !== productId));
        await addOrRemoveProductFromWishlist(userId, productId, token);
        toast({
          title: "Success",
          description: "Product removed from wishlist successfully.",
        });
      }
    } catch (err) {
      setError('Failed to remove product from wishlist. Please try again later.');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove product from wishlist. Please try again later.",
      });
    }
  };

  return (
    <section className="w-full h-screen mx-auto p-2 md:p-4 bg-white rounded-lg shadow-md">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">{products.length > 0 ? 'Your Wishlist' : 'Your Wishlist is empty'}</h2>

        {error && (
          <div className="text-center text-red-500 mt-4">{error}</div>
        )}

        <div className="m-2  grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <WishlistTile
              key={index}
              product={product.product}
              onRemoveProduct={handleRemoveProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Wishlist;

function WishlistTile({ product, onRemoveProduct }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleNavigation = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <Card className="overflow-hidden hover:scale-105 transition-transform bg-white shadow-xl rounded-lg">
      <div className="relative">
        <img className="h-48 w-full object-cover rounded-t-lg" src={product.image || "/_assets/image.png"} alt={product.name} />
        <Button
          variant="ghost"
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          onClick={() => onRemoveProduct(product.id)}
        >
          <X className="h-5 w-5 text-gray-600" />
        </Button>
      </div>
        <CardTitle className="ml-6 cursor-pointer text-lg font-semibold hover:text-blue-600" onClick={handleNavigation}>
          {product.name}
        </CardTitle>
      <CardContent>
        <p className="text-sm text-gray-500">Brand: {product.brand}</p>
        <p className="text-sm text-gray-500">{product.description}</p>
        <div className="flex items-center space-x-2 ">
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
}