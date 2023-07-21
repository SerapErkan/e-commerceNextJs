
import React from 'react'
import UINavbar from "@/components/uiNavbar"


function UILayout({ children }) {
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