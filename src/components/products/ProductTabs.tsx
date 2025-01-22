'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductEmpty } from './ProductEmpty';
import { ProductGridItem } from './ProductGridItem';
import { Category } from '@/types/Category';
import { Product } from '@/types/Product';
import { useEffect, useState } from 'react';
import { categoriesData } from '@/data/categories';
import { productsData } from '@/data/products';
import { ProductTableSkeleton } from '../admin/products/ProductTableSkeleton';
import { ProductSkeleton } from './ProductSkeleton';

export const ProductTabs = () => {
    const [loading, setLoading] = useState(false);

    const loadReqs = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 700);
    };
    useEffect(() => {
        loadReqs();
    }, []);

    return (
        <>
            {categoriesData.length > 0 && !loading && (
                <Tabs
                    defaultValue={categoriesData[0].name.toLowerCase()}
                    className="px-5"
                >
                    <TabsList className="flex">
                        {categoriesData.map((item) => (
                            <TabsTrigger
                                className="flex-1 hover:opacity-70 transition-all ease-in"
                                key={item.name}
                                value={item.name.toLowerCase()}
                            >
                                {item.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {categoriesData.map((item) => (
                        <TabsContent
                            key={item.name.toLowerCase()}
                            value={item.name.toLowerCase()}
                        >
                            <>
                                {productsData.find(
                                    (product) => product.category_id === item.id
                                ) && (
                                    <div className="my-10 grid gap-7 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                                        {productsData
                                            .filter(
                                                (product) =>
                                                    product.category_id === item.id
                                            )
                                            .map((productItem) => (
                                                <ProductGridItem
                                                    key={productItem.id}
                                                    product={productItem}
                                                />
                                            ))}
                                    </div>
                                )}
                                {!productsData.find(
                                    (product) => product.category_id === item.id
                                ) && (
                                    <ProductEmpty
                                        bigWarning="Ops!"
                                        message="Não encontramos nenhum produto nessa categoria..."
                                    />
                                )}
                            </>
                        </TabsContent>
                    ))}
                </Tabs>
            )}
            {loading && (
                <div className="">
                    <ProductSkeleton />
                </div>
            )}
            {categoriesData.length === 0 && loading && (
                <ProductEmpty
                    bigWarning="Ops!"
                    message="Não encontramos nenhuma categoria para exibir..."
                />
            )}
        </>
    );
};
