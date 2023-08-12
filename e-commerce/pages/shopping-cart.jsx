import withUILayout from "@/components/withUILayout";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import styles from "@/styles/ShoppingCart.module.css";

function ShoppingCart() {
  const [shoppingCarts, setShoppingCarts] = useState([]);
  const [user, setUser] = useState({});
  const [quantity, setQuantity] = useState({});
  const [total, setTotal] = useState(0);
  const [inputs, setInputs] = useState({});
  const elRefs = useRef([]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
      const user = JSON.parse(localStorage.getItem("user"));
      getAll(user);
    }
  }, []);

  useEffect(() => {
    let t = 0;
    for (let val of shoppingCarts) {
      t += val.quantity * val.products[0]?.price;
    }
    setTotal(t);
  }, [shoppingCarts]);

  useEffect(() => {
    checkValidations();
  }, [inputs]);

  async function getAll(user) {
    const result = await axios.post("/api/ui/shoppingCarts/getAll", {
      userId: user._id,
    });
    setShoppingCarts(result.data);
  }

  async function quantityPlus(val) {
    let quantityNew = val.quantity;
    if (val.quantity < val.products[0]?.stock) {
      quantityNew++;
      await axios.post("/api/ui/shoppingCarts/updated", {
        id: val._id,
        quantity: quantityNew,
      });

      getAll(user);
    } else {
      console.log("fazla ürün ekleyemezsiniz");
    }
  }

  async function quantityMinus(val) {
    let quantityNew = val.quantity;
    quantityNew--;

    if (quantityNew > 0) {
      const result = await axios.post("/api/ui/shoppingCarts/updated", {
        id: val._id,
        quantity: quantityNew,
      });
      getAll(user);
    } else {
      // ürün sil
      removeById(val);
    }
  }

  const removeById = async (val) => {
    const result = window.confirm(
      `${val.products[0]?.name} ürünü sepetten silmek istiyor musunuz?`
    );
    if (result) {
      const apiResponse = await axios.post("/api/ui/shoppingCarts/removeById", {
        id: val._id,
      });

      toast(apiResponse.data.message);
      getAll(user);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev) => ({ ...prev, [name]: value }));

    if (!e.target.validity.valid) {
      e.target.classList.add("is-invalid");
      e.target.classList.remove("is-valid");
    } else {
      e.target.classList.remove("is-invalid");
      e.target.classList.add("is-valid");
    }
  };

  function checkValidations() {
    if (
      elRefs.current["name"]?.validity.valid &&
      elRefs.current["cartNumber"]?.validity.valid &&
      elRefs.current["expireDate"]?.validity.valid &&
      elRefs.current["cvv"]?.validity.valid
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  async function pay() {
    if (isValid) {
      const result = await axios.post("/api/ui/orders/add", {
        userId: user._id,
      });
      toast("Siparişiniz alındı ...");
      getAll(user);
      setInputs({});
    } else {
      for (let key in elRefs.current) {
        if (!elRefs.current[key].validity.valid) {
          elRefs.current[key].classList.add("is-invalid");
          elRefs.current[key].classList.remove("is-valid");
        }
      }
    }
  }

  return (
    <div className="container mt-5">
      <div className="d-flex  justify-content-center">
        <div className="col-8 me-5">
          <div className="my-3 p-3  rounded shadow-lg ">
            <h6 className=" pb-2 mb-0">Sepetim</h6>{" "}
            {shoppingCarts.map((val, index) => {
              return (
                <div key={index}>
                  {" "}
                  <div className=" row d-flex align-items-center  p-3  border-top pb-3 ">
                    <div className=" col-sm-12 col-md-3">
                      <img
                        src={val.products[0]?.mainImageUrl}
                        className="shoppingCartsImg me-5"
                      />
                    </div>
                    <div className=" col-sm-12 col-md-3">
                      {" "}
                      <p>{val.products[0]?.name} -@satıcı</p>
                    </div>
                    <div className=" col-sm-12 col-md-2">
                      <button
                        className="quantityBtnPlus "
                        onClick={() => quantityPlus(val)}
                      >
                        +
                      </button>
                      <span className="quantitySpan p-2">{val.quantity}</span>
                      <button
                        className="quantityBtnMinus "
                        onClick={() => quantityMinus(val)}
                      >
                        -
                      </button>
                    </div>
                    <div className=" col-sm-12 col-md-3">
                      <p className="priceDetail">
                        <span className="priceDetailSpan ">
                          Fiyat:{val.products[0]?.price} ₺ Toplam :
                          {val.quantity * val.products[0]?.price}₺
                        </span>
                      </p>
                    </div>
                    <div className=" col-sm-12 col-md-1">
                      {" "}
                      <button
                        className="btn theme"
                        type="button"
                        onClick={() => removeById(val)}
                      >
                        <i className="fa-solid fa-x"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {shoppingCarts == "" ? (
              <h5 className="text-center text-secondary  p-5">
                {" "}
                <i className="fa-regular fa-face-grin-wide fa-2xl me-2"></i>
                Sepete Ürün Ekle{" "}
              </h5>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-4">
          {/* <div className="my-2 p-3 bg-body rounded shadow-lg">
            <div className="list-group">
              <label className="list-group-item d-flex gap-2">
                <input
                  className="form-check-input flex-shrink-0"
                  type="radio"
                  name="listGroupRadios"
                  id="listGroupRadios1"
                  value=""
                  checked=""
                />
                <span>
                  First radio
                  <small className="d-block text-body-secondary">
                    With support text underneath to add more detail
                  </small>
                </span>
              </label>
              <label className="list-group-item d-flex gap-2">
                <input
                  className="form-check-input flex-shrink-0"
                  type="radio"
                  name="listGroupRadios"
                  id="listGroupRadios2"
                  value=""
                />
                <span>
                  Second radio
                  <small className="d-block text-body-secondary">
                    Some other text goes here
                  </small>
                </span>
              </label>
              <label className="list-group-item d-flex gap-2">
                <input
                  className="form-check-input flex-shrink-0"
                  type="radio"
                  name="listGroupRadios"
                  id="listGroupRadios3"
                  value=""
                />
                <span>
                  Third radio
                  <small className="d-block text-body-secondary">
                    And we end with another snippet of text
                  </small>
                </span>
              </label>
            </div>

            <button className="AdresAddBtn mt-3">Yeni Adres Ekle</button>
          </div> */}
          <div className="my-2 p-3  rounded shadow-lg">
            <p>ödeme bilgileri</p>
            <h1>{total}</h1>
            <button
              data-bs-toggle="modal"
              data-bs-target="#paymentModal"
              className="btn btn-danger w-100"
            >
              <i className="fa-solid fa-credit-card"></i>
              <span className="ms-2">Ödeme Yap</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ödeme Modal */}
      <div
        className="modal fade text-dark"
        id="paymentModal"
        tabIndex={-1}
        aria-labelledby="paymentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-5">
            <button
              type="button"
              className="btn-close  "
              data-bs-dismiss="modal"
              aria-label="Close"
            />

            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Kart Sahibin Adı</label>
                <input
                  className="form-control"
                  id="name"
                  name="name"
                  required
                  autoComplete="off"
                  minLength={3}
                  ref={(ref) => (elRefs.current["name"] = ref)}
                  value={inputs["name"] || ""}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">
                  Kart sahibin adı boş olamaz
                </div>
              </div>

              <div className="form-group mt-1">
                <label htmlFor="cartNumber">Kart Numarası</label>
                <input
                  className="form-control"
                  id="cartNumber"
                  name="cartNumber"
                  required
                  autoComplete="off"
                  minLength={16}
                  maxLength={16}
                  ref={(ref) => (elRefs.current["cartNumber"] = ref)}
                  value={inputs["cartNumber"] || ""}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">
                  Kart numarası 16 karakter olmalıdır
                </div>
              </div>

              <div className="row">
                <div className="col-6 ">
                  <div className="form-group mt-1">
                    <label htmlFor="expireDate">Son Kullanma Tarihi</label>
                    <input
                      className="form-control"
                      id="expireDate"
                      name="expireDate"
                      required
                      autoComplete="off"
                      minLength={7}
                      maxLength={7}
                      ref={(ref) => (elRefs.current["expireDate"] = ref)}
                      value={inputs["expireDate"] || ""}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                      Son kullanma tarihi aa/yyyy olmalıdır
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="form-group mt-1">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      className="form-control"
                      id="cvv"
                      name="cvv"
                      required
                      autoComplete="off"
                      minLength={3}
                      maxLength={3}
                      ref={(ref) => (elRefs.current["cvv"] = ref)}
                      value={inputs["cvv"] || ""}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                      CVV alanı 3 karakter olmalıdır
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={pay}
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-danger w-100"
              >
                Ödeme Yap
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withUILayout(ShoppingCart);
