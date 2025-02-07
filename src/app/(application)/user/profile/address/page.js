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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Pencil, Trash } from "lucide-react";

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const { toast } = useToast();

  const loadAddresses = async () => {
    
    const result = await fetchUserAddresses(token, userId);

    if (result.status === "success") {
      setAddresses(result.data);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result?.message || "Error retrieving addresses",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
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
        toast({
          title: "Success",
          description: "Address added successfully.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result?.error || "Error adding address",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while adding the address.",
      });
    }
  };

  const handleMakePrimary = async (addressId) => {
    try {
      const result = await makeAddressPrimary(token, userId, addressId);
      if (result?.status === "success") {
        loadAddresses();
        toast({
          title: "Success",
          variant:"success",
          description: "Primary address updated successfully.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result?.error || "Error setting address as primary",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while setting the primary address.",
      });
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const result = await removeAddress(token, userId, addressId);
      if (result?.status === "success") {
        loadAddresses();
        toast({
          title: "Success",
          description: "Address deleted successfully.",
          variant: "success",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result?.error || "Error deleting address",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while deleting the address.",
      });
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
        toast({
          title: "Success",
          description: "Address updated successfully.",
          variant: "success",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result?.error || "Error updating address",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while updating the address.",
      });
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
    <div className="w-full h-screen mx-auto p-2 md:p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Manage Address</h2>
      {loading ? (
        <p>Loading addresses...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {addresses?.map((address) => (
    <Card
    key={address.id}
    className={`flex flex-col min-h-[200px] ${
      address.isPrimary ? "border-orange-500 bg-orange-50" : "bg-white"
    }`}
  >
    <CardHeader>
      <CardTitle className="text-lg font-semibold text-gray-700 mb-2">
        {address.street}
      </CardTitle>
    </CardHeader>
    <CardContent className="flex-1">
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
    </CardContent>
    <div className="mt-auto p-4 border-t">
      <div className="flex items-center space-x-2">
        {!address.isPrimary && (
          <Button
            onClick={() => handleMakePrimary(address.id)}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Set as Default
          </Button>
        )}
        <Button
          onClick={() => {
            setNewAddress({ ...address });
            setEditAddressId(address.id);
            setShowForm(true);
          }}
          className="bg-gray-500 hover:bg-gray-300 flex items-center gap-2 px-3"
        >
          <Pencil size={16} />
        </Button>
        <Button
          onClick={() => handleDeleteAddress(address.id)}
          className="bg-red-500 hover:bg-red-600 flex items-center gap-2 px-3"
        >
          <Trash size={16} />
        </Button>
      </div>
    </div>
  </Card>
          ))}
          <Button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="p-4 border-dashed border-2 border-indigo-500 text-white rounded-md flex justify-center items-center hover:bg-gray-600"
          >
            + Add New Address
          </Button>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-40">
          <Card className="w-96">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {editAddressId ? "Edit Address" : "Add New Address"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label>Street</Label>
                  <Input
                    type="text"
                    placeholder="Street"
                    value={newAddress.street}
                    onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                    className={errors.street ? "border-red-500" : ""}
                  />
                  {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
                </div>
                <div>
                  <Label>City</Label>
                  <Input
                    type="text"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    className={errors.city ? "border-red-500" : ""}
                  />
                  {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                </div>
                <div>
                  <Label>State</Label>
                  <Input
                    type="text"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    className={errors.state ? "border-red-500" : ""}
                  />
                  {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                </div>
                <div>
                  <Label>Country</Label>
                  <Input
                    type="text"
                    placeholder="Country"
                    value={newAddress.country}
                    onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                    className={errors.country ? "border-red-500" : ""}
                  />
                  {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                </div>
                <div>
                  <Label>ZIP Code</Label>
                  <Input
                    type="text"
                    placeholder="ZIP Code"
                    value={newAddress.zip}
                    onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                    className={errors.zip ? "border-red-500" : ""}
                  />
                  {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isPrimary"
                    checked={newAddress.isPrimary}
                    onCheckedChange={(checked) =>
                      setNewAddress({ ...newAddress, isPrimary: checked })
                    }
                  />
                  <Label htmlFor="isPrimary">Set as Primary</Label>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    onClick={handleSubmitAddress}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    {editAddressId ? "Update Address" : "Save"}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AddressManagement; 