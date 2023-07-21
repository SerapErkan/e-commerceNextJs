
// import LoadingBar from './LoadingBar'
// import UILayout from './uiLayout'


// export default function withUILayout(Component) {
//     return props => (

//         <UILayout>
//             <LoadingBar />
//             <Component {...props} />
//         </UILayout>
//     )
// }



import React, { useState, useEffect } from 'react'; // useState ve useEffect importunu ekleyin
import LoadingBar from './LoadingBar';
import UILayout from './uiLayout';

export default function withUILayout(Component) {
    const WithUILayout = (props) => {
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const timerId = setTimeout(() => {
                setLoading(false);
            }, 2000);

            return () => clearTimeout(timerId);
        }, []);

        return (
            <UILayout>
                {loading ? (
                    <LoadingBar /> // Yükleme çubuğunu göster
                ) : (
                    <Component {...props} /> // Yükleme tamamlandıysa Component'i göster
                )}
            </UILayout>
        );
    };

    return WithUILayout;
}
