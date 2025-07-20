import {  ShoppingCart } from 'lucide-react'
import { Link  } from 'react-router-dom'
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const {cart} = useCart();
  const prodcount = cart.reduce((sum, prod) => sum + prod.quantity, 0);

  return (
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
                <ShoppingCart/>
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
  )
}

export default Navbar
