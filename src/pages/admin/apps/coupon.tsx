import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { RootState } from "../../../types/types";
import toast from "react-hot-toast";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

const Coupon = () => {
  const [size, setSize] = useState<number>(8);
  const [prefix, setPrefix] = useState<string>("");
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeCharacters, setIncludeCharacters] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string>("");

  const { user } = useSelector((state: RootState) => state.userReducer);

  const copyText = async (coupon: string) => {
    await window.navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  };

  const generateCoupon = () => {
    if (!includeNumbers && !includeCharacters && !includeSymbols)
      return alert("Please Select One At Least");

    let result: string = prefix || "";
    const loopLength: number = size - result.length;

    for (let i = 0; i < loopLength; i++) {
      let entireString: string = "";
      if (includeCharacters) entireString += allLetters;
      if (includeNumbers) entireString += allNumbers;
      if (includeSymbols) entireString += allSymbols;

      const randomNum: number = ~~(Math.random() * entireString.length);
      result += entireString[randomNum];
    }

    setCoupon(result);
  };

  const submitHandler = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER
        }/api/v1/payment/coupon/new?id=${user?._id!}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ coupon, amount }),
        }
      );
      const data = await response.json();
      toast.success(data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    setIsCopied(false);
  }, [coupon]);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard-app-container">
        <h1>Coupon</h1>
        <section>
          <div className="coupon-form">
            <input
              type="text"
              placeholder="Text to include"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              maxLength={size}
            />

            <input
              type="number"
              placeholder="Coupon Length"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              min={8}
              max={25}
            />

            <input
              type="number"
              placeholder="Amount"
              // value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />

            <fieldset>
              <legend>Include</legend>

              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers((prev) => !prev)}
              />
              <span>Numbers</span>

              <input
                type="checkbox"
                checked={includeCharacters}
                onChange={() => setIncludeCharacters((prev) => !prev)}
              />
              <span>Characters</span>

              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols((prev) => !prev)}
              />
              <span>Symbols</span>
            </fieldset>
            <button onClick={generateCoupon}>Generate</button>
          </div>

          {coupon && (
            <code>
              {coupon}
              <span onClick={() => copyText(coupon)}>
                {isCopied ? "Copied" : "Copy"}
              </span>
            </code>
          )}
          {coupon && (
            <button className="add-coupon" onClick={submitHandler}>
              Add
            </button>
          )}
        </section>
      </main>
    </div>
  );
};

export default Coupon;
