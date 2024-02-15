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
import { Car } from "./Pages/Car";
import { Home } from "./Pages/Home";
import { Promo } from "./Pages/Promo";
import { Testimony } from "./Pages/Testimony";
import { Consultation } from "./Pages/Consultation";
import { TradeIns } from "./Pages/TradeIns";
import { CarCredit } from "./Pages/CarCredit";
import { Terms } from "./Pages/Terms";
import { About } from "./Pages/About";
import { Visit } from "./Pages/Visit";
import { FAQ } from "./Pages/FAQ";
import { Career } from "./Pages/Career";
function App() {
  const [getRole, setRole] = useState("");
  const [authCheck, setAuthCheck] = useState(false);
  const onLoad = () => {
    axios.get("sanctum/csrf-cookie").then(() => {
      axios
        .post("api/onload")
        .then((res) => {
          res.data.id_hash === "c9f9b41520bf30c33008baeb6338a4d4f3914732" &&
            setRole("admin");
          res.data.id_hash === "ea8167b9f870d746fcb304bb024fe59d6b113e57" &&
            setRole("member");
        })
        .catch(() => {
          secureLocalStorage.clear();
          setAuthCheck(false);
        });
    });
  };
  useEffect(() => {
    if (secureLocalStorage.getItem("auth_token")) {
      onLoad();
      setAuthCheck(true);
    }
    setAuthCheck(false);
  }, []);
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
        <Headers setTheme={setTheme} theme={theme} />
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
        </CustomSwitch>
        <Footer />
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
