import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../auth/ProtectedRoute";

// Dashboard Pages
import { AdminPanel } from "../dashboard/AdminPanel";
import { AdminHome } from "../dashboard/screens/Home/AdminHome";
import { AdminCategory } from "../dashboard/screens/Category/AdminCategory";
import { AdminBlog } from "../dashboard/screens/Blogs/AdminBlog";
import { AdminReport } from "../dashboard/screens/Reports/AdminReports";
import { AdminUser } from "../dashboard/screens/Users/AdminUsers";
import { AdminProduct } from "../dashboard/screens/Products/AdminProduct";
import { AdminAddProduct } from "../dashboard/screens/Products/pages/AdminAddProduct";
import { AdminGallery } from "../dashboard/screens/Gallery/AdminGallery";
import { AdminLocation } from "../dashboard/screens/Locations/AdminLocation";
import { AdminContact } from "../dashboard/screens/Contacts/AdminContact";
import { AdminDesigner } from "../dashboard/screens/Designer/AdminDesigner";
import { AdminDesignerDetails } from "../dashboard/screens/Designer/AdminDesignerDetails";
import { AdminAddBlog } from "../dashboard/screens/Blogs/AdminAddBlog";
import { AdminAddLocation } from "../dashboard/screens/Locations/AdminAddLocation";
import { AdminCatalogue } from "../dashboard/screens/Catalog/AdminCatalogue";
import { AdminCatalogueDetail } from "../dashboard/screens/Catalog/pages/AdminCatalogueDetails";
import { AdminAddCatalogue } from "../dashboard/screens/Catalog/pages/AdminAddCatalogue";
import { AdminPopup } from "../dashboard/screens/Popup/AdminPopup";
import { AdminSubscriber } from "../dashboard/screens/Subscriber/AdminSubscriber";
import { AdminAddPopup } from "../dashboard/screens/Popup/pages/AdminAddPopup";
import { AdminBrand } from "../dashboard/screens/Brands/AdminBrand";
import { AdminAddBrand } from "../dashboard/screens/Brands/AdminAddBrand";
import { AdminColor } from "../dashboard/screens/Colors/AdminColors";
import { AdminEditLocation } from "../dashboard/screens/Locations/AdminEditLocation";
import LoginForm from "../loginForm/LoginForm";
import { useAuth } from "../auth/AuthContext";

// The Login Form (import your login form component)

const Routers = () => {
  // Check if the auth_token exists in localStorage
  const { user } = useAuth();

  return (
    <Routes>
      {/* Conditional Route to check if user is logged in */}
      <Route path="/" element={user ? <AdminPanel /> : <Navigate to="/login" />} />

      {/* Login route if token doesn't exist */}
      <Route path="/login" element={<LoginForm />} />

      {/* Protected routes for admin dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminPanel />} />
        <Route index element={<AdminHome />} />
        <Route path="categories-tags" element={<AdminCategory />} />
        <Route path="blogs">
          <Route index element={<AdminBlog />} />
          <Route path="add" element={<AdminAddBlog />} />
        </Route>
        <Route path="reports" element={<AdminReport />} />
        <Route path="colors" element={<AdminColor />} />
        <Route path="users" element={<AdminUser />} />
        <Route path="products">
          <Route index element={<AdminProduct />} />
          <Route path="add" element={<AdminAddProduct />} />
          <Route path="catalogue" element={<AdminCatalogue />} />
          <Route path="catalogue/add" element={<AdminAddCatalogue />} />
          <Route path="catalogue/:id" element={<AdminCatalogueDetail />} />
        </Route>

        <Route path="gallery" element={<AdminGallery />} />
        <Route path="locations">
          <Route index element={<AdminLocation />} />
          <Route path="add" element={<AdminAddLocation />} />
          <Route path="edit-location/:id" element={<AdminEditLocation />} />
        </Route>
        <Route path="contacts" element={<AdminContact />} />
        <Route path="designers">
          <Route index element={<AdminDesigner />} />
          <Route path=":id" element={<AdminDesignerDetails />} />
        </Route>
        <Route path="popup">
          <Route index element={<AdminPopup />} />
          <Route path="add" element={<AdminAddPopup />} />
        </Route>
        <Route path="brands">
          <Route index element={<AdminBrand />} />
          <Route path="add" element={<AdminAddBrand />} />
        </Route>
        <Route path="subscriber" element={<AdminSubscriber />} />
      </Route>
    </Routes>
  );
};

export default Routers;
