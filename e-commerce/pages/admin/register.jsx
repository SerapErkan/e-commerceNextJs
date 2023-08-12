import { cityList } from "@/services/cityList";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function register() {
  const cities = cityList;
  const elRefs = useRef({});
  const [isValid, setIsValid] = useState(false);
  const [inputs, setInputs] = useState({});
  const router = useRouter();

  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleChange = (e) => {
    let identityNumberPattern = /^\d{10,11}$/;
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
    } else if (name == "identityNumber") {
      if (identityNumberPattern.test(e.target.value)) {
        validateInput(e, true);
      } else {
        validateInput(e, false);
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
    console.log(inputs);

    const result = await axios
      .post("/api/admin/auth/register", inputs)
      .then((res) => {
        console.log(res.data);
        router.push("/admin/login");
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }

  return (
    <div className="container row text-center mx-auto mt-5">
      <div className="mx-auto registerContainer col-sm-12 col-md-8 col-lg-8  mt-5 p-5   ">
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

        <h1>Firma Kayıt Sayfası</h1>
        <p>Firmanıza ait bilgileri doldurun</p>

        <div className="col-sm-12 col-md-8  mb-3 mx-auto ">
          <div className=" d-flex flex-column  ">
            {inputs["imageUrl"] ? (
              <div className="">
                <img src={inputs["imageUrl"] || ""} className="register-logo" />
              </div>
            ) : (
              <img src="/images/2.png" className="register-img " />
            )}
          </div>
        </div>

        <form
          className="row g-3"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          ref={(ref) => (elRefs.current["form"] = ref)}
        >
          <div className="form-floating col-sm-12  mb-3">
            <input
              onChange={handleChange}
              value={inputs["name"] || ""}
              type="text"
              className="form-control"
              name="name"
              id="name"
              required
              minLength="3"
            />
            <label htmlFor="name">Firma Adı</label>
            <div className="invalid-feedback">Geçerli bir firma adı yazın</div>
          </div>

          <div className="form-floating col-sm-4  mb-3">
            <input
              onChange={handleChange}
              value={inputs["identityNumber"] || ""}
              name="identityNumber"
              id="identityNumber"
              className="form-control"
              required
              type="number"
              ref={(ref) => (elRefs.current["identityNumber"] = ref)}
            />

            <label htmlFor="identityNumber">TC/VNo</label>
            <div className="invalid-feedback">
              Geçerli bir TC ya da VNO girin
            </div>
          </div>
          <div className="form-floating col-sm-4  mb-3">
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
            <div className="invalid-feedback">
              Geçerli bir email adresi girin
            </div>
          </div>

          <div className="form-floating col-sm-4 mb-3">
            <input
              onChange={handleChange}
              value={inputs.phoneNumber || ""}
              className="form-control"
              name="phoneNumber"
              id="phoneNumber"
              type="number"
              required
              ref={(ref) => (elRefs.current["phoneNumber"] = ref)}
            />

            <label htmlFor="phoneNumber">Tel No:</label>
            <div className="invalid-feedback">
              Geçerli bir telefon numarası girin
            </div>
          </div>

          <div className="form-floating col-sm-6  mb-3">
            <input
              onChange={handleChange}
              value={inputs["password"] || ""}
              className="form-control"
              name="password"
              id="password"
              type="password"
              required
              minLength="5"
              maxLength={8}
              ref={(ref) => (elRefs.current["password"] = ref)}
            />
            <label htmlFor="password">Password</label>
            <div className="invalid-feedback">Geçerli bir password girin</div>
          </div>
          <div className="form-floating col-sm-6  mb-3">
            <input
              onChange={handleChange}
              value={inputs["repassword"] || ""}
              className="form-control"
              name="repassword"
              id="repassword"
              type="password"
              required
              minLength="3"
              ref={(ref) => (elRefs.current["repassword"] = ref)}
            />
            <label htmlFor="repassword">Re-Password</label>
            <div className="invalid-feedback">Parolalar eşleşmedi</div>
          </div>

          <div className="form-floating col-sm-3 mb-3">
            <select
              className="form-control"
              name="city"
              id="city"
              onChange={handleChange}
              value={inputs["city"] || ""}
              required
            >
              <option value="">Şehir seçin</option>
              {cities.map((val, index) => (
                <option key={index}>{val}</option>
              ))}
            </select>
            <label htmlFor="city">Şehir</label>
            <div className="invalid-feedback">Şehir seçin</div>
          </div>

          <div className="form-floating col-sm-9  mb-3">
            <input
              onChange={handleChange}
              value={inputs["address"] || ""}
              className="form-control"
              id="address"
              name="address"
              type="text"
              required
              minLength="3"
            />
            <label htmlFor="address">Adres</label>
            <div className="invalid-feedback">Geçerli bir adres girin</div>
          </div>

          <div className="form-floating col-sm-12   mb-3">
            <input
              onChange={handleChange}
              value={inputs["imageUrl"] || ""}
              className="form-control"
              name="imageUrl"
              id="imageUrl"
              required
              minLength={10}
              type="text"
            />
            <label htmlFor="imageUrl">Logo</label>
            <div className="invalid-feedback">
              Geçerli bir şirket logosu girin
            </div>
          </div>
          <div className="col-sm-4 mx-auto">
            <button
              type="submit"
              className="btn btn-primary register-btn w-100 py-2 "
              disabled={!isValid}
              ref={(ref) => (elRefs.current["registerBtn"] = ref)}
            >
              <i className="fa-solid fa-notes-medical mx-2"></i>
              Kayıt Ol
            </button>
          </div>
          <div className="col-sm-12 ">
            <Link className="register-link" href="/admin/login">
              Zaten kayıtınız var mı? Giriş sayfasına gidiniz
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

{
  /* <input
  onChange={handleChange}
  value={inputs["imageUrl"] || ""}
  className="form-control"
  name="imageUrl"
  id="imageUrl"
  type="file"
  accept="image/*"
  required
  ref={(ref) => (elRefs.current["imageUrl"] = ref)}
/>; */
}
