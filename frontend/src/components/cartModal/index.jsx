import React from "react";
import { useCart } from "../../context/cartContext";
import styles from "./cart.module.css"; // CSS Module


const CartModal = ({ isVisible, onClose }) => {
    const { cart, removeFromCart } = useCart();

    if (!isVisible) return null;

    const calculateTotal = () => {
        const itemTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
        return itemTotal + 3.0 - 3.0; // Static discount and delivery fees
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                {/* Close Button */}
                <button className={styles.closeButton} onClick={onClose}>X</button>

                {/* Sharing Section */}
                <div className={styles.shareSection}>
                    <p>Share this cart with your friends</p>
                    <button className={styles.shareButton}>Copy Link</button>
                </div>

                {/* Header */}
                <div className={styles.header}>
                    <h2 className={styles.modalHeader}>
                        <span className={styles.basketIcon}><img src="/assets/Cart.png" /></span> My Basket
                    </h2>
                </div>

                {/* Cart Items */}
                <div className={styles.cartItems}>
                    {cart.map((item) => (
                        <div key={item._id} className={styles.cartItem}>
                            <div className={styles.itemDetails}>
                                <span>{item.quantity}x {item.itemName}</span>
                                <p className={styles.itemDescription}>{item.description || "No description"}</p>
                            </div>
                            <div className={styles.itemActions}>
                                <p className={styles.itemPrice}>₹{item.totalPrice.toFixed(2)}</p>
                                <button
                                    className={styles.removeButton}
                                    onClick={() => removeFromCart(item._id)}
                                >
                                    <img src="/assets/Remove.png" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className={styles.cartSummary}>
                    <p>
                        <span>Sub Total:</span>
                        <span>₹{cart.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}</span>
                    </p>
                    <p>
                        <span>Discounts:</span>
                        <span>-₹3.00</span>
                    </p>
                    <p>
                        <span>Delivery Fee:</span>
                        <span>₹3.00</span>
                    </p>
                    <p className={styles.totalPay}>
                        <span>Total to pay:</span>
                        <span>₹{calculateTotal().toFixed(2)}</span>
                    </p>
                </div>

                {/* Actions */}
                <div className={styles.actions}>
                    <button className={styles.chooseItemButton}>Choose your free item..<img src="/assets/Forward Button.png" /></button>
                    
                        
                        <button className={styles.applyButton}> Apply coupon <img src="/assets/forward.png" /></button>
                    
                </div>

                {/* Checkout Section */}
                <div className={styles.checkoutSection}>
                    <button className={styles.deliveryButton}>
                        <img src="/assets/Delivery Scooter.png" className={styles.icon} />
                        Delivery Starts at 17:50
                    </button>
                    <button className={styles.collectionButton}>
                        <img src="/assets/New Store.png" className={styles.icon} />
                        Collection Starts at 16:50
                    </button>
                </div>

                {/* Checkout */}
                <button className={styles.checkoutButton}>Checkout!</button>
            </div>
        </div>
    );
};

export default CartModal;
