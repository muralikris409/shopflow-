(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_app_(application)_cartv2_page_e148e0.js", {

"[project]/src/app/(application)/cartv2/page.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const { jsxDEV: _jsxDEV } = __turbopack_require__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
function CartTile({ handleNavigation, product, onIncreaseQuantity, onDecreaseQuantity, onRemoveProduct, quantity }) {
    const [tileLoading, setTileLoading] = useState(false);
    const handleOperation = async (operation, productId)=>{
        setTileLoading(true);
        try {
            await operation(productId);
        } catch (err) {
            toast.error('Operation failed. Please try again.');
        } finally{
            setTileLoading(false);
        }
    };
    return /*#__PURE__*/ _jsxDEV("div", {
        className: `bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden ${tileLoading ? 'animate-pulse' : ''}`,
        children: [
            /*#__PURE__*/ _jsxDEV("div", {
                className: "flex flex-col md:flex-row p-4 gap-4",
                children: [
                    /*#__PURE__*/ _jsxDEV("img", {
                        className: "w-full md:w-24 h-24 rounded-lg object-cover",
                        src: product?.image,
                        alt: product?.name
                    }, void 0, false, {
                        fileName: "[project]/src/app/(application)/cartv2/page.js",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ _jsxDEV("div", {
                        className: "flex-1 flex flex-col justify-between",
                        children: [
                            /*#__PURE__*/ _jsxDEV("div", {
                                children: [
                                    /*#__PURE__*/ _jsxDEV("h3", {
                                        onClick: ()=>handleNavigation(product?.id),
                                        className: "text-lg font-semibold text-gray-900 hover:underline cursor-pointer",
                                        children: product?.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(application)/cartv2/page.js",
                                        lineNumber: 39,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ _jsxDEV("p", {
                                        className: "text-sm text-gray-600 mt-1",
                                        children: [
                                            "$",
                                            product?.offerPrice?.toFixed(2),
                                            ' ',
                                            /*#__PURE__*/ _jsxDEV("span", {
                                                className: "line-through text-gray-400",
                                                children: [
                                                    "$",
                                                    product?.actualPrice?.toFixed(2)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(application)/cartv2/page.js",
                                                lineNumber: 47,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(application)/cartv2/page.js",
                                        lineNumber: 45,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(application)/cartv2/page.js",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ _jsxDEV("div", {
                                className: "flex items-center gap-2 mt-3",
                                children: [
                                    /*#__PURE__*/ _jsxDEV(Button, {
                                        variant: "outline",
                                        size: "sm",
                                        onClick: ()=>handleOperation(onDecreaseQuantity, product?.id),
                                        disabled: tileLoading,
                                        children: "-"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(application)/cartv2/page.js",
                                        lineNumber: 55,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ _jsxDEV(Input, {
                                        className: "w-12 text-center",
                                        type: "text",
                                        value: quantity,
                                        readOnly: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(application)/cartv2/page.js",
                                        lineNumber: 63,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ _jsxDEV(Button, {
                                        variant: "outline",
                                        size: "sm",
                                        onClick: ()=>handleOperation(onIncreaseQuantity, product?.id),
                                        disabled: tileLoading,
                                        children: "+"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(application)/cartv2/page.js",
                                        lineNumber: 69,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(application)/cartv2/page.js",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(application)/cartv2/page.js",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(application)/cartv2/page.js",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ _jsxDEV("div", {
                className: "md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 shadow-lg",
                children: /*#__PURE__*/ _jsxDEV(Button, {
                    variant: "destructive",
                    size: "sm",
                    onClick: ()=>handleOperation(onRemoveProduct, product?.id),
                    disabled: tileLoading,
                    className: "w-full",
                    children: "Remove"
                }, void 0, false, {
                    fileName: "[project]/src/app/(application)/cartv2/page.js",
                    lineNumber: 83,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(application)/cartv2/page.js",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ _jsxDEV("div", {
                className: "hidden md:block self-center",
                children: /*#__PURE__*/ _jsxDEV(Button, {
                    variant: "destructive",
                    size: "sm",
                    onClick: ()=>handleOperation(onRemoveProduct, product?.id),
                    disabled: tileLoading,
                    children: "Remove"
                }, void 0, false, {
                    fileName: "[project]/src/app/(application)/cartv2/page.js",
                    lineNumber: 96,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(application)/cartv2/page.js",
                lineNumber: 95,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(application)/cartv2/page.js",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_%28application%29_cartv2_page_e148e0.js.map