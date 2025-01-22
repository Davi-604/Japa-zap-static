import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { set, z } from 'zod';
import { ProductAddFormField } from './ProductAddFormField';
import { productSchema } from '@/schemas/productSchema';
import { useState } from 'react';
import { ProductTextAreaField } from './ProductTextAreaField';
import { ProductAddImageField } from './ProductAddImageField';

type Props = {
    onFinish: (value: boolean) => void;
    category_id: number;
    refreshLoad: () => void;
};
export const ProductAddForm = ({ onFinish, category_id, refreshLoad }: Props) => {
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            nameField: '',
            imageField: undefined,
            descriptionField: '',
            priceField: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof productSchema>) => {
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
                            <ProductAddFormField
                                label="Nome"
                                name="nameField"
                                placeholder="Digite o nome do produto"
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
                                label="Descrição"
                                name="descriptionField"
                                field={field}
                                form={form}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imageField"
                        render={({ field }) => (
                            <ProductAddImageField
                                name="imageField"
                                label="Imagem"
                                field={field}
                                form={form}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="priceField"
                        render={({ field }) => (
                            <ProductAddFormField
                                name="priceField"
                                label="Preço"
                                placeholder="Digite o preço do produto"
                                field={field}
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
                            {!loading ? 'Adicionar' : 'Adicionando...'}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};
