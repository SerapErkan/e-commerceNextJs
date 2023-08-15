import withUILayout from '@/components/withUILayout'
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';

function OrderDetail() {

    const [order, setOrder] = useState({});
    const [comment, setComment] = useState("");
    const [star, setStar] = useState("5");
    const [orderId, setOrderId] = useState("");
    const [address, setAddress] = useState({});
    const router = useRouter();
    const commentRef = useRef();

    useEffect(() => {
        if (router.isReady) {
            getElementById(router.query.id);
            setOrderId(router.query.id);


        }

    }, [router.isReady]);

    useEffect(() => {
        if (order.length > 0)
            getAddress(order[0].addressId);

    }, [order])






    async function getElementById(id) {
        const result = await axios.post("/api/ui/orders/getById", { orderId: id });
        setOrder(result.data);
        console.log(result.data);


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

        if (status == "Teslim Alındı") {

            if (rate > 1) {
                return (
                    <div className="col-sm-12 ">
                        <button data-bs-toggle="modal" data-bs-target="#commentModal" onClick={() => openCommentModal(order[0]._id)} className='btn btn-warning mt-1'> Yorum Güncelle
                        </button>
                    </div>

                )
            } else {
                return (<button data-bs-toggle="modal" data-bs-target="#commentModal" onClick={() => openCommentModal(order[0]._id)} className='btn btn-outline-warning mt-1'> Yorum Yap
                </button>)
            }

        }





        else if (status == "Onay Bekliyor") {
            return (
                <div className="col-sm-12 ">
                    <button className='btn btn-outline-info mt-1'>Canlı Destek Al
                    </button> </div>
            )

        }
        else if (status == "Kargoya Verildi") {
            return (
                <div className="col-sm-12 ">
                    <button onClick={() => checkOut(order[0]._id)} className='btn btn-outline-info mt-1'>Teslim Al</button> </div>
            )

        }
        else if (status == "Sipariş Reddedildi") {
            return (
                <div className="col-sm-12 ">
                    <i class="fa-solid fa-circle-xmark fa-2xl">

                    </i>
                    <span className='m-2'> Reddedildi</span>
                </div>
            )

        }





    }



    async function getAddress(id) {

        console.log(id);
        const result = await axios.post("/api/ui/address/getById", { id: id });
        setAddress(result.data);


    }




    return (
        <>
            {order[0] ?


                <div className='container'>
                    <div className='row  justify-content-center  '>


                        <div className='col-sm-12  col-lg-9  shadow_lg text-center mt-5 p-3 me-3   rounded-5 '>
                            <h3>Sipariş Bilgileri</h3>




                            <div className="row   text-start p-5 g-5">
                                <div className="col-sm-12 col-md-6 col-lg-6  ">      <img src={order[0].product.mainImageUrl} />
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-6  ">
                                    <h6>Ürün ismi  : {order[0].product.name}</h6>
                                    <h6>Birim fiyat :{order[0].product.price}</h6>
                                    <h6>Adet : {order[0].quantity}</h6>
                                    <h6>Alış Tarihi :{order[0].date}</h6>
                                    <h6>Ürün durumu {order[0].status}</h6>

                                    <div className='col-sm-12   d-sm-none   d-md-block  ext-center mt-5 p-5  rounded-5'>
                                        <div className='truck px-5 '><i className="fa-solid fa-truck-fast fa-2xl me-5 truck"></i></div>
                                        <div className='way'>
                                            <div className='row  way-span-container'>
                                                <div className='col-4'>   <span className='way-span step-1'></span> </div>
                                                <div className='col-4'>   <span className='way-span step-2'></span> </div>
                                                <div className='col-4'>   <span className='way-span step-3'></span></div>
                                            </div>


                                        </div>
                                        <h6 className='my-3'> Kargo TAKİP  Numarası: _ {order[0].trackingNumber
                                        }  </h6>
                                        {checkStatus(order[0].status, order[0].rate)}









                                    </div>

                                    {/* <button onClick={() => getAddress(order[0].addressId)}>Adress bilgisi</button>
                                    <button onClick={() => getAddress(order[0].addressId)}>Alıcı bilgisi</button> */}
                                </div>
                            </div>


                        </div>



                        <div className='row justify-content-center g-5'>
                            <div className='col-sm-12 col-lg-3  shadow_lg text-center  py-5  rounded-5 m-3 '>
                                <h6>Satıcı  Bilgileri </h6>
                                <img className='orderSellerImg ' src={order[0].seller.imageUrl} />
                                <h5>@{order[0].seller.name}</h5>
                                <h6>{order[0].seller.city}</h6>

                            </div>



                            <div className='col-sm-12  col-lg-3  shadow_lg    py-5   rounded-5 m-3'>
                                <h6 className='text-center'>Alıcı Bilgileri</h6>
                                <h6>      Adı:  {order[0].user.name}</h6>
                                <h6>Telefon Numarası: {order[0].user.phoneNumber}</h6>
                                <h6>Mail: {order[0].user.email}</h6>


                            </div>


                            <div className='col-sm-12  col-lg-3  shadow_lg   py-5  rounded-5 m-3'>

                                <p className='text-center'>Teslimat Adresi</p>
                                <h6>{address.city} /{address.towns}/{address.district}</h6>
                                <h6>   {address.neighbourhood}.{address.street}.{address.description}</h6>






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