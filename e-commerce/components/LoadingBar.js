
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const LoadingBar = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const startLoading = () => setLoading(true);
        const endLoading = () => setLoading(false);

        // Sayfa yükleme başlangıç ve bitiş olaylarına abone olundu
        window.addEventListener('load', endLoading);
        router.events.on('routeChangeStart', startLoading);
        router.events.on('routeChangeComplete', endLoading);
        router.events.on('routeChangeError', endLoading);

        // Abonelikleri kaldırın
        return () => {
            window.removeEventListener('load', endLoading);
            router.events.off('routeChangeStart', startLoading);
            router.events.off('routeChangeComplete', endLoading);
            router.events.off('routeChangeError', endLoading);
        };
    }, []);


    // if (!loading) return null;

    return (
        <div >
            {/*stil ve animasyonlar  */}

            <div className='loadingBar'>
                <span className='bar-1'></span>
                <span className='bar-2'></span>
                <span className='bar-3'></span>
                <span className='bar-4'></span>
                <span className='bar-5'></span>
                <span className='bar-6'></span>
                <span className='bar-7'></span>
                <span className='bar-8'></span>
            </div>


        </div>
    );
};

export default LoadingBar;