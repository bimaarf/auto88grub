import axios from "axios";
import { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopBarProgress from "react-topbar-progress-indicator";
import "./App.css";
import { Footer } from "./Components/Footer";
import { Headers } from "./Components/Headers";
import { About } from "./Pages/About";
import { Car } from "./Pages/Car";
import { CarCredit } from "./Pages/CarCredit";
import { CarPreview } from "./Pages/CarPreview";
import { Career } from "./Pages/Career";
import { Consultation } from "./Pages/Consultation";
import { FAQ } from "./Pages/FAQ";
import { Home } from "./Pages/Home";
import { Promo } from "./Pages/Promo";
import { Terms } from "./Pages/Terms";
import { Testimony } from "./Pages/Testimony";
import { TradeIns } from "./Pages/TradeIns";
import { Visit } from "./Pages/Visit";

axios.defaults.baseURL = process.env.REACT_APP_API;
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Content-Type"] =
  "application/json/x-www-form-urlencoded; charset=UTF-8; multipart/form-data";

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = secureLocalStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {
  TopBarProgress.config({
    barColors: {
      0: "#b91c1c",
    },
  });

  return (
    <>
      <ToastContainer autoClose={1000} hideProgressBar={true} theme="dark" />
      <Router>
        <Headers />
        <CustomSwitch>
          <Route path="/" exact element={<Home />} />
          <Route path="/promo" element={<Promo />} />
          <Route path="/mobil" element={<Car />} />
          <Route path="/testimoni" element={<Testimony />} />
          <Route path="/konsultasi" element={<Consultation />} />
          <Route path="/tukar-tambah" element={<TradeIns />} />
          <Route path="/kredit-mobil" element={<CarCredit />} />
          <Route path="/syarat-dan-ketentuan" element={<Terms />} />
          <Route path="/tentang-kami" element={<About />} />
          <Route path="/kunjungi-kami" element={<Visit />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/karir" element={<Career />} />
          <Route path="/car/preview" element={<CarPreview />} />
        </CustomSwitch>
        {/* <Footer /> */}
      </Router>
    </>
  );
}
const CustomSwitch = ({ children }) => {
  const [progress, setProgress] = useState(false);
  const [prevLoc, setPrevLoc] = useState("");
  const location = useLocation();

  useEffect(() => {
    setPrevLoc(location.pathname);
    setProgress(true);
    if (location.pathname === prevLoc) {
      setPrevLoc("");
    }
  }, [location]);

  useEffect(() => {
    setProgress(false);
  }, [prevLoc]);

  return (
    <>
      {progress && <TopBarProgress />}
      <Routes>{children}</Routes>
    </>
  );
};

export default App;
