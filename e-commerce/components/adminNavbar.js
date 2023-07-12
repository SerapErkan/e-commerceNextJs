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
            <nav className="navbar navbar-expand-lg navbar-color">

                <div className="container-lg  ">

                    <a className="navbar-brand mb-1 me-5 " href="#">
                        Satıcı Paneli
                    </a>
                    <button
                        className="navbar-toggler "
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link href="/admin/products" className="nav-link active" aria-current="page">
                                    Ürünler
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">
                                    Siparişler
                                </a>
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
                </div>
            </nav>
        </div>
    )
}
