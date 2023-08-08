import withAdminLayout from "@/components/withAdminLayout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [orgProducts, setOrgProducts] = useState([]);
  const [filterType, setFilterType] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      if (localStorage.getItem("seller")) {
        getAll();
      }
    } else {
      router.push("/admin/login");
    }
  }, []);

  async function getAll() {
    const seller = JSON.parse(localStorage.getItem("seller"));

    const result = await axios.post("/api/admin/products/getAll", {
      sellerId: seller._id,
    });
    setProducts(result.data);
    setOrgProducts(result.data);
  }

  async function changeStatus(_id) {
    await axios.post("/api/admin/products/changeStatus", { _id: _id });
    getAll();
  }

  async function removeProduct(_id, name) {
    const result = window.confirm(`${name} ürününü silmek istiyor musunuz?`);
    if (result) {
      await axios.post("/api/admin/products/remove", { _id: _id });
      getAll();
    }
  }

  function search(e) {
    let searchValue = e.target.value;
    searchValue = searchValue.toString().replace(",", ".");

    const newProducts = orgProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchValue) ||
        p.categories[0].name.toLowerCase().includes(searchValue) ||
        p.stock === +searchValue ||
        p.price === +searchValue
    );
    setProducts(newProducts);
  }

  return (
    <div className="container">
      <h3 className="text-center my-5">Ürünler</h3>

      <div className="row">
        <div className="col-lg-6 col-md-6 col-3">
          <Link href="/admin/productAdd" className="btn btn-primary theme br">
            <i className="fa-solid fa-plus"></i>
          </Link>
        </div>
        <div className="col-lg-4 col-md-4 col-6">
          <input
            type="search"
            className="form-control"
            placeholder="Aranacak değer..."
            name="search"
            onChange={search}
          />
        </div>
        <div className="col-lg-2 col-md-2 col-3">
          <select
            name="filter"
            id=""
            className="form-control"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">Filitrele ...</option>
            <option value={"0"}>Artan Sıralama</option>
            <option value={"1"}>Azalan Sıralama</option>
            <option value={"2"}>En Çok Yorum Alan</option>
            <option value={"3"}>En Çok Begenilen</option>
          </select>
        </div>
      </div>

      <table className="table  table-borderless  mt-3 ">
        <thead>
          <tr className="text-center">
            <th className="col-1 ">#</th>
            <th className="col-2">Ürün Resmi</th>
            <th className="col-3">Ürün Adı</th>
            <th className="col-1">kategori</th>
            <th className="col-1">Satış Fiyatı</th>
            <th className="col-1">Stok Adedi</th>
            <th className="col-1">Durum</th>
            <th className="col-2">İşlemler</th>
          </tr>
        </thead>
        <tbody className="text-center border">
          {products.map((val, index) => {
            return (
              <tr key={index} className="m-5 border-top pt-5">
                <td>{index + 1}</td>
                <td className="text-center">
                  <img className="product-main-img" src={val.mainImageUrl} />
                  <div className="row m-1">
                    {val.imageUrls.map((p, i) => {
                      return (
                        <div key={i} className="col-3 mx-auto product-img-div">
                          <img className="product-img" src={p} />
                        </div>
                      );
                    })}
                  </div>
                </td>
                <td>{val.name}</td>
                <td>{val.categories[0].name} </td>
                <td>{val.price}</td>
                <td>{val.stock}</td>
                <td className="text-center">
                  {val.isActive ? (
                    <button
                      onClick={() => changeStatus(val._id)}
                      className="btn btn-danger theme btn-sm"
                      title="Satıştan Kaldır"
                      type="button"
                    >
                      Kaldır <i className="fa fa-x mx-1"></i>
                    </button>
                  ) : (
                    <button
                      onClick={() => changeStatus(val._id)}
                      className="btn btn-danger theme2 btn-sm"
                      title="Satışa Al"
                      type="button"
                    >
                      Ekle<i className="fa fa-check mx-1"></i>
                    </button>
                  )}
                </td>

                <td>
                  <Link
                    href={"/admin/product-update/" + val._id}
                    className="btn btn-warning theme btn-sm m-1"
                    title="Güncelle"
                  >
                    <i className="fa-solid fa-edit"></i>
                  </Link>
                  <button
                    className="btn btn-outline-danger theme btn-sm m-1"
                    title="Sil"
                    onClick={() => removeProduct(val._id, val.name)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default withAdminLayout(Products);
