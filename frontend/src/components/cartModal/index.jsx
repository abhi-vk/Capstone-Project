import React from "react";
import { useCart } from "../../context/cartContext";
import styles from "./cart.module.css"; // CSS Module
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CartModal = ({ isVisible, onClose }) => {
    const { cart, removeFromCart } = useCart();
    const navigate = useNavigate(); // Initialize useNavigate hook

    if (!isVisible) return null;

    const calculateTotal = () => {
        const itemTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
        return itemTotal + 3.0 - 3.0; // Static discount and delivery fees
    };

    const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const isCheckoutEnabled = totalAmount >= 200;

    const handleCheckout = () => {
        if (isCheckoutEnabled) {
            // Navigate to the checkout page
            navigate("/checkout");
        }
    };
        // Generate and copy the cart link
        const handleCopyLink = () => {
            if (cart.length === 0) {
                alert("Cart is empty! Add items to share the cart.");
                return;
            }
            const encodedCart = encodeURIComponent(JSON.stringify(cart));
            const shareableLink = `${window.location.origin}/checkout?cart=${encodedCart}`;
            navigator.clipboard.writeText(shareableLink)
                .then(() => alert("Link copied to clipboard!"))
                .catch((error) => console.error("Failed to copy link:", error));
        };
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                {/* Close Button */}
                <button className={styles.closeButton} onClick={onClose}>X</button>

                {/* Sharing Section */}
                <div className={styles.shareSection}>
                    <div className={styles.shareContainer}>
                        <span className={styles.shareIcon}>
                            <img src="/assets/share-2.png" alt="Share Icon" />
                        </span>
                        <p className={styles.shareText}>Share this cart with your friends</p>
                        <button className={styles.copyLinkButton} onClick={handleCopyLink}>Copy Link</button>
                    </div>
                </div>

                {/* Divider */}
                <hr className={styles.divider} />

                {/* Header */}
                <div className={styles.header}>
                    <h2 className={styles.modalHeader}>
                        <span className={styles.basketIcon}>
                            <img src="/assets/Cart.png" alt="Cart Icon" />
                        </span> My Basket
                    </h2>
                </div>

                {/* Cart Items */}
                <div className={styles.cartItems}>
                    {cart.map((item) => (
                        <div key={item._id} className={styles.cartItem}>
                            <div className={styles.itemDetails}>
                                <span className={styles.itemQuantity}>{item.quantity}x</span>
                            </div>
                            <div>
                                <span>{item.itemName}</span>
                                <p className={styles.itemDescription}>{item.description || "No description"}</p>
                            </div>
                            <div className={styles.itemActions}>
                                <p className={styles.itemPrice}>₹{item.totalPrice.toFixed(2)}</p>
                                <button
                                    className={styles.removeButton}
                                    onClick={() => removeFromCart(item._id)}
                                >
                                    <img src="/assets/Remove.png" alt="Remove" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <hr className={styles.divider} />

                {/* Summary */}
                <div className={styles.cartSummary}>
                    <p>
                        <span>Sub Total:</span>
                        <span>₹{totalAmount.toFixed(2)}</span>
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
                    <button className={styles.chooseItemButton}>
                        Choose your free item..
                        <img src="/assets/downward.png" alt="Arrow" />
                    </button>
                    <button className={styles.applyButton}>
                        Apply coupon
                        <img src="/assets/forward.png" alt="Arrow" />
                    </button>
                </div>

                {/* Divider */}
                <hr className={styles.divider} />

                {/* Checkout Section */}
                <div className={styles.checkoutSection}>
                    <button className={styles.deliveryButton}>
                        <img src="/assets/Delivery Scooter.png" className={styles.icon} alt="Delivery" />
                        Delivery Starts at 17:50
                    </button>
                    <button className={styles.collectionButton}>
                        <img src="/assets/New Store.png" className={styles.icon} alt="Collection" />
                        Collection Starts at 16:50
                    </button>
                </div>

                {/* Checkout Button */}
                <button
                    className={isCheckoutEnabled ? styles.checkoutButtonEnabled : styles.checkoutButtonDisabled}
                    disabled={!isCheckoutEnabled}
                    title={
                        !isCheckoutEnabled
                            ? `Minimum delivery is ₹200. You must spend ₹${(200 - totalAmount).toFixed(2)} more for checkout!`
                            : ""
                    }
                    onClick={handleCheckout} // Call handleCheckout to navigate
                >
                <img src="assets/checkoutlogo.png"/>  Checkout!
                </button>

            </div>
        </div>
    );
};

export default CartModal;
