import React from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom';

const CartPage = () => {
  const {cart, cartProducts} = useCart();
  console.log(cartProducts)
  return (
    <section>
      <h2>Shopping Cart</h2>
      {cart.length == 0?
      (<div>
        <h2>Your Cart is Empty</h2>
        <Link to="/">Continue Shopping</Link>
      </div>):
      (
        <div>

        </div>
      )}
    </section>
  )
}

export default CartPage
