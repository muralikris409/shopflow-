"use client";
import { useEffect, useState } from "react";
import { updateProfileInfo } from "@/app/_service/UserService";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "@/app/_lib/userReducer";
import { toast } from "@/hooks/use-toast";

const EditProfile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.userData);
  const user = userData?.user;
  const token = userData?.token;
  
  const userId = user?.id;

  const [fieldData, setFieldData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });

  const [imagePreview, setImagePreview] = useState(user?.profile_pic || null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setImagePreview(user.profile_pic || null);
      setFieldData({
        name: user.name || "",
        phone: user.phone || "",
      });
    }
  }, [userData]);

  const validateFields = () => {
    let newErrors = {};
    if (!fieldData.name.trim()) newErrors.name = "Name is required.";
    if (fieldData.name?.length>16) newErrors.name = "Name should be less than 18 characters.";
    if (!/^\d{10}$/.test(fieldData.phone))
      newErrors.phone = "Phone number must be 10 digits.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      toast({ title: "Invalid file type", description: "Please upload an image." ,  variant: "destructive"
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if (!validateFields()) return;
    
    setLoading(true);
    const formData = new FormData();
    formData.append("name", fieldData.name);
    formData.append("phone", fieldData.phone);

    const profileImage = e.target.profileImage.files[0];
    if (profileImage) {
      formData.append("profile", profileImage);
    }

    try {
      const response = await updateProfileInfo(token, userId, formData);
      if (response.status === 200) {
        toast({ title: "Success", description: "Profile updated successfully!" });
        dispatch(fetchData(`/user/userProfileInfo?userId=${userId}`, token));
      }
    } catch (error) {
      toast({ title: "Error", description: error.response?.data?.message || "An error occurred.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen mx-auto p-2 md:p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Edit Profile</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex flex-col items-center mb-6 relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center relative group">
            {imagePreview ? (
              <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-bold text-gray-500">{user?.name?.charAt(0)}</span>
            )}
            <label className="absolute inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer rounded-full">
              <span className="text-white px-3 py-1 rounded-md text-sm shadow-md">Edit ✎</span>
              <input type="file" name="profileImage" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={fieldData.name}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="mb-4 relative">
            <div className="group">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user?.email}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100"
                disabled
                placeholder="Email"
              />
              <span className="absolute right-2 top-2 text-gray-500 text-xs hidden group-hover:block bg-gray-200 px-2 py-1 rounded-md">
                Email can't be changed
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              onChange={handleChange}
              value={fieldData.phone}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
