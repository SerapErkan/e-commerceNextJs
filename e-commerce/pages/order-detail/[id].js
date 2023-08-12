import withUILayout from '@/components/withUILayout'
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';

function OrderDetail() {

    const [order, setOrder] = useState({});
    const router = useRouter();
    const commentRef = useRef();
    const [comment, setComment] = useState("");
    const [star, setStar] = useState("5");
    const [orderId, setOrderId] = useState("");

    useEffect(() => {
        if (router.isReady) {
            getElementById(router.query.id);
            setOrderId(router.query.id);
        }

    }, [router.isReady]);

    async function getElementById(id) {
        const result = await axios.post("/api/ui/orders/getById", { orderId: id });
        setOrder(result.data);
        console.log(result.data)

    }

    async function checkOut(id) {
        const result = await axios.post("/api/ui/orders/checkOut", { id: id });
        toast(result.data.message);
        getElementById(id)
    }

    const handleChange = (e) => {
        setComment(e.target.value);

        if (!e.target.validity.valid) {
            e.target.classList.add("is-invalid");
            e.target.classList.remove("is-valid");
        } else {
            e.target.classList.remove("is-invalid");
            e.target.classList.add("is-valid");
        }
    }


    function openCommentModal(id) {
        console.log("rate", order[0].rate);
        if (order[0].rate === undefined) {
            setStar("5");
            setComment("");
        } else {
            setStar(order[0].rate);
            setComment(order[0].comment);
        }
    }

    async function saveComment() {
        const sendData = {
            _id: orderId,
            rate: star,
            comment: comment
        };
        const result = await axios.post("/api/ui/orders/saveComment", sendData);
        toast.success(result.data.message);
        getElementById(orderId);
    }


    function checkStatus(status, rate) {

        if (status == "") {
            return (<div className="col-sm-12 col-md-2 col-lg-2">
                <button onClick={() => checkOut(order[0]._id)} className='btn btn-outline-info mt-1'>Teslim Al</button>
            </div>

            )


        }
        else if (status == "Teslim Alındı") {
            return (
                <div className="col-sm-12 col-md-2 col-lg-2">

                    {
                        rate < 0 ? <button data-bs-toggle="modal" data-bs-target="#commentModal" onClick={() => openCommentModal(order[0]._id)} className='btn btn-outline-warning mt-1'> Yorum Yap
                        </button> :
                            <button data-bs-toggle="modal" data-bs-target="#commentModal" onClick={() => openCommentModal(order[0]._id)} className='btn btn-warning mt-1'> Yorum Güncelle
                            </button>
                    }

                </div>
            )


        }
        else if (status == "Onay Bekliyor") {
            return (
                <div className="col-sm-12 col-md-2 col-lg-2">
                    <button onClick={() => checkOut(order[0]._id)} className='btn btn-outline-info mt-1'>Canlı Destek Al
                    </button> </div>
            )

        }
        else if (status == "Sipariş Kargoya Verildi") {
            return (
                <div className="col-sm-12 col-md-2 col-lg-2">
                    <button onClick={() => checkOut(order[0]._id)} className='btn btn-outline-success mt-1 '> Kango takip
                    </button> </div>
            )

        }
        else if (status == "Sipariş Reddedildi") {
            return (
                <div className="col-sm-12 col-md-2 col-lg-2">
                    <i class="fa-solid fa-circle-xmark fa-2xl"></i>
                </div>
            )

        }




    }








    return (
        <>
            {order[0] ?


                <div className='container'>
                    <div className='row  justify-content-center  '>

                        <div className='col-sm-12 col-md-11 col-lg-11 shadow-lg text-center mt-5 p-5  rounded-5'>
                            <div className='truck  '><i className="fa-solid fa-truck-fast fa-2xl me-5 truck"></i></div>
                            <div className='way'>
                                <div className='row  way-span-container'>
                                    <div className='col-4'>   <span className='way-span step-1'></span> </div>
                                    <div className='col-4'>   <span className='way-span step-2'></span> </div>
                                    <div className='col-4'>   <span className='way-span step-3'></span></div>

                                </div>


                            </div>


                            <div className="row align-items-center text-start">

                                <div className="col-sm-12 mt-2  ">  <h6 className=''> {order[0].status} -- Kargo TAKİP  Numarası: {order[0].trackingNumber
                                }  </h6>

                                </div>
                            </div>








                        </div>
                        <div className='col-sm-12 col-md-8 col-lg-8 shadow-lg text-center mt-5 p-3 me-3  rounded-5'>
                            <h3>Sipariş Bilgileri</h3>
                            <h6>{order[0].date}</h6>






                            <div className="row align-items-center  text-start p-5 ">
                                <div className="col-sm-12 col-md-2 col-lg-2  ">      <img src={order[0].product.mainImageUrl} /> </div>
                                <div className="col-sm-12 col-md-4 col-lg-4">     <h6>Ürün ismi  {order[0].product.name}</h6> </div>
                                <div className="col-sm-12 col-md-2 col-lg-2">     <h6>Birim fiyat {order[0].product.price}</h6></div>
                                <div className="col-sm-12 col-md-2 col-lg-2">     <h6>Ürün durumu {order[0].status}</h6></div>

                                {checkStatus(order[0].status, order[0].rate)}
                            </div>


                        </div>
                        <div className='col-sm-12 col-md-3 col-lg-3 shadow-lg text-center mt-5  rounded-5 '>

                            <div className="row align-items-center p-5 ">
                                <div className="col-sm-12  ">    <img src={order[0].seller.imageUrl} /></div>
                                <div className="col-sm-12"> <h6>Satıcı firma {order[0].seller.name}</h6></div>
                                <div className="col-sm-12 ">  <h6>{order[0].seller.city}</h6></div>
                            </div>

                        </div>



                        <div className='col-sm-12 col-md-11 col-lg-11 shadow-lg text-center mt-5 p-5  rounded-5'>
                            <h3>Alıcı bilgileri Bilgileri</h3>

                            <div className="row align-items-center text-start">
                                <div className="col-sm-12 col-md-6 col-lg-6">   <h6> Adı:  {order[0].user.name}</h6>  <h6> Adres:  aa mah .gllgkl sok .. kjfjdkjshjkhjhjhkghfrtyuhbgfvh  hfyfgnb gjhgf kjfjdkjshjkhjhjhkghfrtyuhbgfvh  hfyfgnb gjhgf</h6>  </div>
                                <div className="col-sm-12 col-md-6 col-lg-6 ">
                                    <h6>Telefon Numarası: {order[0].user.phoneNumber}</h6>
                                    <h6>Mail: {order[0].user.email}</h6>
                                </div>

                            </div>








                        </div>
                    </div>



                    {/* Yorum Modal */}
                    <div
                        className="modal fade"
                        id="commentModal"
                        tabIndex={-1}
                        aria-labelledby="commentModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="commentModalLabel">
                                        Yorum Alanı
                                    </h1>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        id="commentModalCloseBtn"
                                    />
                                </div>
                                <div className="modal-body">
                                    <div className='form-group'>
                                        <label htmlFor='star'>Puanınız</label>
                                        <select value={star} onChange={(e) => setStar(e.target.value)} className='form-control'>
                                            <option value="1">
                                                &#9733;
                                            </option>
                                            <option value="2">
                                                &#9733;
                                                &#9733;
                                            </option>
                                            <option value="3">
                                                &#9733;
                                                &#9733;
                                                &#9733;
                                            </option>
                                            <option value="4">
                                                &#9733;
                                                &#9733;
                                                &#9733;
                                                &#9733;
                                            </option>
                                            <option value="5">
                                                &#9733;
                                                &#9733;
                                                &#9733;
                                                &#9733;
                                                &#9733;
                                            </option>
                                        </select>
                                    </div>
                                    <div className='form-group mt-1'>
                                        <label htmlFor='comment'>Yorumunuz</label>
                                        <textarea
                                            className='form-control'
                                            id="comment"
                                            name="comment"
                                            required
                                            autoComplete='off'
                                            minLength={3}
                                            ref={commentRef}
                                            value={comment}
                                            rows={5}
                                            onChange={handleChange} />
                                        <div className='invalid-feedback'>
                                            Yorum alanı boş olamaz
                                        </div>
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    <button onClick={saveComment} type="button" data-bs-dismiss="modal" className="btn btn-danger w-100">
                                        Kaydet
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Yorum Modal end */}

                </div >






                : console.log("yok")


            }



        </>

    )
}

export default withUILayout(OrderDetail);