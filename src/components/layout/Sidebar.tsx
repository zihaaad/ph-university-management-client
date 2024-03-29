/* eslint-disable @typescript-eslint/no-explicit-any */
import {Menu} from "antd";
import Sider from "antd/es/layout/Sider";
import {sidebarItemsGenerator} from "../../utils/sidebarItemsGenerator";
import {adminPaths} from "../../routes/admin.routes";
import {facultyPaths} from "../../routes/faculty.routes";
import {studentPaths} from "../../routes/student.routes";
import {useAppSelector} from "../../redux/hooks";
import {TUser, selectCurrentToken} from "../../redux/features/auth/authSlice";
import {verifyToken} from "../../utils/verifyToken";

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {
  const token = useAppSelector(selectCurrentToken);

  let user;
  if (token) {
    user = verifyToken(token as string);
  }
  let sidebarItems;

  switch ((user as TUser)!.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sidebarItems = sidebarItemsGenerator(facultyPaths, userRole.FACULTY);
      break;
    case userRole.STUDENT:
      sidebarItems = sidebarItemsGenerator(studentPaths, userRole.STUDENT);
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      width={222}
      style={{height: "100vh", position: "sticky", top: "0", left: "0"}}
      collapsedWidth="0">
      <div
        style={{
          color: "white",
          height: "5rem",
          textAlign: "center",
          display: "grid",
          placeContent: "center",
          borderBottom: "1px solid gray",
          margin: "0px 5px",
        }}>
        <h3>PH University Management System</h3>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        style={{marginTop: "10px"}}
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
