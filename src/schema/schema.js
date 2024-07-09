import * as Yup from "yup";

export const validationSchemaRegistration = Yup.object({
  nickname: Yup.string().required("Nickname is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

export const validationSchemaLogin = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});
