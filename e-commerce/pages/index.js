import withUILayout from "@/components/withUILayout"
import axios from "axios";
import { Router, useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import UINavbar from "@/components/uiNavbar"
import styles from "../styles/Home.module.css"
function Home() {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("0");
  const [orgProducts, setOrgProducts] = useState([]);
  const [filterType, setFilterType] = useState("");

  const elRef = useRef([]);
  const router = useRouter();


  useEffect(() => {
    getAllCategories();
    getAllProducts();

  }, [])

  useEffect(() => {
    if (filterType == "0" || filterType == "1") {
      const elementFilter = document.getElementById("filterId");
      elementFilter.className = "d-none"
    }



  }, [filterType])

  async function getAllProducts(categoryId = "0", filter = "") {
    const result = await axios.post("/api/ui/products/getAll", { categoryId: categoryId, filter: filter });
    setProducts(result.data);
    setOrgProducts(result.data);

  }

  async function getAllCategories() {
    const result = await axios.get("/api/ui/categories/getAll");
    setCategories(result.data);

  }


  function selectedCategory(categoryId, index) {
    getAllProducts(categoryId, filterType);
    setSelectedCategoryId(categoryId);
    activeclassNameRemove();
    elRef.current["category-", index].classList.add("active");


  }
  function activeclassNameRemove() {
    for (let key in elRef.current) {
      // console.log("key", elRef.current[key]);
      elRef.current[key].classList.remove("active");
    }
  }

  function search(e) {
    let searchValue = e.target.value;

    const newProducts = orgProducts.filter((p) => p.name.toLowerCase().includes(searchValue) ||
      p.category[0].name.toLowerCase().includes(searchValue) ||
      p.seller[0].name.toLowerCase().includes(searchValue) ||
      p.stock === +searchValue ||
      p.price === +searchValue
    );
    setProducts(newProducts);
  }

  function changeFilterType(value) {
    setFilterType(value);
    console.log(filterType, value);
    getAllProducts(selectedCategoryId, value);
  }

  function detail(id) {
    router.push("/product-detail/" + id);
  }

  function filter() {
    const elementFilter = document.getElementById("filterId");
    elementFilter.className = "";

  }



  return (
    <>

      <UINavbar />

      <div className={styles.divSlider}>
        {/* <!-- ------slider--- --> */}
        <div class="container">
          <div id="myCarousel" class="carousel slide mb-5 " data-bs-ride="carousel" data-bs-theme="light">
            <div class="carousel-indicators ">
              <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" class=""></button>
              <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3" class="active"
                aria-current="true"></button>
            </div>
            <div class="carousel-inner ">
              <div class="carousel-item text-end">

                <div class="container ">
                  <img src="/images/1.png" class=" bd-placeholder-img " aria-hidden=" true"
                    preserveAspectRatio="xMidYMid slice" focusable="false" />
                  <div class="carousel-caption text-start  ps-5 ms-3 ">
                    <h1>Canlı Destek.</h1>
                    <p class="opacity-75">Tüm konu başlıklarında chat yöntemiyle canlı destek alabilirsiniz. </p>
                    <p><a class="btn btn-lg btn-outline-warning p-3" href="#">Çok Yakında :)</a></p>
                  </div>
                </div>
              </div>


              <div class="carousel-item">

                <div class="container ">
                  <img src="/images/3.png" class="imgSlider bd-placeholder-img" aria-hidden="true"
                    preserveAspectRatio="xMidYMid slice" focusable="false" />

                  <div class="carousel-caption text-end ps-5 ms-5">

                    <p class=""> Giyim, bilgisayar, cep telefonu, kozmetik, beyaz eşya, süpermarket & daha aradığın yüz binlerce indirimli ürün en uygun fiyatlar ve kampanyalarla ...</p>
                    <p><a class="btn btn-lg btn-outline-warning p-2" href="#">Üye Grişi</a></p>
                  </div>
                </div>
              </div>
              <div class="carousel-item active">

                <div class="container">
                  <img src="/images/2.png" class="imgSlider bd-placeholder-img" aria-hidden="true"
                    preserveAspectRatio="xMidYMid slice" focusable="false" />

                  <div class="carousel-caption text-end pe-5 me-5  ">
                    <h1>Hemen kayıt olun! </h1>
                    <p>İşletme kaydını yaparak binlerce firma arasında sizde yerinizi alın!</p>

                    <p><a class="btn btn-lg btn-outline-warning p-3" href="#">Firma Kayıt</a></p>
                  </div>
                </div>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>

      </div >

      <div className={styles.divContainer}>

        <div className={styles.search}>
          <input
            type="search"
            className="form-control"
            placeholder="Aranacak değer..."
            name="search"
            onChange={search}
            autoComplete="false"
          />
        </div>
        <span className={styles.filter}>
          <span onClick={filter}> <i class="fa-solid fa-filter me-2" ></i> Sırala</span>


          <ul className="d-none " id="filterId">
            <li><button onClick={() => changeFilterType("0")} >Artan Sıralama</button></li>
            <li><button onClick={() => changeFilterType("1")}>Azalan Sıralama</button></li>
          </ul>





        </span>
        <div className={styles.categoryDiv}>
          <span className="text-white"> {products.length} ürün bulundu</span>


          <ul>
            <li className={`${styles.categoriesList} active  p-3 my-1 `} onClick={() => selectedCategory("0", -1)} ref={(ref) => elRef.current["category-", -1] = ref} >
              <i class="fa-solid fa-grip"></i><span>Tümü</span></li>
            {
              categories.map((val, index) => {
                return (
                  <li key={index}
                    className={styles.categoriesList}
                    onClick={() => selectedCategory(val._id, index)}
                    ref={(ref) => elRef.current["category-", index] = ref}
                  > <i className={val.className}></i>
                    {/* {val.products.length} */}
                    <span>  {val.name}</span>


                  </li>
                )
              })

            }
          </ul>
        </div>
        <div className={styles.productDiv}>

          <div class="py-5  ">
            <div className="container-xxl ">







              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3  row-cols-lg-4  g-5  d-flex justify-content-center">


                {

                  products.map((val, index) => {
                    return (
                      <div className="col " key={index} >
                        <div className={styles.cardProduct} onClick={() => detail(val._id)}>
                          <span className={styles.cardFavoriIcon}> <i class="fa-regular fa-heart fa-xl pt-3"></i></span>
                          <img className={styles.cardImage} src={val.mainImageUrl} />
                          <div class="card-body">
                            <small className={styles.cardProductSeller}>   {val.seller[0].name.toUpperCase()}</small>
                            <p className={styles.cardProductName} > {val.name}</p>
                            <span className={styles.cardProductPrice} >{val.price} ₺</span>
                            <span className={styles.cardAdded} > Sepete Ekle</span>

                            <small className={styles.cardComment}>

                              <i className="fa-solid fa-star"></i>
                              <i className="fa-solid fa-star"></i>
                              <i className="fa-solid fa-star"></i>
                              <i className="fa-solid fa-star"></i>
                              <i className="fa-solid fa-star"></i>


                            </small>
                          </div>
                        </div>

                      </div>

                    )


                  })
                }




              </div>


            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Home;









