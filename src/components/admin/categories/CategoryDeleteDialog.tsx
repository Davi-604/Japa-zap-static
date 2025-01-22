import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
} from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Product } from '@/types/Product';
import { Button } from '@/components/ui/button';
import { KeyboardEvent, useEffect, useState } from 'react';
import { productsData } from '@/data/products';

type Props = {
    open: boolean;
    category_id: number;
    refreshLoad: () => void;
    onOpenChange: (value: boolean) => void;
};
export const CategoryDeleteDialog = ({
    open,
    category_id,
    refreshLoad,
    onOpenChange,
}: Props) => {
    const [loading, setLoading] = useState(false);
    const [hasProducts, setHasProducts] = useState(true);

    const deleteProduct = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 700);

        onOpenChange(false);
        refreshLoad();
    };

    const checkProducts = async () => {
        setLoading(true);

        setTimeout(() => {
            if (productsData.some((product) => product.category_id === category_id)) {
                setHasProducts(true);
                setLoading(false);
            } else {
                setHasProducts(false);
            }
            setLoading(false);
        }, 700);
    };
    useEffect(() => {
        checkProducts();
    }, []);

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key.toLowerCase() === 'enter') {
            event.preventDefault();
        }
    };

    return (
        <Dialog open={open} onOpenChange={(value) => onOpenChange(value)}>
            {!loading && (
                <DialogContent onKeyDown={handleKeyDown}>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-medium text-center">
                            Excluir categoria
                        </DialogTitle>
                    </DialogHeader>

                    {!hasProducts && !loading && (
                        <DialogDescription className="text-center text-lg font-semibold">
                            Tem certeza de que quer excluir essa categoria?
                        </DialogDescription>
                    )}
                    {hasProducts && !loading && (
                        <DialogDescription className="text-lg font-semibold text-center">
                            Não é possível excluir uma categoria com produtos associados a
                            ela.
                        </DialogDescription>
                    )}
                    <div className="flex flex-1 items-center justify-center gap-10 mt-3">
                        {!hasProducts && (
                            <>
                                <Button
                                    onClick={() => onOpenChange(false)}
                                    variant="secondary"
                                    disabled={loading}
                                >
                                    Cancelar
                                </Button>
                                <Button onClick={deleteProduct} disabled={loading}>
                                    {loading ? 'Excluindo...' : 'Excluir'}
                                </Button>
                            </>
                        )}
                        {hasProducts && (
                            <Button onClick={() => onOpenChange(false)}>Voltar</Button>
                        )}
                    </div>
                </DialogContent>
            )}
        </Dialog>
    );
};
