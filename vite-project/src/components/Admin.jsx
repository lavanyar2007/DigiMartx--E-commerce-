import ProductForm from "./ProductForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Admin = ({ products, setProducts }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const storedRole = sessionStorage.getItem("role");
    if (!token || storedRole !== "admin") {
      toast.error("Access denied. Admins only!",{ autoClose: 250});
      navigate("/login");
    } else {
      setRole(storedRole);
    }
  }, [navigate]);

  if (role !== "admin") return null;

  return <ProductForm products={products} setProducts={setProducts} />;
};

export default Admin;
