import { useState } from "react";
import toast from "react-hot-toast";
import { ProductCard } from "../components";
import { SkeletonLoader } from "../components/Loader";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productApi";
import { CustomError } from "../types/api-types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducers/cartReducer";
import { CartItem } from "../types/types";

const Search = () => {
  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError: isCategoriesError,
    error: categoriesError,
  } = useCategoriesQuery("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const {
    isLoading: productLoading,
    data: searchedData,
    isError: isProductsError,
    error: productsError,
  } = useSearchProductsQuery({
    category,
    page,
    price: maxPrice,
    search,
    sort,
  });

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of stock");

    dispatch(addToCart(cartItem));

    toast.success("Product added to cart");
  };

  if (isCategoriesError)
    toast.error((categoriesError as CustomError).data.message);
  if (isProductsError) toast.error((productsError as CustomError).data.message);

  return (
    <>
      <div className="search-page">
        <aside>
          <h2>Filters</h2>
          <div>
            <h4>Sort</h4>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">None</option>
              <option value="dsc">Price (high to low)</option>
              <option value="asc">Price (low to high)</option>
            </select>
          </div>
          <div>
            <h4>Max Price :{maxPrice || ""}</h4>
            <input
              type="range"
              min={100}
              max={100000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            ></input>
          </div>
          <div>
            <h4>Category</h4>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">ALL</option>
              {!loadingCategories &&
                categoriesResponse?.categories.map((i) => (
                  <option key={i} value={i}>
                    {i.toUpperCase()}
                  </option>
                ))}
            </select>
          </div>
        </aside>
        <main>
          <h1>Products</h1>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {productLoading ? (
            <SkeletonLoader length={20} />
          ) : (
            <div className="search-product-list">
              {searchedData?.products.map((i) => (
                <ProductCard
                  key={i._id}
                  productId={i._id}
                  name={i.name}
                  price={i.price}
                  stock={i.stock}
                  handler={addToCartHandler}
                  photo={i.photo}
                />
              ))}
            </div>
          )}
          {searchedData && searchedData.totalPage > 1 && (
            <article>
              <button
                disabled={page <= 1}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Prev
              </button>
              <span>
                Page {page} of {searchedData.totalPage}
              </span>
              <button
                disabled={page >= searchedData.totalPage}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </button>
            </article>
          )}
        </main>
      </div>
    </>
  );
};

export default Search;
