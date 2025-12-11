import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-background flex flex-col font-sans text-foreground">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
                {children}
            </main>

            <footer className="bg-gradient-linear text-white py-6 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center text-sm">
                    &copy; {new Date().getFullYear()} ShelfSpace. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Layout;