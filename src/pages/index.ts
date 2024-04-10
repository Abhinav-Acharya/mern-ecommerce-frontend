import { lazy } from "react"; //only required file is loaded. check in inspect>network tab

const Cart = lazy(() => import("./Cart"));
const Home = lazy(() => import("./Home"));
const Search = lazy(() => import("./Search"));
const Shipping = lazy(() => import("./Shipping"));
const Checkout = lazy(() => import("./CheckOut"));
const Login = lazy(() => import("./Login"));
const Orders = lazy(() => import("./Orders"));
const OrderDetails = lazy(() => import("./Order-details"));
const NotFoundPage = lazy(() => import("./NotFoundPage"));

//admin
const Dashboard = lazy(() => import("./admin/dashboard"));
const Products = lazy(() => import("./admin/products"));
const Customers = lazy(() => import("./admin/customers"));
const Transaction = lazy(() => import("./admin/transaction"));
const Barcharts = lazy(() => import("./admin/charts/barcharts"));
const Piecharts = lazy(() => import("./admin/charts/piecharts"));
const Linecharts = lazy(() => import("./admin/charts/linecharts"));
const Coupon = lazy(() => import("./admin/apps/coupon"));
const Stopwatch = lazy(() => import("./admin/apps/stopwatch"));
const Toss = lazy(() => import("./admin/apps/toss"));
const NewProduct = lazy(() => import("./admin/management/newproduct"));
const ProductManagement = lazy(
  () => import("./admin/management/productmanagement")
);
const TransactionManagement = lazy(
  () => import("./admin/management/transactionmanagement")
);

export {
  Cart,
  Home,
  Search,
  OrderDetails,
  Shipping,
  Login,
  Orders,
  Dashboard,
  Products,
  Customers,
  Transaction,
  Barcharts,
  Piecharts,
  Linecharts,
  Coupon,
  Stopwatch,
  Toss,
  NewProduct,
  ProductManagement,
  TransactionManagement,
  NotFoundPage,
  Checkout,
};
