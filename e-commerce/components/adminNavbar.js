import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useState } from 'react'

export default function AdminNavbar(props) {
    const router = useRouter();

    const logout = () => {
        localStorage.clear();
        router.push("/admin/login");
    }

    return (
        <div className="container-fuid">
            <nav className="navbar navbar-expand-lg navbar-color mt-5">

                <div className="container-lg   ">

                    {
                        props.seller ? (
                            <>

                                <Link href="/admin" className='navbar-brand '>
                                    Satıcı Paneli
                                </Link>
                                <button
                                    className="navbar-toggler togglerBtn"
                                    type="button "
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent"

                                >
                                    <span className="navbar-toggler-icon  togglerIcon" />
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0  ms-4">
                                        <li className="nav-item">
                                            <Link href="/admin/products" className="nav-link active" aria-current="page">
                                                Ürünler
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" href="/admin/orders">
                                                Siparişler
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href="#">
                                                Raporlar
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="nav-item dropdown">
                                        <a
                                            className="nav-link dropdown-toggle "
                                            href="#"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <img className="nav-logo mx-2" src={props.seller?.imageUrl} />
                                            {props.seller?.name}
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a className="dropdown-item " href="#">
                                                    Profil
                                                </a>
                                            </li>
                                            <li>
                                                <a onClick={logout} className="dropdown-item">
                                                    Çıkış Yap
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </>) : (

                            <div className=" d-flex  justify-content-end align-items-center w-100">

                                <div className="dropdown me-3">
                                    <a href="#" className='d-block   dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa-regular fa-user "></i> Kullanıcı
                                    </a>
                                    <ul className="dropdown-menu text-small " >
                                        <li>     <Link href="/login" className="dropdown-item uıNav ">Login</Link>
                                        </li>
                                        <li>     <Link href="/register" className="dropdown-item  uıNav">Sign-up</Link>
                                        </li>

                                    </ul>
                                </div>

                                <div className="dropdown">
                                    <a href="#" className='d-block   dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa-regular fa-building"></i> Firma
                                    </a>
                                    <ul className="dropdown-menu text-small" >
                                        <li>     <Link href="/admin/login" className="dropdown-item ">Firma Login</Link>
                                        </li>
                                        <li>     <Link href="/admin/register" className="dropdown-item ">Firma Sign-up</Link>
                                        </li>

                                    </ul>
                                </div>

                            </div>
                        )
                    }

                </div>
            </nav>
        </div>
    )
}
