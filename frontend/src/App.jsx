import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import BookDetails from './pages/BookDetails';
import EditBook from './pages/EditBook';
import Layout from './components/Layout';

const NotFound = () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-4">
                404
            </h1>
            <p className="text-xl text-muted-foreground mb-6">Page Not Found</p>
            <a
                href="/"
                className="inline-block px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
                Go Home
            </a>
        </div>
    </div>
);

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Dashboard />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/book/:id"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <BookDetails />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/edit/:id"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <EditBook />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;