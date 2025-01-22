import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ProductTabs } from '@/components/products/ProductTabs';

const Page = () => {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <Header />
            <div>
                <ProductTabs />
            </div>
            <Footer />
        </div>
    );
};

export default Page;
