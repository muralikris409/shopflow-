"use client";
import React, { useEffect, useState } from "react";
import OrderSummary from "./Checkout";
import UserCartService from "../_service/UserCartService";
import { useSelector } from "react-redux";

function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const userCartService = new UserCartService();

  const reduxOrders = useSelector((state) => state?.utils?.product?.orders);
  console.log("reduxOrders",reduxOrders);
  const userId = useSelector((state) => state.session.user?.id);

  const fetchProducts = async () => {
    if (!userId) return;
    try {
      const response = await userCartService.viewCart(userId);
      console.log(response);
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (reduxOrders) {
      localStorage.setItem("orders", JSON.stringify(reduxOrders));
      setOrders(reduxOrders);
    } else {
      
      const storedOrders = localStorage.getItem("orders");
      if (storedOrders) {
        console.log("stored",storedOrders);
        setOrders(JSON.parse(storedOrders));
      }
    }
  }, [reduxOrders]);

  useEffect(() => {
    if (userId) {
      fetchProducts();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <OrderSummary
      data={products.items || []}
      userId={userId}
      orders={orders}
      totalBill={orders?.orders?.totalAmount}
    />
  );
}

export default Page;
