import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";

import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Ads from "./pages/Ads/Ads";
import Tickets from "./pages/Tickets/Tickets";
import ForgotPassword from "./pages/AuthPages/ForgotPassword";
import CutomersAnalytics from "./pages/Customers/CutomersAnalytics";
import CustomerManagement from "./pages/Customers/CustomerManagement";
import ProvidersManagement from "./pages/Providers/ProvidersManagement";
import ProvidersAnalytics from "./pages/Providers/ProvidersAnalytics";
import Orders from "./pages/Orders/Orders";
import PrivacyPolicyPage from "./pages/CMS/CMS";
import ProviderDetails from "./pages/Providers/ProviderDetails";
import CustomerDetails from "./pages/Customers/CustomerDetails ";
import Transaction from "./pages/Transaction/Transaction";
import NotifyMessages from "./pages/Notification/NotifyMessages";
import WhatsAppMedia from "./pages/Whatsapp/WhatsAppMedia";
import Mail from "./pages/Email/Mail";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route
              index
              path="/customer-analytics"
              element={<CutomersAnalytics />}
            />
            <Route
              index
              path="/customer-management"
              element={<CustomerManagement />}
            />
            <Route
              index
              path="/customer-details"
              element={<CustomerDetails />}
            />
            <Route
              index
              path="/providers-management"
              element={<ProvidersManagement />}
            />
            <Route
              index
              path="/providers-analytics"
              element={<ProvidersAnalytics />}
            />
            <Route
              index
              path="/providers-details"
              element={<ProviderDetails />}
            />
            <Route index path="/orders" element={<Orders />} />
            <Route index path="/transaction" element={<Transaction />} />
            <Route index path="/notification" element={<NotifyMessages />} />
            <Route index path="/media" element={<WhatsAppMedia />} />
            <Route index path="/mail" element={<Mail />} />
            <Route index path="/ads" element={<Ads />} />
            <Route path="/cms" element={<PrivacyPolicyPage />} />

            <Route index path="/tickets" element={<Tickets />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ForgotPassword />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
