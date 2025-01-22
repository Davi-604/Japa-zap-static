import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
} from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Product } from '@/types/Product';
import { Button } from '@/components/ui/button';
import { KeyboardEvent, useState } from 'react';

type Props = {
    open: boolean;
    category_id: number;
    product: Product;
    refreshLoad: () => void;
    onOpenChange: (value: boolean) => void;
};
export const ProductDeleteDialog = ({
    open,
    category_id,
    refreshLoad,
    product,
    onOpenChange,
}: Props) => {
    const [loading, setLoading] = useState(false);

    const deleteProduct = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 700);

        onOpenChange(false);
        refreshLoad();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key.toLowerCase() === 'enter') {
            event.preventDefault();
        }
    };

    return (
        <Dialog open={open} onOpenChange={(value) => onOpenChange(value)}>
            <DialogContent onKeyDown={handleKeyDown}>
                <DialogHeader>
                    <DialogTitle className="text-xl font-medium text-center">
                        Excluir produto
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-center">
                    Tem certeza de que quer excluir esse produto?
                </DialogDescription>
                <div className="flex flex-1 items-center justify-center gap-10 mt-3">
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
                </div>
            </DialogContent>
        </Dialog>
    );
};
