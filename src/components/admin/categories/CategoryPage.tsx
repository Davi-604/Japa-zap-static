'use client';

import { ProductEmpty } from '@/components/products/ProductEmpty';
import { Category } from '@/types/Category';
import { useEffect, useState } from 'react';
import { CategoryAddBtn } from './CategoryAddBtn';
import { CategoryTable } from './CategoryTable';
import { CategoryTableSkeleton } from './CategoryTableSkeleton';
import { CategoryAddDialog } from './CategoryAddDialog';
import { CategoryEditDialog } from './CategoryEditDialog';
import { CategoryDeleteDialog } from './CategoryDeleteDialog';
import { categoriesData } from '@/data/categories';

export const CategoryPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category>();
    const [loading, setLoading] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const getCategories = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 700);

        setCategories(categoriesData);
    };
    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="p-5 xl:px-40">
            <div className="flex items-center justify-between mb-5 sm:flex-row">
                <h1 className="text-xl sm:text-2xl font-semibold">Categorias</h1>
                <CategoryAddBtn onClick={() => setOpenAddDialog(true)} />
            </div>
            {categories.length === 0 && !loading && (
                <ProductEmpty
                    bigWarning="Sem categorias para exibir..."
                    message="Crie uma nova categoria"
                />
            )}
            {categories.length > 0 && !loading && (
                <>
                    <CategoryTable
                        categories={categories}
                        onDelete={setOpenDeleteDialog}
                        onEdit={setOpenEditDialog}
                        setCategory={setSelectedCategory}
                    />
                    {openAddDialog && (
                        <CategoryAddDialog
                            open={openAddDialog}
                            onOpenChange={setOpenAddDialog}
                            refreshLoad={getCategories}
                        />
                    )}
                    {openEditDialog && selectedCategory && (
                        <CategoryEditDialog
                            category={selectedCategory}
                            open={openEditDialog}
                            onOpenChange={setOpenEditDialog}
                            refreshLoad={getCategories}
                        />
                    )}
                    {openDeleteDialog && selectedCategory && (
                        <CategoryDeleteDialog
                            open={openDeleteDialog}
                            onOpenChange={setOpenDeleteDialog}
                            refreshLoad={getCategories}
                            category_id={selectedCategory.id}
                        />
                    )}
                </>
            )}
            {loading && (
                <div className="mt-10">
                    <CategoryTableSkeleton />
                    <CategoryTableSkeleton />
                    <CategoryTableSkeleton />
                </div>
            )}
        </div>
    );
};
