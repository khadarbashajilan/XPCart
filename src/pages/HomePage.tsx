import { products } from "../data/products";
import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "../context/CartContext";

const HomePage = () => {
  
  const {addToCart}=useCart();  

  return (
    <>
      <section className="flex flex-col gap-5">
        <h1 className="text-3xl md:text-4xl px-5 mt-8 font-bold">Gaming Products</h1>
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-3 m-2 p-4">
          {products.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-y-6  ">
              <Link to={`/${item.url}`}>
                <figure className="h-75">
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

                <p className="font-bold">${item.price}</p>
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
