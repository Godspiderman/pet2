"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const PlaceOrder = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    countryId: "",
    stateId: "",
    createDate: "",
    updateDate: "",
    defaultAddress: true, // Set defaultAddress to true
  });
  const searchParams = useSearchParams();
  const cartId = searchParams.get("cartId");
  const productId = searchParams.get("productId");
  // const OneproductId = searchParams.get("OneproductId");
  const count = searchParams.get("count");
  useEffect(() => {
    console.log("Cart ID:", cartId);
    console.log("Product ID:", productId);
    console.log("count:", count);
  }, [cartId, productId, count]);
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const [isFormVisible, setIsFormVisible] = useState(false);
  useEffect(() => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 10);

    setFormData((prev) => ({
      ...prev,
      createDate: currentDate.toISOString(),
      updateDate: futureDate.toISOString(),
    }));
  }, []);
  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/public/country/getAll"
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Fetch states based on selected country
  useEffect(() => {
    if (formData.countryId) {
      const fetchStates = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/public/state/getAll"
          );
          const filteredStates = response.data.filter(
            (state) => state.countryId === parseInt(formData.countryId)
          );
          setStates(filteredStates);
        } catch (error) {
          console.error("Error fetching states:", error);
        }
      };

      fetchStates();
    } else {
      setStates([]); // Reset states when no country is selected
    }
  }, [formData.countryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on input change
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.phoneNumber || formData.phoneNumber.length !== 10)
      newErrors.phoneNumber = "Phone number must be 10 digits";
    if (!formData.addressLine1)
      newErrors.addressLine1 = "Address Line 1 is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.postalCode) newErrors.postalCode = "Postal Code is required";
    if (!formData.countryId) newErrors.countryId = "Country is required";
    if (!formData.stateId) newErrors.stateId = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/public/shippingAddress/add",
        formData
      );
      alert("Address Added successfully!");
      console.log(response.data);

      // Reset the form fields after successful submission
      const currentDate = new Date();
      const futureDate = new Date(currentDate);
      futureDate.setDate(currentDate.getDate() + 10);

      setFormData({
        fullName: "",
        phoneNumber: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        postalCode: "",
        countryId: "",
        stateId: "",
        createDate: currentDate.toISOString(),
        updateDate: futureDate.toISOString(),
        defaultAddress: true,
      });
      setErrors({});
      fetchAddresses();
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error placing the order:", error);
      alert("Failed to place the order.");
    }
  };

  const handleCancel = () => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 10);

    setFormData({
      fullName: "",
      phoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      postalCode: "",
      countryId: "",
      stateId: "",
      createDate: currentDate.toISOString(),
      updateDate: futureDate.toISOString(),
      defaultAddress: true,
    });
    setErrors({});
    setIsFormVisible(false);
  };
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(1);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/public/shippingAddress/getAll"
      );
      setAddresses(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);
  const [address, setAddress] = useState(null); // To store the address data
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchSelectAddresses = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/public/shippingAddress/getOne/${id}`
      );
      setAddress(response.data); // Set the fetched address
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch address"); // Set error state
    } finally {
      setLoading(false); // Set loading to false when fetch completes
    }
  };

  useEffect(() => {
    if (selectedAddressId) {
      fetchSelectAddresses(selectedAddressId); // Fetch address when ID is available
    }
  }, [selectedAddressId]);
  const handleCheckboxChange = (id) => {
    if (selectedAddressId === id) {
      setSelectedAddressId(null);
    } else {
      setSelectedAddressId(id);
    }
    console.log(`Selected Address ID: ${id}`);
  };
  const handleAddressChange = (id) => {
    setSelectedAddressId(id);
    console.log(`Selected Address ID: ${id}`);
  };
  
  const handleAddNewAddress = () => {
    setIsFormVisible(true);
  };

  const [order, setOrder] = useState(null);
  const [orderProduct, setOrderProduct] = useState([]);
  const [tax, setTax] = useState(0);
  const [shippingCharge] = useState(40);
  const [totalAmount, setTotalAmount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [singleOrder, setSingleOrder] = useState(null);
  const fetchCartById = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/cart/getOne/${id}`);

      if (response.ok) {
        const data = await response.json();
        setOrder(data);
        console.log("Cart details:", data);
        cartId;
        const orderPrice = data.price;
        console.log("Cart price:", orderPrice);
      } else {
        console.error("Failed to fetch the cart:", response.status);
      }
    } catch (err) {
      console.error("Error fetching the cart:", err);
    }
  };

  // Fetch cart data when `cartId` is available
  useEffect(() => {
    if (cartId) {
      fetchCartById(cartId);
    }
  }, [cartId]);

  const fetchProductById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/public/resource/pet/getOne/${id}`
      );

      if (response.ok) {
        const data = await response.json();
        setSingleOrder(data);
        console.log("Product details:", data);

        // Log the productPrice
        if (data.productPrice !== undefined) {
          console.log("Product Price:", data.productPrice);
          const orderPrice = data.productPrice;
          console.log("Cart price:", orderPrice);
        } else {
          console.error("Product Price is not available in the response.");
        }
      } else {
        console.error("Failed to fetch the product:", response.status);
      }
    } catch (err) {
      console.error("Error fetching the product:", err);
    }
  };

  // UseEffect to call the function with a hardcoded ID (e.g., 5)
  useEffect(() => {
    fetchProductById(productId);
  }, []);

  useEffect(() => {
    if (order && count) {
      const calculatedTax = parseFloat((order.price * 0.05).toFixed(2));
      setTax(calculatedTax);

      const calculatedTotalAmount = parseFloat(
        (order.price * count + calculatedTax + shippingCharge).toFixed(2)
      );
      setTotalAmount(calculatedTotalAmount);

      const calculatedSubtotal = parseFloat(
        (calculatedTotalAmount - shippingCharge).toFixed(2)
      );
      setSubtotal(calculatedSubtotal);
    }
  }, [order, count, shippingCharge]);

  useEffect(() => {
    if (singleOrder && count) {
      const calculatedTax = parseFloat(
        (singleOrder.productPrice * 0.05).toFixed(2)
      );
      setTax(calculatedTax);

      const calculatedTotalAmount = parseFloat(
        (
          singleOrder.productPrice * count +
          calculatedTax +
          shippingCharge
        ).toFixed(2)
      );
      setTotalAmount(calculatedTotalAmount);

      const calculatedSubtotal = parseFloat(
        (calculatedTotalAmount - shippingCharge).toFixed(2)
      );
      setSubtotal(calculatedSubtotal);
    }
  }, [singleOrder, count, shippingCharge]);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      alert("Please select a shipping address.");
      return;
    }

    try {
      const currentDate = new Date().toISOString().split("T")[0];

      const unitPrice = order?.price || singleOrder?.productPrice;

      if (!unitPrice) {
        alert("Unit price is not available.");
        return;
      }

      const orderData = {
        userId: 2,
        unitPrice: unitPrice,
        quantity: count,
        tax: tax,
        shippingCharge: shippingCharge,
        subtotal: subtotal,
        totalAmount: totalAmount,
        orderDate: currentDate,
        deliveryDate: currentDate,
        productId: productId,
        orderStatusId: 1,
        returned: true,
        cancelled: true,
        shippingAddressId: selectedAddressId,
      };

      console.log(orderData, "orderData");

      const response = await fetch("http://localhost:8080/api/orders/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([orderData]),
      });

      if (response.ok) {
        const responseData = await response.json();
        setOrderProduct([]);
        alert("Order placed successfully!");
        console.log("Order Response:", responseData);
      } else {
        console.error("Failed to place order:", response.status);
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error occurred while placing the order.");
    }
  };

  return (
    <div className="placeOrder">
      <div className="placeOrderContainer">
        <div className="placeOrderHead">
          <h2>Place Order</h2>
        </div>
        {!isFormVisible && (
          <>
            <div className="placeOrderContentMain">
              <div className="placeOrderContentHead">
                <h2>Shipping Address</h2>
                <button onClick={handleAddNewAddress}>Add New Address</button>
                {/* <h2>Place Order</h2>
                <p>Cart ID: {cartId}</p>
                <p>Product ID: {productId}</p> */}
              </div>

              <div className="placeOrderContent">
  <label htmlFor="addressSelect">
    <strong>Select Address:</strong>
  </label>
  <select
    id="addressSelect"
    className="addressDropdown"
    value={selectedAddressId || ""}
    onChange={(e) => handleAddressChange(e.target.value)}
  >
    <option value="" disabled>
      Select an Address
    </option>
    {addresses.map((address) => (
      <option key={address.id} value={address.id}>
        {address.fullName} - {address.city}, {address.postalCode}
      </option>
    ))}
  </select>
  <div>
  {loading ? (
  <p>Loading...</p>
) : (
  address && (
    <div className="cardAddress">
      <p className="addressDetails">
        <strong> Name:</strong> {address.fullName}
      </p>
      <p className="addressDetails">
        <strong>Phone Number:</strong> {address.phoneNumber}
      </p>
      <p className="addressDetails">
        <strong>Address Line 1:</strong> {address.addressLine1}
      </p>
      <p className="addressDetails">
        <strong>Address Line 2:</strong> {address.addressLine2}
      </p>
      <p className="addressDetails">
        <strong>City:</strong> {address.city}
      </p>
      <p className="addressDetails">
        <strong>Postal Code:</strong> {address.postalCode}
      </p>
    </div>
  )
)}

    </div>
</div>

            </div>
          </>
        )}
        {isFormVisible && (
          <form className="placeOrderForm" onSubmit={handleSubmit}>
            <div className={`formGroup ${errors.fullName ? "errorGroup" : ""}`}>
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                className={`inputField ${errors.fullName ? "inputError" : ""}`}
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div
              className={`formGroup ${errors.phoneNumber ? "errorGroup" : ""}`}
            >
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                className={`inputField ${
                  errors.phoneNumber ? "inputError" : ""
                }`}
                maxLength={10}
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div
              className={`formGroup ${errors.addressLine1 ? "errorGroup" : ""}`}
            >
              <label>Address Line 1</label>
              <input
                type="text"
                name="addressLine1"
                className={`inputField ${
                  errors.addressLine1 ? "inputError" : ""
                }`}
                value={formData.addressLine1}
                onChange={handleChange}
              />
            </div>

            <div className="formGroup">
              <label>Address Line 2</label>
              <input
                type="text"
                name="addressLine2"
                className={`inputField ${
                  errors.addressLine1 ? "inputError" : ""
                }`}
                value={formData.addressLine2}
                onChange={handleChange}
              />
            </div>

            <div className={`formGroup ${errors.city ? "errorGroup" : ""}`}>
              <label>City</label>
              <input
                type="text"
                name="city"
                className={`inputField ${errors.city ? "inputError" : ""}`}
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div
              className={`formGroup ${errors.postalCode ? "errorGroup" : ""}`}
            >
              <label>Postal Code</label>
              <input
                type="text"
                name="postalCode"
                className={`inputField ${
                  errors.postalCode ? "inputError" : ""
                }`}
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>

            <div
              className={`formGroup ${errors.countryId ? "errorGroup" : ""}`}
            >
              <label>Country</label>
              <select
                name="countryId"
                className={`selectField ${
                  errors.countryId ? "inputError" : ""
                }`}
                value={formData.countryId}
                onChange={handleChange}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.countryName}
                  </option>
                ))}
              </select>
            </div>

            <div className={`formGroup ${errors.stateId ? "errorGroup" : ""}`}>
              <label>State</label>
              <select
                name="stateId"
                className={`selectField ${errors.stateId ? "inputError" : ""}`}
                value={formData.stateId}
                onChange={handleChange}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.stateName}
                  </option>
                ))}
              </select>
            </div>

            <div className="formActions">
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit">Add Addresss</button>
            </div>
          </form>
        )}
      </div>

      <div className="OrderContainer">
        <div className="orderContainerHead">
          <h2>Place Your Order</h2>
          {/* <div className="orderContainerContent">
            {order ? (
              <div className="orderhistory-list">
                {[
                  { label: "Item Name:", value: order.productName },
                  { label: "Quantity:", value: count },
                  {
                    label: "Price:",
                    value: `$${Number(order.price).toFixed(2)}`,
                  },

                  { label: "Tax:", value: `$${Number(tax).toFixed(2)}` },
                  {
                    label: "Shipping Charge:",
                    value: `$${Number(shippingCharge).toFixed(2)}`,
                  },
                  {
                    label: "Total Amount:",
                    value: `$${Number(totalAmount).toFixed(2)}`,
                  },
                  {
                    label: "Subtotal:",
                    value: `$${Number(subtotal).toFixed(2)}`,
                  },
                ].map((item, index) => (
                  <div key={index} className="orderhistory-card">
                    <div className="orderhistory-info">
                      <p className="order-description">
                        <strong>{item.label}</strong> <span>{item.value}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No order details available.</p>
            )}

            <div className="place-order-btn">
              <button className="update-btn" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </div> */}

          <div className="orderContainerContent">
            {singleOrder ? (
              <div className="orderhistory-list">
                {[
                  { label: "Item Name:", value: singleOrder.productName },
                  { label: "Quantity:", value: count },
                  {
                    label: "Price:",
                    value: `$${Number(singleOrder.productPrice).toFixed(2)}`,
                  },

                  { label: "Tax:", value: `$${Number(tax).toFixed(2)}` },
                  {
                    label: "Shipping Charge:",
                    value: `$${Number(shippingCharge).toFixed(2)}`,
                  },
                  {
                    label: "Total Amount:",
                    value: `$${Number(totalAmount).toFixed(2)}`,
                  },
                  {
                    label: "Subtotal:",
                    value: `$${Number(subtotal).toFixed(2)}`,
                  },
                ].map((item, index) => (
                  <div key={index} className="orderhistory-card">
                    <div className="orderhistory-info">
                      <p className="order-description">
                        <strong>{item.label}</strong> <span>{item.value}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No order details available.</p>
            )}

            <div className="place-order-btn">
              <button className="update-btn" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
