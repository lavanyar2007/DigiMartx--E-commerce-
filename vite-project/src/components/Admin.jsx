import ProductForm from "./ProductForm";

const Admin = ({ products, setProducts }) => {
  // No need for useNavigate or role checks here
  return <ProductForm products={products} setProducts={setProducts} />;
};

export default Admin;
