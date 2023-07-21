import withUILayout from "@/components/withUILayout";
import styles from "@/styles/ProductDetail.module.css";
import axios from "axios";
import { set } from "mongoose";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [isValid, setIsValid] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState();

  useEffect(() => {
    if (router.isReady) {
      getElementById(router.query.id);

    }
  }, [router.isReady]);


  useEffect(() => {
    setAmount(quantity * product.price);

  }, [quantity])



  async function getElementById(id) {
    const result = await axios.post("/api/ui/products/getById", { _id: id });
    setProduct(result.data);
    setAmount(result.data.price);
  }

  // {`${styles.bg}`}

  function changeImage(val) {
    setSelectedImage(val);
  }

  function quantityPlus() {
    const quantityNew = quantity + 1;
    setQuantity(quantityNew)
  }
  function quantityMinus() {

    const quantityNew = quantity - 1;

    if (quantityNew > 0) {
      setQuantity(quantityNew)
    }
    else {
      setQuantity(1);
    }

  }



  return (
    <div>

      <div className="container col-xxl-8 px-4 py-5 ">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-lg-5 mx-auto ">
            <h4 className=" fw-bold  mb-3 nameDetail ">{product.name}</h4>
            <p className="priceDetail">
              Fiyat: <span className="priceDetailSpan">{product.price}₺ </span>{" "}
            </p>
            <p>Kategori: {(product.categories?.[0] ?? {}).name}</p>
            <p>Kalan Adet: {product.stock}</p>
            <p>Satıcı Firma: {(product.sellers?.[0] ?? {}).name}</p>
            <p>Ödenecek Tutar: {amount} ₺</p>

            <div className="d-flex col-3 mb-3 ">

              <button className="quantityBtnPlus" onClick={quantityPlus}>+</button>

              <span className="quantitySpan">
                {quantity}
              </span>
              <button className="quantityBtnMinus " onClick={quantityMinus}>-</button>
            </div>


            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button
                type="button"
                className="  addToCart  px-4 me-md-2 btn-lg"
              >
                Sepete Ekle
              </button>
              <button type="button" className=" addToFavori px-4">
                <i className="fa-solid fa-heart fa-lg me-2"></i>Favorilere ekle
              </button>
            </div>


          </div>

          <div className="col-10 col-lg-1 "></div>

          <div className="col-10 col-lg-5 imgDetail mx-auto">
            <img
              src={selectedImage || product.mainImageUrl}
              width="500"
              height="500"
            />

            <div className=" row rows-sm-2 mt-5">
              <div className="col  imgDetails">
                <img src={product.mainImageUrl} onClick={() => changeImage(product.mainImageUrl)} />
              </div>
              {product.imageUrls?.map((val, index) => {

                return (
                  <div className="col imgDetails" key={index}>
                    <img src={val} onClick={() => changeImage(val)} />
                  </div>
                );
              })}
            </div>


          </div>

        </div>

      </div>

    </div>
  );
}

export default withUILayout(ProductDetail);
