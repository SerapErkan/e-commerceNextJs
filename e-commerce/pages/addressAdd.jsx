import UILayout from "@/components/uiLayout";
import withUILayout from "@/components/withUILayout";
import React, { useEffect, useRef, useState } from "react";
import address from "../pages/data";
import axios from "axios";
import Link from "next/link";

function addressAdd() {
  const [inputs, setInputs] = useState({});
  const elRefs = useRef({});
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState([]);
  const [city, setCity] = useState("");
  const [towns, setTowns] = useState("");
  const [district, setDistrict] = useState("");
  const [quarter, setQuarter] = useState("");

  const [user, setUser] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setData(address);
      handleValidation();
      console.log(address);
    }
  }, [inputs]);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    if (name == "city") {
      setCity(value);
      setInputs((prev) => ({ [name]: value }));
    }
    if (name == "towns") {
      setTowns(value);
    }

    if (name == "district") {
      setDistrict(value);
    }

    if (name == "neighbourhood") {
      setQuarter(value);
      console.log("beni buldu mahalle", value);
    }

    console.log(name, value);
    console.log(city);

    setInputs((prev) => ({ ...prev, [name]: value }));

    if (!e.target.validity.valid) {
      e.target.classList.add("is-invalid");
      e.target.classList.remove("is-valid");
    } else {
      e.target.classList.remove("is-invalid");
      e.target.classList.add("is-valid");
    }
  }
  const handleValidation = () => {
    const form = elRefs.current["form"];
    const isValid = form.checkValidity();
    console.log("isvalid", isValid);
    setIsValid(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      add();
      console.log("geldi");
    } else {
      elRefs.current["addBtn"].setAttribute("disabled", "disabled");
      console.log("güvenlik önlemleri ...");
    }
  };
  async function add() {
    if (user) {
      console.log(user);
      const newAddress = {
        userId: user._id,
        city: data[city].name, //şehir
        towns: data[city].towns[towns].name,
        district: data[city].towns[towns].districts[district].name, //ilçe
        neighbourhood:
          data[city].towns[towns].districts[district].quarters[quarter].name, //mahalle
        description: inputs["description"], //acıklama apartman bilgisi
        street: inputs["street"], //sokak
      };
      console.log(newAddress);
      const result = await axios.post("/api/ui/address/add", newAddress);
    }
  }

  return (
    <>
      <div className=" container shadow-lg  p-5">
        <h3 className="text-center m-5">Adresinizi Lütfen Giriniz</h3>
        {data ? (
          <form
            className=" row g-3 px-5 mx-5  justify-content-center"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            ref={(ref) => (elRefs.current["form"] = ref)}
          >
            <>
              <div className="form-floating col-sm-12  col-md-8 mb-3">
                <select
                  className="form-control"
                  name="city"
                  id="city"
                  onChange={handleChange}
                  value={inputs["city"] || ""}
                  required
                  // ref={(ref) => (elRefs.current["city"] = ref)}
                >
                  <option value="">..</option>
                  {data.map((val, index) => (
                    <option key={index} value={index}>
                      {val.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="district">İl</label>
                <div className="invalid-feedback">
                  Geçerli bir adres giriniz{" "}
                </div>
              </div>
              {city ? (
                <>
                  <div className="form-floating col-sm-12 col-md-8 mb-3">
                    <select
                      onChange={handleChange}
                      value={inputs["towns"] || ""}
                      className="form-control"
                      name="towns"
                      id="towns"
                      type="text"
                    >
                      {" "}
                      <option value=""></option>
                      {data[city].towns.map((val, index) => (
                        <option key={index} value={index}>
                          {val.name}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="towns">Bölge</label>
                    <div className="invalid-feedback">
                      Geçerli bir adres giriniz{" "}
                    </div>
                  </div>

                  {towns ? (
                    <>
                      {" "}
                      <div className="form-floating col-sm-12 col-md-8 mb-3">
                        <select
                          className="form-control"
                          name="district"
                          id="district"
                          onChange={handleChange}
                          value={inputs["district"] || ""}
                          required
                          // ref={(ref) => (elRefs.current["district"] = ref)}
                        >
                          <option value="">...</option>{" "}
                          {data[city].towns[towns].districts.map(
                            (val, index) => (
                              <option key={index} value={index}>
                                {val.name}
                              </option>
                            )
                          )}
                        </select>
                        <label htmlFor=" district">İlçe</label>
                        <div className="invalid-feedback">
                          Geçerli bir adres giriniz{" "}
                        </div>
                      </div>
                      {district ? (
                        <>
                          <div className="form-floating col-sm-12 col-md-8 mb-3">
                            <select
                              onChange={handleChange}
                              value={inputs["neighbourhood"] || ""}
                              className="form-control"
                              name="neighbourhood"
                              id="neighbourhood"
                            >
                              <option value=""></option>
                              {data[city].towns[towns].districts[
                                district
                              ].quarters.map((val, index) => (
                                <option key={index} value={index}>
                                  {val.name}
                                </option>
                              ))}
                            </select>
                            <label htmlFor="neighbourhood">Mahalle</label>
                            <div className="invalid-feedback">
                              Geçerli bir adres giriniz{" "}
                            </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
            </>
            <div className="form-floating col-sm-12 col-md-8 mb-3">
              <input
                onChange={handleChange}
                value={inputs["street"] || ""}
                className="form-control"
                name="street"
                id="street"
                type="text"
                required
                minLength="3"
              />

              <label htmlFor="street">Sokak</label>
              <div className="invalid-feedback">Geçerli bir adres giriniz </div>
            </div>
            <div className="form-floating col-sm-12 col-md-8 mb-3">
              <input
                onChange={handleChange}
                value={inputs["description"] || ""}
                className="form-control"
                name="description"
                id="description"
                required
                minLength="3"
              />

              <label htmlFor=" description">Apartman Bilgisi</label>
              <div className="invalid-feedback">Geçerli bir adres giriniz </div>
            </div>{" "}
            <Link
              href="/shopping-cart"
              type="submit"
              className="btn btn-primary m-5 p-3 register-btn d-block w-50"
              disabled={!isValid}
              ref={(ref) => (elRefs.current["addBtn"] = ref)}
            >
              login
            </Link>
          </form>
        ) : (
          ""
        )}
        il sokak: mahalle il ilçe addres apartman bilgisi
      </div>
    </>
  );
}
export default withUILayout(addressAdd);
