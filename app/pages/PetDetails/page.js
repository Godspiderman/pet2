"use client";
import { useState, useEffect } from "react";
import { CiShare2 } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdStarRate } from "react-icons/md";
import { FaMinus } from "react-icons/fa";
import Link from "next/link";
import { startLoading, stopLoading } from "@/app/redux/slices/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const PetDetails = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated); // Fetch authentication state

  const [count, setCount] = useState(1);
  const [petDetails, setPetDetails] = useState("");
  const [foodDetails, setFoodDetails] = useState("");
  const [accessoriesDetails, setAccessoriesDetails] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const categoryId = searchParams.get("categoryId");
  console.log("productId from params:", productId);
  console.log("categoryId from params:", categoryId);

  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(images[0]?.imageUrls);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReversing, setIsReversing] = useState(false);

  useEffect(() => {
    const fetchPetsDetails = async () => {
      dispatch(startLoading());
      try {
        const response = await fetch(
          `http://localhost:8080/api/public/resource/pet/getOne/${productId}`
        );
        const data = await response.json();
        console.log(data);
        setPetDetails(data);
        dispatch(stopLoading());
      } catch (error) {
      }
    };

    fetchPetsDetails();
  }, [categoryId, productId]);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      dispatch(startLoading());
      try {
        const response = await fetch(
          `http://localhost:8080/api/public/resource/food/getOne/${productId}`
        );
        const data = await response.json();
        setFoodDetails(data);
        console.log(data);
        dispatch(stopLoading());
      } catch (error) {
      }
    };

    fetchFoodDetails();
  }, [categoryId, productId]);


  useEffect(() => {
    const fetchAccessoriesDetails = async () => {
      dispatch(startLoading());
      try {
        const response = await fetch(
          `http://localhost:8080/api/public/resource/accessories/getOne/${productId}`
        );
        const data = await response.json();
        setAccessoriesDetails(data);
        dispatch(stopLoading());
        console.log(data);
      } catch (error) {
      }
    };

    fetchAccessoriesDetails();
  }, [categoryId, productId]);



  useEffect(() => {
    const fetchImages = async () => {
      dispatch(startLoading());
      try {
        const imagesResponse = await fetch(`http://localhost:8080/api/public/productImages/getByProductId/${productId}`);
        const imagesData = await imagesResponse.json();
        setImages(imagesData);
        if (imagesData.length > 0) {
          setMainImage(imagesData[0].imageUrls);
        }
        dispatch(stopLoading());
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        let nextIndex;

        if (!isReversing) {
          nextIndex = prevIndex + 1;
          if (nextIndex >= images.length - 1) setIsReversing(true);
        } else {
          nextIndex = prevIndex - 1;
          if (nextIndex <= 0) setIsReversing(false);
        }

        setMainImage(images[nextIndex]?.imageUrls || mainImage); // Fallback to avoid blank images
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [images, isReversing, mainImage]);

  const handleImageClick = (imageUrl, index) => {
    setMainImage(imageUrl);
    setCurrentIndex(index);
    setIsReversing(index === images.length - 1);
  };


  const increment = () =>
    setCount((prevCount) =>
      prevCount < petDetails.stockQuantity ? prevCount + 1 : prevCount
    );

  const decrement = () =>
    setCount((prevCount) =>
      prevCount > 0 ? prevCount - 1 : 0
    );

  const reviews = [
    {
      id: 1,
      userName: "Elisa Joe",
      date: "Nov 9, 2023",
      rating: 5,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor elit, sed do eiusmod tempor ut labore Lorem ipsum dolor sit eiusmod tempor ut labore Lorem",
      profileImage: "/image/reviewProfile.png",
    },
    {
      id: 2,
      userName: "John Doe",
      date: "Oct 15, 2023",
      rating: 4,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor elit, sed do eiusmod tempor ut labore Lorem ipsum dolor sit eiusmod tempor ut labore Lorem",
      profileImage: "/image/reviewProfile.png",
    },
    {
      id: 3,
      userName: "Hanna",
      date: "Oct 15, 2023",
      rating: 3,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor elit, sed do eiusmod tempor ut labore Lorem ipsum dolor sit eiusmod tempor ut labore Lorem",
      profileImage: "/image/reviewProfile.png",
    },
  ];


  const handleAddToWishlist = async () => {
    const formData = {
      userId: 2,
      productId: productId,
      initialQuantity: count,
    };

    console.log("Parameters being sent:", formData);

    try {
      const response = await fetch("http://localhost:8080/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Response:", data);
      alert("Product added to cart successfully!");
      router.push(`/pages/Cart/?count=${count}`);
    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to add product to cart: ${error.message}`);
    }
  };
  const handleOrder = (OneproductId, count) => {
    router.push(`/pages/Cart/PlaceOrder?productId=${OneproductId}&count=${count}`);
  }


  const gotologin = () => {
    router.push("/pages/Login");
  };
  return (
    <div className="petDetails">
      <div className="petDetailsContainer">
        <div className="petDetailsContent">
          <div className="detailsSection">
            <div className="detailsSectionContent">
              <div className="detailsImgSection">
                {images.map((img, index) => (
                  <div
                    key={img.id}
                    className="thumbnail"
                    onClick={() => handleImageClick(img.imageUrls)}
                  >
                    <img
                      src={img.imageUrls}
                      alt={`Thumbnail ${index + 1}`}
                      className="thumbnail-image"
                    />
                  </div>
                ))}
              </div>

              <div className="product-images">
                <div className="product-main-image">
                  <img src={mainImage} alt="Main Product" className="main-image" />
                </div>
              </div>
            </div>
            <div className="addCard">
              <div className="addCardContent">
                <div className="addPlusBtn">
                  <button onClick={decrement}>
                    <FaMinus />
                  </button>
                  <span>{count}</span>
                  <button onClick={increment}>
                    <FaPlus />
                  </button>
                </div>


                <button
                  className="addWishList"
                  onClick={handleAddToWishlist}
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add to Cart"}
                </button>

                {responseMessage && <p>{responseMessage}</p>}
              </div>
              <div className="ContactBtn">
                <button className="contactbutton" onClick={() => handleOrder(productId, count)}>Buy Now</button>
              </div>

            </div>
          </div>


          {petDetails.categoryId === 1 && (
            <div className="detailsSection1">
              <div className="detailsSectionHead">
                <div className="detailsHead">
                  <h2>{petDetails.breed}</h2>
                  <div className="rating">
                    <span>4.0</span>
                    {[...Array(4)].map((_, i) => (
                      <AiFillStar key={i} />
                    ))}
                    <span>20 Reviews</span>
                  </div>
                </div>
                <div className="detailsHead2">
                  <CiShare2 />
                </div>
              </div>

              <div className="detailsSectionContent">
                <h2>
                  ₹{(petDetails.productPrice - (petDetails.productPrice * petDetails.discount / 100)).toFixed(2)}
                </h2>

                <p>₹{petDetails.productPrice.toFixed(2)}</p>
              </div>

              <hr />
              <div className="petContent">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  eiusmod tempor incididunt ut labore dolore.
                </p>
              </div>
              <div className="petContent">
                <h2>Age: {petDetails.ageMonths} Month</h2>
                <h2>Color: {petDetails.color}</h2>
              </div>

              <div className="petFeature">
                <div className="petFeatureHead">
                  <h2>Care Instructions</h2>
                </div>
                <div className="petFeatureContent">
                  <p>{petDetails.careInstructions}</p>
                </div>
              </div>
              <div className="petFeature">
                <div className="petFeatureHead">
                  <h2>About Dog Baby</h2>
                </div>
                <div className="petFeatureContent">
                  <p>{petDetails.about}</p>
                </div>
              </div>
              <div className="petFeature">
                <div className="petFeatureHead">
                  <h2>Health Info</h2>
                </div>
                <div className="petFeatureContent">
                  <p>{petDetails.healthInfo}</p>
                </div>
              </div>
              <div className="petFeature">
                <div className="petFeatureHead">
                  <h2>Special Requirements</h2>
                </div>
                <div className="petFeatureContent">
                  <p>{petDetails.specialRequirements}</p>
                </div>
              </div>
            </div>
          )}

          {foodDetails.categoryId === 2 && (
            <div className="detailsSection1">
              <div className="detailsSectionHead">
                <div className="detailsHead">
                  <h2>{foodDetails.brand}</h2>
                  <div className="rating">
                    <span>4.0</span>
                    {[...Array(4)].map((_, i) => (
                      <AiFillStar key={i} />
                    ))}
                    <span>20 Reviews</span>
                  </div>
                </div>
                <div className="detailsHead2">
                  <CiShare2 />
                </div>
              </div>

              <div className="detailsSectionContent">
                <h2>₹{(foodDetails.productPrice - (foodDetails.productPrice * foodDetails.discount / 100)).toFixed(2)}</h2>
                <p>₹{foodDetails.productPrice.toFixed(2)}</p>
              </div>

              <hr />
              <div className="petContent">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  eiusmod tempor incididunt ut labore dolore.
                </p>
              </div>
              <div className="petContent">
                <h2>Weight: {foodDetails.weight} {foodDetails.weightUnit}</h2>
              </div>

              <div className="petFeature">
                <div className="petFeatureHead">
                  <h2>Ingredients</h2>
                </div>
                <div className="petFeatureContent">
                  <p>{foodDetails.ingredients}</p>
                </div>
              </div>
              <div className="petFeature">
                <div className="petFeatureHead">
                  <h2>Nutritional Info</h2>
                </div>
                <div className="petFeatureContent">
                  <p>{foodDetails.nutritionalInfo}</p>
                </div>
              </div>
              <div className="petFeature">
                <div className="petFeatureHead">
                  <h2>Storage Instructions</h2>
                </div>
                <div className="petFeatureContent">
                  <p>{foodDetails.storageInstructions}</p>
                </div>
              </div>
              <div className="petFeature">
                <div className="petFeatureHead">
                  <h2>Feeding Guidelines</h2>
                </div>
                <div className="petFeatureContent">
                  <p>{foodDetails.feedingGuidelines}</p>
                </div>
              </div>
            </div>
          )}

          {accessoriesDetails.categoryId === 3 && (
            <div className="detailsSection1">
              <div className="detailsSectionHead">
                <div className="detailsHead">
                  <h2>{accessoriesDetails.brand}</h2>
                  <div className="rating">
                    <span>4.0</span>
                    {[...Array(4)].map((_, i) => (
                      <AiFillStar key={i} />
                    ))}
                    <span>20 Reviews</span>
                  </div>
                </div>
                <div className="detailsHead2">
                  <CiShare2 />
                </div>
              </div>

              <div className="detailsSectionContent">
                <h2>₹{(accessoriesDetails.productPrice - (accessoriesDetails.productPrice * accessoriesDetails.discount / 100)).toFixed(2)}</h2>
                <p>₹{accessoriesDetails.productPrice.toFixed(2)}</p>
              </div>

              <hr />
              <div className="petContent">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  eiusmod tempor incididunt ut labore dolore.
                </p>
              </div>
              <div className="petContent">
                <h2>Size: {accessoriesDetails.size}</h2>
                <h2>Color: {accessoriesDetails.color}</h2>
              </div>

              <div className="petFeature">
                <div className="petFeatureHead">
                  <h2>Specifications</h2>
                </div>
                <div className="petFeatureContent">
                  <p>{accessoriesDetails.specifications}</p>
                </div>
              </div>
              <div className="petFeature">
                <div className="petFeatureHead">
                  <h2>Care Instructionsy</h2>
                </div>
                <div className="petFeatureContent">
                  <p>{accessoriesDetails.careInstructions}</p>
                </div>
              </div>
              <div className="petFeature">
                <div className="petFeatureHead">
                  <h2>Usage Instructions</h2>
                </div>
                <div className="petFeatureContent">
                  <p>{accessoriesDetails.usageInstructions}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="reviewContainer">
          <h3>Reviews</h3>
          {reviews.map((review, index) => (
            <div key={review.id}>
              <div className="reviewContent">
                <div className="reviewProfile">
                  <img src={review.profileImage} width={55} height={90} />
                </div>

                <div className="reviewDetails">
                  <div className="userName">
                    <h4>{review.userName}</h4>
                    <p>{review.date}</p>
                  </div>

                  <div className="reviewRating">
                    <div className="reviewStars">
                      {[...Array(review.rating)].map((_, starIndex) => (
                        <MdStarRate key={starIndex} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="reviewData">
                <p>{review.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="alsoLike">
          <div className="alsoLikeHead">
            <h2>You Might Also Like</h2>
          </div>
          <div className="alsoLikeContent">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
