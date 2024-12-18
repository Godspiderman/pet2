"use client";

import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Head from "next/head";
import { startLoading, stopLoading } from '@/app/redux/slices/loadingSlice';
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Pagination from "@/app/utils/Pagenation/Pagenation";


async function fetchProducts(subCategoryId = 0) {


  const response = await fetch(
    `http://localhost:8080/api/public/product/getAll?userId=0&categoryId=1&subCategoryId=${subCategoryId}&minPrice=0&maxPrice=0&isAdmin=false`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export default function PetsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams(); // Unwrap searchParams
  const subCategoryId = parseInt(searchParams.get("subCategoryId") || "0", 10);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    async function loadProducts() {
      try {
        dispatch(startLoading());

        const data = await fetchProducts(subCategoryId);
        dispatch(stopLoading());

        setProducts(data);
        console.log(data);

        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    loadProducts();
  }, [subCategoryId]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilteredProducts(
      products.filter((product) =>
        product.productName.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const categoryData = [
    { name: "Dogs & Cats", id: 2, image: "/image/pet-1.png" },
    { name: "Birds", id: 4, image: "/image/pet-2.png" },
    { name: "Aquarium", id: 5, image: "/image/pet-3.png" },
    { name: "Farm Animals", id: 6, image: "/image/pet-4.png" },
  ];

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
      currentPage * itemsPerPage,
      currentPage * itemsPerPage + itemsPerPage
  );


  return (
    <div className="petspage">
      {/* SEO Meta Tags */}
      <Head>
        <title>Pets for Sale | Find Your Perfect Companion</title>
        <meta
          name="description"
          content="Discover a wide range of pets including dogs, cats, birds, and farm animals. Find your perfect companion today!"
        />
        <meta
          name="keywords"
          content="pets for sale, dogs, cats, birds, farm animals, pets online"
        />
        <meta name="author" content="Your Website Name" />
      </Head>

      {/* Hero Section */}
      <div className="petspageHeroSection">
        <div className="petspageContent">
          <h1 className="title">Our Pets</h1>
          <div className="categories">
            {categoryData.map((category) => (
              <Link
                key={category.id}
                href={{
                  pathname: "/pages/Pets",
                  query: { subCategoryId: category.id },
                }}
              >
                <div
                  className={`categoryContent ${subCategoryId === category.id ? "active" : ""
                    }`}
                >
                  <div className="category">
                    <img src={category.image} alt={category.name} />
                  </div>
                  <h2 className="categoriesTitle">{category.name}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="petspageContainer">
        <div className="sectionTitle">
          <h2>
            {subCategoryId
              ? `Products in ${categoryData.find((c) => c.id === subCategoryId)?.name
              }`
              : "Available Pets"}
          </h2>
          <p>Choose your perfect pet</p>
        </div>

        <div className="productpage-section2">
          <div className="heroTabsContainer">
            <div className="searchInput">
              <div className="searchBox">
                <FiSearch size={20} />
                <input
                  type="text"
                  placeholder="Search here..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="product-cards">
            {paginatedProducts.map((product, index) => (
              <div className="product-card"
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
                    <p className="offer-price">₹{product.price.toFixed(2)} </p>
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
  );
}
