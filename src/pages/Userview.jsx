import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/slices/userSlice";
import userSlice from "../redux/slices/userSlice";

export const Userview = () => {
  const user = useSelector((state) => state.user);
  const product = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      {/* <div>
        {product.products.map((product) => (
          <div key={product.id}>{product.title}</div>
        ))}
      </div> */}
      <div>
        {user.users.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Userview;
