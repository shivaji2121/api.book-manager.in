import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        gender: 'male',
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'name':
                if (!value.trim()) {
                    error = 'Name is required';
                } else if (value.length < 2) {
                    error = 'Name must be at least 2 characters';
                } else if (value.length > 100) {
                    error = 'Name must not exceed 100 characters';
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    error = 'Name can only contain letters and spaces';
                }
                break;

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
                } else if (value.length < 6) {
                    error = 'Password must be at least 6 characters';
                } else if (value.length > 128) {
                    error = 'Password must not exceed 128 characters';
                } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                    error = 'Password must contain uppercase, lowercase, and number';
                }
                break;

            default:
                break;
        }

        return error;
    };

    const getPasswordStrength = (password) => {
        if (!password) return { strength: 0, label: '', color: '' };

        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.length >= 10) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

        if (strength <= 2) return { strength, label: 'Weak', color: 'text-red-500' };
        if (strength <= 3) return { strength, label: 'Medium', color: 'text-yellow-500' };
        return { strength, label: 'Strong', color: 'text-green-500' };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (name) => {
        setTouched(prev => ({ ...prev, [name]: true }));
        const error = validateField(name, formData[name]);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
            }
        });

        setErrors(newErrors);
        setTouched({ name: true, email: true, password: true, gender: true });

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setIsLoading(true);
        const success = await signup(formData);
        setIsLoading(false);
        if (success) {
            navigate('/login');
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

    const passwordStrength = getPasswordStrength(formData.password);

    return (
        <div className="flex items-center justify-center min-h-screen bg-background px-4 py-12">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5"></div>
            <Card className="w-full max-w-md relative z-10 shadow-xl border-t-4 border-primary">
                <CardHeader className="space-y-1 items-center text-center">
                    <div className="bg-gradient-to-r from-primary to-purple-600 p-3 rounded-full mb-2 shadow-lg">
                        <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                        Create an account
                    </CardTitle>
                    <CardDescription>
                        Enter your information to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-primary font-medium">
                                Full Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={() => handleBlur('name')}
                                required
                                className={`border-2 ${errors.name && touched.name ? 'border-destructive' : 'border-primary/20'} focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg`}
                            />
                            <ErrorMessage error={touched.name && errors.name} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-primary font-medium">
                                Email <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john.doe@example.com"
                                value={formData.email}
                                onChange={handleChange}
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
                                name="password"
                                type="password"
                                placeholder="Create a strong password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={() => handleBlur('password')}
                                required
                                className={`border-2 ${errors.password && touched.password ? 'border-destructive' : 'border-primary/20'} focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg`}
                            />
                            {formData.password && !errors.password && (
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all ${passwordStrength.strength <= 2 ? 'bg-red-500' :
                                                    passwordStrength.strength <= 3 ? 'bg-yellow-500' : 'bg-green-500'
                                                }`}
                                            style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className={`font-medium ${passwordStrength.color}`}>
                                        {passwordStrength.label}
                                    </span>
                                </div>
                            )}
                            <ErrorMessage error={touched.password && errors.password} />
                            {!errors.password && formData.password && (
                                <div className="text-xs text-muted-foreground space-y-1">
                                    <div className="flex items-center gap-1">
                                        {formData.password.length >= 6 ?
                                            <CheckCircle size={12} className="text-green-500" /> :
                                            <AlertCircle size={12} className="text-gray-400" />
                                        }
                                        <span>At least 6 characters</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) ?
                                            <CheckCircle size={12} className="text-green-500" /> :
                                            <AlertCircle size={12} className="text-gray-400" />
                                        }
                                        <span>Uppercase and lowercase letters</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {/\d/.test(formData.password) ?
                                            <CheckCircle size={12} className="text-green-500" /> :
                                            <AlertCircle size={12} className="text-gray-400" />
                                        }
                                        <span>At least one number</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender" className="text-primary font-medium">
                                Gender <span className="text-destructive">*</span>
                            </Label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-lg border-2 border-primary/20 bg-background px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/30 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white shadow-lg hover:shadow-xl mt-4 transition-all disabled:opacity-50"
                            disabled={isLoading || Object.keys(errors).some(key => errors[key])}
                        >
                            {isLoading ? "Creating account..." : "Sign Up"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <div className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary underline-offset-4 hover:underline font-medium">
                            Login
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Signup;