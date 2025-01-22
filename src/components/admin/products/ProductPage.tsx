'use client';

import { Suspense, useEffect, useState } from 'react';
import { CategorySelector } from '../categories/CategorySelector';
import { Category } from '@/types/Category';
import { ProductEmpty } from '@/components/products/ProductEmpty';
import { ProductTable } from './ProductTable';
import { Product } from '@/types/Product';
import { ProductTableSkeleton } from './ProductTableSkeleton';
import { ProductAddBtn } from './ProductAddBtn';
import { ProductAddDialog } from './ProductAddDialog';
import { ProductEditDialog } from './ProductEditDialog';
import { ProductDeleteDialog } from './ProductDeleteDialog';
import { productsData } from '@/data/products';

export const ProductPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>();
    const [selectedProduct, setSelectedProduct] = useState<Product>();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const getProducts = async () => {
        setProducts([]);
        setLoading(true);
        if (selectedCategory) {
            setTimeout(() => {
                setLoading(false);
                setProducts(
                    productsData.filter(
                        (product) => product.category_id === selectedCategory.id
                    ) as Product[]
                );
            }, 700);
        }
        setTimeout(() => {
            setLoading(false);
        }, 700);
    };
    useEffect(() => {
        getProducts();
        console.log(products);
    }, [selectedCategory]);

    return (
        <div className="p-5 xl:px-40">
            <div className="flex items-center justify-between mb-5 sm:flex-row">
                <h1 className="text-xl sm:text-2xl font-semibold">Produtos</h1>
                <CategorySelector onChange={setSelectedCategory} />
            </div>
            {!selectedCategory && (
                <ProductEmpty bigWarning="Selecione uma categoria..." />
            )}
            {selectedCategory && products.length === 0 && !loading && (
                <ProductEmpty bigWarning="Sem produtos..." />
            )}
            {selectedCategory && products.length > 0 && (
                <>
                    <ProductTable
                        products={products}
                        onOpenEdit={setOpenEditDialog}
                        onOpenDelete={setOpenDeleteDialog}
                        setProduct={setSelectedProduct}
                    />
                    {selectedProduct && openEditDialog && (
                        <ProductEditDialog
                            category_id={selectedCategory.id}
                            onOpenChange={setOpenEditDialog}
                            open={openEditDialog}
                            product={selectedProduct}
                            refreshLoad={getProducts}
                        />
                    )}
                    {selectedProduct && openDeleteDialog && (
                        <ProductDeleteDialog
                            category_id={selectedCategory.id}
                            onOpenChange={setOpenDeleteDialog}
                            open={openDeleteDialog}
                            product={selectedProduct}
                            refreshLoad={getProducts}
                        />
                    )}
                </>
            )}
            {selectedCategory && !loading && (
                <>
                    <div className="flex justify-center mt-7 sm:justify-end">
                        <ProductAddBtn onClick={() => setOpenAddDialog(true)} />
                    </div>
                    {openAddDialog && (
                        <ProductAddDialog
                            open={openAddDialog}
                            category_id={selectedCategory.id}
                            onOpenChange={setOpenAddDialog}
                            refreshLoad={getProducts}
                        />
                    )}
                </>
            )}

            {products.length === 0 && loading && selectedCategory && (
                <div className="mt-10">
                    <ProductTableSkeleton />
                    <ProductTableSkeleton />
                    <ProductTableSkeleton />
                </div>
            )}
        </div>
    );
};
