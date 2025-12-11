import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'email':
                if (!value.trim()) {
                    error = 'Email is required';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Please enter a valid email address';
                }
                break;

            case 'password':
                if (!value) {
                    error = 'Password is required';
                }
                break;

            default:
                break;
        }

        return error;
    };

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        const value = field === 'email' ? email : password;
        const error = validateField(field, value);
        setErrors(prev => ({ ...prev, [field]: error }));
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (touched.email) {
            const error = validateField('email', e.target.value);
            setErrors(prev => ({ ...prev, email: error }));
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (touched.password) {
            const error = validateField('password', e.target.value);
            setErrors(prev => ({ ...prev, password: error }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailError = validateField('email', email);
        const passwordError = validateField('password', password);

        setErrors({ email: emailError, password: passwordError });
        setTouched({ email: true, password: true });

        if (emailError || passwordError) {
            return;
        }

        setIsLoading(true);
        const success = await login(email, password);
        setIsLoading(false);
        if (success) {
            navigate('/');
        }
    };

    const ErrorMessage = ({ error }) => {
        if (!error) return null;
        return (
            <div className="flex items-center gap-1 text-sm text-destructive mt-1">
                <AlertCircle size={14} />
                <span>{error}</span>
            </div>
        );
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background px-4 py-12">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5"></div>
            <Card className="w-full max-w-md relative z-10 shadow-xl border-t-4 border-primary">
                <CardHeader className="space-y-1 items-center text-center">
                    <div className="bg-gradient-to-r from-primary to-purple-600 p-3 rounded-full mb-2 shadow-lg">
                        <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                        Welcome back
                    </CardTitle>
                    <CardDescription>
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-primary font-medium">
                                Email <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john.doe@example.com"
                                value={email}
                                onChange={handleEmailChange}
                                onBlur={() => handleBlur('email')}
                                required
                                className={`border-2 ${errors.email && touched.email ? 'border-destructive' : 'border-primary/20'} focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg`}
                            />
                            <ErrorMessage error={touched.email && errors.email} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-primary font-medium">
                                Password <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={handlePasswordChange}
                                onBlur={() => handleBlur('password')}
                                required
                                className={`border-2 ${errors.password && touched.password ? 'border-destructive' : 'border-primary/20'} focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg`}
                            />
                            <ErrorMessage error={touched.password && errors.password} />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white shadow-lg hover:shadow-xl mt-4 transition-all disabled:opacity-50"
                            disabled={isLoading || (touched.email && errors.email) || (touched.password && errors.password)}
                        >
                            {isLoading ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <div className="text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-primary underline-offset-4 hover:underline font-medium">
                            Sign up
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;