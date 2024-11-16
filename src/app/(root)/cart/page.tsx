import CheckoutCartComponent from "./components/checkout-cart-component";
import ProductCartComponent from "./components/cart-component";

export default function CartPage() {
  return (
    <div className='max-w-screen-xl mx-auto flex justify-center items-start gap-4 p-6'>
      <div className='w-full'>
        {/* Card Cart */}
        <ProductCartComponent />
      </div>
      {/* Card Checkout */}
      <CheckoutCartComponent />
    </div>
  );
}
