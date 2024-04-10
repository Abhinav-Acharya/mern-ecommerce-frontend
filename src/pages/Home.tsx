import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ProductCard } from "../components";
import { SkeletonLoader } from "../components/Loader";
import { useLatestProductsQuery } from "../redux/api/productApi";
import { addToCart } from "../redux/reducers/cartReducer";
import { CartItem } from "../types/types";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");

  if (isError) toast.error("Cannot fetch products ...");

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of stock");

    dispatch(addToCart(cartItem));

    toast.success("Product added to cart");
  };

  return (
    <>
      <div className="home">
        <section></section>

        <h1>
          Latest Products
          <Link to={"/search"} className="findMore">
            More
          </Link>
        </h1>
        <main>
          {isLoading ? (
            <SkeletonLoader width="80vw" />
          ) : (
            data?.products.map((product) => (
              <ProductCard
                key={product._id}
                productId={product._id}
                name={product.name}
                price={product.price}
                stock={product.stock}
                handler={addToCartHandler}
                photo={product.photo}
              />
            ))
          )}
        </main>
      </div>
    </>
  );
};

export default Home;
