"use client";
import { useState, useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";
import "./Products.scss";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "@/app/redux/slices/loadingSlice";
import { FiSearch } from "react-icons/fi";
import { LuListFilter } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Pagination from "@/app/utils/Pagenation/Pagenation";

const Products = () => {
  const router = useRouter();

  const [showFilter, setShowFilter] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [productsData, setProductsData] = useState([]);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState("");

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 8;

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/public/category/getAll");
      setCategories(response.data);
    } catch (err) {
      setError("Failed to fetch categories.");
      console.error("Error fetching categories:", err.message);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/public/subCategory/getAll");
      setSubCategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error.message);
    }
  };
  const fetchProducts = async (filters = {}) => {
    try {

      const queryParams = new URLSearchParams({
        userId: filters.userId || 0,
        categoryId: filters.categoryId || [],
        subCategoryId: filters.subCategoryId || [],
        minPrice: filters.minPrice || 0,
        maxPrice: filters.maxPrice || 0,
        ProductStatusId: filters.ProductStatusId || [],
        isAdmin: filters.isAdmin || false,
      });
      console.log(queryParams.subCategoryId);
      dispatch(startLoading());

      const response = await axios.get(`http://localhost:8080/api/public/product/getAll/temp?${queryParams.toString()}`);
      const fetchedProducts = Array.isArray(response.data) ? response.data : [];
      setProductsData(fetchedProducts); // Update the products state with the fetched data
      dispatch(stopLoading());

    } catch (error) {
      dispatch(startLoading());

      console.error("Error fetching products:", error);
      setProductsData([]); // Reset to empty array on error
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubCategoryChange = (subCategoryId) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subCategoryId)
        ? prev.filter((id) => id !== subCategoryId)
        : [...prev, subCategoryId]
    );
  };

  const handleSelectAllCategories = (selectAll) => {
    if (selectAll) {
      setSelectedCategories(categories.map((category) => category.id));
    } else {
      setSelectedCategories([]);
    }
  };

  const handleSelectAllSubCategories = (selectAll) => {
    if (selectAll) {
      const filteredSubCategoryIds = filteredSubCategories.map(
        (subCategory) => subCategory.id
      );
      setSelectedSubCategories(filteredSubCategoryIds);
    } else {
      setSelectedSubCategories([]);
    }
  };
  const handleApplyFilters = async () => {
    console.log(selectedCategories);
    console.log(selectedSubCategories);

    // Dynamically create the filter object only if they are not empty
    const filters = {
      userId: 0, // Static value as per API requirements
      categoryId: selectedCategories.length > 0 ? selectedCategories : 0,  // Handle empty category list
      subCategoryId: selectedSubCategories.length > 0 ? selectedSubCategories : 0,  // Handle empty subcategory list
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 0,
      ProductStatusId: 0, // Static for now
      isAdmin: false, // Static for now
    };

    console.log(filters);

    await fetchProducts(filters); // Pass filters to fetchProducts
    setShowFilter(!showFilter)
  };

  const handleClearFilters = async () => {
    // Reset all filter states
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setMinPrice("");
    setMaxPrice("");

    // Fetch products with default filters (i.e., without applying any)
    await fetchProducts();
    setShowFilter(!showFilter)
  };

  const filteredSubCategories =
    selectedCategories.length > 0
      ? subCategories.filter((subCategory) =>
        selectedCategories.includes(subCategory.categoryId)
      )
      : subCategories;

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
    fetchProducts();
  }, []);



  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  };
  const filteredData = productsData.filter((products) =>
    (products.productName?.toLowerCase() || "").includes(searchName.toLowerCase())
  );

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedProducts = filteredData.slice(
      currentPage * itemsPerPage,
      currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <div className="products-page">
      <div className="products-page-head">
        <h1>Products</h1>
      </div>
      <div className="products-page-container">
        <div className="products-page-container-head">

          <div className="searchInput">
            <div className="searchBox">
              <FiSearch size={20} />
              <input
                id="searchName"
                type="text"
                placeholder="Search here..."
                value={searchName}
                onChange={handleSearchChange}
              />
            </div>
          </div>


          <p onClick={() => setShowFilter(!showFilter)} className="filter-btn"><LuListFilter /> Filter</p>

        </div>
        <div className="products-page-container-content">
          <div className={`products-page-filter ${showFilter ? "open" : ""}`}>
            <div className="products-page-filter-content">
              <div className="products-page-filter-head">
                <h2>Filter</h2>
                <span>
                  <IoIosCloseCircleOutline onClick={() => setShowFilter(!showFilter)} />
                </span>
              </div>
              <div className="filter-container">
                <div className="filter-list-card">
                  <h3>Category</h3>
                  <div className="filter-lists">
                    <div className="filter-list-item">
                      <input
                        type="checkbox"
                        id="select-all-categories"
                        onChange={(e) => handleSelectAllCategories(e.target.checked)}
                        checked={
                          selectedCategories.length === categories.length &&
                          categories.length > 0
                        }
                      />
                      <label htmlFor="select-all-categories">Select All</label>
                    </div>
                    {categories.map((category) => (
                      <div key={`category-${category.id}`} className="filter-list-item">
                        <input
                          type="checkbox"
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => handleCategoryChange(category.id)}
                        />
                        <label htmlFor={`category-${category.id}`}>{category.name}</label>
                      </div>
                    ))}

                  </div>
                </div>
                <div className="filter-list-card">
                  <h3>Sub Category</h3>
                  <div className="filter-lists">
                    <div className="filter-list-item">
                      <input
                        type="checkbox"
                        id="select-all-subcategories"
                        onChange={(e) => handleSelectAllSubCategories(e.target.checked)}
                        checked={
                          selectedSubCategories.length === filteredSubCategories.length &&
                          filteredSubCategories.length > 0
                        }
                      />
                      <label htmlFor="select-all-subcategories">Select All</label>
                    </div>

                    {filteredSubCategories.map((subCategory) => (
                      <div key={`subcategory-${subCategory.id}`} className="filter-list-item">
                        <input
                          type="checkbox"
                          id={`subCategory-${subCategory.id}`}
                          checked={selectedSubCategories.includes(subCategory.id)}
                          onChange={() => handleSubCategoryChange(subCategory.id)}
                        />
                        <label htmlFor={`subCategory-${subCategory.id}`}>
                          {subCategory.name}
                        </label>
                      </div>
                    ))}

                  </div>
                </div>
                <div className="filter-list-card">
                  <h3>Price</h3>
                  <div className="price-Range">
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="price-Input"
                    />
                    <input
                      type="number"
                      placeholder="Max Price"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="price-Input"
                    />
                  </div>
                </div>
                <div className="filter-btns">
                  <button onClick={handleClearFilters} className="btn-cancel">Clear</button>
                  <button onClick={handleApplyFilters} className="btn">Apply</button>

                </div>
              </div>
            </div>
          </div>
          <div className="products-page-products-cards">
            <div className="product-cards">
              {paginatedProducts.map((product, index) => (
                <div
                  className="product-card"
                  onClick={() => router.push(`/pages/PetDetails?productId=${product.id}&categoryId=${product.categoryId}`)}
                  key={index}
                >
                  <div className="product-card-img">
                    {product.imageUrl
                      .split(" ")
                      .slice(0, 2)
                      .map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`product-img-${index}`}
                          className={index === 0 ? "default-img" : "hover-img"}
                        />
                      ))}

                  </div>
                  <div className="product-card-text">
                    <span className="sub-category-name">{product.subCategoryName}</span>

                    <h1>{product.productName}</h1>
                    <div className="product-card-price">
                      <p className="offer-price">₹{(product.price - (product.price * product.discount / 100)).toFixed(2)} </p>
                      <p className="price">₹{product.price.toFixed(2)} </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              pageCount={pageCount}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
