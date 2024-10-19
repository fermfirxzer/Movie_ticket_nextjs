// utils/useCheckUser.js
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const CheckUser = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        // Skip the redirect if the status is loading
        if (status === 'unauthenticated' ) {
            router.push('/');
        }
    }, [session, status, router]);
};

export default CheckUser;
