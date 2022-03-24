import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { getAllUsers } from "../store/action/userAction";
import "./AllUser.css";

const AllUser = () => {
  const dispatch = useDispatch();
  const { loading, allUsers } = useSelector((state) => state.totalUser);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="allUserContainer">
            <div className="allUser">
              <h3>All users</h3>
              <table className="allUsersTable">
                <thead>
                  <tr>
                    <th className="text-secondary text-left" scope="col">
                      Sr No
                    </th>
                    <th className="text-secondary" scope="col">
                      Name
                    </th>
                    <th className="text-secondary" scope="col">
                      Email
                    </th>
                    <th className="text-secondary" scope="col">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers &&
                    allUsers.map((appointment, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          {appointment.name}{" "}
                          {appointment._id === user._id ? (
                            <span style={{ color: "green" }}>Active</span>
                          ) : (
                            ""
                          )}{" "}
                        </td>
                        <td>{appointment.email}</td>

                        {appointment.role === "admin" ? (
                          <td style={{ color: "red" }}>{appointment.role}</td>
                        ) : (
                          <td>{appointment.role}</td>
                        )}
                      </tr>
                    ))}
                  {/* <tr>
                    <td>1</td>
                    <td>Remon roy</td>
                    <td>remonroy34@gmail.com</td>
                    <td>Admin</td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AllUser;
