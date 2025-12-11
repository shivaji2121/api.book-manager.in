import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogOut, User } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="border-b border-primary/20 bg-background/80 sticky top-0 z-50 backdrop-blur-md shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 font-bold text-xl group">
                    <div className="bg-gradient-to-r from-primary to-purple-600 p-2 rounded-lg shadow-md group-hover:shadow-lg transition-all">
                        <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                        BookManager
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    {user && (
                        <>
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground hidden sm:flex">
                                <div className="bg-gradient-to-r from-primary to-purple-600 p-1.5 rounded-full">
                                    <User className="h-4 w-4 text-white" />
                                </div>
                                <span>{user.username || user.email}</span>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleLogout}
                                className="gap-2 border-primary/20 hover:bg-destructive hover:text-white hover:border-destructive transition-all"
                            >
                                <LogOut className="h-4 w-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;