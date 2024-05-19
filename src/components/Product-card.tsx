import { FaPlus } from "react-icons/fa";
import { CartItem } from "../types/types";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};

const ProductCard = ({
  productId,
  photo,
  name,
  price,
  stock,
  handler,
}: ProductsProps) => {
  return (
    <>
      <div className="productCard">
        <img alt={name} src={photo} />
        <p>{name}</p>
        <span>₹{price}</span>
        <div>
          <button
            onClick={() =>
              handler({ productId, photo, name, price, quantity: 1, stock })
            }
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
