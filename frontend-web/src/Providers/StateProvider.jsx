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

const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [state, setState] = useState({
    pageNewCar: { page: 1, perPage: 6 },
    pageCarPromo: { page: 1, perPage: 12 },
    getCarPromos: null,
    getNewCars: null,
    getBlog: null,
  });

  const { pageNewCar, pageCarPromo } = state;

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

  useEffect(() => {
    const fetchData = async () => {
      await getBlog();
      await getCarPromos();
      await getNewCars();
    };

    fetchData();
  }, [getBlog, getCarPromos, getNewCars]);

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
};

const useStateContext = () => useContext(StateContext);

export { StateProvider, useStateContext };
