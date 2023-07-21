import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function login() {
  const elRefs = useRef({});
  const [inputs, setInputs] = useState({});
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      router.push("/");
      console.log("daha önce giriş yapıldı");
    }
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev) => ({ ...prev, [name]: value }));
    if (e.target.validity.valid) {
      e.target.classList.remove("is-invalid");
      e.target.classList.add("is-valid");
    } else {
      e.target.classList.add("is-invalid");
      e.target.classList.remove("is-valid");
    }
    handleValidation();
  };
  const handleValidation = () => {
    const form = elRefs.current["form"];
    const isValid = form.checkValidity();
    console.log("isvalid", isValid);
    setIsValid(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      register();
    } else {
      elRefs.current["registerBtn"].setAttribute("disabled", "disabled");
      console.log("güvenlik önlemleri ...");
    }
  };

  async function register() {
    console.log(inputs);

    await axios
      .post("/api/ui/auth/login", inputs)
      .then((res) => {
        console.log("data ", res.data);
        localStorage.setItem(
          "accessToken",
          JSON.stringify(res.data.accessToken)
        );
        localStorage.setItem("user", JSON.stringify(res.data.user));
        router.push("/");
      })
      .catch((err) => {
        console.log(err.response?.data?.message);
      });
  }

  return (
    <div className="container row text-center mx-auto mt-5">
      <div className="mx-auto  col-sm-6 col-md-6 col-lg-6 border p-5  rounded mt-5">
        <h1 className="text-center ">Kullanıcı Griş Sayfası</h1>
        <p className="text-center">Kullanıcı Bilgileri</p>

        <form
          className="row g-3 d-flex  justfy-content-center"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          ref={(ref) => (elRefs.current["form"] = ref)}
        >
          <div className="form-floating col-sm-10  mb-3">
            <input
              onChange={handleChange}
              value={inputs["emailOrPhoneNumber"] || ""}
              className="form-control"
              name="emailOrPhoneNumber"
              id="emailOrPhoneNumber"
              type="emailOrPhoneNumber"
              required
              minLength="3"
            />
            <label htmlFor="emailOrPhoneNumber">Email veya Numara</label>
            <div className="invalid-feedback">Geçerli bir email giriniz </div>
          </div>
          <div className="form-floating col-sm-10  mb-3">
            <input
              onChange={handleChange}
              value={inputs["password"] || ""}
              type="text"
              className="form-control"
              name="password"
              id="password"
              required
              minLength="5"
              maxLength={8}
              ref={(ref) => (elRefs.current["password"] = ref)}
            />
            <label htmlFor="password">Password</label>
            <div className="invalid-feedback">
              Geçerli bir password giriniz{" "}
            </div>
          </div>
          <div className="form-floating col-sm-10  mb-3">
            <button
              type="submit"
              className="btn btn-primary private w-75"
              disabled={!isValid}
            >
              login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
