import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import Container from "../components/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { createQuery } from "../features/contact/contactSlice";

// ✅ Validation Fix
let contactSchema = yup.object({
  name: yup.string().required("Full Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Enter valid 10-digit number"),
  comment: yup.string().required("Message is required"),
});

const Contact = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      comment: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(createQuery(values));
      alert("Message sent successfully ✅");
      resetForm();
    },
  });

  return (
    <>
      <Meta title={"Contact ShopNova"} />
      <BreadCrumb title="Contact ShopNova" />

      <Container class1="contact-wrapper py-5 home-wrapper-2">
        <div className="row">
          {/* 🌍 Map */}
          <div className="col-12">
            <iframe
              src="https://www.google.com/maps?q=Vijayawada,India&output=embed"
              width="600"
              height="400"
              className="border-0 w-100 rounded-3"
              loading="lazy"
              title="ShopNova Location"
            ></iframe>
          </div>

          <div className="col-12 mt-5">
            <div className="contact-inner-wrapper d-flex justify-content-between flex-wrap gap-4">
              {/* 📩 Contact Form */}
              <div className="col-md-6">
                <h3 className="contact-title mb-3">Contact ShopNova</h3>
                <p className="text-muted mb-4">We'd love to hear from you!</p>

                <form
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column gap-3"
                >
                  {/* Name */}
                  <div>
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your full name"
                      {...formik.getFieldProps("name")}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="error">{formik.errors.name}</div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="error">{formik.errors.email}</div>
                    )}
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="form-label">Mobile Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Enter 10-digit mobile number"
                      {...formik.getFieldProps("mobile")}
                    />
                    {formik.touched.mobile && formik.errors.mobile && (
                      <div className="error">{formik.errors.mobile}</div>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="form-label">Your Message</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Write your message..."
                      {...formik.getFieldProps("comment")}
                    ></textarea>
                    {formik.touched.comment && formik.errors.comment && (
                      <div className="error">{formik.errors.comment}</div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button className="button border-0 mt-2">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>

              {/* 📞 Contact Info */}
              <div className="col-md-5">
                <h3 className="contact-title mb-3">
                  Get in touch with ShopNova
                </h3>

                <ul className="ps-0">
                  <li className="mb-3 d-flex gap-2 align-items-center">
                    <AiOutlineHome className="fs-5" />
                    <address className="mb-0">
                      ShopNova Pvt Ltd, 2nd Floor, Tech Park, MG Road,
                      Vijayawada – 520010, Andhra Pradesh, India
                    </address>
                  </li>

                  <li className="mb-3 d-flex gap-2 align-items-center">
                    <BiPhoneCall className="fs-5" />
                    <a href="tel:+919052974053">+91 9052974053</a>
                  </li>

                  <li className="mb-3 d-flex gap-2 align-items-center">
                    <AiOutlineMail className="fs-5" />
                    <a href="mailto:shaikraafiya3866@gmail.com">
                      shaikraafiya3866@gmail.com
                    </a>
                  </li>

                  <li className="mb-3 d-flex gap-2 align-items-center">
                    <BiInfoCircle className="fs-5" />
                    <p className="mb-0">Monday – Friday: 10 AM – 8 PM</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
