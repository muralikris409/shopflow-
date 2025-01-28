"use client";
import { useState, useEffect } from "react";
import { getProfileInfo, updateProfileInfo } from "@/app/(application)/_service/UserService"; 
import { useSelector } from "react-redux";
const EditProfile = () => {
  const userId = useSelector((state) => state?.session?.user?.id);
  const token = useSelector((state) => state?.session?.token);
  const userData=useSelector((state) => state?.session?.user);
  const gId= useSelector((state) => state?.session?.user?.googleId);
  const [user, setUser] = useState({
    name: "",
    phone: "",
    profileImage: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const response = await getProfileInfo(token, userId);
        console.log(response);
        setUser(response.data.data);
        setImagePreview(response.data.data.profile_pic);
      } catch (err) {
        setError("Failed to load profile data.");
        console.error(err);
      }
    };

    if (userId && token) {
      fetchProfileInfo();
    }
  }, [userId, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser((prevUser) => ({ ...prevUser, profileImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("phone", user.phone);
    if (user.profileImage) {
      formData.append("profile", user.profileImage);
    }

    setLoading(true);
    setError(null);

    try {
      const response = await updateProfileInfo(token, userId, formData); // Assume updateProfileInfo handles the PUT request
     console.log(response)
    //  setImagePreview(response?.data?.data?.profile_pic)
        alert("Profile updated successfully!");
        const newData={...userData,...response?.data.data};
        localStorage.setItem("shopflow_session",JSON.stringify({user:{...newData},token}));

      
    } catch (err) {
      setError("Failed to update profile.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md m-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Profile</h2>

      {error && <div className="text-center text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {imagePreview ? (
              <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-bold text-gray-500">{user.name.charAt(0)}</span>
            )}
          </div>
        {!gId &&  <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="ml-4 text-sm text-gray-600"
          />}
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-amber-700">
            Email can't be changed
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
            disabled
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md"
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
