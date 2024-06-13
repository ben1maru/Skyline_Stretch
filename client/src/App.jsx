import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainView from "./component/MainWindow/MainView"
import Catalog from "./component/Catalog/Catalog";
import ContactInfo from "./component/Contacts/ContactInfo";
import StrechDetails from "./component/StrechDetails/StrechDetails";
import AdminAuth from "./component/AdminPanel/adminAuth/adminAuth";
import Dashboard from "./component/AdminPanel/Dashboards/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<MainView />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/contact" element={<ContactInfo />} />
      <Route path="/strech/:id" element={<StrechDetails />} />
      <Route path="/admin" element={<AdminAuth />} />
      <Route path="/admin/dashboard" element={<Dashboard />}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;

