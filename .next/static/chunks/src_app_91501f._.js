(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_app_91501f._.js", {

"[project]/src/app/_service/OrderService.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/api/axios.js [app-client] (ecmascript)");
;
const createOrder = async (userId, items)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].post('/user/order/createOrder', {
            userId,
            items
        });
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error(error?.response?.data?.message || 'Error creating order.');
    }
};
const fetchOrderForCheckout = async (orderId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].get(`/user/order/getOrderForCheckout/?orderId=${orderId}`);
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].post('/user/order/verify', {}, {
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].post(`/user/order/checkoutOrder?orderId=${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw new Error(error?.response?.data?.message || 'Error fetching user orders.');
    }
};
const getOrderByUserId = async (userId)=>{
    console.log("userId:", userId);
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].get(`/user/order/getUserOrder?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw new Error(error?.response?.data?.message || 'Error fetching user orders.');
    }
};
const cancelOrder = async (orderId)=>{
    console.log(orderId);
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].put(`/user/order/cancelOrder?orderId=${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error cancelling order:', error);
        throw new Error(error?.response?.data?.message || 'Error cancelling order.');
    }
};
const getOrderById = async (orderId)=>{
    console.log("userId:", orderId);
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].get(`/user/order/getOrderById?orderId=${orderId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw new Error(error?.response?.data?.message || 'Error fetching user orders.');
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/(application)/orders/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$_service$2f$OrderService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/_service/OrderService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$_lib$2f$utilReducer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/_lib/utilReducer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
;
const ProductTile = ({ product, onCancel, cancelLoading })=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    const handleNavigation = ()=>{
        router.push(`/product/${product.productId}`);
    };
    const handleCancel = ()=>{
        onCancel(product.orderId);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "product-card p-5 bg-white rounded-lg shadow-lg mb-4 w-full sm:w-96 lg:w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-semibold text-gray-800",
                                children: [
                                    "Order ID: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-500",
                                        children: [
                                            "#",
                                            product.orderId
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(application)/orders/page.js",
                                        lineNumber: 27,
                                        columnNumber: 23
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(application)/orders/page.js",
                                lineNumber: 26,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500",
                                children: [
                                    "Placed on: ",
                                    new Date(product.orderDate).toLocaleDateString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(application)/orders/page.js",
                                lineNumber: 29,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(application)/orders/page.js",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: `font-semibold ${product.status === "CONFIRMED" ? "text-green-600" : product.status === "CANCELLED" ? "text-red-600" : "text-gray-600"}`,
                        children: product.status
                    }, void 0, false, {
                        fileName: "[project]/src/app/(application)/orders/page.js",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(application)/orders/page.js",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: handleNavigation,
                className: "flex flex-col sm:flex-row items-start space-y-4 sm:space-x-4 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: product.image || "/_assets/image.png",
                        alt: product.productName,
                        className: "w-16 h-16 object-cover rounded-md border"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(application)/orders/page.js",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-semibold",
                                children: product.productName
                            }, void 0, false, {
                                fileName: "[project]/src/app/(application)/orders/page.js",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500",
                                children: [
                                    "$ ",
                                    product.offerPrice.toLocaleString(),
                                    " x ",
                                    product.quantity
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(application)/orders/page.js",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(application)/orders/page.js",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(application)/orders/page.js",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row justify-between items-start sm:items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-semibold text-lg",
                        children: [
                            "Total: $ ",
                            (product.offerPrice * product.quantity).toLocaleString()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(application)/orders/page.js",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    product.status !== "CANCELLED" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `mt-3 sm:mt-0 px-4 py-2 text-white text-sm rounded ${cancelLoading === product.orderId ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"}`,
                        onClick: handleCancel,
                        disabled: cancelLoading === product.orderId,
                        children: cancelLoading === product.orderId ? "Cancelling..." : "Cancel Order"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(application)/orders/page.js",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(application)/orders/page.js",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(application)/orders/page.js",
        lineNumber: 22,
        columnNumber: 5
    }, this);
};
_s(ProductTile, "zXnflAqd4rnyBpogtdAc6I4Vk2A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"]
    ];
});
_c = ProductTile;
const OrderPage = ()=>{
    _s1();
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filteredProducts, setFilteredProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [cancelLoading, setCancelLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const userId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "OrderPage.useSelector[userId]": (state)=>state.session.user?.id
    }["OrderPage.useSelector[userId]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OrderPage.useEffect": ()=>{
            const fetchOrders = {
                "OrderPage.useEffect.fetchOrders": async ()=>{
                    if (!userId) return;
                    try {
                        setLoading(true);
                        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$_service$2f$OrderService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOrderByUserId"])(userId);
                        const data = response?.data;
                        const flattenedProducts = data?.flatMap({
                            "OrderPage.useEffect.fetchOrders": (order)=>order.items.map({
                                    "OrderPage.useEffect.fetchOrders": (item)=>({
                                            ...item,
                                            orderDate: order.orderDate,
                                            totalAmount: order.total
                                        })
                                }["OrderPage.useEffect.fetchOrders"])
                        }["OrderPage.useEffect.fetchOrders"]);
                        setProducts(flattenedProducts || []);
                        setFilteredProducts(flattenedProducts || []);
                    } catch (err) {
                        setError(err?.message || "An error occurred");
                    } finally{
                        setLoading(false);
                    }
                }
            }["OrderPage.useEffect.fetchOrders"];
            fetchOrders();
        }
    }["OrderPage.useEffect"], [
        userId
    ]);
    const handleCancelOrder = async (orderId)=>{
        try {
            setCancelLoading(orderId);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$_service$2f$OrderService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cancelOrder"])(orderId);
            const updatedProducts = products.map((product)=>product.orderId === orderId ? {
                    ...product,
                    status: "CANCELLED"
                } : product);
            setProducts(updatedProducts);
            setFilteredProducts(updatedProducts.filter((product)=>product.productName.toLowerCase().includes(searchQuery)));
        } catch (err) {
            setError(err?.message || "Failed to cancel order");
        } finally{
            setCancelLoading(null);
        }
    };
    const handleSearch = (e)=>{
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = products.filter((product)=>product.productName.toLowerCase().includes(query));
        setFilteredProducts(filtered);
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center text-lg",
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/src/app/(application)/orders/page.js",
            lineNumber: 157,
            columnNumber: 12
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-red-500 text-center text-lg",
            children: [
                "Error: ",
                error
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(application)/orders/page.js",
            lineNumber: 162,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full  h-screen mx-auto p-2 md:p-4 bg-white rounded-lg shadow-md overflow-y-scroll overflow-x-hidden ",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 flex flex-col sm:flex-row justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-semibold text-gray-800 mb-6",
                        children: "My Orders"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(application)/orders/page.js",
                        lineNumber: 171,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "Search for products in your orders",
                        value: searchQuery,
                        onChange: handleSearch,
                        className: "w-70 sm:w-80 h-1/5 p-3 rounded-md border border-gray-300"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(application)/orders/page.js",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(application)/orders/page.js",
                lineNumber: 170,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
                children: filteredProducts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "col-span-full text-center text-xl font-semibold text-gray-500",
                    children: "No orders found."
                }, void 0, false, {
                    fileName: "[project]/src/app/(application)/orders/page.js",
                    lineNumber: 184,
                    columnNumber: 11
                }, this) : filteredProducts.map((product, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductTile, {
                        product: product,
                        onCancel: handleCancelOrder,
                        cancelLoading: cancelLoading
                    }, `${product.orderId}-${index}`, false, {
                        fileName: "[project]/src/app/(application)/orders/page.js",
                        lineNumber: 189,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/(application)/orders/page.js",
                lineNumber: 182,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(application)/orders/page.js",
        lineNumber: 167,
        columnNumber: 5
    }, this);
};
_s1(OrderPage, "ejC33Ec+vnpcMyHgWEP9KBQpUJo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"]
    ];
});
_c1 = OrderPage;
const __TURBOPACK__default__export__ = OrderPage;
var _c, _c1;
__turbopack_refresh__.register(_c, "ProductTile");
__turbopack_refresh__.register(_c1, "OrderPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_91501f._.js.map