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
    getBlog: null,
    getTestimony: null,
    prevTestimony: null, // New state variable to hold the previous testimony data
  });

  const { pageNewCar, pageCarPromo, pageTestimony, pageAllCar } = state;

  const getCarPromos = useCallback(async () => {
    try {
      const carPromos = await fetchCarPromos(pageCarPromo);
      setState((prevState) => ({
        ...prevState,
        getCarPromos: carPromos,
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
        getAllCars: allCars,
      }));
    } catch (error) {
      console.error("Error fetching new cars:", error);
    }
  }, [pageAllCar]);

  const getTestimony = useCallback(async () => {
    try {
      const testimonyData = await fetchTestimony(pageTestimony);
      setState((prevState) => ({
        ...prevState,
        prevTestimony: prevState.getTestimony, // Save previous testimony data
        getTestimony: testimonyData,
      }));
    } catch (error) {
      console.error("Error fetching testimony:", error);
    }
  }, [pageTestimony]);

  useEffect(() => {
    const fetchData = async () => {
      await getTestimony();
      await getBlog();
      await getCarPromos();
      await getNewCars();
      await getAllCars();
    };

    fetchData();
  }, [getBlog, getTestimony, getCarPromos, getNewCars, getAllCars]);

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
};

const useStateContext = () => useContext(StateContext);

export { StateProvider, useStateContext };
