import withUILayout from "@/components/withUILayout"
import axios from "axios";
import { Router, useRouter } from "next/router";

import { useEffect, useRef, useState } from "react";

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


  async function getAllProducts(categoryId = "0", filter = "") {
    const result = await axios.post("/api/ui/products/getAll", { categoryId: categoryId, filter: filter });
    setProducts(result.data);
    console.log(result.data);
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
      console.log("key", elRef.current[key]);
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

  function changeFilterType(e) {

    setFilterType(e.target.value);
    console.log(filterType, e.target.value);

    getAllProducts(selectedCategoryId, e.target.value);
  }

  function detail(id) {
    router.push("/product-detail/" + id);
  }




  return (
    <>
      <div className="container-fuild	">
        <div className="row m-5">


          <div className="col-sm-2  d-lg-block d-md-block d-none g-2  mx-2 " >

            <div className="filter mx-2 my-4 p-4">
              <input
                type="search"
                className="form-control"
                placeholder="Aranacak değer..."
                name="search"
                onChange={search}
              />
            </div>
            <div className="filter mx-2 my-4 p-4">
              <select
                name="filter"
                id=""
                className="form-control"
                value={filterType}
                onChange={changeFilterType}
              >
                <option value="">Filitrele ...</option>
                <option value="0">Artan Sıralama</option>
                <option value="1">Azalan Sıralama</option>
                {/* <option value={"2"}>En Çok Yorum Alan</option>
                <option value={"3"}>En Çok Begenilen</option> */}
              </select>
            </div>

            <div className="categories-uı active p-3 m-2  " onClick={() => selectedCategory("0", -1)} ref={(ref) => elRef.current["category-", -1] = ref}> Tümü - {products.length}</div>
            {
              categories.map((val, index) => {
                return (
                  <div key={index}
                    className="categories-uı p-3 m-2 "
                    onClick={() => selectedCategory(val._id, index)}
                    ref={(ref) => elRef.current["category-", index] = ref}
                  > {val.name}-
                    {val.products.length}

                  </div>
                )
              })

            }




          </div>

          <div className="col-sm-9  ">

            <div className="row " >
              {
                products.map((val, index) => {
                  return (
                    <div key={index} className="col-sm-12 col-md-4 col-lg-3">
                      <div className="productCard text-center" onClick={() => detail(val._id)} >
                        <img src={val.mainImageUrl} />
                        <h5 className="productName mt-4"> {val.name}</h5>
                        <hr></hr>
                        <h6 className="price"> Fiyat:<span>{val.price}
                        </span> </h6>

                        <h6 className="text-start"> {val.category[0].name}</h6>
                        <h6 className="text-start"> Satıcı:
                          <span className="ms-2" >
                            {val.seller[0].name.toUpperCase()}
                          </span> -
                          Stok: {val.stock}</h6>

                      </div>
                    </div>

                  )
                })

              }


            </div>
          </div>
        </div>


      </div>
    </>
  )
}

export default withUILayout(Home);