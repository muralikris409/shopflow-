import { useDispatch, useSelector } from "react-redux";
import { resetFilter, updateFilter, updateSearch } from "@/app/_lib/genericReducer";
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
    dispatch(resetFilter());
    dispatch(updateSearch(searchQuery));
    router.push(`/products`);
  };

  useEffect(() => {
    ref.current.value = state;
  }, [state]);

  return (
    <div className="w-full md:px-10 md:bg-transparent lg:w-3/4 bg-white  rounded-lg">
      <div className="relative text-gray-900 flex items-center">
        <Input
          ref={ref}
          type="text"
          placeholder="Search for products..."
          className="w-full"
        />
        <Button onClick={handleSearch} className="bg-gray-50 md:bg-transparent " variant="default" size="icon">
          <FaSearch className="text-sm md:text-base text-gray-900 md:text-white " />
        </Button>
      </div>
    </div>
  );
}
