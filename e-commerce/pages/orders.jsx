import withUILayout from "@/components/withUILayout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import styles from "../styles/Order.module.css";
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
    if (msg == "Teslim Alındı" || msg == "Sipariş Onaylandı") {
      return (
        <>
          <span className="spanSuccess"> {msg}</span>
        </>
      );
    } else if (msg == "Sipariş Reddedildi") {
      return (
        <>
          <span className="spanDanger"> {msg}</span>
        </>
      );
    } else if (msg == "Onay Bekliyor") {
      return (
        <>
          <span className="spanWarning"> {msg}</span>
        </>
      );
    } else {
      return (
        <>
          <span className="spanPrimary"> {msg}</span>
        </>
      );
    }
  }

  return (
    <div className="container">
      {orders.map((val, index) => {
        return (
          <div
            className={`${styles.shadow_lg} row row-cols-1   row-cols-sm-2  row-cols-md-4  my-5 d-flex align-items-center  justify-content-center px-5 py-4 `}
          >
            {" "}
            <div className={`${styles.imgDiv} col  col-md-2 `}>
              {" "}
              <img className=" p-2 " src={val.products[0].mainImageUrl} />
            </div>
            <div className={`${styles.productName} col col-md-5`}>
              {" "}
              {val.products[0].name}
            </div>
            <div className="col col-md-3 ">
              <h6>Toplam tutar</h6>
              <span className={styles.priceSpan}>
                {val.price * val.quantity} ₺
              </span>
            </div>
            <div className="col col-md-2 ">
              {" "}
              <button
                className={styles.detailBtn}
                onClick={() => goToDetail(val._id)}
              >
                <i class="fa-solid fa-angles-right fa-xl m-2"></i>
                Detay{" "}
              </button>
              <h6 className={styles.statusSpan}>
                {" "}
                {MessageStatus(val.status)}
              </h6>
            </div>
          </div>
        );
      })}
    </div>

    // <div className="container mt-5">
    //   <table className="table table-dark table-hover text-center ">
    //     <thead></thead>
    //     <tbody>
    //       {orders.map((val, index) => {
    //         return (
    //           <tr key={index}>
    //             <td>{index + 1}</td>
    //             <td>
    //               <img src={val.products[0].mainImageUrl} />
    //             </td>

    //             <td>{val.date}</td>

    //             <td>{val.products[0].name}</td>

    //             <td>{val.price * val.quantity}₺</td>
    //             <td>{MessageStatus(val.status)}</td>
    //             <td>
    //               {" "}
    //               <button
    //                 className="btn btn-warning"
    //                 onClick={() => goToDetail(val._id)}
    //               >
    //                 Sipariş Detayı{" "}
    //               </button>
    //             </td>
    //           </tr>
    //         );
    //       })}
    //     </tbody>
    //   </table>
    // </div>
  );
}

export default withUILayout(Orders);
