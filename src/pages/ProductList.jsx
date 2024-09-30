import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const apiurl = "https://dummyjson.com/carts";
    const [carts, setCarts] = useState([]);
    const [cartCount, setCartCount] = useState(0);


    useEffect(() => {
        fetch(apiurl)
            .then((res) => res.json())
            .then((data) => setCarts(data.carts));
    }, []);


    const formatPrice = (price) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price);
    };


    const handleAddToCart = async (productId, quantity) => {
        try {
            const response = await fetch('https://dummyjson.com/carts/1', {  
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    products: [
                        {
                            id: productId,
                            quantity: quantity,  
                        },
                    ],
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add product to cart');
            }

            const updatedCart = await response.json();
            console.log('Cart updated:', updatedCart);

            setCartCount(cartCount + quantity);

        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
                {carts.map((cart) => (
                    cart.products.map((product) => (
                        <div key={product.id}>
                            <Link to={"/product/" + product.id}>
                                <div className="card bg-slate-800 p-2">
                                    <figure className="px-10 pt-10">
                                        <img src={product.thumbnail} alt={product.title} className="rounded-xl" />
                                    </figure>
                                    <div className="card-body gap-2">
                                        <div>
                                            <h2 className="card-title font-bold line-clamp-1 hover:text-red-500">
                                                {product.title}
                                            </h2>
                                            <div className="space-x-1">
                                                <small className="text-xs">
                                                    {formatPrice(product.price)}
                                                </small>
                                                <span className="badge badge-xs badge-success">
                                                   ( {product.discountPercentage}% off)
  )                                              </span>
                                            </div>
                                        </div>
                                        <small className="text-xs">
                                            {product.quantity} left
                                        </small>
                                    </div>
                                </div>
                            </Link>

                            <button
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={() => handleAddToCart(product.id, 1)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))
                ))}
            </div>

            <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded">
                <span>Items in Cart: {cartCount}</span>
            </div>
        </>
    );
};

export default ProductList;
