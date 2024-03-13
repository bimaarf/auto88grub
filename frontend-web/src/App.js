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
import { Headers } from "./Components/Headers";
import { About } from "./Pages/About";
import { BlogPreview } from "./Pages/BlogPreview";
import { Car } from "./Pages/Car";
import { CarCredit } from "./Pages/CarCredit";
import { CarPreview } from "./Pages/CarPreview";
import { Career } from "./Pages/Career";
import { Consultation } from "./Pages/Consultation";
import { CircleModal } from "./Pages/Context/__CircleModal";
import { FAQ } from "./Pages/FAQ";
import { Home } from "./Pages/Home";
import { Promo } from "./Pages/Promo";
import { Terms } from "./Pages/Terms";
import { Testimony } from "./Pages/Testimony";
import { TradeIns } from "./Pages/TradeIns";
import { Visit } from "./Pages/Visit";
import { StateProvider } from "./Providers/StateProvider";
import { PrivacyPolicy } from "./Pages/PrivacyPolicy";
import { CareerPreview } from "./Pages/CareerPreview";
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
  const [theme, setTheme] = useState(
    secureLocalStorage.getItem("theme")
      ? secureLocalStorage.getItem("theme")
      : "black"
  );
  return (
    <>
      <ToastContainer autoClose={1000} hideProgressBar={true} theme="dark" />
      <Router>
        <StateProvider>
          <Headers setTheme={setTheme} theme={theme} />
          <CustomSwitch>
            <Route path="/" exact element={<Home />} />
            <Route path="/promo" element={<Promo />} />
            <Route path="/mobil" element={<Car />} />
            <Route path="/mobil/preview" element={<CarPreview />} />
            <Route path="/berita/preview" element={<BlogPreview />} />
            <Route path="/testimoni" element={<Testimony />} />
            <Route path="/konsultasi" element={<Consultation />} />
            <Route path="/tukar-tambah" element={<TradeIns />} />
            <Route path="/kredit-mobil" element={<CarCredit />} />
            <Route path="/syarat-dan-ketentuan" element={<Terms />} />
            <Route path="/tentang-kami" element={<About />} />
            <Route path="/kunjungi-kami" element={<Visit />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/karir" element={<Career />} />
            <Route path="/karir/preview" element={<CareerPreview />} />
            <Route path="/kebijakan-privasi" element={<PrivacyPolicy />} />
          </CustomSwitch>
          {/* <Footer /> */}
          <CircleModal />
        </StateProvider>
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
  }, [location]); // Only include location in the dependency array

  useEffect(() => {
    setProgress(false);
  }, [prevLoc]); // Only include prevLoc in the dependency array

  return (
    <>
      {progress && <TopBarProgress />}
      <Routes>{children}</Routes>
    </>
  );
};

export default App;
