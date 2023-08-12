
import React, { useEffect, useState } from 'react'
import UINavbar from "@/components/uiNavbar"
import { useRouter } from 'next/router';


function UILayout({ children }) {

    const [user, setUser] = useState({});
    const router = useRouter();
    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")));
        } else {
            router.push("/login");
        }
    }, [])
    return (
        <div className="">

            <UINavbar />
            <section className="mt-2">
                {children}
            </section>
        </div>
    )
}
export default UILayout;