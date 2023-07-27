import withUILayout from "@/components/withUILayout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ShoppingCart() {
  const [shoppingCarts, setShoppingCarts] = useState([]);
  const [user, setUser] = useState({});
  const [quantity, setQuantity] = useState({});
  const [total, setTotal] = useState(0);

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
  }, shoppingCarts);

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

  return (
    <div className="container mt-5">
      <div className="d-flex  justify-content-center">
        <div className="col-8 me-5">
          <div className="my-3 p-3 bg-body rounded shadow-lg shoppingCarts">
            {shoppingCarts.map((val, index) => {
              return (
                <>
                  {" "}
                  <h6 className=" pb-2 mb-0">Sepetim</h6>{" "}
                  <div
                    className=" row d-flex align-items-center  p-3  border-top pb-3 "
                    key={index}
                  >
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
                          Fiyat:{val.products[0]?.price} ₺ Toplam :{total}₺
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
                </>
              );
            })}

            {shoppingCarts == "" ? (
              <h5 className="text-center text-secondary  p-5">
                {" "}
                <i class="fa-regular fa-face-grin-wide fa-2xl me-2"></i>
                Sepete Ürün Ekle{" "}
              </h5>
            ) : (
              ""
            )}
          </div>
        </div>
        {/* <div className="col-4">
          <div className="my-2 p-3 bg-body rounded shadow-lg">
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
          </div>
          <div className="my-2 p-3 bg-body rounded shadow-lg">
            <p>ödeme bilgileri</p>
            <h1>20.400</h1>
            <button>ödeme yap</button>
          </div>
        </div> */}
      </div>
    </div>
  );
}
export default withUILayout(ShoppingCart);
