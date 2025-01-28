"use client";
import { useState, useEffect } from "react";
import {
  fetchUserAddresses,
  makeAddressPrimary,
  addAddress,
  updateAddress,
  removeAddress,
} from "../../../../_service/UserService"; // Adjust the path as needed
import { useSelector } from "react-redux";

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    isPrimary: false,
  });
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);

  const userId = useSelector((state) => state?.session?.user?.id);
  const token = useSelector((state) => state?.session?.token);

  const loadAddresses = async () => {
    setLoading(true);
    const result = await fetchUserAddresses(token, userId);

    if (result.status === "success") {
      setAddresses(result.data);
    } else {
      console.error(result?.message || "Error retrieving addresses");
    }
    setLoading(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newAddress.street.trim()) newErrors.street = "Street is required.";
    if (!newAddress.city.trim()) newErrors.city = "City is required.";
    if (!newAddress.state.trim()) newErrors.state = "State is required.";
    if (!newAddress.country.trim()) newErrors.country = "Country is required.";
    if (!newAddress.zip.trim() || !/^[0-9]{5,6}$/.test(newAddress.zip)) {
      newErrors.zip = "ZIP Code must be 5-6 digits.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddAddress = async () => {
    if (!validateForm()) return;

    try {
      const result = await addAddress(token, userId, newAddress);
      if (result?.status === "success") {
        loadAddresses();
        setShowForm(false);
        resetForm();
      } else {
        console.error(result?.error || "Error adding address");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMakePrimary = async (addressId) => {
    try {
      const result = await makeAddressPrimary(token, userId, addressId);
      if (result?.status === "success") {
        loadAddresses();
      } else {
        console.error(result?.error || "Error setting address as primary");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const result = await removeAddress(token, userId, addressId);
      if (result?.status === "success") {
        loadAddresses();
      } else {
        console.error(result?.error || "Error deleting address");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveEditedAddress = async () => {
    if (!validateForm()) return;

    try {
      const result = await updateAddress(token, userId, editAddressId, newAddress);
      if (result?.status === "success") {
        loadAddresses();
        setShowForm(false);
        setEditAddressId(null);
        resetForm();
      } else {
        console.error(result?.error || "Error updating address");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setNewAddress({
      street: "",
      city: "",
      state: "",
      country: "",
      zip: "",
      isPrimary: false,
    });
    setErrors({});
  };

  const handleSubmitAddress = () => {
    if (editAddressId) {
      handleSaveEditedAddress();
    } else {
      handleAddAddress();
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Manage Addresses</h1>
      {loading ? (
        <p>Loading addresses...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {addresses?.map((address) => (
            <div
              key={address.id}
              className={`p-4 border rounded-md shadow ${
                address.isPrimary ? "border-indigo-500 bg-indigo-50" : "bg-white"
              }`}
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-2">{address.street}</h2>
              <p className="text-gray-500">
                {address.city}, {address.state}
              </p>
              <p className="text-gray-500">
                {address.country} - {address.zip}
              </p>
              <p
                className={`mt-2 text-sm font-medium ${
                  address.isPrimary ? "text-green-600" : "text-gray-400"
                }`}
              >
                {address.isPrimary ? "Primary Address" : ""}
              </p>
              <div className="flex items-center mt-4 space-x-4">
                {!address.isPrimary && (
                  <button
                    onClick={() => handleMakePrimary(address.id)}
                    className="px-3 py-1 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600"
                  >
                    Set as Default
                  </button>
                )}
                <button
                  onClick={() => {
                    setNewAddress({ ...address });
                    setEditAddressId(address.id);
                    setShowForm(true);
                  }}
                  className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAddress(address.id)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="p-4 border-dashed border-2 border-indigo-500 text-indigo-500 rounded-md flex justify-center items-center hover:bg-indigo-50"
          >
            + Add New Address
          </button>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">
              {editAddressId ? "Edit Address" : "Add New Address"}
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Street"
                value={newAddress.street}
                onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.street ? "border-red-500" : "focus:ring-indigo-400"
                }`}
              />
              {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
              <input
                type="text"
                placeholder="City"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.city ? "border-red-500" : "focus:ring-indigo-400"
                }`}
              />
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
              <input
                type="text"
                placeholder="State"
                value={newAddress.state}
                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.state ? "border-red-500" : "focus:ring-indigo-400"
                }`}
              />
              {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
              <input
                type="text"
                placeholder="Country"
                value={newAddress.country}
                onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.country ? "border-red-500" : "focus:ring-indigo-400"
                }`}
              />
              {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
              <input
                type="text"
                placeholder="ZIP Code"
                value={newAddress.zip}
                onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.zip ? "border-red-500" : "focus:ring-indigo-400"
                }`}
              />
              {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={newAddress.isPrimary}
                  onChange={(e) => setNewAddress({ ...newAddress, isPrimary: e.target.checked })}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <span className="ml-2 text-gray-600">Set as Primary</span>
              </label>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  onClick={handleSubmitAddress}
                  className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                >
                  {editAddressId ? "Update Address" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressManagement;
