"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter, resetFilter } from "../_lib/genericReducer";
import { getCategory } from "../(application)/_service/ProductService";
import { FaTimes } from "react-icons/fa";

function Filter() {
  const filter = useSelector((state) => state.generic);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  
  useEffect(() => {
    async function loadCategories() {
      const fetchedData = await getCategory();
      console.log(fetchedData);
      setData(fetchedData.data);
    }
    loadCategories();
  }, []);
  
  const [filters, setFilters] = useState({
    selectedCategory: "",
    selectedSubcategories: [],
    sortOption: "",
    minPrice: "",
    maxPrice: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);  

  const handleCategoryChange = (category) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      selectedCategory: category,
      selectedSubcategories: [], 
    }));
  };

  const handleSubcategoryToggle = (subcategory) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      selectedSubcategories: prevFilters.selectedSubcategories.includes(subcategory)
        ? prevFilters.selectedSubcategories.filter((item) => item !== subcategory)
        : [...prevFilters.selectedSubcategories, subcategory],
    }));
  };

  const handleSortChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortOption: e.target.value,
    }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    console.log("Applied Filters:", filters);
    dispatch(updateFilter(filters));
    setIsModalOpen(false); 
  };

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState); 
  };

  return (
    <div className="relative overflow-y-scroll scrollbar-hide">
    
    < button
      onClick={toggleModal}
      className="bg-orange-600 text-white py-2 px-4  mb-4 w-full  sm:flex items-center justify-center space-x-2 hover:bg-orange-700 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 12.414V20a1 1 0 01-.553.894l-4 2A1 1 0 017 22V12.414L3.293 6.707A1 1 0 013 6V4z"
        />
      </svg>
      <span>Filter</span>
    </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 sm:hidden">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
          

            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <button
              onClick={toggleModal}
              className="text-lg font-bold text-gray-800 absolute top-2 right-2"
            >
            <FaTimes color="red" size={30}/>
            </button>
            <h3 className="text-lg font-medium mb-2">Categories</h3>

            <div className="mb-6 overflow-y-scroll max-h-36">
              {data?.map((category) => (
                <div key={category.id} className="mb-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      className="form-radio h-4 w-4 text-orange-500"
                      checked={filters.selectedCategory === category.name}
                      onChange={() => handleCategoryChange(category.name)}
                    />
                    <span className="text-gray-800">{category.name}</span>
                  </label>
                </div>
              ))}
            </div>

            {filters.selectedCategory && (
              <>
              <h3 className="text-lg font-medium mb-2">Subcategories</h3>
              <div className="mb-6 overflow-y-scroll max-h-36">
                {data
                  .find((cat) => cat.name === filters.selectedCategory)
                  ?.subCategories?.map((subcategory) => (
                    <div key={subcategory.id} className="mb-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-orange-500"
                          checked={filters.selectedSubcategories.includes(subcategory.name)}
                          onChange={() => handleSubcategoryToggle(subcategory.name)}
                        />
                        <span className="text-gray-800">{subcategory.name}</span>
                      </label>
                    </div>
                  ))}
              </div>
              </>
            )}
{/* 
            <div className="mb-6 flex space-x-4">
              <div className="w-28">
                <label className="text-lg font-medium mb-2 block">Min Price</label>
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handlePriceChange}
                  className="form-input w-full p-2 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Min"
                />
              </div>

              <div className="w-28">
                <label className="text-lg font-medium mb-2 block">Max Price</label>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handlePriceChange}
                  className="form-input w-full p-2 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Max"
                />
              </div>
            </div> */}

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Sort By</h3>
              <select
                value={filters.sortOption}
                onChange={handleSortChange}
                className="form-select block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select Sort Option</option>
                <option value="low to high">Price Low to High</option>
                <option value="high to low">Price High to Low</option>
              </select>
            </div>

            <div className="flex justify-between">
              <button
                onClick={applyFilters}
                className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
              >
                Apply Filters
              </button>
              <button
                onClick={() => {
                  setFilters({
                    selectedCategory: "",
                    selectedSubcategories: [],
                    sortOption: "",
                    minPrice: "",
                    maxPrice: "",
                  });
                  dispatch(resetFilter());
                  setIsModalOpen(false);
                }}
                className="bg-orange-900 text-white py-2 px-4 rounded hover:bg-orange-600"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
 
      {isModalOpen &&
      <div className="hidden sm:block ">
        <div className="p-6 m-6 border rounded-lg shadow-md bg-white w-full max-w-7xl text-gray-800">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="flex flex-row">
            <div className="mb-6 mx-6 max-h-40 overflow-y-auto w-60 scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-100 scrollbar-rounded-lg">
              <h3 className="text-lg font-medium mb-2">Categories</h3>
              {data?.map((category) => (
                <div key={category.id} className="mb-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      className="form-radio h-4 w-4 text-orange-500"
                      checked={filters.selectedCategory === category.name}
                      onChange={() => handleCategoryChange(category.name)}
                    />
                    <span className="text-gray-800">{category.name}</span>
                  </label>
                </div>
              ))}
            </div>

            {filters.selectedCategory && (
              <div className="mb-6 max-h-40 overflow-y-auto w-60 scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-100 scrollbar-rounded-lg">
                <h3 className="text-lg font-medium mb-2">Subcategories</h3>
                {data
                  .find((cat) => cat.name === filters.selectedCategory)
                  ?.subCategories?.map((subcategory) => (
                    <div key={subcategory.id} className="mb-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-orange-500"
                          checked={filters.selectedSubcategories.includes(subcategory.name)}
                          onChange={() => handleSubcategoryToggle(subcategory.name)}
                        />
                        <span className="text-gray-800">{subcategory.name}</span>
                      </label>
                    </div>
                  ))}
              </div>
            )}

            {/* <div className="mb-6 flex space-x-4">
              <div className="w-28">
                <label className="text-lg font-medium mb-2 block">Min Price</label>
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handlePriceChange}
                  className="form-input w-full p-2 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Min"
                />
              </div>

              <div className="w-28">
                <label className="text-lg font-medium mb-2 block">Max Price</label>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handlePriceChange}
                  className="form-input w-full p-2 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Max"
                />
              </div>
            </div> */}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Sort By</h3>
            <select
              value={filters.sortOption}
              onChange={handleSortChange}
              className="form-select block w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Select Sort Option</option>
              <option value="low to high">Price Low to High</option>
              <option value="high to low">Price High to Low</option>
            </select>
          </div>

          <div className="flex justify-between">
            <button
              onClick={applyFilters}
              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
            >
              Apply Filters
            </button>
            <button
              onClick={() => {
                setFilters({
                  selectedCategory: "",
                  selectedSubcategories: [],
                  sortOption: "",
                  minPrice: "",
                  maxPrice: "",
                });
                dispatch(resetFilter());
              }}
              className="bg-orange-900 text-white py-2 px-4 rounded hover:bg-orange-600"
            >
              Reset
            </button>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default Filter;
