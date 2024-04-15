import instance from ".";

export const addEmployee = async (payload) => {
  const addData = await instance.post("/employee/add_employee", payload);
  return addData;
};

export const getEmployee = async () => {
  const getData = await instance.get("/employee/get_employee");
  return getData;
};

export const getSingleEmployee = async (id) => {
  const getData = await instance.get(`/employee/get_employee/${id}`);
  return getData;
};

export const deleteEmployee = async (id) => {
  return await instance.delete(`/employee/delete_employee/${id}`);
};

export const editEmployee = async (id,payload) => {
  return await instance.put(`/employee/edit_employee/${id}`,payload);
};
