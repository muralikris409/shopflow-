(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_app_448ac4._.js", {

"[project]/src/app/_service/ProductService.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "getCategory": (()=>getCategory),
    "getClearanceSaleProducts": (()=>getClearanceSaleProducts),
    "getFilteredProducts": (()=>getFilteredProducts),
    "getFlashDeals": (()=>getFlashDeals),
    "getLimitedTimeOffers": (()=>getLimitedTimeOffers),
    "getNewArrivals": (()=>getNewArrivals),
    "getProductByID": (()=>getProductByID),
    "getProducts": (()=>getProducts),
    "getSearchedProduct": (()=>getSearchedProduct),
    "getTrendingProducts": (()=>getTrendingProducts),
    "subCategoryProducts": (()=>subCategoryProducts)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/api/axios.js [app-client] (ecmascript)");
;
;
const getFilteredProducts = async (filters)=>{
    console.log(filters);
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].get('/products/filteredProducts', {
            params: {
                categoryName: filters?.selectedCategory,
                subCategoryNames: filters?.selectedSubcategories,
                sort: filters?.sortOption
            }
        });
        return response.data;
    } catch (err) {
        console.error("Error fetching filtered products:", err.message);
        throw new Error("Unable to fetch filtered products. Please try again later.");
    }
};
async function subCategoryProducts(id) {
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].get("/products/getProductsByCategory", {
            params: {
                subCategoryId: id
            }
        });
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.error("Error fetching products by subcategory:", err.message);
        throw new Error("Unable to fetch products for the selected subcategory. Please try again later.");
    }
}
async function getProducts(page = 1) {
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].get("/products/getAllProducts", {
            params: {
                page: page
            }
        });
        return response.data;
    } catch (err) {
        console.error("Error fetching products:", err.message);
        throw new Error("Unable to fetch products. Please try again later.");
    }
}
async function getFlashDeals() {
    try {
        const flashdeal = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].get("/products/flashDealProducts");
        return flashdeal.data;
    } catch (err) {
        console.error("Error fetching flash deals:", err.message);
        throw new Error("Unable to fetch flash deals. Please try again later.");
    }
}
async function getTrendingProducts() {
    try {
        const trending = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].get("/products/getTrendingProducts");
        return trending.data;
    } catch (err) {
        console.error("Error fetching flash deals:", err.message);
        throw new Error("Unable to fetch flash deals. Please try again later.");
    }
}
async function getNewArrivals() {
    try {
        const newarrival = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].get("/products/getNewArrivals");
        return newarrival.data;
    } catch (err) {
        console.error("Error fetching flash deals:", err.message);
        throw new Error("Unable to fetch flash deals. Please try again later.");
    }
}
async function getLimitedTimeOffers() {
    try {
        const limiteddeal = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].get("/products/getLimitedTimeOffers");
        return limiteddeal.data;
    } catch (err) {
        console.error("Error fetching flash deals:", err.message);
        throw new Error("Unable to fetch flash deals. Please try again later.");
    }
}
async function getClearanceSaleProducts() {
    try {
        const clearanceSale = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].get("/products/getClearanceSaleProducts");
        return clearanceSale.data;
    } catch (err) {
        console.error("Error fetching flash deals:", err.message);
        throw new Error("Unable to fetch flash deals. Please try again later.");
    }
}
async function getCategory() {
    try {
        const categories = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].get("/products/Category");
        console.log(categories.data);
        return categories.data;
    } catch (err) {
        console.error("Error fetching categories:", err.message);
        throw new Error("Unable to fetch categories. Please try again later.");
    }
}
async function getProductByID(id) {
    try {
        const product = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].get("/products/getProductById", {
            params: {
                productId: id
            }
        });
        return product.data;
    } catch (err) {
        console.error("Error fetching product by ID:", err.message);
        throw new Error("Unable to fetch product details. Please try again later.");
    }
}
async function getSearchedProduct(query) {
    try {
        const products = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["axiosInstance"].get("/products/getProductBySearch", {
            params: {
                query: query
            }
        });
        return products.data;
    } catch (err) {
        console.error("Error fetching searched products:", err.message);
        throw new Error("Unable to search for products. Please try again later.");
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/_components/ProductFilter.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$_lib$2f$genericReducer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/_lib/genericReducer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$_service$2f$ProductService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/_service/ProductService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
function Filter() {
    _s();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Filter.useEffect": ()=>{
            async function loadCategories() {
                const fetchedData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$_service$2f$ProductService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategory"])();
                console.log(fetchedData);
                setData(fetchedData.data);
            }
            loadCategories();
        }
    }["Filter.useEffect"], []);
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        selectedCategory: "",
        selectedSubcategories: [],
        sortOption: "",
        minPrice: "",
        maxPrice: ""
    });
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleCategoryChange = (category)=>{
        setFilters((prevFilters)=>({
                ...prevFilters,
                selectedCategory: category,
                selectedSubcategories: []
            }));
    };
    const handleSubcategoryToggle = (subcategory)=>{
        setFilters((prevFilters)=>({
                ...prevFilters,
                selectedSubcategories: prevFilters.selectedSubcategories.includes(subcategory) ? prevFilters.selectedSubcategories.filter((item)=>item !== subcategory) : [
                    ...prevFilters.selectedSubcategories,
                    subcategory
                ]
            }));
    };
    const handleSortChange = (e)=>{
        setFilters((prevFilters)=>({
                ...prevFilters,
                sortOption: e.target.value
            }));
    };
    const handlePriceChange = (e)=>{
        const { name, value } = e.target;
        setFilters((prevFilters)=>({
                ...prevFilters,
                [name]: value
            }));
    };
    const applyFilters = ()=>{
        console.log("Applied Filters:", filters);
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$_lib$2f$genericReducer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateFilter"])(filters));
        setIsModalOpen(false);
    };
    const toggleModal = ()=>{
        setIsModalOpen((prevState)=>!prevState);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex  max-h-screen overflow-y-scroll md:overflow-y-hidden scrollbar-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden sm:block max-w-72 bg-white p-3 border-r overflow-y-scroll  h-full scrollbar-hide",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold mb-4",
                        children: "Filters"
                    }, void 0, false, {
                        fileName: "[project]/src/app/_components/ProductFilter.js",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-medium mb-2",
                        children: "Categories"
                    }, void 0, false, {
                        fileName: "[project]/src/app/_components/ProductFilter.js",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6 overflow-y-scroll max-h-72 scrollbar-hide",
                        children: data?.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `w-full text-left py-2 px-4 mb-2 rounded-lg focus:outline-none ${filters.selectedCategory === category.name ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-800 hover:bg-orange-200"}`,
                                onClick: ()=>handleCategoryChange(category.name),
                                children: category.name
                            }, category.id, false, {
                                fileName: "[project]/src/app/_components/ProductFilter.js",
                                lineNumber: 81,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/_components/ProductFilter.js",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    filters.selectedCategory && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-medium mb-2",
                                children: "Subcategories"
                            }, void 0, false, {
                                fileName: "[project]/src/app/_components/ProductFilter.js",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6  overflow-y-scroll max-h-72 scrollbar-hide",
                                children: data.find((cat)=>cat.name === filters.selectedCategory)?.subCategories?.map((subcategory)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `w-full text-left py-2 px-4 mb-2 rounded-lg focus:outline-none ${filters.selectedSubcategories.includes(subcategory.name) ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-800 hover:bg-orange-200"}`,
                                        onClick: ()=>handleSubcategoryToggle(subcategory.name),
                                        children: subcategory.name
                                    }, subcategory.id, false, {
                                        fileName: "[project]/src/app/_components/ProductFilter.js",
                                        lineNumber: 102,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/_components/ProductFilter.js",
                                lineNumber: 98,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-medium mb-2",
                                children: "Sort By"
                            }, void 0, false, {
                                fileName: "[project]/src/app/_components/ProductFilter.js",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: filters.sortOption,
                                onChange: handleSortChange,
                                className: "form-select block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-orange-500 focus:border-orange-500",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "Select Sort Option"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/_components/ProductFilter.js",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "low to high",
                                        children: "Price Low to High"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/_components/ProductFilter.js",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "high to low",
                                        children: "Price High to Low"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/_components/ProductFilter.js",
                                        lineNumber: 127,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/_components/ProductFilter.js",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/_components/ProductFilter.js",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-evenly",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: applyFilters,
                                className: "bg-orange-500 text-white py-2 px-4 m-1 rounded hover:bg-orange-600",
                                children: "Apply Filters"
                            }, void 0, false, {
                                fileName: "[project]/src/app/_components/ProductFilter.js",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setFilters({
                                        selectedCategory: "",
                                        selectedSubcategories: [],
                                        sortOption: "",
                                        minPrice: "",
                                        maxPrice: ""
                                    });
                                    dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$_lib$2f$genericReducer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetFilter"])());
                                },
                                className: "bg-orange-900 text-white py-2 px-4 m-1 rounded hover:bg-orange-600",
                                children: "Reset"
                            }, void 0, false, {
                                fileName: "[project]/src/app/_components/ProductFilter.js",
                                lineNumber: 138,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/_components/ProductFilter.js",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/_components/ProductFilter.js",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: toggleModal,
                className: "bg-orange-600 text-white py-2 px-4 sm:hidden w-full flex items-center justify-center  hover:bg-orange-700 transition-colors",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    className: "w-5 h-5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    strokeWidth: 2,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 12.414V20a1 1 0 01-.553.894l-4 2A1 1 0 017 22V12.414L3.293 6.707A1 1 0 013 6V4z"
                    }, void 0, false, {
                        fileName: "[project]/src/app/_components/ProductFilter.js",
                        lineNumber: 169,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/_components/ProductFilter.js",
                    lineNumber: 161,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/_components/ProductFilter.js",
                lineNumber: 157,
                columnNumber: 7
            }, this),
            isModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black bg-opacity-50 flex justify-center overflow-y-scroll  items-center z-50 sm:hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-6 rounded-lg w-full max-w-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold mb-4",
                            children: "Filters"
                        }, void 0, false, {
                            fileName: "[project]/src/app/_components/ProductFilter.js",
                            lineNumber: 182,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: toggleModal,
                            className: "text-lg font-bold text-gray-800 absolute top-2 right-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaTimes"], {
                                color: "red",
                                size: 30
                            }, void 0, false, {
                                fileName: "[project]/src/app/_components/ProductFilter.js",
                                lineNumber: 187,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/_components/ProductFilter.js",
                            lineNumber: 183,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-medium mb-2",
                            children: "Categories"
                        }, void 0, false, {
                            fileName: "[project]/src/app/_components/ProductFilter.js",
                            lineNumber: 190,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: data?.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `w-full text-left py-2 px-4 mb-2 rounded-lg focus:outline-none ${filters.selectedCategory === category.name ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-800 hover:bg-orange-200"}`,
                                    onClick: ()=>handleCategoryChange(category.name),
                                    children: category.name
                                }, category.id, false, {
                                    fileName: "[project]/src/app/_components/ProductFilter.js",
                                    lineNumber: 193,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/_components/ProductFilter.js",
                            lineNumber: 191,
                            columnNumber: 13
                        }, this),
                        filters.selectedCategory && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-medium mb-2",
                                    children: "Subcategories"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/_components/ProductFilter.js",
                                    lineNumber: 209,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-6",
                                    children: data.find((cat)=>cat.name === filters.selectedCategory)?.subCategories?.map((subcategory)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: `w-full text-left py-2 px-4 mb-2 rounded-lg focus:outline-none ${filters.selectedSubcategories.includes(subcategory.name) ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-800 hover:bg-orange-200"}`,
                                            onClick: ()=>handleSubcategoryToggle(subcategory.name),
                                            children: subcategory.name
                                        }, subcategory.id, false, {
                                            fileName: "[project]/src/app/_components/ProductFilter.js",
                                            lineNumber: 214,
                                            columnNumber: 23
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/_components/ProductFilter.js",
                                    lineNumber: 210,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-medium mb-2",
                                    children: "Sort By"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/_components/ProductFilter.js",
                                    lineNumber: 231,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: filters.sortOption,
                                    onChange: handleSortChange,
                                    className: "form-select block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-orange-500 focus:border-orange-500",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "Select Sort Option"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/_components/ProductFilter.js",
                                            lineNumber: 237,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "low to high",
                                            children: "Price Low to High"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/_components/ProductFilter.js",
                                            lineNumber: 238,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "high to low",
                                            children: "Price High to Low"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/_components/ProductFilter.js",
                                            lineNumber: 239,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/_components/ProductFilter.js",
                                    lineNumber: 232,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/_components/ProductFilter.js",
                            lineNumber: 230,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: applyFilters,
                                    className: "bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600",
                                    children: "Apply Filters"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/_components/ProductFilter.js",
                                    lineNumber: 244,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setFilters({
                                            selectedCategory: "",
                                            selectedSubcategories: [],
                                            sortOption: "",
                                            minPrice: "",
                                            maxPrice: ""
                                        });
                                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$_lib$2f$genericReducer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetFilter"])());
                                        setIsModalOpen(false);
                                    },
                                    className: "bg-orange-900 text-white py-2 px-4 rounded hover:bg-orange-600",
                                    children: "Reset"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/_components/ProductFilter.js",
                                    lineNumber: 250,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/_components/ProductFilter.js",
                            lineNumber: 243,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/_components/ProductFilter.js",
                    lineNumber: 181,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/_components/ProductFilter.js",
                lineNumber: 180,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/_components/ProductFilter.js",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
_s(Filter, "kCkYtv02evVZcELSy6RYEjmXtoo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"]
    ];
});
_c = Filter;
const __TURBOPACK__default__export__ = Filter;
var _c;
__turbopack_refresh__.register(_c, "Filter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/(application)/products/layout.js [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_app_448ac4._.js.map