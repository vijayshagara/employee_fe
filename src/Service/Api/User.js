import instance from ".";

export const loginAdminUser = async (payload) => {
  const res = await instance.post("/user/login", payload);
  return res;
};

export const signUpAdminUser = async (payload) => {
  const res = await instance.post("/user/signup", payload);
  return res;
};
