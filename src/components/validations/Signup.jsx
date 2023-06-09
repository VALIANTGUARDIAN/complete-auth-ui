import { Box, Grid, Typography, Link } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SubmitButton } from "../common/Button";
import FormImg from "../../assets/FormImg-removebg.png";
import styled from "styled-components";
import Swal from "sweetalert2";

const BottomLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2rem;
  padding-bottom: 2rem;
`;

const LinkGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

const initialValues = {
  firstname:"",
  lastname:"",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .matches(
      /^([A-Za-z0-9_]+[-.]?[A-Za-z0-9_]+)+@(?!(?:[A-Za-z0-9_]+\.)?([A-Za-z]{1,3})\.)([A-Za-z0-9_]+[-.]?[A-Za-z0-9_]+)+\.([A-Za-z]{2,4})$/,
      "Enter vailid mail."
    )
    .required("Email address is required."),
  password: Yup.string()
    .min(8)
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*\W).{8,}$/,
      "Password must contain min. 1 numeric, symbol, capital character."
    )
    .required("Password is required."),
  confirmPassword: Yup.string()
    .required("Confirm password is required.")
    .oneOf(
      [Yup.ref("password"), null],
      "Confirm password must match with password"
    ),
});

const Signup = () => {
  const url = "http://localhost:8080";

  return (
    <Box>
      <Grid
        container
        sx={{
          maxWidth: { xs: "100vw", md: "100vw" },
          height: { xs: "auto", md: "100vh" },
          paddingTop: { xs: "2rem", sm: "2rem" },
          paddingBottom: { xs: "2rem", sm: "2rem" },
          background: "#0f212ebe",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{
            background: `#0f212e url(${FormImg}) center`,
            height: { xs: "90vh", md: "90vh" },
            maxWidth: { xs: "80vw", md: "70vh" },
            borderRadius: { xs: "1rem 1rem 0 0", md: "1rem 0 0 1rem" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundSize: "cover",
          }}
        />

        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{
            height: { xs: "90vh", md: "90vh" },
            maxWidth: { xs: "80vw", md: "70vh" },
            background: "#fff",
            borderRadius: { xs: "0 0 1rem 1rem", md: "0 1rem 1rem 0" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: { xs: "1rem", md: "2rem" },
            paddingRight: { xs: "2rem", md: "2rem" },
            textAlign: "center",
          }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (formdata, { setSubmitting, resetForm }) => {
              try {
                setSubmitting(true);
                const res = await fetch(url + "/users/signup", {
                  method: "POST",
                  body: JSON.stringify(formdata),
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                console.log(res.status);
                if (res.status === 201) {
                  //success alert
                  Swal.fire({
                    icon: "success",
                    title: "Verification link sent!",
                    text: "Verify the link to register.",
                  });
                  console.log("Verification link sent to your email.");
                  resetForm();
                } else {
                  // fail alert
                  Swal.fire("Oops...", "Signup Unsuccessful", "error");
                }
              } catch (error) {
                console.error(error);
                Swal.fire("Oops...", "Signup Unsuccessful", "error");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Typography
                  variant="h4"
                  component="h1"
                  color="#23235e"
                  gutterBottom
                  sx={{ mb: "1rem" }}
                >
                  Sign Up
                </Typography>
                <div className="form-control" sx={{ mb: "1rem" }}>
                  <label htmlFor="text">
                    Firstname<span className="req">*</span>
                  </label>
                  <Field
                    name="firstname"
                    type="text"
                    placeholder="Enter your first name"
                    className="firstname-field"
                  />
                  <ErrorMessage
                    name="firstname"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-control" sx={{ mb: "1rem" }}>
                  <label htmlFor="text">
                    Lastname<span className="req">*</span>
                  </label>
                  <Field
                    name="lastname"
                    type="text"
                    placeholder="Enter your first name"
                    className="lastname-field"
                  />
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-control" sx={{ mb: "1rem" }}>
                  <label htmlFor="email">
                    Email address<span className="req">*</span>
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="email-field"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-control" sx={{ mb: "1rem" }}>
                  <label htmlFor="password">
                    Password<span className="req">*</span>
                  </label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="password-field"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-control" sx={{ mb: "1rem" }}>
                  <label htmlFor="password">
                    Confirm Password<span className="req">*</span>
                  </label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    className="password-field"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error"
                  />
                </div>

                <SubmitButton type="submit"
                  disabled={isSubmitting}
                  sx={{ width: "100%", mt: "2rem" }}
                >
                  {isSubmitting ? "Signing up..." : "Sign up"}
                </SubmitButton>
              </Form>
            )}
          </Formik>
          <BottomLinks>
            <LinkGroup>
              <Link href="#" color="#8d8d8da4" underline="none">
                Contact us
              </Link>
            </LinkGroup>
          </BottomLinks>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signup;
