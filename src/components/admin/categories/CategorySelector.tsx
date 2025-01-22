'use client';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { categoriesData } from '@/data/categories';
import { Category } from '@/types/Category';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
    onChange: (category: Category) => void;
};
export const CategorySelector = ({ onChange }: Props) => {
    const router = useRouter();

    const [categories, setCategories] = useState<Category[]>([]);

    const getCategories = async () => {
        setTimeout(() => {
            setCategories(categoriesData);
        }, 700);
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleChangeCategory = (value: string) => {
        const selectedCategory = categories.find(
            (category) => category.name.toLowerCase() === value
        );

        if (selectedCategory) {
            onChange(selectedCategory);
        }
    };

    return (
        <Select onValueChange={(value) => handleChangeCategory(value)}>
            <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Categorias" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Categorias</SelectLabel>
                    {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name.toLowerCase()}>
                            {category.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
