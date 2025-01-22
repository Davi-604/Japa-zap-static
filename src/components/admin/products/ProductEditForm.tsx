import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Product } from '@/types/Product';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { z } from 'zod';
import { productSchema } from '@/schemas/productSchema';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useDropzone } from 'react-dropzone';

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
    const [photoPreviewUrl, setPhotoPreviewUrl] = useState(product.image);

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

    const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
        maxFiles: 1,
        accept: {
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg'],
            'image/png': ['.png'],
        },
        onDrop: (files) => handleChangeImage(files),
    });

    const handleChangeImage = (
        files: File[],
        field?: ControllerRenderProps<z.infer<typeof productSchema>>
    ) => {
        if (files.length > 0) {
            const file = files[0];
            setPhotoPreviewUrl(URL.createObjectURL(file));
            form.clearErrors('imageField');
            field?.onChange(file);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col justify-center gap-4">
                    <FormField
                        control={form.control}
                        name="nameField"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="text-ellipsis whitespace-normal transition-all ease-in"
                                        placeholder="Digite o nome do produto"
                                        autoFocus
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                            form.clearErrors('nameField');
                                        }}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage className="text-yellow-500" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="descriptionField"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrição</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="text-ellipsis whitespace-normal transition-colors ease-in"
                                        onChange={(e) => {
                                            field.onChange(e);
                                            form.clearErrors('descriptionField');
                                        }}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage className="text-yellow-500" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imageField"
                        render={({ field }) => (
                            <FormField
                                control={form.control}
                                name="imageField"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Imagem</FormLabel>
                                        <FormControl>
                                            <div
                                                className={`h-36 max-w-full border-4 border-muted rounded-lg border-dashed flex items-center justify-center cursor-pointer
                                hover:bg-muted hover:border-primary transition-colors ease-in-out
                                ${isDragActive ? 'bg-muted border-primary' : ''}`}
                                                {...getRootProps()}
                                            >
                                                <input {...getInputProps()} />
                                                {!photoPreviewUrl.trim() && (
                                                    <p className="text-sm text-muted-foreground m-3">
                                                        {!isDragActive
                                                            ? 'Escolha ou arraste a imagem para aqui'
                                                            : 'Solte a imagem aqui'}
                                                    </p>
                                                )}
                                                {photoPreviewUrl.trim() && (
                                                    <img
                                                        className="rounded-lg h-full w-full object-cover"
                                                        src={photoPreviewUrl}
                                                    />
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-yellow-500" />
                                    </FormItem>
                                )}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="priceField"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Preço</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="text-ellipsis whitespace-normal transition-all ease-in"
                                        placeholder="Digite o preço do produto"
                                        onChange={(e) => {
                                            field.onChange(
                                                e.target.value.replace(/[^0-9,]/g, '')
                                            );
                                            form.clearErrors('nameField');
                                        }}
                                        value={
                                            field.value
                                                ? field.value.replace('.', ',')
                                                : ''
                                        }
                                        onKeyUp={(e) => {
                                            if (e.code.toLowerCase() === 'enter') {
                                                e.preventDefault();
                                                form.handleSubmit(onSubmit)();
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormMessage className="text-yellow-500" />
                            </FormItem>
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
