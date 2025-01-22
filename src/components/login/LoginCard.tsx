'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const LoginCard = () => {
    const router = useRouter();

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState('');

    useEffect(() => {
        setWarning('');
    }, [password]);

    const tryLogin = async () => {
        setWarning('');

        if (password.trim()) {
            setLoading(true);

            if (password === '1234') {
                setTimeout(() => {
                    setLoading(false);
                    router.push('/admin/products');
                }, 300);
            } else {
                setTimeout(() => {
                    setLoading(false);
                    setWarning('Senha incorreta');
                }, 700);
            }
        } else {
            setWarning('Preencha o campo!');
        }
    };

    return (
        <Card className="w-full">
            <CardHeader className="sm:text-center">
                <CardTitle>Login administração</CardTitle>
                <CardDescription>Insira a senha para ter acesso.</CardDescription>
            </CardHeader>
            <CardContent>
                <Label htmlFor="password">Senha</Label>
                <div className="relative mb-3">
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Senha do administrador"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyUp={(e) =>
                            e.code.toLowerCase() === 'enter' ? tryLogin() : ''
                        }
                        disabled={loading}
                        className="mt-1"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                        {!showPassword ? (
                            <EyeIcon
                                className="text-muted-foreground"
                                onClick={() => setShowPassword(true)}
                            />
                        ) : (
                            <EyeOffIcon
                                className="text-muted-foreground"
                                onClick={() => setShowPassword(false)}
                            />
                        )}
                    </span>
                    <p className="absolute text-yellow-500 text-sm pl-2 ">{warning}</p>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="mx-auto w-full" onClick={tryLogin} disabled={loading}>
                    {!loading ? 'Enviar senha' : 'Enviando...'}
                </Button>
            </CardFooter>
        </Card>
    );
};
