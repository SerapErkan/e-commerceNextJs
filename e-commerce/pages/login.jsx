import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import withUILayout from "@/components/withUILayout";
import Link from "next/link";
import { toast } from "react-toastify";

function login() {
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
        localStorage.setItem(
          "accessToken",
          JSON.stringify(res.data.accessToken)
        );
        localStorage.setItem("user", JSON.stringify(res.data.user));
        router.push("/");
      })
      .catch((err) => {
        toast(err.response?.data?.message);
      });
  }

  return (
    <div className="container row text-center mx-auto mt-5">
      <div
        className="mx-auto  col-sm-12 col-md-8 col-lg-6  p-5  
      registerContainer mt-5"
      >
        <div className="d-flex flex-column w-25 register-btn-container ">
          <Link href="/" className="  register-btn-link ">
            <i class="fa-solid fa-house"></i>
          </Link>
          <span className="register-span">Anasayfa</span>
          <Link href="/admin/login" className=" register-btn-link ">
            <i className="fa-regular fa-building"></i>
          </Link>
          <span className="register-span">Firma Giriş</span>

          <Link href="/register" className=" register-btn-link ">
            <i className="fa-regular fa-user "></i>
          </Link>
          <span className="register-span">Kullanıcı Kayıt</span>
        </div>

        <h2 className="text-center ">Kullanıcı Griş Sayfası</h2>
        <p className="text-center">Kullanıcı Bilgileri</p>

        <form
          className="row g-3 p-5 mx-4 "
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          ref={(ref) => (elRefs.current["form"] = ref)}
        >
          <div className="form-floating col-sm-12  mb-3">
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
          <div className="form-floating col-sm-12  mb-3">
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
          <div className="form-floating col-sm-12  mb-3">
            <button
              type="submit"
              className="btn btn-primary register-btn w-50"
              disabled={!isValid}
            >
              login
            </button>
          </div>
          <Link href="/register" className=" register-link ">
            {" "}
            Kullanıcı kayıdı oluşturmak istermisiniz?
          </Link>
        </form>
      </div>
    </div>
  );
}
export default login;
