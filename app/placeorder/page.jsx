const handlePlaceOrder = () => {
  const oldOrders =
    JSON.parse(localStorage.getItem("orders")) || [];

  const newOrder = {
    items: cart,
    total: cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),
    date: new Date().toLocaleString(),
  };

  oldOrders.push(newOrder);

  localStorage.setItem("orders", JSON.stringify(oldOrders));
  localStorage.removeItem("cart");

  alert("Order Placed Successfully!");
};