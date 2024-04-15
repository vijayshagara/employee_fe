import React, { useEffect, useState, useMemo } from "react";
import TextField from "@mui/material/TextField";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { InputLabel, Select, MenuItem, Button } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import {
  addEmployee,
  getSingleEmployee,
  deleteEmployee,
  editEmployee,
} from "../../Service/Api/Employee";
import { useParams } from "react-router-dom";
import DrawerAppBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";

const AddEmploy = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [employee_name, setName] = useState("");
  const [employee_email, setEmail] = useState("");
  const [employee_gender, setSelectedGender] = useState("");
  const [employee_type, setSelectedEmployeeType] = useState("");
  const [dob, setSelectedDob] = useState("");
  const [employee_joinDate, setSelectedJoinDate] = useState("");
  const [employee_department, setEmpselectedDepartment] = useState("");
  const [employee_designation, setEmpselectedDesignation] = useState("");
  const [employee_grade, setEmpselectedGrade] = useState("");
  const [employee_level, setEmpselectedLevel] = useState("");

  const handleRadioChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleDateChange = ({ e, type }) => {
    if (type === "dob") {
      let date = moment(e.$d).format("DD/MM/YYYY");
      setSelectedDob(date);
    }
    if (type === "joinDate") {
      let date = moment(e.$d).format("DD/MM/YYYY");
      setSelectedJoinDate(date);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      employee_name,
      employee_email,
      employee_gender,
      employee_type,
      dob,
      employee_joinDate,
      employee_department,
      employee_designation,
      employee_grade,
      employee_level,
    };

    if (params.id) {
      try {
        const id = params.id;
        const res = await editEmployee(id, formData);
        if (res.status == 200) {
          navigate("/home");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await addEmployee(formData);
      } catch (error) {
        console.log(error);
      } finally {
        setName("");
        setEmail("");
        setSelectedGender("");
        setSelectedEmployeeType("");
        setSelectedDob("");
        setSelectedJoinDate("");
        setEmpselectedDepartment("");
        setEmpselectedDesignation("");
        setEmpselectedGrade("");
        setEmpselectedLevel("");
      }
    }
  };

  useEffect(() => {
    if (params.id) {
      const getSingleEmployeeDataInApi = async () => {
        try {
          const res = await getSingleEmployee(params.id);
          console.log(res);
          setName(res.data.employee_name);
          setEmail(res.data.employee_email);
          setSelectedGender(res.data.employee_gender);
          setSelectedEmployeeType(res.data.employee_type);
          setSelectedDob(res.data.dob);
          setSelectedJoinDate(res.data.employee_joinDate);
          setEmpselectedDepartment(res.data.employee_department);
          setEmpselectedDesignation(res.data.employee_designation);
          setEmpselectedGrade(res.data.employee_grade);
          setEmpselectedLevel(res.data.employee_level);
        } catch (error) {
          console.log(error);
        } finally {
        }
      };
      getSingleEmployeeDataInApi();
    }
  }, [params.id]);

  const handleDelete = async () => {
    try {
      await deleteEmployee(params.id);
      window.location = "/home";
    } catch (error) {
      console.log(error);
    }
  };
  const isButtonDisabled = useMemo(() => {
    let isDisabled = false;

    if (
      employee_name &&
      employee_email &&
      employee_gender &&
      employee_type &&
      dob &&
      employee_joinDate &&
      employee_department &&
      employee_designation &&
      employee_grade &&
      employee_level
    ) {
      isDisabled = false;
    } else {
      isDisabled = true;
    }

    return isDisabled;
  }, [
    employee_name,
    employee_email,
    employee_gender,
    employee_type,
    dob,
    employee_joinDate,
    employee_department,
    employee_designation,
    employee_grade,
    employee_level,
  ]);

  return (
    <>
      <DrawerAppBar />
      <div>
        <h1>Add Employee</h1>
        <form onSubmit={handleSubmit}>
          <div className="parent_form">
            <h4 className="heading">Basic Details</h4>
            <div className="basic_detials_form">
              <div className="base_text_field">
                {/* Employee name */}
                <TextField
                  label="Enter your name"
                  variant="outlined"
                  value={employee_name}
                  onChange={(e) => setName(e.target.value)}
                />
                {/* Employee name End*/}
                {/* Employee Email */}
                <TextField
                  label="Enter your email"
                  variant="outlined"
                  value={employee_email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* Employee email end */}
                {/* Employee Type */}
                <FormControl fullWidth style={{ width: 200 }}>
                  <InputLabel id="option-select-label">
                    Employee Type
                  </InputLabel>
                  <Select
                    labelId="option-select-label"
                    id="option-select"
                    value={employee_type}
                    label="Select an Option"
                    onChange={(e) => setSelectedEmployeeType(e.target.value)}
                  >
                    <MenuItem value="developer">Developer</MenuItem>
                    <MenuItem value="tester">Tester</MenuItem>
                    <MenuItem value="devops">Devops</MenuItem>
                    <MenuItem value="uI UX designer">UI UX designer</MenuItem>
                  </Select>
                </FormControl>
                {/* Employee Type End*/}
              </div>
              <div className="base_date_pick">
                {/* Employee Gender */}

                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={employee_gender}
                    onChange={handleRadioChange}
                  >
                    <div className="base_date_pick">
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                    </div>
                  </RadioGroup>
                </FormControl>
                {/* Employee Gender END*/}

                {/* Employee DOB */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Date of Birth"
                      onChange={(e) => handleDateChange({ e, type: "dob" })}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                {/* Employee DOB END*/}
              </div>
            </div>
            <h4>Employment Details</h4>
            <div className="emply_from">
              <div className="base_date_pick">
                {/* Employee JION date */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Joined Date"
                      onChange={(e) =>
                        handleDateChange({ e, type: "joinDate" })
                      }
                    />
                  </DemoContainer>
                </LocalizationProvider>
                {/* Employee JION date end*/}

                <div className="emply_text_from" style={{ width: 500 }}>
                  {/* Employee Department date */}
                  <FormControl fullWidth>
                    <InputLabel id="option-select-label">Department</InputLabel>
                    <Select
                      labelId="option-select-label"
                      id="option-select"
                      value={employee_department}
                      label="Select an Option"
                      onChange={(e) => setEmpselectedDepartment(e.target.value)}
                    >
                      <MenuItem value="Chennai">Chennai</MenuItem>
                      <MenuItem value="Bangalore">Bangalore</MenuItem>
                      <MenuItem value="Mumbai">Mumbai</MenuItem>
                    </Select>
                  </FormControl>
                  {/* Employee Department date */}

                  {/* Employee Designation  */}
                  <FormControl fullWidth>
                    <InputLabel id="option-select-label">
                      Designation
                    </InputLabel>
                    <Select
                      labelId="option-select-label"
                      id="option-select"
                      value={employee_designation}
                      label="Select a Designation"
                      onChange={(e) =>
                        setEmpselectedDesignation(e.target.value)
                      }
                    >
                      <MenuItem value="juniorDeveloper">
                        Junior Developer
                      </MenuItem>
                      <MenuItem value="seniorDeveloper">
                        Senior Developer
                      </MenuItem>
                      <MenuItem value="juniorTester">Junior Tester</MenuItem>
                      <MenuItem value="seniorTester">Senior Tester</MenuItem>
                      <MenuItem value="juniorDevopsEng">
                        Junior DevopsEng
                      </MenuItem>
                      <MenuItem value="seniorDevopsEng">
                        Senior DevopsEng
                      </MenuItem>
                    </Select>
                  </FormControl>
                  {/* Employee Designation End */}
                </div>
              </div>
              <div className="base_date_pick" style={{ width: 500 }}>
                {/* Employee Grade */}
                <FormControl fullWidth>
                  <InputLabel id="option-select-label">Grade</InputLabel>
                  <Select
                    labelId="option-select-label"
                    id="option-select"
                    value={employee_grade}
                    label="Select a Designation"
                    onChange={(e) => setEmpselectedGrade(e.target.value)}
                  >
                    <MenuItem value="Supervisor">Supervisor</MenuItem>
                    <MenuItem value="manager">Manager</MenuItem>
                    <MenuItem value="Executive">Executive</MenuItem>
                    <MenuItem value="Associate">Associate</MenuItem>
                  </Select>
                </FormControl>
                {/* Employee Grade End*/}

                {/* Employee LEVEL*/}
                <FormControl fullWidth>
                  <InputLabel id="option-select-label">Level</InputLabel>
                  <Select
                    labelId="option-select-label"
                    id="option-select"
                    value={employee_level}
                    label="Select a Designation"
                    onChange={(e) => setEmpselectedLevel(e.target.value)}
                  >
                    <MenuItem value="I">I</MenuItem>
                    <MenuItem value="II">II</MenuItem>
                    <MenuItem value="III">III</MenuItem>
                  </Select>
                </FormControl>
                {/* Employee LEVEL End*/}
              </div>
            </div>
            {params && params.id ? (
              <>
                <Button
                  style={{ width: 250, height: 40 }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1 }}
                >
                  Update
                </Button>
                <Button
                  style={{ width: 250, height: 40 }}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1 }}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </>
            ) : (
              <Button
                style={{
                  width: 250,
                  height: 40,
                  color: "error",
                  // backgroundColor: theme.palette.danger.main
                }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1 }}
                disabled={isButtonDisabled}
              >
                Submit
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddEmploy;
