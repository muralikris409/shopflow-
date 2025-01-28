import { useDispatch, useSelector } from "react-redux";
import SearchTag from "./SearchTag";
import { updateSearch } from "@/app/_lib/genericReducer";
import { useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const state = useSelector((state) => state.generic.data.search);
  const dispatch = useDispatch();
  const router = useRouter();
  const ref = useRef(null);

  const handleSearch = () => {
    const searchQuery = ref.current.value;
    dispatch(updateSearch(searchQuery));
    router.push(`/products`);
  };

  useEffect(() => {
    ref.current.value = state;
  }, [state]);

  return (
    <div className="w-2/4 px-4 py-2 md:px-10 ">
      <div className="relative flex items-center">
        <input
          ref={ref}
          type="text"
          placeholder="Search for products..."
          className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 md:text-base"
        />
        <button
          onClick={handleSearch}
          type="submit"
          className="absolute right-0 top-0 h-full px-3 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 md:px-4"
        >
          <span className="sr-only">Search</span>
          <FaSearch className="text-sm md:text-base" />
        </button>
      </div>
      
      <SearchTag />
    </div>
  );
}
