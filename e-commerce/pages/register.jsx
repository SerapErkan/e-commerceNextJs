import { useEffect, useRef, useState } from "react";
import withUILayout from "@/components/withUILayout";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

function register() {
  const [inputs, setInputs] = useState({});
  const [isValid, setIsValid] = useState(false);
  const elRefs = useRef({});
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      console.log("daha önce giriş yapıldı");
      router.push("/");
    }
  }, []);

  const handleChange = (e) => {
    let passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>]{5,}$/;
    let phonePattern = /^\d{11}$/;
    let elpassword = elRefs.current["password"];
    let elrepassword = elRefs.current["repassword"];

    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev) => ({ ...prev, [name]: value }));

    if (name == "password") {
      if (passwordPattern.test(e.target.value)) {
        validateInput(e, true);
      } else {
        validateInput(e, false);
      }
    } else if (name == "repassword") {
      {
        if (elrepassword.value == elpassword.value) {
          validateInput(e, true);
        } else {
          validateInput(e, false);
        }
      }
    } else if (name == "phoneNumber") {
      if (phonePattern.test(e.target.value)) {
        validateInput(e, true);
      } else {
        validateInput(e, false);
      }
    } else {
      validateInput(e, true);
    }

    handleValidation();
  };

  const validateInput = (e, regex) => {
    if (e.target.validity.valid && regex == true) {
      e.target.classList.remove("is-invalid");
      e.target.classList.add("is-valid");
    } else {
      e.target.classList.add("is-invalid");
      e.target.classList.remove("is-valid");
    }
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
    await axios
      .post("/api/ui/auth/register", inputs)

      .then((res) => {
        router.push("/login");
      })
      .catch((err) => {
        console.log(err.response?.data?.message);
      });
  }

  return (
    <>
      <div className="container row text-center mx-auto mb-5 p-5  ">
        <div className="mx-auto  registerContainer col-sm-12 col-md-10 col-lg-7  p-5   ">
          <div className="d-flex flex-column w-25 register-btn-container ">
            <Link href="/" className="  register-btn-link ">
              <i class="fa-solid fa-house"></i>
            </Link>
            <span className="register-span"> Anasayfa</span>
            <Link href="/admin/register" className=" register-btn-link ">
              <i className="fa-regular fa-building"></i>
            </Link>
            <span className="register-span">Firma Kayıt</span>
            <Link href="/login" className=" register-btn-link ">
              <i className="fa-regular fa-user "></i>
            </Link>
            <span className="register-span">Kullanıcı Giriş</span>
          </div>

          <h1 className="text-center ">Kullanıcı Kayıt Sayfası</h1>
          <p className="text-center">Kullanıcı Bilgileri</p>

          <form
            className="row g-2 p-5 m-5  "
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            ref={(ref) => (elRefs.current["form"] = ref)}
          >
            <div className="form-floating col-sm-12  mb-3">
              <input
                onChange={handleChange}
                value={inputs["name"] || ""}
                className="form-control"
                name="name"
                id="name"
                type="name"
                required
                minLength="3"
              />
              <label htmlFor="emailOrPhoneNumber">Ad ve Soyad</label>
              <div className="invalid-feedback">Geçerli bir isim giriniz </div>
            </div>
            <div className="form-floating col-sm-12  mb-3">
              <input
                onChange={handleChange}
                value={inputs["email"] || ""}
                type="email"
                className="form-control"
                name="email"
                id="email"
                required
                minLength="5"
                maxLength={8}
                ref={(ref) => (elRefs.current["email"] = ref)}
              />
              <label htmlFor="email">Mail Adresi</label>
              <div className="invalid-feedback">
                Geçerli bir mail adresi giriniz{" "}
              </div>
            </div>
            <div className="form-floating col-sm-12  mb-3">
              <input
                onChange={handleChange}
                value={inputs["phoneNumber"] || ""}
                type="text"
                className="form-control"
                name="phoneNumber"
                id="phoneNumber"
                required
                minLength="5"
                maxLength={11}
                ref={(ref) => (elRefs.current["phoneNumber"] = ref)}
              />
              <label htmlFor="password">Telefon Numarası</label>
              <div className="invalid-feedback">
                Geçerli bir telefon numarası giriniz{" "}
              </div>
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
              <input
                onChange={handleChange}
                value={inputs["repassword"] || ""}
                type="text"
                className="form-control"
                name="repassword"
                id="repassword"
                required
                minLength="5"
                maxLength={8}
                ref={(ref) => (elRefs.current["repassword"] = ref)}
              />
              <label htmlFor="repassword">rePassword</label>
              <div className="invalid-feedback">
                Geçerli bir repassword giriniz{" "}
              </div>
            </div>

            <div className="form-floating col-sm-12  mb-3">
              <button
                type="submit"
                className="btn btn-primary register-btn w-50  "
                disabled={!isValid}
              >
                login
              </button>
            </div>

            <Link href="/login" className=" register-link ">
              Zaten kayıtınız var mı? Giriş sayfasına gidiniz
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default register;
