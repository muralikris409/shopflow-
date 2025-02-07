import { useDispatch, useSelector } from "react-redux";
import SearchTag from "./SearchTag";
import { updateSearch } from "@/app/_lib/genericReducer";
import { useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className="w-2/4 px-4 py-2 md:px-10">
      <div className="relative text-gray-900 flex items-center gap-2">
        <Input
          ref={ref}
          type="text"
          placeholder="Search for products..."
          className="w-full"
        />
        <Button onClick={handleSearch} variant="default" size="icon">
          <FaSearch className="text-sm md:text-base" />
        </Button>
      </div>
      <SearchTag />
    </div>
  );
}
