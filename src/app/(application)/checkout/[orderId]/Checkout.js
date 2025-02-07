"use client"
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { createOrder, failedVerify, verifyPayment } from '../../../_service/PaymentService';
import { checkOutOrder, verifyPaymentAndUpdateOrder, fetchOrderForCheckout } from '../../../_service/OrderService'; // Import the new API method
import { fetchUserAddresses, addAddress } from '../../../_service/UserService';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useToast } from '@/hooks/use-toast';

const OrderSummary = ({ title ,orderId}) => {
  const router = useRouter();
  const userId = useSelector((state) => state.session.user?.id);
  const {toast}=useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const phoneNumber = useSelector(state => state?.session?.user?.phone);
  const [orderData, setOrderData] = useState([]);
  const [phone, setPhone] = useState(phoneNumber || '');
  const [phoneError, setPhoneError] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [totalBill,setTotalBill]=useState();
  const token = useSelector(state => state?.session?.token);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    country: '',
    zip: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);
    loadAddresses();
    fetchOrderData();
    return () => {
      document.body.removeChild(script);
    };
  }, [userId]);

  const loadAddresses = async () => {
    setLoading(true);
    const result = await fetchUserAddresses(token, userId);
    if (result?.status === "success") {
      setAddresses(result.data);
      const primaryAddress = result.data.find((addr) => addr.isPrimary);
      if (primaryAddress) setSelectedAddress(primaryAddress);
    } else {
      console.error(result?.message || "Error retrieving address");
    }
    setLoading(false);
  };

  const fetchOrderData = async () => {
    setLoading(true);
    try {
      const result = await fetchOrderForCheckout(orderId);
      console.log(result);
      if (result.status === "success") {
        setOrderData(result.data.items);
        setTotalBill(result.data.totalAmount);
      } else {
        console.error(result?.message || "Error fetching order data");
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    } finally {
      setLoading(false);
    }
  };

  const validatePhone = () => {
    if (!phone.trim() || !/^\d{10}$/.test(phone)) {
      return 'Valid phone number is required (10 digits).';
    }
    return '';
  };

  const validateField = (name, value) => {
    let error = '';
    if (!value?.trim()) {
      error = `${name.replace(/([A-Z])/g, ' $1')} is required.`;
    } else {
      switch (name) {
        case 'zip':
          if (!/^[0-9]{5,6}$/.test(value)) {
            error = 'ZIP code must be 5-6 digits.';
          }
          break;
        default:
          break;
      }
    }
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    return !error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  const handleAddAddress = async () => {
    const isValid = Object.keys(newAddress).every((field) =>
      validateField(field, newAddress[field])
    );

    if (!isValid) return;

    try {
      const result = await addAddress(token, userId, newAddress);
      if (result.status === "success") {
        loadAddresses();
        setShowForm(false);
        setNewAddress({
          street: '',
          city: '',
          state: '',
          country: '',
          zip: '',
        });
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(process.env.NEXT_PUBLIC_RZP_KEY)
  const handlePayment = async () => {
    const phoneValidationError = validatePhone();
    if (phoneValidationError || !selectedAddress) {
      setError('Please provide a valid phone number and select an address.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { razorpayOrder, ...data } = await checkOutOrder(orderId);
      const options = {
        key: "rzp_test_1gTn0x73jrN12q",
        amount: Math.ceil(totalBill * 100),
        currency: razorpayOrder?.currency,
        name: 'Shopflow',
        description: 'Payment for your order',
        order_id: razorpayOrder?.id,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_signature, razorpay_order_id } = response;
          console.log("textoid",orderId,orderData)
          try {
            setLoading(true);
            const verificationResult = await verifyPaymentAndUpdateOrder(
              orderId,
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature
            );
            setLoading(false);

            if (verificationResult.success) {
              Cookies.set("orderId", orderId);
              router.push(`/orders/success`);
            } else {
              toast({
                title: "Payment failed",
                description: "Payment verification failed. Please try again.",
                variant: "destructive",
              })
            }
          } catch (error) {
            toast({
              title: "Payment failed",
              description: "An unexpected error occurred during verification. Please try again.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: selectedAddress.fullName,
          email: 'customer@example.com',
          contact: phone,
        },
        theme: {
          color: '#F37254',
        },
        modal: {
          ondismiss: async () => {
            toast({
              title: "Payment failed",
              description: "Payment was cancelled by the user. Please try again.",
              variant: "destructive",
            })
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError('Payment process failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const phoneValidationError = validatePhone();
    setPhoneError(phoneValidationError);
  }, [phone]);

  return (
    <div className="bg-gray-100">
      {error && <div className="bg-red-500 text-white p-4 rounded mb-4">{error}</div>}
  
      <div className="p-6 shadow-md bg-white">
        <h1 className="text-xl font-semibold border-b pb-4">{title}</h1>
  
        {/* Phone Number Section */}
        <div className="mb-6 mt-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full rounded-lg border p-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              phoneError ? "border-red-500 ring-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your 10-digit phone number"
          />
          {phoneError && (
            <p className="text-sm text-red-500 mt-2 italic">{phoneError}</p>
          )}
        </div>
  
        {/* Address Section */}
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-700">Select Delivery Address</h2>
          <div className="mt-2 border rounded p-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`flex items-center mb-4 p-4 rounded-lg border-2 ${
                  selectedAddress?.id === address.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-white"
                } shadow-sm hover:shadow-md transition-shadow duration-200`}
              >
                <input
                  type="radio"
                  name="address"
                  checked={selectedAddress?.id === address.id}
                  onChange={() => setSelectedAddress(address)}
                  className="mr-4 h-5 w-5 accent-blue-500 cursor-pointer"
                />
                <div className="flex flex-col">
                  <p className="text-base text-blue-700 font-semibold">
                    {address.street}
                  </p>
                  <p className="text-sm text-gray-600">
                    {`${address.city}, ${address.state}, ${address.zip}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
  
          <button
            className="text-blue-600 underline mt-2"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : '+ Add New Address'}
          </button>
  
          {showForm && (
            <div className="mt-4 border rounded p-4 bg-gray-50">
              {Object.keys(newAddress).map((key) => (
                <div key={key} className="mb-3">
                  <label className="block text-sm font-medium capitalize text-gray-600" htmlFor={key}>{key.replace(/([A-Z])/g, ' $1')}</label>
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={newAddress[key]}
                    onChange={handleInputChange}
                    className={`w-full rounded border p-2 text-sm ${formErrors[key] ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                  />
                  {formErrors[key] && <p className="text-sm text-red-500 mt-1">{formErrors[key]}</p>}
                </div>
              ))}
              <button
                className="bg-gray-800 text-white py-2 px-4 rounded mt-2 hover:bg-gray-700"
                onClick={handleAddAddress}
              >
                Save Address
              </button>
            </div>
          )}
        </div>
  
        {/* Order Summary Section */}
        <div className={`mt-4 ${!selectedAddress || phoneError ? 'opacity-50 pointer-events-none' : ''}`}>
          <h2 className="text-lg font-medium text-gray-700 mb-4 border-b pb-2">Order Summary</h2>
          {orderData?.map((item, index) => (
            <div key={index} className="flex items-center mb-4">
              <img
                className="w-20 h-20 object-cover rounded border"
                src={item.product?.image || '/_assets/image.png'}
                alt={item.product?.name}
              />
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-800">{item.product?.name}</h3>
                <p className="text-sm text-gray-500">{item.product?.description}</p>
                <p className="text-sm font-bold text-gray-800">${item.product?.offerPrice} x {item.quantity}</p>
              </div>
            </div>
          ))}
          <div className="border-t pt-4">
            <p className="font-medium text-lg text-gray-800">Total: ${totalBill}</p>
          </div>
        </div>
  
        {/* Payment Button */}
        <div className="mt-6 text-center">
          <button
            className={`w-full p-3 rounded text-white ${loading ? 'bg-gray-500' : 'bg-gray-600 hover:bg-gray-700'}`}
            disabled={!selectedAddress || phoneError || loading}
            onClick={handlePayment}
          >
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;