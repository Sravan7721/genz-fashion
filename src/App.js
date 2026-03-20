import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const products = [
    { id: 1, name: "Oversized Hoodie", category: "boys", price: 999, image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b" },
    { id: 2, name: "Baggy Jeans", category: "boys", price: 1299, image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
    { id: 3, name: "Crop Top", category: "girls", price: 699, image: "https://images.unsplash.com/photo-1520975916090-3105956dac38" },
    { id: 4, name: "Skirt", category: "girls", price: 899, image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d" },
    { id: 5, name: "Sunglasses", category: "accessories", price: 499, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083" },
    { id: 6, name: "Cap", category: "accessories", price: 399, image: "https://images.unsplash.com/photo-1521369909029-2afed882baee" }
  ];

  const showProducts = (category) => products.filter((p) => p.category === category);

  return (
    <div>
      {/* Navbar */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "15px 30px", background: "#111", color: "white" }}>
        <h2>🔥 GenZ Fashion</h2>
        <div style={{ display: "flex", gap: "20px", cursor: "pointer" }}>
          <span onClick={() => setPage("home")}>Home</span>
          <span onClick={() => setPage("wishlist")}>❤️ Wishlist</span>
          <span onClick={() => setPage("orders")}>🛒 Orders</span>
          <span onClick={() => setPage("checkout")}>💳 Checkout</span>
        </div>
      </div>

      {/* HOME */}
      {page === "home" && (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <h1>Upgrade Your Style 😎</h1>
          <p>Select Category</p>

          <div style={{ display: "flex", justifyContent: "center", gap: "30px", marginTop: "30px" }}>
            <div onClick={() => setPage("boys")} style={{ cursor: "pointer" }}>
              <img src="https://images.unsplash.com/photo-1516822003754-cca485356ecb" width="250" />
              <h3>GenZ Boys</h3>
            </div>
            <div onClick={() => setPage("girls")} style={{ cursor: "pointer" }}>
              <img src="https://images.unsplash.com/photo-1521334884684-d80222895322" width="250" />
              <h3>GenZ Girls</h3>
            </div>
            <div onClick={() => setPage("accessories")} style={{ cursor: "pointer" }}>
              <img src="https://images.unsplash.com/photo-1511499767150-a48a237f0083" width="250" />
              <h3>Accessories</h3>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY */}
      {(page === "boys" || page === "girls" || page === "accessories") && (
        <div style={{ padding: "20px" }}>
          <button onClick={() => setPage("home")}>⬅ Back</button>
          <h2>{page}</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))", gap: "20px" }}>
            {showProducts(page).map((product) => (
              <div key={product.id} style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.1)", padding: "10px" }}>
                <img
                  src={product.image}
                  style={{ width: "100%", height: "200px", objectFit: "cover", cursor: "pointer" }}
                  onClick={() => {
                    setSelectedProduct(product);
                    setPage("details");
                  }}
                />
                <h4>{product.name}</h4>
                <p>₹{product.price}</p>
                <button onClick={() => setWishlist([...wishlist, product])}>❤️</button>
                <button onClick={() => setOrders([...orders, { ...product, qty: 1 }])}>🛒</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCT DETAILS */}
      {page === "details" && selectedProduct && (
        <div style={{ padding: "40px" }}>
          <button onClick={() => setPage("home")}>⬅ Back</button>
          <div style={{ display: "flex", gap: "40px" }}>
            <img src={selectedProduct.image} width="300" />
            <div>
              <h2>{selectedProduct.name}</h2>
              <p>₹{selectedProduct.price}</p>

              <div>
                <button onClick={() => setQuantity(quantity - 1)}>-</button>
                <span style={{ margin: "10px" }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <br />
              <button onClick={() => setOrders([...orders, { ...selectedProduct, qty: quantity }])}>Add to Cart</button>
            </div>
          </div>
        </div>
      )}

      {/* WISHLIST */}
      {page === "wishlist" && (
        <div style={{ padding: "20px" }}>
          <h2>Wishlist</h2>
          {wishlist.map((item, i) => (
            <div key={i}>
              <img src={item.image} width="100" />
              <p>{item.name}</p>
              <button onClick={() => setWishlist(wishlist.filter((_, index) => index !== i))}>🗑 Remove</button>
            </div>
          ))}
        </div>
      )}

      {/* ORDERS */}
      {page === "orders" && (
        <div style={{ padding: "20px" }}>
          <h2>Orders</h2>
          {orders.map((item, i) => (
            <div key={i}>
              <img src={item.image} width="100" />
              <p>{item.name} (Qty: {item.qty || 1})</p>
            </div>
          ))}
        </div>
      )}

      {/* CHECKOUT */}
      {page === "checkout" && (
        <div style={{ padding: "40px" }}>
          <h2>💳 Checkout</h2>
          {orders.map((item, i) => (
            <p key={i}>{item.name} - ₹{item.price} x {item.qty || 1}</p>
          ))}
          <h3>
            Total: ₹{orders.reduce((total, item) => total + item.price * (item.qty || 1), 0)}
          </h3>
          <button>Place Order</button>
        </div>
      )}
    </div>
  );
}