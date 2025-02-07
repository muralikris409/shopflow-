"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { getOrderById } from "../../../_service/OrderService"; 
import ProductCarousel from "@/app/_components/ProductCarousel";
import ProductCard from "@/app/_components/ProductCard";
import Cookies from "js-cookie"; 

const OrderCard = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderCardComponent />
    </Suspense>
  );
};
export default OrderCard;

const OrderCardComponent = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const orderId = Cookies.get("orderId");
 

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!orderId) {
          throw new Error("Order ID not found in cookies");
        }
        const orderData = await getOrderById(orderId);
        console.log(orderData);
        setOrder(orderData.data);

        Cookies.set("orderDetails", JSON.stringify(orderData.data), {
          expires: 7,
        });
      } catch (err) {
        setError("Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const orderDate = order?.orderDate
    ? new Date(order.orderDate).toLocaleDateString()
    : "N/A";
  const formattedAmount = order?.totalAmount
    ? order.totalAmount.toLocaleString()
    : "N/A";

  if (loading) {
    return (
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-2xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
            Loading order details...
          </h2>
        </div>
      </section>
    );
  }

  if (error || !order) {
    return (
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-2xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
            Oops! Something went wrong.
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
            We couldn't retrieve your order details. Please try again later or
            contact support.
          </p>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Return to shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-2xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
          Thanks for your order!
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
          Your order{" "}
          <a
            href="#"
            className="font-medium text-gray-900 dark:text-white hover:underline"
          >
            #{orderId || "N/A"}
          </a>{" "}
          will be processed within 24 hours during working days. We will notify
          you by email once your order has been shipped.
        </p>
        <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Order Date
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              {orderDate}
            </dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Order Status
            </dt>
            <dd
              className={`font-medium sm:text-end ${
                order.orderStatus === "CONFIRMED"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {order.orderStatus || "N/A"}
            </dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Payment Status
            </dt>
            <dd
              className={`font-medium sm:text-end ${
                order.paymentStatus === "COMPLETED"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {order.paymentStatus || "N/A"}
            </dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Total Amount
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              $ {formattedAmount}
            </dd>
          </dl>
        </div>

        <div className={`mt-4`}>
          <h2 className="text-lg font-medium text-gray-700 mb-4 border-b pb-2">
            Order Summary
          </h2>
          {order?.product?.map((item, index) => (
            <div key={index} className="flex items-center mb-4">
              <img
                className="w-20 h-20 object-cover rounded border"
                src={item.product?.image || "/_assets/image.png"}
                alt={item.product?.name}
              />
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-800">
                  {item.product?.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.product?.description}
                </p>
                <p className="text-sm font-bold text-gray-800">${item.product?.offerPrice} x {item.quantity}</p>

              </div>
            </div>
          ))}
          <div className="border-t pt-4">
            <p className="font-medium text-lg text-gray-800">
              Total: $ {formattedAmount}
            </p>
          </div>
        </div>
        <div className="flex items-center mt-4">
          <Link
            href="/"
            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Return to shopping
          </Link>
        </div>
      </div>
      <ProductCarousel title={"Picks for you"} href={"/products"}>
        {order?.similarProducts && order?.similarProducts?.length > 0 ? (
          order?.similarProducts.map((product, i) => (
            <ProductCard product={product} key={product.id || i} />
          ))
        ) : (
          <p className="text-gray-500">No products available.</p>
        )}
      </ProductCarousel>
    </section>
  );
};
