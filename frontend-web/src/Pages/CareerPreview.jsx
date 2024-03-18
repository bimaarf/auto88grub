import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "../Components/Footer";
import { HighLightHeader } from "./Context/__HighLightHeader";
import { fetchDetailVacancy } from "./Service/__FetchDetailVacancy";
import { toast } from "react-toastify";
import axios from "axios";
import { LoadingScreen } from "../Components/___LoadingScreen";
import ReCAPTCHA from "react-google-recaptcha";

export const CareerPreview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [getData, setData] = useState({});
  const [imageFormat, setImageFormat] = useState(null);
  const [fileInput, setFileInput] = useState();
  const handleInputFile = (e) => {
    const file = e.target.files[0];

    if (!file.name.match(/\.(pdf)$/)) {
      toast.error("Image format does not match!");
      setImageFormat(null);
    } else {
      setFileInput(e.target.files[0]);
      setImageFormat(URL.createObjectURL(file));
    }
  };
  const fetchData = async () => {
    try {
      const response = await fetchDetailVacancy(location.search.split("=")[1]);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [formInput, setFormInput] = useState({
    name: "",
    phone_number: "",
    email: "",
    domicile: "",
    education: "",
    major: "",
    fresh_graduate: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormInput({ ...formInput, [name]: newValue });
  };

  const handleStore = async (e) => {
    e.preventDefault();
    if (typeof formInput.fresh_graduate !== "boolean") {
      toast.error("The fresh graduate field must be true or false.");
      return;
    }
    if (!fileInput || !fileInput.name.match(/\.(pdf)$/i)) {
      toast.error("Please upload a PDF file.");
      return;
    }

    const data = new FormData();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    data.append("name", formInput.name);
    data.append("phone_number", formInput.phone_number);
    data.append("email", formInput.email);
    data.append("domicile", formInput.domicile);
    data.append("education", formInput.education);
    data.append("major", formInput.major);
    data.append("fresh_graduate", formInput.fresh_graduate);
    data.append("file", fileInput);

    try {
      setIsLoading(true);
      const jobId = location.search.split("=")[1];
      await axios.get("sanctum/csrf-cookie");
      const response = await axios.post(
        `api/vacancy/application/${jobId}`,
        data,
        config
      );
      if (response.status === 200) toast.success("Successfully submitted");
    } catch (error) {
      toast.error("Masukkan data dengan benar");
    } finally {
      setIsLoading(false);
    }
  };
  const [veriCapcha, setVeriCapcha] = useState(false);

  const verifyCallback = (e) => {
    setVeriCapcha(true);
  };
  const recaptchaRef = useRef(null);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <HighLightHeader />
      <div className="md:container slide-in fade-in-left mb-44 bg-base-200 border border-base-300 rounded-xl -mt-20 p-4 md:p-20 sm:mx-2 md:mx-auto">
        <div className="flex justify-between items-start">
          <div role="tablist" className="tabs tabs-lifted md:w-2/3">
            <input
              type="radio"
              name="my_tabs_1"
              id="tab1"
              role="tab"
              className="tab"
              aria-controls="tabpanel1"
              aria-label="Description"
              checked
              onChange={(e) => e.preventDefault()}
            />
            <div
              id="tabpanel1"
              role="tabpanel"
              className="tab-content bg-base-100 border-b border-base-300 space-y-2 rounded-box p-6">
              <div className="space-y-2">
                <label htmlFor="job_description">Job Description</label>
                <div
                  className="prose whitespace-pre"
                  dangerouslySetInnerHTML={{
                    __html: getData.description,
                  }}></div>
              </div>
              <div className="space-y-2">
                <label htmlFor="job_description">Requirements</label>
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: getData.condition }}></div>
              </div>
            </div>
            <input
              type="radio"
              name="my_tabs_1"
              id="tab1"
              role="tab"
              className="tab"
              aria-controls="tabpanel1"
              aria-label="Apply"
              checked
              onChange={(e) => e.preventDefault()}
            />
            <div
              id="tabpanel1"
              role="tabpanel"
              className="tab-content bg-base-100 border-b border-base-300 space-y-2 rounded-box p-6">
              <div className="space-y-2">
                <label htmlFor="name">Nama Lengkap</label>
                <input
                  onChange={handleChange}
                  value={formInput.name}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="e.g. Tiara Hanifa, S.H"
                  className="form-control bg-base-200 px-2 py-2 w-full outline-none border border-base-200 focus:border-sky-500 rounded"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone_number">No. Telp</label>
                <input
                  onChange={handleChange}
                  value={formInput.phone_number}
                  type="number"
                  name="phone_number"
                  id="phone_number"
                  placeholder="e.g. 08XXXXXXXX"
                  className="form-control bg-base-200 px-2 py-2 w-full outline-none border border-base-200 focus:border-sky-500 rounded"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email">Email</label>
                <input
                  onChange={handleChange}
                  value={formInput.email}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="e.g. example@gmail.com"
                  className="form-control bg-base-200 px-2 py-2 w-full outline-none border border-base-200 focus:border-sky-500 rounded"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="domicile">
                  Domisili (Cth. Pontianak, Singkawang, dll)
                </label>
                <input
                  onChange={handleChange}
                  value={formInput.domicile}
                  type="domicile"
                  name="domicile"
                  id="domicile"
                  placeholder="e.g. Pontianak"
                  className="form-control bg-base-200 px-2 py-2 w-full outline-none border border-base-200 focus:border-sky-500 rounded"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="education">Pendidikan Terakhir</label>
                <input
                  onChange={handleChange}
                  value={formInput.education}
                  type="education"
                  name="education"
                  id="education"
                  placeholder="e.g. D3"
                  className="form-control bg-base-200 px-2 py-2 w-full outline-none border border-base-200 focus:border-sky-500 rounded"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="major">Jurusan</label>
                <input
                  onChange={handleChange}
                  value={formInput.major}
                  type="major"
                  name="major"
                  id="major"
                  placeholder="e.g. Akuntansi / Sistem Informasi / Dll"
                  className="form-control bg-base-200 px-2 py-2 w-full outline-none border border-base-200 focus:border-sky-500 rounded"
                />
              </div>
              <div className="space-y-2 flex items-baseline flex-row-reverse gap-2">
                <label htmlFor="fresh_graduate">
                  Fresh Graduate / Belum pernah bekerja
                </label>
                <input
                  onChange={handleChange}
                  checked={formInput.fresh_graduate} // Pastikan checkbox dicentang berdasarkan nilai state formInput
                  type="checkbox"
                  name="fresh_graduate"
                  id="fresh_graduate"
                />
              </div>

              <div className="space-y-2 flex items-baseline gap-2">
                {/* <label htmlFor="file">Lampirkan CV </label> */}
                <label
                  className="cursor-pointer border px-20 py-4 rounded-md"
                  htmlFor="file-input">
                  <div className="flex justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-normal text-xs mt-5">
                    Lampirkan CV (.pdf)
                  </p>
                  <p className="text-gray-500 font-normal text-xs mt-1 text-center">
                    (wajib)
                  </p>
                </label>
                <input
                  className="hidden"
                  type="file"
                  name="invoice"
                  accept="application/pdf"
                  id="file-input"
                  onChange={handleInputFile}
                />
              </div>
              <div className="flex justify-end items-center w-full">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  className="m-2 grecaptcha-badge"
                  sitekey="6LcarQQiAAAAAE36V_8MOsw4zM-BIfAMdHLKZDoa"
                  onChange={verifyCallback}
                  render="explicit"
                />
              </div>
              <div className="flex justify-end">
                <button
                  disabled={isLoading || !veriCapcha ? true : false}
                  onClick={handleStore}
                  className={`flex justify-center items-center gap-1 text-white bg-green-700 ${
                    !veriCapcha ? "brightness-50" : "hover:brightness-90"
                  } duration-300 px-6 py-4 rounded`}>
                  <i className="fas fa-paper-plane"></i>
                  <span>Apply Now</span>
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 hidden md:block">
            <img
              draggable={false}
              src={require("../Images/Vacancy/vacancy.png")}
              alt=""
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
