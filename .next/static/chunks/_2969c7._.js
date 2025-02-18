(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_2969c7._.js", {

"[project]/src/app/_service/UserService.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "addAddress": (()=>addAddress),
    "fetchUserAddresses": (()=>fetchUserAddresses),
    "forgotPassword": (()=>forgotPassword),
    "getProfileInfo": (()=>getProfileInfo),
    "googleOAuth": (()=>googleOAuth),
    "login": (()=>login),
    "makeAddressPrimary": (()=>makeAddressPrimary),
    "removeAddress": (()=>removeAddress),
    "resetPassword": (()=>resetPassword),
    "signUp": (()=>signUp),
    "updateAddress": (()=>updateAddress),
    "updateProfileInfo": (()=>updateProfileInfo)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/api/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nookies$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/nookies/dist/index.js [app-client] (ecmascript)");
;
;
async function login(formdata, ctx = null) {
    const { email, password } = formdata;
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].post("user/login", {
            email: email,
            password: password
        });
        console.log(response.data);
        const { token, data } = response.data;
        console.log(token, data);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nookies$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setCookie"])(ctx, "shopflow_session", JSON.stringify({
            token
        }), {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
            sameSite: 'lax'
        });
        return {
            data,
            token
        };
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message || "An error occurred during login.");
    }
}
async function googleOAuth(data, ctx = null) {
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].post("user/oauth", {
            ...data,
            id: data.sub
        });
        const { token, data: user } = response.data;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nookies$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setCookie"])(ctx, "shopflow_session", JSON.stringify({
            token
        }), {
            maxAge: 30 * 24 * 60 * 60
        });
        return response.data;
    } catch (error) {
        throw new Error(error?.data?.response?.message || "An error occurred during Google OAuth.");
    }
}
async function signUp(formdata) {
    const { username: name, email, password } = formdata;
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].post("user/signup", {
            name,
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "An error occurred during sign-up.");
    }
}
async function forgotPassword(email) {
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].post(`user/forgotPassword?email=${email}`);
        console.log(response);
        if (response.status === 200) {
            return {
                ok: true,
                data: response.data
            };
        }
        return {
            ok: false,
            message: response.data?.message || "Something went wrong."
        };
    } catch (err) {
        console.log(err);
        throw err;
    }
}
async function resetPassword(token, password) {
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].post(`user/resetPassword?token=${token}&newPassword=${password}`);
        return response;
    } catch (err) {
        throw err;
    }
}
async function getProfileInfo(token, userId) {
    try {
        console.log("test");
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].get(`user/userProfileInfo?userId=${userId}`, {}, {
        });
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
    }
}
async function updateProfileInfo(token, userId, data) {
    try {
        console.log("test");
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].put(`user/updateUserProfile?userId=${userId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
async function fetchUserAddresses(token, userId) {
    try {
        console.log("token", token);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].get(`user/getAllAddress?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching addresses:", error);
        return {
            error: error.message || "Something went wrong!"
        };
    }
}
;
const makeAddressPrimary = async (token, userId, addressId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].put(`user/makePrimaryAddress`, {}, {
            params: {
                userId,
                addressId
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching addresses:", error);
        return {
            error: error.message || "Something went wrong!"
        };
    }
};
const addAddress = async (token, userId, addressData)=>{
    try {
        const { street, city, state, country, zip, isPrimary } = addressData;
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].post('user/addAddress', {}, {
            params: {
                userId,
                street,
                city,
                state,
                country,
                zip,
                isPrimary
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding address:", error);
        return {
            error: error.response?.data?.message || "Something went wrong!"
        };
    }
};
const updateAddress = async (token, userId, addressId, addressData)=>{
    try {
        const { street, city, state, country, zip, isPrimary } = addressData;
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].put('user/editAddress', {}, {
            params: {
                userId,
                addressId,
                street,
                city,
                state,
                country,
                zip,
                isPrimary
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding address:", error);
        return {
            error: error.response?.data?.message || "Something went wrong!"
        };
    }
};
const removeAddress = async (token, userId, addressId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].delete('user/deleteAddress', {
            params: {
                userId,
                addressId
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding address:", error);
        return {
            error: error.response?.data?.message || "Something went wrong!"
        };
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/(application)/user/_ProfileSections/manage/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$_service$2f$UserService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/_service/UserService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$_lib$2f$userReducer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/_lib/userReducer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/use-toast.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
const EditProfile = ()=>{
    _s();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    const userData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "EditProfile.useSelector[userData]": (state)=>state?.userData
    }["EditProfile.useSelector[userData]"]);
    const user = userData?.user;
    const token = userData?.token;
    const userId = user?.id;
    const [fieldData, setFieldData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: user?.name || "",
        phone: user?.phone || ""
    });
    const [imagePreview, setImagePreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(user?.profile_pic || null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditProfile.useEffect": ()=>{
            if (user) {
                setImagePreview(user.profile_pic || null);
                setFieldData({
                    name: user.name || "",
                    phone: user.phone || ""
                });
            }
        }
    }["EditProfile.useEffect"], [
        userData
    ]);
    const validateFields = ()=>{
        const phoneRegex = /^[6-9]\d{9}$/;
        let newErrors = {};
        if (!fieldData.name.trim()) newErrors.name = "Name is required.";
        console.log(fieldData?.name?.length);
        if (fieldData.name?.length >= 18) newErrors.name = "Name should be less than 18 characters.";
        if (!phoneRegex.test(fieldData.phone)) newErrors.phone = "Phone number must be 10 digits and start with 6, 7, 8, or 9.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = ()=>setImagePreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])({
                title: "Invalid file type",
                description: "Please upload an image.",
                variant: "destructive"
            });
        }
    };
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFieldData((prevData)=>({
                ...prevData,
                [name]: value
            }));
    };
    const handleSubmit = async (e)=>{
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
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$_service$2f$UserService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateProfileInfo"])(token, userId, formData);
            if (response.status === 200) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])({
                    title: "Success",
                    description: "Profile updated successfully!"
                });
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$_lib$2f$userReducer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchData"])(`/user/userProfileInfo?userId=${userId}`, token));
            }
        } catch (error) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])({
                title: "Error",
                description: error.response?.data?.message || "An error occurred.",
                variant: "destructive"
            });
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full h-screen mx-auto p-2 md:p-4 bg-white rounded-lg shadow-md",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-3xl font-semibold text-gray-800 mb-6",
                children: "Edit Profile"
            }, void 0, false, {
                fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                encType: "multipart/form-data",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center mb-6 relative",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center relative group",
                            children: [
                                imagePreview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: imagePreview,
                                    alt: "Profile",
                                    className: "w-full h-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
                                    lineNumber: 102,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-3xl font-bold text-gray-500",
                                    children: user?.name?.charAt(0)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
                                    lineNumber: 104,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "absolute inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer rounded-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-white px-3 py-1 rounded-md text-sm shadow-md",
                                            children: "Edit ✎"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
                                            lineNumber: 107,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "file",
                                            name: "profileImage",
                                            accept: "image/*",
                                            onChange: handleImageChange,
                                            className: "hidden"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
                                            lineNumber: 108,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
                                    lineNumber: 106,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 gap-4 md:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "name",
                                        className: "block text-sm font-medium text-gray-700",
                                        children: "Name"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
                                        lineNumber: 115,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        id: "name",
                                        name: "name",
                                        onChange: handleChange,
                                        value: fieldData.name,
                                        className: "mt-1 p-2 w-full border border-gray-300 rounded-md",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
                                        lineNumber: 116,
                                        columnNumber: 13
                                    }, this),
                                    errors.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-red-500 text-sm",
                                        children: errors.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
                                        lineNumber: 125,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 relative",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "phone",
                                            className: "block text-sm font-medium text-gray-700",
                                            children: "Email"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
                                            lineNumber: 130,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "email",
                                            id: "email",
                                            name: "email",
                                            value: user?.email,
                                            className: "mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100",
                                            disabled: true,
                                            placeholder: "Email"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
                                            lineNumber: 131,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "absolute right-2 top-2 text-gray-500 text-xs hidden group-hover:block bg-gray-200 px-2 py-1 rounded-md",
                                            children: "Email can't be changed"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
                                            lineNumber: 140,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
                                    lineNumber: 129,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "phone",
                                        className: "block text-sm font-medium text-gray-700",
                                        children: "Phone"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
                                        lineNumber: 147,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        id: "phone",
                                        name: "phone",
                                        onChange: handleChange,
                                        value: fieldData.phone,
                                        className: "mt-1 p-2 w-full border border-gray-300 rounded-md",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
                                        lineNumber: 148,
                                        columnNumber: 13
                                    }, this),
                                    errors.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-red-500 text-sm",
                                        children: errors.phone
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
                                        lineNumber: 157,
                                        columnNumber: 30
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mt-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: "bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors",
                            disabled: loading,
                            children: loading ? "Saving..." : "Save Changes"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
                            lineNumber: 162,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
                lineNumber: 98,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(application)/user/_ProfileSections/manage/page.js",
        lineNumber: 95,
        columnNumber: 5
    }, this);
};
_s(EditProfile, "gAKZYz/cvwcnxwUarYzy66BcsY8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"]
    ];
});
_c = EditProfile;
const __TURBOPACK__default__export__ = EditProfile;
var _c;
__turbopack_refresh__.register(_c, "EditProfile");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/nookies/node_modules/cookie/index.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */ 'use strict';
/**
 * Module exports.
 * @public
 */ exports.parse = parse;
