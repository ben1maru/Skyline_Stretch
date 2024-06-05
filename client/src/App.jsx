import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainView from "./component/MainVindow/MainView"
import Catalog from "./component/Catalog/Catalog";
import ContactInfo from "./component/Contacts/ContactInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<MainView />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/contact" element={<ContactInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

