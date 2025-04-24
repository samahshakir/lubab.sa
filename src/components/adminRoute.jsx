import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { handleCheck } from '../services/api';
import LoadScreen from './LoadScreen';

const AdminRoute = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user?.id;

                if (!userId) {
                    setIsAdmin(false);
                    setLoading(false);
                    return;
                }

                const data = await handleCheck(userId);
                console.log(data)
                setIsAdmin(data.isAdmin);
            } catch (err) {
                console.error(err);
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        checkAdmin();
    }, []);

    if (loading) return <div><LoadScreen/></div>;

    if (!isAdmin) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default AdminRoute;