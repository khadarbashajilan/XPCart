import { products } from "../data/products";
import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
// import { CartContext, useCart } from "../context/CartContext";


const HomePage = () => {
  
  const {cart}=useCart();
  const {addToCart}=useCart();
  
  const prodcount = cart.reduce((sum, prod) => sum + prod.quantity, 0);

  return (
    <>
      <header className="p-6 sticky top-0 z-50 backdrop-blur-md">
        <nav>
          <ul className="flex justify-between items-center">
            <li>
              <Link to="/" className="text-2xl">
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart" className="flex gap-x-2">
                <ShoppingCart />
                {prodcount > 0 && (
                  <span className="text-white bg-[#2642c0] text-lg rounded-full w-8 h-8 flex items-center justify-center">
                    {prodcount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <section className="flex flex-col gap-8">
        <h1 className="text-4xl font-bold">Gaming Products</h1>

        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-3">
          {products.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-y-6  pl-4">
              <Link to={`/${item.url}`}>
                <figure className="h-96">
                  <img
                    src={item.image}
                    alt={item.url}
                    className="h-full w-full object-cover"
                  />
                </figure>
              </Link>

              <div className="space-y-2">
                <h3 className="text-xl text-[#3850ba]">{item.name}</h3>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`size-5 ${
                        i < item.rating ? "text-yellow-400" : "text-white"
                      }`}
                    />
                  ))}
                </div>

                <p className="font-bold">{item.price}</p>
              </div>

              <button
                onClick={() => addToCart(item.id)}
                className="flex items-center justify-center gap-x-4 px-4 py-2 rounded-sm text-lg"
              >
                <ShoppingCart className="size-4" /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
