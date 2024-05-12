import { ReactElement, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useSelector } from "react-redux";
import { RootState } from "../../types/types";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
} from "../../redux/api/userApi";
import { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";
import { SkeletonLoader } from "../../components/Loader";
import { responseToast } from "../../utils/features";

interface IDataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<IDataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Customers = () => {
  const [rows, setRows] = useState<IDataType[]>([]);

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isLoading, isError, error } = useAllUsersQuery(user?._id!);

  const [deleteUser] = useDeleteUserMutation();

  if (isError) toast.error((error as CustomError).data.message);

  const deleteHandler = async (userId: string) => {
    const res = await deleteUser({ userId, adminUserId: user?._id! });
    responseToast(res, null, "");
  };

  useEffect(() => {
    if (data)
      setRows(
        data.users.map((user) => ({
          avatar: (
            <img
              style={{ borderRadius: "50%" }}
              src={user.photo}
              alt="avatar"
            />
          ),
          name: user.name,
          gender: user.gender,
          email: user.email,
          role: user.role,
          action: (
            <button onClick={() => deleteHandler(user._id)}>
              <FaTrash />
            </button>
          ),
        }))
      );
  }, [data]);

  const Table = TableHOC<IDataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Users",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <SkeletonLoader length={20} /> : Table}</main>
    </div>
  );
};

export default Customers;
