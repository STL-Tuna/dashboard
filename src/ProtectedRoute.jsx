import { AdminPanel } from "./dashboard/AdminPanel";

// Function to get a cookie by its name
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
  return null;
};

const isCookieExpired = (cookieName) => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(cookieName + "="));

  // If cookie doesn't exist at all
  if (!cookie) {
    return true;
  }

  // Handle empty cookie value (e.g., "auth_token=" or "auth_token=;")
  const cookieValue = cookie.split("=")[1];
  if (!cookieValue || cookieValue.trim() === "") {
    clearCookie(cookieName); // Clear the empty cookie
    return true;
  }

  // Check expiration date if exists
  const expires = cookie
    .split(";")
    .find((part) => part.trim().startsWith("expires="));
  if (expires) {
    const expirationDate = new Date(expires.split("=")[1]);
    return expirationDate < new Date();
  }
  return false;
};

// New helper function to clear cookies
const clearCookie = (name, options = {}) => {
  const { path = "/", domain } = options;
  let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;

  if (domain) {
    cookieString += `; domain=${domain}`;
  }

  document.cookie = cookieString;

  // Also try without domain if domain was specified
  if (domain) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
  }
};

const ProtectedRoute = () => {
  const authToken = getCookie("auth_token");

  if (!authToken || isCookieExpired("auth_token")) {
    clearCookie("auth_token", {
      domain: ".stlnpl.com",
    });
    window.location.href = "https://stlnpl.com";
    return null;
  }

  return <AdminPanel />;
};

export default ProtectedRoute;
