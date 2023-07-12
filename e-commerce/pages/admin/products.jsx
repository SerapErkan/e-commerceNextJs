import withAdminLayout from "@/components/withAdminLayout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState();
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
    console.log(products);
  }

  async function changeStatus(_id) {
    await axios.post("/api/admin/products/changeStatus", { _id: _id });
    getAll();
  }

  return (
    <div className="container">
      <h3 className="text-center my-5">Ürünler</h3>

      <div className="row">
        <div className="col-lg-8 col-md-8 col-3">
          <Link href="/admin/productAdd" className="btn btn-primary theme br">
            <i className="fa-solid fa-plus"></i>
          </Link>
        </div>
        <div className="col-lg-4 col-md-4 col-9">
          {/* <input
            type="search"
            className="form-control"
            placeholder="Aranacak değer..."
            name="search"
            // value={search}
            // onChange={() => setSearch(e.target.value)}
          /> */}
        </div>
      </div>

      <div className="form-group mt-2">
        <table className="table table-hover table-bordered overflow-x">
          <thead>
            <tr>
              <th>#</th>
              <th>Ürün Resmi</th>
              <th>Ürün Adı</th>
              <th>kategori</th>
              <th>Satış Fiyatı</th>
              <th>Stok Adedi</th>
              <th>Durum</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {products.map((val, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="text-center">
                    <img className="product-main-img" src={val.mainImageUrl} />
                    <div className="row m-1">
                      {val.imageUrls.map((p, i) => {
                        return (
                          <div
                            key={i}
                            className="col-3 mx-auto product-img-div"
                          >
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
                        className="btn btn-outline-danger btn-sm"
                        title="Satıştan Kaldır"
                        type="button"
                      >
                        Kaldır <i className="fa fa-x mx-1"></i>
                      </button>
                    ) : (
                      <button
                        onClick={() => changeStatus(val._id)}
                        className="btn btn-outline-info btn-sm"
                        title="Satışa Al"
                        type="button"
                      >
                        Ekle<i className="fa fa-check mx-1"></i>
                      </button>
                    )}
                  </td>

                  <td>
                    <button
                      className="btn btn-warning theme btn-sm m-1"
                      title="Güncelle"
                    >
                      <i className="fa fa-edit"></i>
                    </button>
                    <button
                      className="btn btn-outline-danger theme btn-sm m-1"
                      title="Sil"
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
    </div>
  );
};

export default withAdminLayout(Products);
