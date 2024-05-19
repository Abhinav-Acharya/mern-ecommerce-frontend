import { useState } from "react";
import { Link } from "react-router-dom";

import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { auth } from "../firebase";
import { IHeaderPropsType } from "../types/types";

const Header = ({ user }: IHeaderPropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  return (
    <>
      <nav className="header">
        <Link to={"/"} onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link to={"/search"} onClick={() => setIsOpen(false)}>
          <FaSearch />
        </Link>
        <Link to={"/cart"} onClick={() => setIsOpen(false)}>
          <FaShoppingBag />
        </Link>
        {user?._id ? (
          <>
            <button onClick={() => setIsOpen((prev) => !prev)}>
              {/* <FaUser /> */}
              <img src={user?.photo} />
            </button>
            <dialog open={isOpen}>
              <div>
                <Link to={"/orders"} onClick={() => setIsOpen(false)}>
                  Orders
                </Link>
                {user.role === "admin" && (
                  <Link
                    to={"/admin/dashboard"}
                    onClick={() => setIsOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <button onClick={logoutHandler}>
                  <FaSignOutAlt />
                </button>
              </div>
            </dialog>
          </>
        ) : (
          <Link to={"/login"} onClick={() => setIsOpen(false)}>
            <FaSignInAlt />
          </Link>
        )}
      </nav>
    </>
  );
};

export default Header;
