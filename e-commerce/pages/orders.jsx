import withUILayout from "@/components/withUILayout";
import axios from "axios";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Orders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
      getAll(user);
    }
  }, []);

  async function getAll(user) {
    const result = await axios.post("/api/ui/orders/getAll", {
      userId: user._id,
    });
    setOrders(result.data);
  }

  function goToDetail(id) {
    router.push("/order-detail/" + id);
  }

  function MessageStatus(msg) {
    return (
      <>
        <span className="spanDanger"> {msg}</span>
      </>
    );
  }

  return (
    <div className="container mt-5">
      <table className="table text-center">
        <thead>
          <tr>
            <th className="col-1 "></th>
            <th className="col-1 ">Ürün resmi</th>
            <th className="col-1 ">Sipariş tarihi</th>

            <th className="col-3 ">Ürün Detay</th>
            <th className="col-1 ">Firma Sahibi</th>
            {/* <th scope="col">Aded</th>
            <th scope="col">Brim Fiyatı</th> */}
            <th className="col-1 ">Ödeme Tutarı</th>

            <th className="col-2 ">Durumu</th>
            <th className="col-2"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((val, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img src={val.products[0].mainImageUrl} />
                </td>

                <td>{val.date}</td>

                <td>{val.products[0].name}</td>
                <td>{val.products[0].seller[0].name}</td>
                {/* <td>{val.quantity}</td>
                <td>{val.price}₺</td> */}
                <td>{val.price * val.quantity}₺</td>
                <td>{MessageStatus(val.status)}</td>
                <td>
                  {" "}
                  <button
                    className="btn btn-warning"
                    onClick={() => goToDetail(val._id)}
                  >
                    Sipariş Detayı{" "}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default withUILayout(Orders);
