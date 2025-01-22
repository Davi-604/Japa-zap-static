import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { Product } from '@/types/Product';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ProductEditFormField } from './ProductEditFormField';
import { ProductTextAreaField } from './ProductTextAreaField';
import { ProductEditImageField } from './ProductEditImageField';
import { productSchema } from '@/schemas/productSchema';

type Props = {
    category_id: number;
    product: Product;
    onFinish: (value: boolean) => void;
    refreshLoad: () => void;
};
export const ProductEditForm = ({
    onFinish,
    category_id,
    product,
    refreshLoad,
}: Props) => {
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            nameField: product.name,
            imageField: product.image,
            descriptionField: product.description,
            priceField: product.price.toFixed(2).toString(),
        },
    });

    const onSubmit = async (values: z.infer<typeof productSchema>) => {
        const formatedPrice = values.priceField?.replace(',', '.');

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 700);

        onFinish(false);
        refreshLoad();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col justify-center gap-4">
                    <FormField
                        control={form.control}
                        name="nameField"
                        render={({ field }) => (
                            <ProductEditFormField
                                name="nameField"
                                label="Nome"
                                placeholder="Digite o seu nome"
                                field={field}
                                form={form}
                                focus
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="descriptionField"
                        render={({ field }) => (
                            <ProductTextAreaField
                                name="descriptionField"
                                label="Descrição"
                                field={field}
                                form={form}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imageField"
                        render={({ field }) => (
                            <ProductEditImageField
                                label="Imagem"
                                name="imageField"
                                field={field}
                                form={form}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="priceField"
                        render={({ field }) => (
                            <ProductEditFormField
                                name="priceField"
                                label="Preço"
                                field={field}
                                placeholder="Digite o preço do produto"
                                form={form}
                                priceField
                                onSubmit={onSubmit}
                            />
                        )}
                    />
                    <div className="flex items-center justify-between mt-5 ">
                        <Button variant="link" onClick={() => onFinish(false)}>
                            Voltar
                        </Button>
                        <Button type="submit">
                            {!loading ? 'Salvar' : 'Salvando...'}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};
