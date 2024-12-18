"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Card = () => {
  const [orders, setOrders] = useState([]);
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const router = useRouter();
  const count = searchParams.get("count") || 1; // Set default count to 1 if undefined

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/cart/getAll?userId=${userId || 2}`
      );
      if (response.ok) {
        const data = await response.json();
        // const updatedData = data.map((order) => ({
        //   ...order,
        //   quantity: count, 
        // }));
        setOrders(data);
      
        console.log("cart", response.data);
      } else {
        console.error("Failed to fetch orders:", response.status);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleRemove = async (cartId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/cart/remove?userId=${userId || 2}&cartId=${cartId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== cartId)
        );
        alert("Item removed successfully.");
      } else {
        console.error("Failed to remove item:", response.status);
        alert("Failed to remove item. Please try again.");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Error occurred while removing the item.");
    }
  };

  const incrementQuantity = async (id) => {
    setOrders((prevOrders) => {
      return prevOrders.map((order) => {
        if (order.id === id) {
          const updatedCount = Number(order.quantity) + 1;
         
          if (updatedCount <= 5) {
            updateQuantity(id, updatedCount); 
            return { ...order, quantity: updatedCount }; 
          }
        }
        return order;
      });
    });
  };
  
  const decrementQuantity = async (id) => {
    setOrders((prevOrders) => {
      return prevOrders.map((order) => {
        if (order.id === id) {
          const updatedCount = Number(order.quantity) - 1;
          // Prevent decrementing if the quantity is already 1
          if (updatedCount >= 1) {
            updateQuantity(id, updatedCount); // Pass updatedCount as incrementBy
            return { ...order, quantity: updatedCount }; // Update local state with the new count
          }
        }
        return order;
      });
    });
  };
 
  const updateQuantity = async (cartId, updatedCount) => {

    try {
      const response = await fetch(
        `http://localhost:8080/cart/addQuantity/${cartId}?incrementBy=${updatedCount}`, 
        {
          method: "PATCH",
        }
      );
  
      if (response.ok) {
        const responseData = await response.json();
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === cartId
              ? { ...order, quantity: responseData.newQuantity } // Update the quantity after the patch request is successful
              : order
          )
        );
      } else {
        console.error("Failed to update quantity:", response.status);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  
   

  const totalAmount = orders.reduce(
    (total, order) => total + order.price * order.quantity,
    0
  );

  const handlePlaceOrder = (cartId, productId, quantity) => {
    router.push(`/pages/Cart/PlaceOrder?cartId=${cartId}&productId=${productId}&count=${quantity}`);
    fetchOrders();
  };

  return (
    <div className="cartpage">
      <div className="cartpage-container">
        <h2 className="cartpage-head">Your Cart</h2>
        {orders.length > 0 ? (
          <>
            <div className="cartpage-list">
              {orders.map((order) => (
                <div className="cartpage-card" key={order.id}>
                  <img
                    src="/image/tap-3.png"
                    alt={order.categoryName}
                    className="cartpage-image"
                  />
                  <div className="cartpage-info">
                    <h3 className="cartpage-title">{order.categoryName}</h3>
                    <p className="cartpage-description">{order.productName}</p>
                    <p className="cartpage-delivery">{order.shopName}</p>
                    <div className="cartpage-actions">
                      <div className="addPlusBtn">
                        <button onClick={() => decrementQuantity(order.id)}>
                          <FaMinus />
                        </button>
                        <span>Quantity: {order.quantity}</span>
                        <button onClick={() => incrementQuantity(order.id)}>
                          <FaPlus />
                        </button>
                      </div>
                      <button
                        className="btn btn-details"
                        onClick={() => handleRemove(order.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cartpageAmount">
                    {/* <div className="cartpage-price">
                      Unit Price: ${(order.price).toFixed(2)}
                    </div> */}
                    {/* <div className="cartpage-price">
                      Total Price: ${(order.price * order.quantity).toFixed(2)}
                    </div> */}
                    <div className="place-order-btn">
                      <button
                        className="update-btn"
                        onClick={() =>
                          handlePlaceOrder(order.id, order.productId, order.quantity)
                        }
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-total">
              <h3>Total: ${totalAmount.toFixed(2)}</h3>
            </div>
          </>
        ) : (
          <p>No items in your cart.</p>
        )}
      </div>
    </div>
  );
};

export default Card;
