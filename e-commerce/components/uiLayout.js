
import React from 'react'
import withUILayout from './withUILayout';

function UILayout({ children }) {
    return (
        <div className="">
            {/* <UINavbar seller={seller} /> */}
            <h2>uı uiLayout</h2>
            <section className="mt-2">
                {children}
            </section>
        </div>
    )
}
export default UILayout;