import * as Yup from "yup";

export const validationSchemaRegistration = Yup.object({
  nickname: Yup.string().required("Nickname is required"),
  email: Yup.string().email("Invalid email address").max(140, "Too long!").required("Email is required"),
  password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

export const validationSchemaLogin = Yup.object({
  email: Yup.string().email("Invalid email address").max(140, "Too long!").required("Email is required"),
  password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

export const validationSchemaForgotPassword = Yup.object().shape({
  email: Yup.string().email("Invalid email address").max(140, "Too long!").required("Email is required"),
});

export const validationSchemaResetPassword = Yup.object().shape({
  password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Repeat Password is required"),
});
