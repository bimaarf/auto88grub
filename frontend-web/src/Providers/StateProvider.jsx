// StateProvider.js
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchBlog } from "../Pages/Service/__FetchBlog";
import { fetchCarPromos } from "../Pages/Service/__FetchCarPromos";
import { fetchNewCars } from "../Pages/Service/__FetchNewCar";
import { fetchTestimony } from "../Pages/Service/__FetchTestimony";
import { fetchCars } from "../Pages/Service/__FetchCar";
import { fetchSlider } from "../Pages/Service/__FetchSlider";
import { fetchCompanyProfile } from "../Pages/Service/__FetchCompanyProfile";
import { fetchRecCars } from "../Pages/Service/__FetchRecCaar";
import { fetchKind } from "../Pages/Service/__FetchKind";

const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [state, setState] = useState({
    pageNewCar: { page: 1, perPage: 6 },
    pageCarPromo: { page: 1, perPage: 12 },
    pageTestimony: { page: 1, perPage: 6 },
    pageAllCar: { page: 1, perPage: 6 },
    getCarPromos: null,
    getAllCars: null,
    getNewCars: null,
    getRecCars: null,
    getKind: null,
    getBlog: null,
    getTestimony: null,
    prevTestimony: null,
    getSliders: null,
    getCompanyProfile: null,
  });

  const { pageNewCar, pageCarPromo, pageTestimony, pageAllCar } = state;

  const getCompanyProfile = useCallback(async () => {
    try {
      const companyData = await fetchCompanyProfile();
      setState((prevState) => ({
        ...prevState,
        getCompanyProfile: companyData,
      }));
    } catch (error) {
      console.error("Error fetching company:", error);
    }
  }, []);
  const getCarPromos = useCallback(async () => {
    try {
      const carPromos = await fetchCarPromos(pageCarPromo);
      setState((prevState) => ({
        ...prevState,
        getCarPromos: carPromos.data,
      }));
    } catch (error) {
      console.error("Error fetching car promos:", error);
    }
  }, [pageCarPromo]);

  const getBlog = useCallback(async () => {
    try {
      const blogData = await fetchBlog();
      setState((prevState) => ({
        ...prevState,
        getBlog: blogData,
      }));
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  }, []);
  const getSliders = useCallback(async () => {
    try {
      const sliderData = await fetchSlider();
      setState((prevState) => ({
        ...prevState,
        getSliders: sliderData,
      }));
    } catch (error) {
      console.error("Error fetching slider:", error);
    }
  }, []);
  const getKind = useCallback(async () => {
    try {
      const kindData = await fetchKind();
      setState((prevState) => ({
        ...prevState,
        getKind: kindData,
      }));
    } catch (error) {
      console.error("Error fetching slider:", error);
    }
  }, []);

  const getRecCars = useCallback(async () => {
    try {
      const recCars = await fetchRecCars(pageNewCar);
      setState((prevState) => ({
        ...prevState,
        getRecCars: recCars,
      }));
    } catch (error) {
      console.error("Error fetching rec cars:", error);
    }
  }, [pageNewCar]);
  const getNewCars = useCallback(async () => {
    try {
      const newCars = await fetchNewCars(pageNewCar);
      setState((prevState) => ({
        ...prevState,
        getNewCars: newCars,
      }));
    } catch (error) {
      console.error("Error fetching new cars:", error);
    }
  }, [pageNewCar]);

  const getAllCars = useCallback(async () => {
    try {
      const allCars = await fetchCars(pageAllCar);
      setState((prevState) => ({
        ...prevState,
        prevCars: prevState.getAllCars,
        getAllCars: allCars,
      }));
    } catch (error) {
      console.error("Error fetching new cars:", error);
    }
  }, [pageAllCar, setState]);

  const getTestimony = useCallback(async () => {
    try {
      const testimonyData = await fetchTestimony(pageTestimony);
      setState((prevState) => ({
        ...prevState,
        prevTestimony: prevState.getTestimony,
        getTestimony: testimonyData,
      }));
    } catch (error) {
      console.error("Error fetching testimony:", error);
    }
  }, [pageTestimony]);

  useEffect(() => {
    const fetchData = async () => {
      await getSliders();
      await getCompanyProfile();
      await getAllCars();
      await getKind();
      await getBlog();
      await getTestimony();
      await getCarPromos();
      await getNewCars();
      await getRecCars();
    };

    fetchData();
  }, [
    getBlog,
    getTestimony,
    getCarPromos,
    getNewCars,
    getAllCars,
    getSliders,
    getKind,
    getCompanyProfile,
    getRecCars,
  ]);

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
};

const useStateContext = () => useContext(StateContext);

export { StateProvider, useStateContext };
