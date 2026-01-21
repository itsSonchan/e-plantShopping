import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  /**
   * Calculates the total currency amount for all items in the shopping cart.
   * Converts the cost string to a float and multiplies by quantity.
   */
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      const price = parseFloat(item.cost.replace('$', ''));
      total += item.quantity * price;
    });
    return total;
  };

  /**
   * Handles the 'Continue Shopping' action by calling the parent-provided 
   * function to navigate back to the product list.
   */
  const handleContinueShopping = (e) => {
    if (e) e.preventDefault();
    onContinueShopping(e); 
  };

  /**
   * Handles the Checkout button click by showing a 'Coming Soon' alert.
   */
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  /**
   * Increments the quantity of a specific item in the cart.
   */
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  /**
   * Decrements the quantity of a specific item. 
   * If quantity is 1, it removes the item entirely to ensure cart management integrity.
   */
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Critical: Ensures item is removed from state when quantity reaches zero
      dispatch(removeItem(item.name));
    }
  };

  /**
   * Removes an item from the cart regardless of its quantity.
   */
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  /**
   * Calculates the total cost for a specific item (unit price * quantity).
   */
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.replace('$', ''));
    return item.quantity * price;
  };

  return (
    <div className="cart-container">
      {/* Requirement: Displaying the total cart amount */}
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button 
                   className="cart-item-button cart-item-button-dec" 
                   onClick={() => handleDecrement(item)}
                >-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button 
                   className="cart-item-button cart-item-button-inc" 
                   onClick={() => handleIncrement(item)}
                >+</button>
              </div>
              {/* Requirement: Displaying total cost for each item */}
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;