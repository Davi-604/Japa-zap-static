import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Category } from '@/types/Category';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const editSchema = z.object({
    nameField: z
        .string()
        .min(2, 'Mínimo de dois caracteres')
        .max(20, 'Máximo de 20 caracteres')
        .optional(),
});
type Props = {
    onFinish: (value: boolean) => void;
    refreshLoad: () => void;
    category: Category;
};
export const CategoryEditForm = ({ onFinish, refreshLoad, category }: Props) => {
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof editSchema>>({
        resolver: zodResolver(editSchema),
        defaultValues: { nameField: category.name },
    });

    const onSubmit = async (values: z.infer<typeof editSchema>) => {
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
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input
                                        autoFocus
                                        className="text-ellipsis whitespace-normal"
                                        placeholder="Edite o nome da categoria"
                                        onChange={(e) => {
                                            field.onChange(e);
                                            form.clearErrors('nameField');
                                        }}
                                        onKeyUp={(e) => {
                                            if (e.code.toLowerCase() === 'enter') {
                                                e.preventDefault();
                                                form.handleSubmit(onSubmit)();
                                            }
                                        }}
                                        value={field.value}
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
