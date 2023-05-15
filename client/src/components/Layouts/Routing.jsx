import { Route, Routes } from "react-router-dom";
import Layouts from "./Layouts";
import Home from "../Pages/Home";
import ContactUs from "../Pages/ContactUs";
import DeliveryTerms from "../DeliveryTerms";
import FilteredProducts from "../FilteredProducts";
import SameCategory from "../SameCategory";
import SearchedProducts from "../SearchedProducts";
import ErrorPage from "../ErrorPage";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Layouts />}>
        <Route index element={<Home />} />
        <Route path="/products/:id/:categorie" element={<SameCategory />} />
        <Route path="/products/search/:searchedText" element={<SearchedProducts />} />
        <Route
          path="/products/:id/:categorie/:subcategory"
          element={<FilteredProducts />}
        />
        <Route path="contacts" element={<ContactUs />} />
        <Route path="delivery-terms" element={<DeliveryTerms />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