exports.serialize = serialize;
/**
 * Module variables.
 * @private
 */ var decode = decodeURIComponent;
var encode = encodeURIComponent;
/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */ var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */ function parse(str, options) {
    if (typeof str !== 'string') {
        throw new TypeError('argument str must be a string');
    }
    var obj = {};
    var opt = options || {};
    var pairs = str.split(';');
    var dec = opt.decode || decode;
    for(var i = 0; i < pairs.length; i++){
        var pair = pairs[i];
        var index = pair.indexOf('=');
        // skip things that don't look like key=value
        if (index < 0) {
            continue;
        }
        var key = pair.substring(0, index).trim();
        // only assign once
        if (undefined == obj[key]) {
            var val = pair.substring(index + 1, pair.length).trim();
            // quoted values
            if (val[0] === '"') {
                val = val.slice(1, -1);
            }
            obj[key] = tryDecode(val, dec);
        }
    }
    return obj;
}
/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */ function serialize(name, val, options) {
    var opt = options || {};
    var enc = opt.encode || encode;
    if (typeof enc !== 'function') {
        throw new TypeError('option encode is invalid');
    }
    if (!fieldContentRegExp.test(name)) {
        throw new TypeError('argument name is invalid');
    }
    var value = enc(val);
    if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError('argument val is invalid');
    }
    var str = name + '=' + value;
    if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
            throw new TypeError('option maxAge is invalid');
        }
        str += '; Max-Age=' + Math.floor(maxAge);
    }
    if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
            throw new TypeError('option domain is invalid');
        }
        str += '; Domain=' + opt.domain;
    }
    if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
            throw new TypeError('option path is invalid');
        }
        str += '; Path=' + opt.path;
    }
    if (opt.expires) {
        if (typeof opt.expires.toUTCString !== 'function') {
            throw new TypeError('option expires is invalid');
        }
        str += '; Expires=' + opt.expires.toUTCString();
    }
    if (opt.httpOnly) {
        str += '; HttpOnly';
    }
    if (opt.secure) {
        str += '; Secure';
    }
    if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === 'string' ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch(sameSite){
            case true:
                str += '; SameSite=Strict';
                break;
            case 'lax':
                str += '; SameSite=Lax';
                break;
            case 'strict':
                str += '; SameSite=Strict';
                break;
            case 'none':
                str += '; SameSite=None';
                break;
            default:
                throw new TypeError('option sameSite is invalid');
        }
    }
    return str;
}
/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */ function tryDecode(str, decode) {
    try {
        return decode(str);
    } catch (e) {
        return str;
    }
}
}}),
"[project]/node_modules/set-cookie-parser/lib/set-cookie.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
var defaultParseOptions = {
    decodeValues: true,
    map: false,
    silent: false
};
function isNonEmptyString(str) {
    return typeof str === "string" && !!str.trim();
}
function parseString(setCookieValue, options) {
    var parts = setCookieValue.split(";").filter(isNonEmptyString);
    var nameValuePairStr = parts.shift();
    var parsed = parseNameValuePair(nameValuePairStr);
    var name = parsed.name;
    var value = parsed.value;
    options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
    try {
        value = options.decodeValues ? decodeURIComponent(value) : value; // decode cookie value
    } catch (e) {
        console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.", e);
    }
    var cookie = {
        name: name,
        value: value
    };
    parts.forEach(function(part) {
        var sides = part.split("=");
        var key = sides.shift().trimLeft().toLowerCase();
        var value = sides.join("=");
        if (key === "expires") {
            cookie.expires = new Date(value);
        } else if (key === "max-age") {
            cookie.maxAge = parseInt(value, 10);
        } else if (key === "secure") {
            cookie.secure = true;
        } else if (key === "httponly") {
            cookie.httpOnly = true;
        } else if (key === "samesite") {
            cookie.sameSite = value;
        } else if (key === "partitioned") {
            cookie.partitioned = true;
        } else {
            cookie[key] = value;
        }
    });
    return cookie;
}
function parseNameValuePair(nameValuePairStr) {
    // Parses name-value-pair according to rfc6265bis draft
    var name = "";
    var value = "";
    var nameValueArr = nameValuePairStr.split("=");
    if (nameValueArr.length > 1) {
        name = nameValueArr.shift();
        value = nameValueArr.join("="); // everything after the first =, joined by a "=" if there was more than one part
    } else {
        value = nameValuePairStr;
    }
    return {
        name: name,
        value: value
    };
}
function parse(input, options) {
    options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
    if (!input) {
        if (!options.map) {
            return [];
        } else {
            return {};
        }
    }
    if (input.headers) {
        if (typeof input.headers.getSetCookie === "function") {
            // for fetch responses - they combine headers of the same type in the headers array,
            // but getSetCookie returns an uncombined array
            input = input.headers.getSetCookie();
        } else if (input.headers["set-cookie"]) {
            // fast-path for node.js (which automatically normalizes header names to lower-case
            input = input.headers["set-cookie"];
        } else {
            // slow-path for other environments - see #25
            var sch = input.headers[Object.keys(input.headers).find(function(key) {
                return key.toLowerCase() === "set-cookie";
            })];
            // warn if called on a request-like object with a cookie header rather than a set-cookie header - see #34, 36
            if (!sch && input.headers.cookie && !options.silent) {
                console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.");
            }
            input = sch;
        }
    }
    if (!Array.isArray(input)) {
        input = [
            input
        ];
    }
    if (!options.map) {
        return input.filter(isNonEmptyString).map(function(str) {
            return parseString(str, options);
        });
    } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies, str) {
            var cookie = parseString(str, options);
            cookies[cookie.name] = cookie;
            return cookies;
        }, cookies);
    }
}
/*
  Set-Cookie header field-values are sometimes comma joined in one string. This splits them without choking on commas
  that are within a single set-cookie field-value, such as in the Expires portion.

  This is uncommon, but explicitly allowed - see https://tools.ietf.org/html/rfc2616#section-4.2
  Node.js does this for every header *except* set-cookie - see https://github.com/nodejs/node/blob/d5e363b77ebaf1caf67cd7528224b651c86815c1/lib/_http_incoming.js#L128
  React Native's fetch does this for *every* header, including set-cookie.

  Based on: https://github.com/google/j2objc/commit/16820fdbc8f76ca0c33472810ce0cb03d20efe25
  Credits to: https://github.com/tomball for original and https://github.com/chrusart for JavaScript implementation
*/ function splitCookiesString(cookiesString) {
    if (Array.isArray(cookiesString)) {
        return cookiesString;
    }
    if (typeof cookiesString !== "string") {
        return [];
    }
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
        while(pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))){
            pos += 1;
        }
        return pos < cookiesString.length;
    }
    function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
    }
    while(pos < cookiesString.length){
        start = pos;
        cookiesSeparatorFound = false;
        while(skipWhitespace()){
            ch = cookiesString.charAt(pos);
            if (ch === ",") {
                // ',' is a cookie separator if we have later first '=', not ';' or ','
                lastComma = pos;
                pos += 1;
                skipWhitespace();
                nextStart = pos;
                while(pos < cookiesString.length && notSpecialChar()){
                    pos += 1;
                }
                // currently special character
                if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                    // we found cookies separator
                    cookiesSeparatorFound = true;
                    // pos is inside the next cookie, so back up and return it.
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                } else {
                    // in param ',' or param separator ';',
                    // we continue from that comma
                    pos = lastComma + 1;
                }
            } else {
                pos += 1;
            }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
    }
    return cookiesStrings;
}
module.exports = parse;
module.exports.parse = parse;
module.exports.parseString = parseString;
module.exports.splitCookiesString = splitCookiesString;
}}),
"[project]/node_modules/nookies/dist/utils.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
var __assign = this && this.__assign || function() {
    __assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.areCookiesEqual = exports.hasSameProperties = exports.createCookie = exports.isBrowser = void 0;
/**
 * Tells whether we are in a browser or server.
 */ function isBrowser() {
    return typeof window !== 'undefined';
}
exports.isBrowser = isBrowser;
/**
 * Create an instance of the Cookie interface
 */ function createCookie(name, value, options) {
    var sameSite = options.sameSite;
    if (sameSite === true) {
        sameSite = 'strict';
    }
    if (sameSite === undefined || sameSite === false) {
        sameSite = 'lax';
    }
    var cookieToSet = __assign(__assign({}, options), {
        sameSite: sameSite
    });
    delete cookieToSet.encode;
    return __assign({
        name: name,
        value: value
    }, cookieToSet);
}
exports.createCookie = createCookie;
/**
 * Tells whether given objects have the same properties.
 */ function hasSameProperties(a, b) {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    if (aProps.length !== bProps.length) {
        return false;
    }
    for(var i = 0; i < aProps.length; i++){
        var propName = aProps[i];
        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
}
exports.hasSameProperties = hasSameProperties;
/**
 * Compare the cookie and return true if the cookies have equivalent
 * options and the cookies would be overwritten in the browser storage.
 *
 * @param a first Cookie for comparison
 * @param b second Cookie for comparison
 */ function areCookiesEqual(a, b) {
    var sameSiteSame = a.sameSite === b.sameSite;
    if (typeof a.sameSite === 'string' && typeof b.sameSite === 'string') {
        sameSiteSame = a.sameSite.toLowerCase() === b.sameSite.toLowerCase();
    }
    return hasSameProperties(__assign(__assign({}, a), {
        sameSite: undefined
    }), __assign(__assign({}, b), {
        sameSite: undefined
    })) && sameSiteSame;
}
exports.areCookiesEqual = areCookiesEqual; /* Functions */  //# sourceMappingURL=utils.js.map
}}),
"[project]/node_modules/nookies/dist/index.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
var __assign = this && this.__assign || function() {
    __assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.destroyCookie = exports.setCookie = exports.parseCookies = void 0;
var cookie = __turbopack_require__("[project]/node_modules/nookies/node_modules/cookie/index.js [app-client] (ecmascript)");
var setCookieParser = __turbopack_require__("[project]/node_modules/set-cookie-parser/lib/set-cookie.js [app-client] (ecmascript)");
var utils_1 = __turbopack_require__("[project]/node_modules/nookies/dist/utils.js [app-client] (ecmascript)");
/**
 * Parses cookies.
 *
 * @param ctx NextJS page or API context, express context, null or undefined.
 * @param options Options that we pass down to `cookie` library.
 */ function parseCookies(ctx, options) {
    var _a, _b;
    if ((_b = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.req) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.cookie) {
        return cookie.parse(ctx.req.headers.cookie, options);
    }
    if (utils_1.isBrowser()) {
        return cookie.parse(document.cookie, options);
    }
    return {};
}
exports.parseCookies = parseCookies;
/**
 * Sets a cookie.
 *
 * @param ctx NextJS page or API context, express context, null or undefined.
 * @param name The name of your cookie.
 * @param value The value of your cookie.
 * @param options Options that we pass down to `cookie` library.
 */ function setCookie(ctx, name, value, options) {
    var _a, _b;
    if (options === void 0) {
        options = {};
    }
    // SSR
    if (((_a = ctx === null || ctx === void 0 ? void 0 : ctx.res) === null || _a === void 0 ? void 0 : _a.getHeader) && ctx.res.setHeader) {
        // Check if response has finished and warn about it.
        if ((_b = ctx === null || ctx === void 0 ? void 0 : ctx.res) === null || _b === void 0 ? void 0 : _b.finished) {
            console.warn("Not setting \"" + name + "\" cookie. Response has finished.");
            console.warn("You should set cookie before res.send()");
            return {};
        }
        /**
         * Load existing cookies from the header and parse them.
         */ var cookies = ctx.res.getHeader('Set-Cookie') || [];
        if (typeof cookies === 'string') cookies = [
            cookies
        ];
        if (typeof cookies === 'number') cookies = [];
        /**
         * Parse cookies but ignore values - we've already encoded
         * them in the previous call.
         */ var parsedCookies = setCookieParser.parse(cookies, {
            decodeValues: false
        });
        /**
         * We create the new cookie and make sure that none of
         * the existing cookies match it.
         */ var newCookie_1 = utils_1.createCookie(name, value, options);
        var cookiesToSet_1 = [];
        parsedCookies.forEach(function(parsedCookie) {
            if (!utils_1.areCookiesEqual(parsedCookie, newCookie_1)) {
                /**
                 * We serialize the cookie back to the original format
                 * if it isn't the same as the new one.
                 */ var serializedCookie = cookie.serialize(parsedCookie.name, parsedCookie.value, __assign({
                    // we prevent reencoding by default, but you might override it
                    encode: function(val) {
                        return val;
                    }
                }, parsedCookie));
                cookiesToSet_1.push(serializedCookie);
            }
        });
        cookiesToSet_1.push(cookie.serialize(name, value, options));
        // Update the header.
        ctx.res.setHeader('Set-Cookie', cookiesToSet_1);
    }
    // Browser
    if (utils_1.isBrowser()) {
        if (options && options.httpOnly) {
            throw new Error('Can not set a httpOnly cookie in the browser.');
        }
        document.cookie = cookie.serialize(name, value, options);
    }
    return {};
}
exports.setCookie = setCookie;
/**
 * Destroys a cookie with a particular name.
 *
 * @param ctx NextJS page or API context, express context, null or undefined.
 * @param name Cookie name.
 * @param options Options that we pass down to `cookie` library.
 */ function destroyCookie(ctx, name, options) {
    /**
     * We forward the request destroy to setCookie function
     * as it is the same function with modified maxAge value.
     */ return setCookie(ctx, name, '', __assign(__assign({}, options || {}), {
        maxAge: -1
    }));
}
exports.destroyCookie = destroyCookie;
/* Utility Exports */ exports.default = {
    set: setCookie,
    get: parseCookies,
    destroy: destroyCookie
}; //# sourceMappingURL=index.js.map
}}),
}]);

//# sourceMappingURL=_2969c7._.js.map