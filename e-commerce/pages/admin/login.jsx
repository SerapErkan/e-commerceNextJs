import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function login() {
  const elRefs = useRef({});
  const [inputs, setInputs] = useState({});
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
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
      .post("/api/admin/auth/login", inputs)
      .then((res) => {
        console.log("data ", res.data);
        localStorage.setItem(
          "accessToken",
          JSON.stringify(res.data.accessToken)
        );
        localStorage.setItem("seller", JSON.stringify(res.data.seller));
        router.push("/admin/");
      })
      .catch((err) => {
        console.log(err.response?.data?.message);
      });
  }

  return (
    <div className="container row text-center mx-auto mt-5">
      <div className="mx-auto  col-sm-6 col-md-6 col-lg-6 border p-5  rounded mt-5">
        <h1 className="text-center">Firma Kayıt Sayfası</h1>
        <p className="text-center">Firmanıza ait bilgileri doldurun</p>

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
              value={inputs["email"] || ""}
              className="form-control"
              name="email"
              id="email"
              type="email"
              required
              minLength="3"
            />
            <label htmlFor="email">Email</label>
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
