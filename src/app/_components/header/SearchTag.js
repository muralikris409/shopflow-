"use client"
import { useDispatch } from "react-redux";
import { updateSearch } from "@/app/_lib/genericReducer";
export default function SearchTag({ content=["Mobile", "Laptop", "Headphones", "Smartwatch", "Gaming", "Camera"] }) {
  const dispatch=useDispatch();
    return (
      <div className="overflow-x-scroll scrollbar-hide flex w-3/4 space-x-2 mt-1 text-xs text-gray-400 cursor-pointer">
        {content.map((item, index) => (
          <span key={index} onClick={()=> dispatch(updateSearch(item))}>{item}</span>
        ))}
      </div>
    );
  }