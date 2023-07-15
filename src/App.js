import { Route, Routes } from "react-router-dom";
import Products from "./Products";
import Create from "./Create";
import SingleProduct from "./SingleProduct";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/create" element={<Create />} />
        <Route path="/product/:id" element={<SingleProduct />} />
      </Routes>
    </div>
  );
}

export default App;
