import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const [showCart, setShowCart] = useState(false);

    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    const plantsArray = [
        {
            category: "Air Purifying",
            plants: [
                { name: "Snake Plant", image: "snake.jpg", cost: "$15" },
                { name: "Spider Plant", image: "spider.jpg", cost: "$12" },
                { name: "Peace Lily", image: "peace.jpg", cost: "$18" },
                { name: "Boston Fern", image: "fern.jpg", cost: "$14" },
                { name: "Rubber Plant", image: "rubber.jpg", cost: "$20" },
                { name: "Aloe Vera", image: "aloe.jpg", cost: "$10" }
            ]
        },
        {
            category: "Aromatic",
            plants: [
                { name: "Lavender", image: "lavender.jpg", cost: "$15" },
                { name: "Jasmine", image: "jasmine.jpg", cost: "$18" },
                { name: "Rosemary", image: "rosemary.jpg", cost: "$12" },
                { name: "Mint", image: "mint.jpg", cost: "$10" },
                { name: "Lemon Balm", image: "lemon.jpg", cost: "$14" },
                { name: "Basil", image: "basil.jpg", cost: "$8" }
            ]
        },
        {
            category: "Succulents",
            plants: [
                { name: "Jade Plant", image: "jade.jpg", cost: "$12" },
                { name: "Echeveria", image: "echeveria.jpg", cost: "$10" },
                { name: "Zebra Plant", image: "zebra.jpg", cost: "$14" },
                { name: "Burro's Tail", image: "burro.jpg", cost: "$15" },
                { name: "String of Pearls", image: "pearls.jpg", cost: "$18" },
                { name: "Panda Plant", image: "panda.jpg", cost: "$12" }
            ]
        }
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    return (
        <div>
            <nav className="navbar">
                <a href="/">Home</a>
                <a href="#" onClick={() => setShowCart(false)}>Plants</a>
                <a href="#" onClick={() => setShowCart(true)}>Cart ({totalQuantity})</a>
            </nav>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h2>{category.category}</h2>
                            <div className="plants">
                                {category.plants.map((plant, i) => (
                                    <div key={i} className="plant-card">
                                        <img src={plant.image} alt={plant.name} />
                                        <h3>{plant.name}</h3>
                                        <p>{plant.cost}</p>
                                        <button 
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={cartItems.some(item => item.name === plant.name)}
                                        >
                                            {cartItems.some(item => item.name === plant.name) ? "Added" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={() => setShowCart(false)} />
            )}
        </div>
    );
}
export default ProductList;
