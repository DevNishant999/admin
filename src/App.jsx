import React, { Suspense } from "react";
import "../src/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Users from "./pages/Users";
import Unauthorized from "./pages/Unauthorized";
import Career from "./pages/Career";

// 🟢 Lazy load pages
const Login = React.lazy(() => import("./pages/Login"));
const Home = React.lazy(() => import("./pages/Home"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const Services = React.lazy(() => import("./pages/Services"));
const Results = React.lazy(() => import("./pages/Results"));
const Cost = React.lazy(() => import("./pages/Cost"));
const Country = React.lazy(() => import("./pages/Country"));
const City = React.lazy(() => import("./pages/City"));
const Blogs = React.lazy(() => import("./pages/Blogs"));
const OurClinic = React.lazy(() => import("./pages/OurClinic"));
const MedicalTourism = React.lazy(() => import("./pages/MedicalTourism"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const PaymentTc = React.lazy(() => import("./pages/PaymentTc"));
const Footer = React.lazy(() => import("./pages/Footer"));
const Testimonials = React.lazy(() => import("./pages/Testimonials"));
const Faqs = React.lazy(() => import("./pages/Faqs"));
const Videos = React.lazy(() => import("./pages/Videos"));
const Leads = React.lazy(() => import("./pages/Leads"));
const Media = React.lazy(() => import("./pages/Media"));

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/about-us"
            element={
              <ProtectedRoute>
                <Layout>
                  <AboutUs />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/services"
            element={
              <ProtectedRoute>
                <Layout>
                  <Services />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/results"
            element={
              <ProtectedRoute>
                <Layout>
                  <Results />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/cost"
            element={
              <ProtectedRoute>
                <Layout>
                  <Cost />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/country"
            element={
              <ProtectedRoute>
                <Layout>
                  <Country />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/city"
            element={
              <ProtectedRoute>
                <Layout>
                  <City />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Blog page: blogger/editor/admin */}
          <Route
            path="/blogs"
            element={
              <ProtectedRoute allowedRoles={["admin", "editor", "blogger"]}>
                <Layout>
                  <Blogs />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/our-clinic"
            element={
              <ProtectedRoute>
                <Layout>
                  <OurClinic />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/medical-tourism"
            element={
              <ProtectedRoute>
                <Layout>
                  <MedicalTourism />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/career"
            element={
              <ProtectedRoute>
                <Layout>
                  <Career />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/contact-us"
            element={
              <ProtectedRoute>
                <Layout>
                  <ContactUs />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/privacy-policy"
            element={
              <ProtectedRoute>
                <Layout>
                  <PrivacyPolicy />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment-tc"
            element={
              <ProtectedRoute>
                <Layout>
                  <PaymentTc />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/footer"
            element={
              <ProtectedRoute>
                <Layout>
                  <Footer />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/testimonials"
            element={
              <ProtectedRoute>
                <Layout>
                  <Testimonials />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/faqs"
            element={
              <ProtectedRoute>
                <Layout>
                  <Faqs />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/videos"
            element={
              <ProtectedRoute>
                <Layout>
                  <Videos />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Leads: admin only */}
          <Route
            path="/leads"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Layout>
                  <Leads />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/media"
            element={
              <ProtectedRoute>
                <Layout>
                  <Media />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Users: admin only */}
          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Layout>
                  <Users />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}
