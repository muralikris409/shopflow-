import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import SearchBar from "./SearchBar";
import { useRouter } from "next/navigation";

const Navbar = ({ menuData = [] }) => {
  const router=useRouter();
  const [openCategory, setOpenCategory] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  const toggleCategory = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId); 
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); 
  };

  return (
    <nav className="bg-gray-900 text-white py-2 px-6 md:py-4 md:px-6">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Navbar menu for large screens */}
        <div className="hidden md:flex items-center space-x-6">
          {menuData.map((category) => (
            <DropdownMenu key={category.id}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white uppercase">
                  {category.name}
                </Button>
              </DropdownMenuTrigger>
              {category.subCategories && (
                <DropdownMenuContent align="start" className="bg-white text-black w-40 shadow-lg">
                  {category.subCategories.map((item) => (
                    <DropdownMenuItem key={item.id}>
                      <Link href={`/products/subcategory/${item.id}`} className="w-full block py-1 px-2 hover:text-gray-600">
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          ))}
        </div>

        <div className="md:hidden">
          <Button variant="ghost" className="text-white uppercase" onClick={toggleMobileMenu}>
            Menu
          </Button>

        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-4 mt-4">
            {menuData.map((category) => (
              <div key={category.id} className="flex flex-col space-y-2">
                {/* Category Button - Toggle visibility of subcategories */}
                <Button
                  variant="ghost"
                  className="text-white uppercase"
                  onClick={() => toggleCategory(category.id)}
                >
                  {category.name}
                </Button>

                {/* Subcategories - Show only if the category is clicked */}
                {openCategory === category.id && category.subCategories && (
                  <div className="space-y-2 pl-4">
                    {category.subCategories.map((item) => (
                      <Button
                        key={item.id}
                        onClick={()=>{
                          toggleMobileMenu();
                        toggleCategory(category.id);

                          router.push(`/products/subcategory/${item.id}`);
                        }}
                        href={`/products/subcategory/${item.id}`}
                        className="block py-2 px-4 text-white hover:text-gray-50"
                      >
                        {item.name}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
