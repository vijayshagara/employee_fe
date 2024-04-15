import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getEmployee } from "../../Service/Api/Employee";
import { useNavigate } from "react-router-dom";
import DrawerAppBar from "../NavBar/NavBar";

const columns = [
  { field: "employee_ID", headerName: "ID", width: 150 },
  { field: "employee_name", headerName: "Employee Name", width: 205 },
  { field: "employee_type", headerName: "Employee Type", width: 205 },
  { field: "dob", headerName: "Date of brith", width: 205 },
  { field: "employee_joinDate", headerName: "Join Date", width: 205 },
  { field: "employee_designation", headerName: "Designation", width: 205 },
  { field: "employee_grade", headerName: "Grade", width: 205 },
  { field: "employee_level", headerName: "Level", width: 205 },
  { field: "employee_department", headerName: "Department", width: 205 },
];

export default function DataTable() {
  const [getData, setGetData] = useState([]);
  const navigate = useNavigate();
  const row = [...getData];

  useEffect(() => {
    const getAllEmployee = async () => {
      let response = await getEmployee();
      setGetData(response.data);
    };
    getAllEmployee();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-emp/${id}`);
  };
  return (
    <>
      <DrawerAppBar />
      <div style={{ height: "83vh", width: "100%" }}>
        <h1>Employee Table</h1>
        <DataGrid
          rows={row}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          color
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowClick={(e) => {
            handleEdit(e.id);
          }}
        />
      </div>
    </>
  );
}
