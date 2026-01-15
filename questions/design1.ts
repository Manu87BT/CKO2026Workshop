// Can you find design problems on this code?
// Note: I'm not talking about syntax errors, I mean design problems

// VERY IMPORTANT!!! This is copilot generated code... Seems to be correct... Is it???
// It was generated without letting copilot know that I was looking for some specific design problems...
// Everyone using default react could get this code from copilot


// Component that provides a list of all the products
function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>LOADING...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
      <ul>
      {products. map(product => (
          <li key={product.id}>{product.name}</li>
      ))}
      </ul>
  );
}

// Component that shows how many products are in total
function ProductCount() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>...</div>;

  return <div>Total: {products.length} productos</div>;
}

// -- This is what we will show in the application -- /
function Dashboard() {
  return (
    <div>
      <ProductCount />
      <ProductList />
    </div>
  );
}