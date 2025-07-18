export interface cartItem{
    ProductId: number;
    quantity: number;
}
export interface Reviews {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}
export interface CartProducts {
  id: number;
  url: string;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  reviews: Reviews[];
}
export interface InCart extends CartProducts {
  quantity: number;
}

export interface CartContextType{
    cart:cartItem[];
    addToCart:(id:number)=>void;
    removeFromCart:(id:number)=>void;
    getProductQuantity:(id:number)=>number;
    cartProducts:InCart[];
}