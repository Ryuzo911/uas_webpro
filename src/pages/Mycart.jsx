import { useEffect, useState } from "react";

const MyCart = () => {
  const apiurl = "https://dummyjson.com/carts/1";
  const [cart, setCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);


  useEffect(() => {
    fetch(apiurl)
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
        calculateTotalPrice(data.products);
      });
  }, []);

  const calculateTotalPrice = (products) => {
    const total = products.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
    setTotalPrice(total);
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const response = await fetch(`https://dummyjson.com/carts/${cart.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          products: [
            {
              id: productId,
              quantity: newQuantity,
            },
          ],
        }),
      });

      if (response.ok) {
        const updatedCart = await response.json();
        setCart(updatedCart);
        calculateTotalPrice(updatedCart.products);
      } else {
        console.error('Failed to update cart');
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      const updatedProducts = cart.products.filter((product) => product.id !== productId);
      const response = await fetch(`https://dummyjson.com/carts/${cart.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: updatedProducts }),
      });

      if (response.ok) {
        const updatedCart = await response.json();
        setCart(updatedCart);
        calculateTotalPrice(updatedCart.products);
      } else {
        console.error('Failed to remove product');
      }
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  if (!cart) {
    return <p>Loading cart...</p>;
  }

  return (
    <div className="my-cart-container p-4">
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>
      
      {cart.products.map((product) => (
        <div key={product.id} className="flex items-center justify-between mb-4 p-4 border border-gray-300 rounded">
          <div className="flex items-center">
            <img src={product.thumbnail} alt={product.title} className="w-16 h-16 rounded mr-4" />
            <div>
              <h3 className="font-bold">{product.title}</h3>
              <p className="text-gray-600">{formatPrice(product.price)}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => handleUpdateQuantity(product.id, product.quantity - 1)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              -
            </button>
            <span>{product.quantity}</span>
            <button 
              onClick={() => handleUpdateQuantity(product.id, product.quantity + 1)}
              className="px-2 py-1 bg-blue-500 text-white rounded"
            >
              +
            </button>
          </div>

          <button 
            onClick={() => handleRemoveProduct(product.id)} 
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="mt-8 text-right">
        <h3 className="text-lg font-bold">Total: {formatPrice(totalPrice)}</h3>
        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default MyCart;
