"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AiFillStar } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";





const Homepage = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const [blogs, setBlogs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get("http://localhost:8080/api/public/blog/getAll");
      setBlogs(response.data);
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (id) => {
    router.push( `/pages/Blog/BlogView?id=${id}`);
  };

  const reviews = [
    {
      id: 1,
      name: "Cena",
      role: "Manager",
      rating: 4,
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/image/home-61.png",
    },
    {
      id: 2,
      name: "John",
      role: "CEO",
      rating: 5,
      review:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/image/home-61.png",
    },
    {
      id: 3,
      name: "Doe",
      role: "Team Lead",
      rating: 4.5,
      review:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      image: "/image/home-61.png",
    },
  ];

  return (
    <div className="homepage">
      {/* section-1 */}
      <div className="homepageContainer">
        <div className="homepageContent">
          <div className="homepageSide">
            <div className="homepageText">
              <p>Sale Up to 30% off</p>
              <h2>
                Your Pet is Our <br /> Passion
              </h2>
              <p>
                Your Support means everything to our organization and our pet.
              </p>

              <Link href="/pages/Pets">See More</Link>
            </div>
          </div>
          <div className="homepageSide">
            <div className="imageRound">
              {" "}
              <img src="/image/home-1.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* section-2 */}
      {/* <div className="homepage-section">
        <div className="homepage-card-wrapper">
          <div className="homepage-card1">
            <div className="homepage-card-text d-flex">
              <p>New Product</p>
              <h2>Food For Pets</h2>
            </div>
            <img src="/image/home-21.png" alt="" className="w-50" />
          </div>
          <div className="homepage-card-content">
            <div className="homepage-card2">
              <img src="/image/home-22.png" alt="" />
              <div className="homepage-card-text">
                <p>New Product</p>
                <h2>Toys For Dogs</h2>
              </div>
            </div>
            <div className="homepage-card3">
              <div className="homepage-card-text">
                <p>New Product</p>
                <h2>Toys For Cats</h2>
              </div>
              <img src="/image/home-23.png" alt="" />
            </div>
          </div>
        </div>
      </div> */}

      {/* section-3 */}
      <div className="couresCards">
        <div className="heroTabsContainer">
          <div className="heroTabs">
            {["Latest Product", "Top Rating", "Best Selling"].map(
              (section, index) => (
                <div
                  key={index}
                  className={`tab ${activeTab === index + 1 ? "active" : ""}`}
                  onClick={() => handleTabClick(index + 1)}
                >
                  {section}
                </div>
              )
            )}
          </div>
        </div>
        <div className="heroPageContent">
          {activeTab === 1 && (
            <div className="heroTabsCard">
              <div className="tabCards">
                <div className="tabCard">
                  <img src="/image/tap-1.png" alt="" />
                  <p>Simply Cat</p>
                  <div className="tabPrice">
                    <p>$60.00 USD</p>
                    <p>$60.00 USD</p>
                  </div>
                </div>
                <div className="tabCard">
                  <img src="/image/tap-2.png" alt="" />
                  <p>Simply Cat</p>
                  <div className="tabPrice">
                    <p>$60.00 USD</p>
                    <p>$60.00 USD</p>
                  </div>
                </div>
                <div className="tabCard">
                  <img src="/image/tap-3.png" alt="" />
                  <p>Simply Cat</p>
                  <div className="tabPrice">
                    <p>$60.00 USD</p>
                    <p>$60.00 USD</p>
                  </div>
                </div>
                <div className="tabCard">
                  <img src="/image/tap-4.png" alt="" />
                  <p>Simply Cat</p>
                  <div className="tabPrice">
                    <p>$60.00 USD</p>
                    <p>$60.00 USD</p>
                  </div>
                </div>
                <div className="tabCard">
                  <img src="/image/tap-1.png" alt="" />
                  <p>Simply Cat</p>
                  <div className="tabPrice">
                    <p>$60.00 USD</p>
                    <p>$60.00 USD</p>
                  </div>
                </div>
                <div className="tabCard">
                  <img src="/image/tap-2.png" alt="" />
                  <p>Simply Cat</p>
                  <div className="tabPrice">
                    <p>$60.00 USD</p>
                    <p>$60.00 USD</p>
                  </div>
                </div>
                <div className="tabCard">
                  <img src="/image/tap-3.png" alt="" />
                  <p>Simply Cat</p>
                  <div className="tabPrice">
                    <p>$60.00 USD</p>
                    <p>$60.00 USD</p>
                  </div>
                </div>
                <div className="tabCard">
                  <img src="/image/tap-4.png" alt="" />
                  <p>Simply Cat</p>
                  <div className="tabPrice">
                    <p>$60.00 USD</p>
                    <p>$60.00 USD</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div className="heroTabsCard">
              <div className="tabCards">
                <div className="tabCard">
                  <img src="/image/tap-4.png" alt="" />
                  <p>Simply Cat</p>
                  <div className="tabPrice">
                    <p>$60.00 USD</p>
                    <p>$60.00 USD</p>
                  </div>
                </div>
                <div className="tabCard">
                  <img src="/image/tap-1.png" alt="" />
                  <p>Simply Cat</p>
                  <div className="tabPrice">
                    <p>$60.00 USD</p>
                    <p>$60.00 USD</p>
                  </div>
                </div>

                <div className="tabCard">
                  <img src="/image/tap-3.png" alt="" />
                  <p>Simply Cat</p>
                  <div className="tabPrice">
                    <p>$60.00 USD</p>
                    <p>$60.00 USD</p>
                  </div>
                </div>
                <div className="tabCard">
                  <img src="/image/tap-2.png" alt="" />
                  <p>Simply Cat</p>
                  <div className="tabPrice">
                    <p>$60.00 USD</p>
                    <p>$60.00 USD</p>
                  </div>
                </div>
                <div className="tabCard">
                  <img src="/image/tap-1.png" alt="" />
                  <p>Simply Cat</p>
                  <div className="tabPrice">
                    <p>$60.00 USD</p>
                    <p>$60.00 USD</p>
                  </div>
                </div>
                <div className="tabCard">
                  <img src="/image/tap-2.png" alt="" />
                  <p>Simply Cat</p>
                  <div className="tabPrice">
                    <p>$60.00 USD</p>
                    <p>$60.00 USD</p>
                  </div>
                </div>
                <div className="tabCard">
                  <img src="/image/tap-3.png" alt="" />
                  <p>Simply Cat</p>
                  <div className="tabPrice">
                    <p>$60.00 USD</p>
                    <p>$60.00 USD</p>
                  </div>
                </div>
                <div className="tabCard">
                  <img src="/image/tap-4.png" alt="" />
                  <p>Simply Cat</p>
                  <div className="tabPrice">
                    <p>$60.00 USD</p>
                    <p>$60.00 USD</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 3 && (
            <div className="heroTabsCard">
              <div className="tabCards">
                <div className="tabCard">
                  <img src="/image/tap-2.png" alt="" />
                  <p>Simply Cat</p>
                  <div className="tabPrice">
                    <p>$60.00 USD</p>
                    <p>$60.00 USD</p>
                  </div>
                </div>
                <div className="tabCard">
                  <img src="/image/tap-1.png" alt="" />
                  <p>Simply Cat</p>
                  <div className="tabPrice">
                    <p>$60.00 USD</p>
                    <p>$60.00 USD</p>
                  </div>
                </div>

                <div className="tabCard">
                  <img src="/image/tap-4.png" alt="" />
                  <p>Simply Cat</p>
                  <div className="tabPrice">
                    <p>$60.00 USD</p>
                    <p>$60.00 USD</p>
                  </div>
                </div>
                <div className="tabCard">
                  <img src="/image/tap-3.png" alt="" />
                  <p>Simply Cat</p>
                  <div className="tabPrice">
                    <p>$60.00 USD</p>
                    <p>$60.00 USD</p>
                  </div>
                </div>
                <div className="tabCard">
                  <img src="/image/tap-1.png" alt="" />
                  <p>Simply Cat</p>
                  <div className="tabPrice">
                    <p>$60.00 USD</p>
                    <p>$60.00 USD</p>
                  </div>
                </div>
                <div className="tabCard">
                  <img src="/image/tap-2.png" alt="" />
                  <p>Simply Cat</p>
                  <div className="tabPrice">
                    <p>$60.00 USD</p>
                    <p>$60.00 USD</p>
                  </div>
                </div>
                <div className="tabCard">
                  <img src="/image/tap-3.png" alt="" />
                  <p>Simply Cat</p>
                  <div className="tabPrice">
                    <p>$60.00 USD</p>
                    <p>$60.00 USD</p>
                  </div>
                </div>
                <div className="tabCard">
                  <img src="/image/tap-4.png" alt="" />
                  <p>Simply Cat</p>
                  <div className="tabPrice">
                    <p>$60.00 USD</p>
                    <p>$60.00 USD</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="btn">
          {/* <button>All Products</button> */}
          <Link href="/pages/Products">All Products</Link>
        </div>
      </div>

      {/* section-4 */}
      <div className="allPets">
        <div className="allPetsHead">
          <h2>Available Pets</h2>
          <p>Choose your perfect pet</p>
        </div>
        <div className="allPetsContent">
          <Link href='/pages/Pets' className="petsCard">
            <img src="/image/home-31.jpg" alt="" />
            <div className="petCardText">
              <h2>Dogs & Cats</h2>
            </div>
          </Link>
          <Link href='/pages/Pets' className="petsCard">
            <img src="/image/home-32.png" alt="" />
            <div className="petCardText">
              <h2>Birds</h2>
            </div>
          </Link>
          <Link href='/pages/Pets' className="petsCard">
            <img src="/image/home-33.png" alt="" />
            <div className="petCardText">
              <h2>Aquarium</h2>
            </div>
          </Link>
          <Link href='/pages/Pets' className="petsCard">
            <img src="/image/home-34.png" alt="" />
            <div className="petCardText">
              <h2>Farm Animals</h2>
            </div>
          </Link>
        </div>
      </div>

      {/* section-5 */}
      <div className="petFood">
        <div className="petFoodImg">
          <img src="/image/home-41.jpg" alt="" />
          <div className="footContent">
            <p>30% off All Items</p>
            <h2>Accessory</h2>
            <button>SHOP NOW</button>
          </div>
        </div>
        <div className="petFoodImg">
          <img src="/image/home-42.png" alt="" />
          <div className="footContent">
            <p>30% off All Items</p>
            <h2>Accessory</h2>
            <button>SHOP NOW</button>
          </div>
        </div>

        <div className="petFoodImg">
          <img src="/image/home-43.png" alt="" />
          <div className="footContent">
            <p>30% off All Items</p>
            <h2>Accessory</h2>
            <button>SHOP NOW</button>
          </div>
        </div>
      </div>

      {/* section-6 */}

      <div className="availableShop">
        <div className="availableShopContainer">
          <div className="availableShopHead">
            <h2>Available Shops</h2>
            <p>Choose your perfect pet</p>
          </div>
          <div className="availableShopContent">
            <Link href="/pages/Shop/SelectShop" className="tabCard">
              <img src="/image/tap-1.png" alt="" />
              <p>Paw Paradise</p>
              <div className="tabPrice">
                <p>$60.00 USD</p>
                <p>$60.00 USD</p>
              </div>
              <div className="locate">
                <p>Pet Shop 1, Tenkasi-01</p>
              </div>
            </Link>
            <Link href="/pages/Shop/SelectShop" className="tabCard">
              <img src="/image/tap-2.png" alt="" />
              <p>Fur Haven</p>
              <div className="tabPrice">
                <p>$60.00 USD</p>
                <p>$60.00 USD</p>
              </div>
              <div className="locate">
                <p>Pet Shop 1, Tenkasi-01</p>
              </div>
            </Link>
            <Link href="/pages/Shop/SelectShop" className="tabCard">
              <img src="/image/tap-3.png" alt="" />
              <p>The Pet Emporium</p>
              <div className="tabPrice">
                <p>$60.00 USD</p>
                <p>$60.00 USD</p>
              </div>
              <div className="locate">
                <p>Pet Shop 1, Tenkasi-01</p>
              </div>
            </Link>
            <Link href="/pages/Shop/SelectShop" className="tabCard">
              <img src="/image/tap-4.png" alt="" />
              <p>Tail Tales</p>
              <div className="tabPrice">
                <p>$60.00 USD</p>
                <p>$60.00 USD</p>
              </div>
              <div className="locate">
                <p>Pet Shop 1, Tenkasi-01</p>
              </div>
            </Link>
            <Link href="/pages/Shop/SelectShop" className="tabCard">
              <img src="/image/tap-1.png" alt="" />
              <p>Paw Paradise</p>
              <div className="tabPrice">
                <p>$60.00 USD</p>
                <p>$60.00 USD</p>
              </div>
              <div className="locate">
                <p>Pet Shop 1, Tenkasi-01</p>
              </div>
            </Link>
            <Link href="/pages/Shop/SelectShop" className="tabCard">
              <img src="/image/tap-2.png" alt="" />
              <p>Fur Haven</p>
              <div className="tabPrice">
                <p>$60.00 USD</p>
                <p>$60.00 USD</p>
              </div>
              <div className="locate">
                <p>Pet Shop 1, Tenkasi-01</p>
              </div>
            </Link>
            <Link href="/pages/Shop/SelectShop" className="tabCard">
              <img src="/image/tap-3.png" alt="" />
              <p>The Pet Emporium</p>
              <div className="tabPrice">
                <p>$60.00 USD</p>
                <p>$60.00 USD</p>
              </div>
              <div className="locate">
                <p>Pet Shop 1, Tenkasi-01</p>
              </div>
            </Link>
            <Link href="/pages/Shop/SelectShop" className="tabCard">
              <img src="/image/tap-4.png" alt="" />
              <p>Tail Tales</p>
              <div className="tabPrice">
                <p>$60.00 USD</p>
                <p>$60.00 USD</p>
              </div>
              <div className="locate">
                <p>Pet Shop 1, Tenkasi-01</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* section-7 */}
      <div className="carousel">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="review-card">
                <img src={review.image} alt={review.name} className="avatar" />
                <p className="review">{review.review}</p>
                <p className="name">{review.name}</p>
                <p className="role">{review.role}</p>
                <div className="rating">
                  <span>4.0</span>{" "}
                  {[...Array(4)].map((_, i) => (
                    <AiFillStar key={i} />
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>


      {/* section-8 (Blogs) */}

      <div className="homeBlog">
        <div className="homeBlogContainer">
          <div className="homeBlogHead">
            <h2>Our Blog</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          </div>

          <div className="homeBlogContent">
            {blogs.map((blog) => (
              <div
                className="BlogContentCard"
                key={blog.id}
                onClick={() => handleBlogClick(blog.id)}
              >
                <img
                  src="/image/home-73.png"
                  alt="pet img"
                  className="blogImage"
                />
                <h2>{blog.heading}</h2>
                <p>{blog.shortDescription}</p>
                <Link href={`/pages/Blog/BlogView?id=${blog.id}`}>Read More</Link>
              </div>
            ))}
        </div>
      </div>
    </div>
    </div >
  );
};

export default Homepage;
