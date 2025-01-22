import { Footer } from '@/components/Footer';
import { AdminHeader } from '@/components/admin/AdminHeader';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="">
            <AdminHeader />
            {children}
            <Footer />
        </div>
    );
};

export default AdminLayout;
