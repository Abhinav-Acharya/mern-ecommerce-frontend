import axios from "axios";
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CartItem as CartItemCard } from "../components";
import {
  addToCart,
  applyDiscount,
  calculatePrice,
  removeFromCart,
} from "../redux/reducers/cartReducer";
import { server } from "../redux/store";
import { CartItem, RootState } from "../types/types";

const Cart = () => {
  const { cartItems, subTotal, tax, shippingCharges, discount, total } =
    useSelector((state: RootState) => state.cartReducer);

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const dispatch = useDispatch();

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };

  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };

  const removeHandler = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();

    const timeOutId = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
          cancelToken,
        })
        .then((res) => {
          dispatch(applyDiscount(res.data.message));
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(applyDiscount(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    <>
      <div className="cart">
        <main>
          {cartItems.length > 0 ? (
            cartItems.map((item, id) => (
              <CartItemCard
                key={id}
                cartItem={item}
                decrementHandler={decrementHandler}
                incrementHandler={incrementHandler}
                removeHandler={removeHandler}
              />
            ))
          ) : (
            <>
              <h1>No Items Added</h1>
            </>
          )}
        </main>
        <aside>
          <p>Sub-Total: ₹{cartItems.length <= 0 ? 0 : subTotal}</p>
          <p>
            Shipping Charges: ₹{cartItems.length <= 0 ? 0 : shippingCharges}
          </p>
          <p>C.G.S.T: ₹{cartItems.length <= 0 ? 0 : tax / 2}</p>
          <p>S.G.S.T: ₹{cartItems.length <= 0 ? 0 : tax / 2}</p>
          <p>Total Tax: ₹{cartItems.length <= 0 ? 0 : tax}</p>
          <p>
            Discount:{" "}
            <em className="red"> - ₹{cartItems.length <= 0 ? 0 : discount}</em>
          </p>
          <p>
            <b>Total: ₹{total} </b>
          </p>
          <input
            type="text"
            placeholder="Enter a coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          ></input>
          {couponCode &&
            (isValidCouponCode ? (
              <>
                <span className="green">
                  Congrats! You got a ₹{discount} discount on using coupon code
                  "{couponCode.toUpperCase()}"
                </span>
              </>
            ) : (
              <>
                <span className="red">
                  Invalid coupon <VscError />
                </span>
              </>
            ))}

          {cartItems.length > 0 && (
            <>
              <Link to={"/shipping"}>Checkout</Link>
            </>
          )}
        </aside>
      </div>
    </>
  );
};

export default Cart;
