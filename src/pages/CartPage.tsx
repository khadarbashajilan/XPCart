import React from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';

const CartPage = () => {
  const {cart, cartProducts, removeFromCart, addToCart, deleteFromCart, cartTotal, clearCart} = useCart();
  return (
    <section className="space-y-5 flex flex-col gap-2 px-4">
      <div className='border-b'>
      <h2 className="text-4xl font-bold ms-1 m-3 mt-2">Shopping Cart</h2>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center gap-y-4 justify-center h-96">
          <h2>Your cart is empty.</h2>
          <Link
            to="/"
            className="flex items-center justify-center gap-x-4  px-4 py-2 rounded-sm text-lg"
          >
            <button className='p-2 border rounded-sm '>
            Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-8">
            {cartProducts.map((cartProduct) => (
              <div
                key={cartProduct.id}
                className="flex gap-4 justify-between border-b  pb-2"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link to={`/${cartProduct.url}`}>
                    <figure className="size-24 md:size-40">
                      <img
                        src={cartProduct.image}
                        alt={cartProduct.name}
                        className="rounded-sm size-full object-cover"
                      />
                    </figure>
                  </Link>

                  <div>
                    <p className="font-bold ">
                      {cartProduct.name}
                    </p>
                    <p>${cartProduct.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-x-4">
                  <div className="flex justify-between flex-col-reverse items-center gap-4 border  rounded-sm p-2 lg:w-fit lg:gap-x-8 sm:flex-row">
                    <button
                      className="border  rounded-sm px-2 py-1 cursor-pointer disabled:bg-gray-700 disabled:border-transparent"
                      onClick={() => removeFromCart(cartProduct.id)}
                    >
                      <Minus className="size-5 text-white" />
                    </button>

                    <span>{cartProduct.quantity}</span>

                    <button
                      className="border   rounded-sm px-2 py-1 cursor-pointer"
                      onClick={() => addToCart(cartProduct.id)}
                    >
                      <Plus className="size-5 text-white" />
                    </button>
                  </div>

                  <button className='bg-transparent ' onClick={() => deleteFromCart(cartProduct.id)}>
                    <Trash2 className="size-5 " />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className='flex flex-col w:full justify-between m-5 mt-0'>
            <p className="text-2xl self-center">
              Total:{" "}
              <span className="text-white font-bold">
                ${cartTotal.toFixed(2)}
              </span>
            </p>
            <button className="mt-4 px-4 py-2  text-white rounded-sm" onClick={() => clearCart()}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </section>
  )
}

export default CartPage
