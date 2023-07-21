
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
function uiNavbar() {

    const [user, setUser] = useState();

    useEffect(() => {

        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")))
        }
        else {
            console.log("user yok");
            // router.push("/ui/login");
        }


    }, [])

    return (
        <>
            <header className="p-3 UInavbar">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">

                        </a>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="#" className="nav-link px-2 text-white">Serap Erkan</a></li>

                        </ul>




                        {user ? (
                            <div className="text-end">
                                <p>Favoriler</p>
                                <p>Sepetim</p>
                                <div className="dropdown text-end">
                                    <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="" alt="mdo" width="32" height="32" className="rounded-circle" /> Hesabım
                                    </a>
                                    <ul className="dropdown-menu text-small" >
                                        <li><a className="dropdown-item" href="#">New project...</a></li>
                                        <li><a className="dropdown-item" href="#">Settings</a></li>
                                        <li><a className="dropdown-item" href="#">Profile</a></li>
                                        <li><a className="dropdown-divider"> </a></li>
                                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                                    </ul>
                                </div>

                            </div>
                        ) : (

                            <div className="text-end">
                                <Link href="/login" className="btn btn-outline-light me-2">Login</Link>
                                <Link href="/register" className="btn btn-outline-light">Sign-up</Link>
                            </div>
                        )



                        }





                    </div>
                </div>
            </header>


        </>

    )
}
export default uiNavbar;