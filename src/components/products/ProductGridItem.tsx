'use client';

import { Product } from '@/types/Product';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '../ui/toast';
import { useCartStore } from '@/stores/cartStore';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';

type Props = {
    product: Product;
};
export const ProductGridItem = ({ product }: Props) => {
    const { toast } = useToast();
    const { upsertCartItem } = useCartStore((state) => state);

    const handleAddBtn = () => {
        upsertCartItem(product, 1);
        toast({
            title: 'Adicionado ao carrinho!',
            image: product.image,
            description: product.name,
            action: <ToastAction altText="fechar">Fechar</ToastAction>,
        });
    };

    return (
        <div className="">
            <Dialog>
                <DialogTrigger>
                    <div className="overflow-hidden rounded-lg cursor-pointer lg:hover:scale-110 transition-all ease-in">
                        <img
                            className="w-[200px] h-32 object-cover"
                            alt={product.name}
                            src={product.image}
                        />
                    </div>
                </DialogTrigger>
                <DialogContent className="p-3">
                    <DialogTitle>
                        <div className="text-center my-3 text-3xl font-bold">
                            {product.name}
                        </div>
                    </DialogTitle>
                    <div className="overflow-hidden rounded-lg ">
                        <img
                            className="w-full h-[300px] object-cover"
                            alt={product.name}
                            src={product.image}
                        />
                    </div>
                    <DialogDescription className="text-muted-foreground">
                        {product.description}
                    </DialogDescription>
                    <p className="font-semibold text-xl">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                    </p>
                    <Button variant="destructive" onClick={handleAddBtn}>
                        Adicionar
                    </Button>
                </DialogContent>
            </Dialog>
            <div className="mt-2 flex flex-col gap-2">
                <p className="text-lg font-medium truncate">{product.name}</p>
                <p className="font-semibold ">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                </p>
                <Button variant="destructive" onClick={handleAddBtn}>
                    Adicionar
                </Button>
            </div>
        </div>
    );
};
