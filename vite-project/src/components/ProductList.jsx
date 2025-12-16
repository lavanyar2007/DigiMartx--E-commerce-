import ProductCard from "./ProductCard";

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="mx-auto bg-indigo-100 p-5 rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-indigo-900 text-center">
        Product List
      </h1>

      <div className="flex gap-6 flex-wrap justify-center">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
