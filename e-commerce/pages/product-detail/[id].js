
import styles from "@/styles/ProductDetail.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import UINavbar from "@/components/uiNavbar"
function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [selectedImage, setSelectedImage] = useState("");
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState();
  const [user, setUser] = useState();



  useEffect(() => {
    if (router.isReady) {
      getElementById(router.query.id);
      setUser(JSON.parse(localStorage.getItem("user")));

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
    let quantityNew = 0;
    if (quantity < product.stock) {
      quantityNew = quantity + 1;
      setQuantity(quantityNew)
    }
    else {
      console.log("fazla ürün ekleyemezsiniz")
    }

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


  async function addShoppingCart() {

    if (user) {
      console.log(user);
      const data = {
        userId: user._id,
        productId: router.query.id,
        quantity: quantity
      };

      const result = await axios.post("/api/ui/shoppingCarts/add", data);
      router.push("/");
    }
    else {
      router.push("/login");

    }

  }

  return (
    <div>

      <UINavbar />
      <div className="container  mb-5 mt-5">
        <div className="row">
          <div className="col-10 col-lg-5  mx-auto ">
            <div className={`${styles.imgDetail} `}>
              <img src={selectedImage || product.mainImageUrl} />



              <div class={styles.categoryWrapper}>
                <img src={product.mainImageUrl} class={styles.imgCategory} onClick={() => changeImage(product.mainImageUrl)} />
                {product.imageUrls?.map((val, index) => {

                  return (
                    <div key={index}>
                      <img src={val} onClick={() => changeImage(val)} class={styles.imgCategory} />
                    </div>
                  );
                })}
              </div>

            </div>




          </div>
          <div className="col-10 col-lg-5  mx-auto mt-5 ">
            <h4 className={styles.nameDetail}>{product.name}</h4>
            <p className={styles.priceDetail}>
              Fiyat: <span className="priceDetailSpan">{product.price}₺ </span>{" "}
            </p>
            <p>Kategori: {(product.categories?.[0] ?? {}).name}</p>
            <p>Kalan Adet: {product.stock}</p>
            <p>Satıcı Firma: {(product.sellers?.[0] ?? {}).name}</p>
            <p>Ödenecek Tutar: {amount} ₺</p>

            <div className="d-flex col-3 mb-3 ">

              <button className={styles.quantityBtnPlus} onClick={quantityPlus}>+</button>

              <span className={styles.quantitySpan}>
                {quantity}
              </span>
              <button className={styles.quantityBtnMinus} onClick={quantityMinus}>-</button>
            </div>


            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button
                type="button"
                className={styles.addToCart}
                onClick={addShoppingCart}
              >
                Sepete Ekle
              </button>
              <button type="button" className={styles.addToFavori}>
                <i className="fa-solid fa-heart fa-lg me-2"></i>Favorilere ekle
              </button>
            </div>


          </div>

          {/*  */}





        </div>

      </div>


    </div>
  );
}

export default ProductDetail;
