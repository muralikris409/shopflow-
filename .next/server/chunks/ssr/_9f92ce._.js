module.exports = {

"[project]/src/app/_service/PaymentService.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "createOrder": (()=>createOrder),
    "failedVerify": (()=>failedVerify),
    "verifyPayment": (()=>verifyPayment)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/api/axios.js [app-ssr] (ecmascript)");
;
const createOrder = async (userId, items)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].post("user/order/createOrder", {
            userId,
            items
        });
        console.log(response);
        if (response.status !== 201) {
            throw new Error("Error creating order");
        }
        return response.data; // Return the response data directly
    } catch (error) {
        console.error("Error in createOrder:", error);
        throw error;
    }
};
const verifyPayment = async (orderId, razorpayId, paymentId, paymentSignature)=>{
    console.log(orderId);
    console.log(paymentId);
    console.log(paymentSignature);
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].post("user/order/verify", {}, {
            params: {
                razorpayId,
                orderId,
                paymentId,
                paymentSignature
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error in verifyPayment:", error);
        throw error;
    }
};
const failedVerify = async (orderId)=>{
    console.log("forderid:", orderId);
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].post(`/user/order/failedPayment?orderId=${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw new Error(error?.response?.data?.message || 'Error fetching user orders.');
    }
};
}}),
"[project]/src/app/_service/OrderService.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "cancelOrder": (()=>cancelOrder),
    "checkOutOrder": (()=>checkOutOrder),
    "createOrder": (()=>createOrder),
    "fetchOrderForCheckout": (()=>fetchOrderForCheckout),
    "getOrderById": (()=>getOrderById),
    "getOrderByUserId": (()=>getOrderByUserId),
    "verifyPaymentAndUpdateOrder": (()=>verifyPaymentAndUpdateOrder)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/api/axios.js [app-ssr] (ecmascript)");
;
const createOrder = async (items)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].post('/user/order/createOrder', {
            items
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error(error?.response?.data?.message || 'Error creating order.');
    }
};
const fetchOrderForCheckout = async (orderId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].get(`/user/order/getOrderForCheckout/?orderId=${orderId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching order for checkout:", error);
        return {
            status: "error",
            message: error.response?.data?.message || "An error occurred while fetching the order."
        };
    }
};
const verifyPaymentAndUpdateOrder = async (orderId, razorpayId, paymentId, paymentSignature)=>{
    console.log("order_id:", orderId);
    console.log("razorpayId:", razorpayId);
    console.log("paymentId:", paymentId);
    console.log("siign:", paymentSignature);
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].post('/user/order/verify', {}, {
            params: {
                orderId,
                razorpayId,
                paymentId,
                paymentSignature
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error verifying payment:', error);
        throw new Error(error?.response?.data?.message || 'Error verifying payment.');
    }
};
const checkOutOrder = async (orderId)=>{
    console.log("orderid:", orderId);
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].post(`/user/order/checkoutOrder?orderId=${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw new Error(error?.response?.data?.message || 'Error fetching user orders.');
    }
};
const getOrderByUserId = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].get(`/user/order/getUserOrder`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw new Error(error?.response?.data?.message || 'Error fetching user orders.');
    }
};
const cancelOrder = async (orderId)=>{
    console.log(orderId);
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].put(`/user/order/cancelOrder?orderId=${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error cancelling order:', error);
        throw new Error(error?.response?.data?.message || 'Error cancelling order.');
    }
};
const getOrderById = async (orderId)=>{
    console.log("userId:", orderId);
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].get(`/user/order/getOrderById?orderId=${orderId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw new Error(error?.response?.data?.message || 'Error fetching user orders.');
    }
};
}}),
"[project]/src/app/_service/UserService.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/api/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nookies$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/nookies/dist/index.js [app-ssr] (ecmascript)");
;
;
async function login(formdata, ctx = null) {
    const { email, password } = formdata;
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].post("user/login", {
            email: email,
            password: password
        });
        console.log(response.data);
        const { token, data } = response.data;
        console.log(token, data);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nookies$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setCookie"])(ctx, "shopflow_session", JSON.stringify({
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].post("user/oauth", {
            ...data,
            id: data.sub
        });
        const { token, data: user } = response.data;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nookies$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setCookie"])(ctx, "shopflow_session", JSON.stringify({
            token
        }), {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
            sameSite: 'lax'
        });
        return response.data;
    } catch (error) {
        alert(error);
        throw new Error(error?.data?.response?.message || "An error occurred during Google OAuth.");
    }
}
async function signUp(formdata) {
    const { username: name, email, password } = formdata;
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].post("user/signup", {
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].post(`user/forgotPassword?email=${email}`);
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].post(`user/resetPassword?token=${token}&newPassword=${password}`);
        return response;
        "TURBOPACK unreachable";
    } catch (err) {
        console.log(err);
    }
}
async function getProfileInfo(token, userId) {
    try {
        console.log("test");
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].get(`user/userProfileInfo?userId=${userId}`, {}, {
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].put(`user/updateUserProfile?userId=${userId}`, data, {
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].get(`user/getAllAddress?userId=${userId}`, {
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].put(`user/makePrimaryAddress`, {}, {
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].post('user/addAddress', {}, {
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].put('user/editAddress', {}, {
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].delete('user/deleteAddress', {
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
}}),
"[project]/src/app/(application)/checkout/[orderId]/Checkout.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/js-cookie/dist/js.cookie.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$_service$2f$PaymentService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/_service/PaymentService.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$_service$2f$OrderService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/_service/OrderService.js [app-ssr] (ecmascript)"); // Import the new API method
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$_service$2f$UserService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/_service/UserService.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/use-toast.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
const OrderSummary = ({ title, orderId })=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const userId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"])((state)=>state.userData.user?.id);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const phoneNumber = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"])((state)=>state?.userData?.user?.phone);
    const [orderData, setOrderData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [phone, setPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(phoneNumber || '');
    const [phoneError, setPhoneError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [addresses, setAddresses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedAddress, setSelectedAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showForm, setShowForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [totalBill, setTotalBill] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])();
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"])((state)=>state?.userData?.token);
    const [newAddress, setNewAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        street: '',
        city: '',
        state: '',
        country: '',
        zip: ''
    });
    const [formErrors, setFormErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        document.body.appendChild(script);
        loadAddresses();
        fetchOrderData();
        return ()=>{
            document.body.removeChild(script);
        };
    }, [
        userId
    ]);
    const loadAddresses = async ()=>{
        setLoading(true);
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$_service$2f$UserService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchUserAddresses"])(token, userId);
        if (result?.status === "success") {
            setAddresses(result.data);
            const primaryAddress = result.data.find((addr)=>addr.isPrimary);
            if (primaryAddress) setSelectedAddress(primaryAddress);
        } else {
            console.error(result?.message || "Error retrieving address");
        }
        setLoading(false);
    };
    const fetchOrderData = async ()=>{
        setLoading(true);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$_service$2f$OrderService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchOrderForCheckout"])(orderId);
            console.log(result);
            if (result.status === "success") {
                setOrderData(result.data.items);
                setTotalBill(result.data.totalAmount);
            } else {
                console.error(result?.message || "Error fetching order data");
            }
        } catch (error) {
            console.error("Error fetching order data:", error);
        } finally{
            setLoading(false);
        }
    };
    const validatePhone = ()=>{
        if (!phone.trim() || !/^[6-9]\d{9}$/.test(phone)) {
            return 'Phone number must be 10 digits and start with 6, 7, 8, or 9.';
        }
        return '';
    };
    const validateField = (name, value)=>{
        let error = '';
        if (!value?.trim()) {
            error = `${name.replace(/([A-Z])/g, ' $1')} is required.`;
        } else {
            switch(name){
                case 'zip':
                    if (!/^[0-9]{5,6}$/.test(value)) {
                        error = 'ZIP code must be 5-6 digits.';
                    }
                    break;
                case 'city':
                case 'state':
                case 'country':
                    if (!/^[A-Za-z\s]+$/.test(value)) {
                        error = `Invalid ${name.replace(/([A-Z])/g, ' $1')}`;
                    }
                    break;
                default:
                    break;
            }
        }
        setFormErrors((prevErrors)=>({
                ...prevErrors,
                [name]: error
            }));
        return !error;
    };
    const handleInputChange = (e)=>{
        const { name, value } = e.target;
        setNewAddress((prevData)=>({
                ...prevData,
                [name]: value
            }));
        validateField(name, value);
    };
    const handleAddAddress = async ()=>{
        const isValid = Object.keys(newAddress).every((field)=>validateField(field, newAddress[field]));
        if (!isValid) return;
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$_service$2f$UserService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAddress"])(token, userId, newAddress);
            if (result.status === "success") {
                loadAddresses();
                setShowForm(false);
                setNewAddress({
                    street: '',
                    city: '',
                    state: '',
                    country: '',
                    zip: ''
                });
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error(error);
        }
    };
    console.log(("TURBOPACK compile-time value", "rzp_test_1gTn0x73jrN12q"));
    const handlePayment = async ()=>{
        const phoneValidationError = validatePhone();
        if (phoneValidationError || !selectedAddress) {
            setError('Please provide a valid phone number and select an address.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const { razorpayOrder, ...data } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$_service$2f$OrderService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["checkOutOrder"])(orderId);
            const options = {
                key: "rzp_test_1gTn0x73jrN12q",
                amount: Math.ceil(totalBill * 100),
                currency: razorpayOrder?.currency,
                name: 'Shopflow',
                description: 'Payment for your order',
                order_id: razorpayOrder?.id,
                handler: async function(response) {
                    const { razorpay_payment_id, razorpay_signature, razorpay_order_id } = response;
                    console.log("textoid", orderId, orderData);
                    try {
                        setLoading(true);
                        const verificationResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$_service$2f$OrderService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verifyPaymentAndUpdateOrder"])(orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature);
                        setLoading(false);
                        if (verificationResult.success) {
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].set("orderId", orderId);
                            router.push(`/orders/success`);
                        } else {
                            toast({
                                title: "Payment failed",
                                description: "Payment verification failed. Please try again.",
                                variant: "destructive"
                            });
                        }
                    } catch (error) {
                        toast({
                            title: "Payment failed",
                            description: "An unexpected error occurred during verification. Please try again.",
                            variant: "destructive"
                        });
                    }
                },
                prefill: {
                    name: selectedAddress.fullName,
                    email: 'customer@example.com',
                    contact: phone
                },
                theme: {
                    color: '#F37254'
                },
                modal: {
                    ondismiss: async ()=>{
                        toast({
                            title: "Payment failed",
                            description: "Payment was cancelled by the user. Please try again.",
                            variant: "destructive"
                        });
                    }
                }
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            setError('Payment process failed. Please try again.');
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const phoneValidationError = validatePhone();
        setPhoneError(phoneValidationError);
    }, [
        phone
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gray-100",
        children: [
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-500 text-white p-4 rounded mb-4",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                lineNumber: 229,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 shadow-md bg-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-xl font-semibold border-b pb-4",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                        lineNumber: 232,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6 mt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-semibold text-gray-700 mb-1",
                                children: "Phone Number"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                lineNumber: 236,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: phone,
                                onChange: (e)=>setPhone(e.target.value),
                                className: `w-full rounded-lg border p-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${phoneError ? "border-red-500 ring-red-500" : "border-gray-300"}`,
                                placeholder: "Enter your 10-digit phone number"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                lineNumber: 239,
                                columnNumber: 11
                            }, this),
                            phoneError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-red-500 mt-2 italic",
                                children: phoneError
                            }, void 0, false, {
                                fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                lineNumber: 249,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                        lineNumber: 235,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-medium text-gray-700",
                                children: "Select Delivery Address"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                lineNumber: 255,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 border rounded p-4",
                                children: addresses.map((address)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `flex items-center mb-4 p-4 rounded-lg border-2 ${selectedAddress?.id === address.id ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"} shadow-sm hover:shadow-md transition-shadow duration-200`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "radio",
                                                name: "address",
                                                checked: selectedAddress?.id === address.id,
                                                onChange: ()=>setSelectedAddress(address),
                                                className: "mr-4 h-5 w-5 accent-blue-500 cursor-pointer"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                                lineNumber: 266,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-base text-blue-700 font-semibold",
                                                        children: address.street
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                                        lineNumber: 274,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-600",
                                                        children: `${address.city}, ${address.state}, ${address.zip}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                                        lineNumber: 277,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                                lineNumber: 273,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, address.id, true, {
                                        fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                        lineNumber: 258,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                lineNumber: 256,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "text-blue-600 underline mt-2",
                                onClick: ()=>setShowForm(!showForm),
                                children: showForm ? '' : '+ Add New Address'
                            }, void 0, false, {
                                fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                lineNumber: 285,
                                columnNumber: 11
                            }, this),
                            showForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 border rounded p-4 bg-gray-50",
                                children: [
                                    Object.keys(newAddress).map((key)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium capitalize text-gray-600",
                                                    htmlFor: key,
                                                    children: key.replace(/([A-Z])/g, ' $1')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                                    lineNumber: 296,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    id: key,
                                                    name: key,
                                                    value: newAddress[key],
                                                    onChange: handleInputChange,
                                                    className: `w-full rounded border p-2 text-sm ${formErrors[key] ? 'border-red-500' : 'border-gray-300'}`,
                                                    placeholder: `Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                                    lineNumber: 297,
                                                    columnNumber: 19
                                                }, this),
                                                formErrors[key] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-red-500 mt-1",
                                                    children: formErrors[key]
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                                    lineNumber: 306,
                                                    columnNumber: 39
                                                }, this)
                                            ]
                                        }, key, true, {
                                            fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                            lineNumber: 295,
                                            columnNumber: 17
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "bg-red-600 mx-2 text-white py-2 px-4 rounded mt-2 hover:bg-red-700",
                                        onClick: ()=>{
                                            setShowForm(false);
                                            setNewAddress({
                                                street: '',
                                                city: '',
                                                state: '',
                                                country: '',
                                                zip: ''
                                            });
                                        },
                                        children: "cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                        lineNumber: 309,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "bg-gray-800 text-white py-2 px-4 rounded mt-2 hover:bg-gray-700",
                                        onClick: handleAddAddress,
                                        children: "Save Address"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                        lineNumber: 324,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                lineNumber: 293,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                        lineNumber: 254,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mt-4 ${!selectedAddress || phoneError ? 'opacity-50 pointer-events-none' : ''}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-medium text-gray-700 mb-4 border-b pb-2",
                                children: "Order Summary"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                lineNumber: 336,
                                columnNumber: 11
                            }, this),
                            orderData?.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            className: "w-20 h-20 object-cover rounded border",
                                            src: item.product?.image || '/_assets/image.png',
                                            alt: item.product?.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                            lineNumber: 339,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "ml-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-sm font-medium text-gray-800",
                                                    children: item.product?.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                                    lineNumber: 345,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-500",
                                                    children: item.product?.description
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                                    lineNumber: 346,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-bold text-gray-800",
                                                    children: [
                                                        "$",
                                                        item.product?.offerPrice,
                                                        " x ",
                                                        item.quantity
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                                    lineNumber: 347,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                            lineNumber: 344,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                    lineNumber: 338,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t pt-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-medium text-lg text-gray-800",
                                    children: [
                                        "Total: $",
                                        totalBill
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                    lineNumber: 352,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                                lineNumber: 351,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                        lineNumber: 335,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: `w-full p-3 rounded text-white ${loading ? 'bg-gray-500' : 'bg-gray-600 hover:bg-gray-700'}`,
                            disabled: !selectedAddress || phoneError || loading,
                            onClick: handlePayment,
                            children: loading ? 'Processing...' : 'Proceed to Payment'
                        }, void 0, false, {
                            fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                            lineNumber: 358,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                        lineNumber: 357,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
                lineNumber: 231,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(application)/checkout/[orderId]/Checkout.js",
        lineNumber: 228,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = OrderSummary;
}}),
"[project]/src/app/(application)/checkout/[orderId]/page.js [app-rsc] (ecmascript, Next.js server component, client modules ssr)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
"[project]/node_modules/nookies/node_modules/cookie/index.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
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
"[project]/node_modules/set-cookie-parser/lib/set-cookie.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
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
"[project]/node_modules/nookies/dist/utils.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
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
"[project]/node_modules/nookies/dist/index.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
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
var cookie = __turbopack_require__("[project]/node_modules/nookies/node_modules/cookie/index.js [app-ssr] (ecmascript)");
var setCookieParser = __turbopack_require__("[project]/node_modules/set-cookie-parser/lib/set-cookie.js [app-ssr] (ecmascript)");
var utils_1 = __turbopack_require__("[project]/node_modules/nookies/dist/utils.js [app-ssr] (ecmascript)");
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

};

//# sourceMappingURL=_9f92ce._.js.map