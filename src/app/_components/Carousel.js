"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { fetchCarousel } from "@/app/_service/ApplicationService"; // Import your fetchCarousel method
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux"; // Ensure you have Redux set up
import { setProductData } from "../_lib/utilReducer";
const CarouselItem = React.memo(({ item, isActive, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? "block" : "hidden"
            }`}
            data-carousel-item
        >
            <img
                src={item.src}
                className="object-fit w-full h-full transition-transform duration-300 transform hover:scale-105 cursor-pointer"
                alt={item.alt || "Carousel Image"}
            />
        </div>
    );
});

export const CustomCarousel = () => {
    const router = useRouter();
    const dispatch = useDispatch(); // Initialize dispatch
    const [items, setItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    function handleNavigate (type, id) {
        if (type === "PRODUCT") {
            router.push(`/product/${id}`);
        } 
        else if(type=="SUBCATEGORY"){
            router.push(`/products/subcategory/${id}`);
        }
        else {
            console.warn("Unhandled type:", type);
        }
    };

    // Fetch carousel data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchCarousel();
                console.log(response);
                const formattedItems = response?.data.map((item) => ({
                    src: item.image,
                    alt: `${item.type} ${item.type_id}`,
                    type: item.type,
                    type_id: item.type_id,
                }));
                setItems(formattedItems);
            } catch (error) {
                console.error("Error fetching carousel data:", error);
            }
        };
        fetchData();
    }, []);

    // Carousel auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [items.length]);

    const goToSlide = (index) => setCurrentIndex(index);
    const goToNext = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    const goToPrevious = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
     console.log(items);
    return (
        <div className="relative w-full h-96 m-0 bg-gray-900 overflow-hidden" data-carousel="slide">
            {items.length > 0 ? (
                <>
                    <div className="relative h-full overflow-hidden">
                        {items.map((item, index) => (
                            <CarouselItem
                                key={index}
                                item={item}
                                isActive={index === currentIndex}
                                onClick={function(){
                                    const copiedItem = { ...item }; // Shallow copy
    handleNavigate(copiedItem.type, copiedItem.type_id); 
    console.log(item)
                                }
                                } // Pass correct type and id dynamically
                            />
                        ))}
                    </div>

                    <div className="absolute z-10 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                        {items.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`w-3 h-3 rounded-full transition duration-300 ${
                                    index === currentIndex ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
                                }`}
                                aria-current={index === currentIndex ? "true" : "false"}
                                aria-label={`Slide ${index + 1}`}
                                onClick={()=>goToSlide(index)}
                            ></button>
                        ))}
                    </div>

                    <button
                        type="button"
                        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                        onClick={goToPrevious}
                    >
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg
                                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 1 1 5l4 4"
                                />
                            </svg>
                            <span className="sr-only">Previous</span>
                        </span>
                    </button>

                    <button
                        type="button"
                        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                        onClick={goToNext}
                    >
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg
                                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                            <span className="sr-only">Next</span>
                        </span>
                    </button>
                </>
            ) : (
                <div className="flex items-center justify-center h-full text-white">Loading carousel...</div>
            )}
        </div>
    );
};