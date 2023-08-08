import withUILayout from '@/components/withUILayout'
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'

function OrderDetail() {

    const [order, setOrder] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (router.isReady) {
            getElementById(router.query.id);

        }

    }, [router.isReady]);

    async function getElementById(id) {
        const result = await axios.post("/api/ui/orders/getById", { orderId: id });
        setOrder(result.data);
        console.log(result.data)

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

                                <div className="col-sm-12 mt-2  ">    <h6 className=''> {order[0].status} -- Kargo TAKİP  Numarası: {order[0].trackingNumber
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
                                <div className="col-sm-12 col-md-2 col-lg-2">    <h6>Kargo Numarası: -- </h6> </div>

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
                </div >






                : console.log("yok")


            }



        </>

    )
}

export default withUILayout(OrderDetail);