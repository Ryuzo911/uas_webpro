import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import ProductList from "./pages/productlist";
import Mycart from "./pages/mycart";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />}/>
          <Route path="/cart" element={<Mycart/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;