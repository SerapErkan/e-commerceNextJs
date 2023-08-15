
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import shoppingCart from '@/pages/shopping-cart';
import axios from 'axios';
import styles from "../styles/uiNavbar.module.css"
function uiNavbar() {

    const [user, setUser] = useState();
    const [shoppingCartCount, setShoppingCartCount] = useState();

    useEffect(() => {

        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")));
            const user = JSON.parse(localStorage.getItem("user"));
            cartCount(user);
        }
        else {
            console.log("user yok");
            // router.push("/ui/login");
        }


    }, [])






    async function cartCount(user) {

        const result = await axios.post("/api/ui/shoppingCarts/getCount", { userId: user._id })
        productQuantityCalculation(result.data.count)

    }

    function productQuantityCalculation(data) {
        let counter = 0;
        for (let count of data) {
            counter += count.quantity
        }
        setShoppingCartCount(counter);


    }


    function logout() {
        // localStorage.removeItem("user");
        localStorage.clear();
        setUser(undefined);
    }

    return (
        <>
            <header >
                <div className="container ">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none  ">
                            <div className={styles.imgLogoDiv}>
                                <img src='/images/logo2.png' />
                            </div>

                        </a>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 uıNav">
                            {/* <li className={styles.uıNav}><a href="#" className="nav-link px-2 text-white"></a>dsdsd</li>
                            <li className={styles.uıNav}><a href="#" className="nav-link px-2 text-white"></a>dsdsd</li>
                            <li className={styles.uıNav}><a href="#" className="nav-link px-2 text-white"></a>dsdsd</li> */}
                        </ul>




                        {user ? (
                            <div className="text-end d-flex align-items-center justify-content-center text-white uıNav ">

                                <Link href="/" className={styles.uıNav}><i className="fa-solid fa-heart me-2  fa-lg "></i>Favorilerim
                                </Link>



                                <Link href="/shopping-cart" className={styles.uıNav}>  <i className="fa-solid fa-cart-plus  me-2 ms-4 fa-lg " >    </i>
                                    Sepetim
                                    {
                                        shoppingCartCount > 0 ?
                                            <sup className={` ${styles.shoppingCartCount}  ms-2`} >{shoppingCartCount} </sup>
                                            : ""
                                    }

                                </Link>
                                <div className="dropdown text-end me-4 text-white ms-4 ">
                                    <a href="#" className={`${styles.uıNav} d-block   dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa-solid fa-user me-2 fa-lg "></i> {user.name.toUpperCase()}
                                    </a>
                                    <ul className={` ${styles.uıMenu} dropdown-menu  text-small`} >
                                        <li><a className="dropdown-item" href="#">Profile</a></li>
                                        <li><a className="dropdown-item" href="#">Yorumlar</a></li>
                                        <li><Link href="/orders" className="dropdown-item " >Siparişler </Link></li>
                                        <li><a className="dropdown-item" onClick={logout}>Çıkış</a></li>
                                    </ul>
                                </div>



                            </div>
                        ) : (
                            <>

                                <div className="dropdown text-end me-3">
                                    <a href="#" className={`${styles.uıNav} d-block   dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa-regular fa-user "></i> Kullanıcı
                                    </a>
                                    <ul className={` ${styles.uıMenu} dropdown-menu  text-small`}  >
                                        <li>     <Link href="/login" className="dropdown-item uıNav ">Login</Link>
                                        </li>
                                        <li>     <Link href="/register" className="dropdown-item  uıNav">Sign-up</Link>
                                        </li>

                                    </ul>
                                </div>

                                <div className="dropdown text-end">
                                    <a href="#" className={`${styles.uıNav} d-block   dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa-regular fa-building"></i> Firma
                                    </a>
                                    <ul className={` ${styles.uıMenu} dropdown-menu  text-small`}  >
                                        <li>     <Link href="/admin/login" className="dropdown-item ">Firma Login</Link>
                                        </li>
                                        <li>     <Link href="/admin/register" className="dropdown-item ">Firma Sign-up</Link>
                                        </li>

                                    </ul>
                                </div>

                            </>


                        )

                        }





                    </div>
                </div>
            </header>


        </>

    )
}
export default uiNavbar;