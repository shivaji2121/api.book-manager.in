import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import bookService from '../services/bookService';
import BookForm from '../components/BookForm';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchBook();
    }, [id]);

    const fetchBook = async () => {
        try {
            const data = await bookService.getBookById(id);
            setBook(data);
        } catch (error) {
            console.error('Failed to fetch book:', error);
            toast.error('Failed to load book');
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (formData) => {
        setIsSubmitting(true);
        try {
            await bookService.updateBook(id, formData);
            toast.success('Book updated successfully');
            navigate(`/book/${id}`);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to update book');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(`/book/${id}`)}
                        className="gap-2 mb-6"
                    >
                        <ArrowLeft size={20} />
                        Back to Book Details
                    </Button>

                    <div className="bg-card rounded-xl shadow-lg p-6 border-t-4 border-primary">
                        <h1 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                            Edit Book
                        </h1>
                        <BookForm
                            initialData={book}
                            onSubmit={handleUpdate}
                            isSubmitting={isSubmitting}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EditBook;
