import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import bookService from '../services/bookService';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, Edit, Trash2, Star, BookOpen, Calendar, Globe, Hash, User } from 'lucide-react';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBook();
    }, [id]);

    const fetchBook = async () => {
        try {
            const data = await bookService.getBookById(id);
            setBook(data);
        } catch (error) {
            console.error('Failed to fetch book:', error);
            toast.error('Failed to load book details');
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this book?')) return;

        try {
            await bookService.deleteBook(id);
            toast.success('Book deleted successfully');
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete book');
        }
    };

    const handleEdit = () => {
        navigate(`/edit/${id}`);
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                size={20}
                className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
            />
        ));
    };

    const getStatusColor = (status) => {
        const colors = {
            'To Read': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            'Reading': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
            'Completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            'On Hold': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
        };
        return colors[status] || colors['To Read'];
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">Book not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/')}
                        className="gap-2"
                    >
                        <ArrowLeft size={20} />
                        Back to Collection
                    </Button>
                    <div className="flex gap-2">
                        <Button
                            onClick={handleEdit}
                            className="gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary"
                        >
                            <Edit size={18} />
                            Edit
                        </Button>
                        <Button
                            onClick={handleDelete}
                            variant="destructive"
                            className="gap-2"
                        >
                            <Trash2 size={18} />
                            Delete
                        </Button>
                    </div>
                </div>

                {/* Book Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cover Image */}
                    <div className="lg:col-span-1">
                        <Card className="overflow-hidden border-2 border-primary/20">
                            <CardContent className="p-0">
                                {book.coverImage ? (
                                    <img
                                        src={book.coverImage}
                                        alt={book.title}
                                        className="w-full h-auto object-cover"
                                    />
                                ) : (
                                    <div className="aspect-[2/3] bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                                        <BookOpen size={80} className="text-primary/40" />
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Rating */}
                        <Card className="mt-4">
                            <CardContent className="p-4">
                                <p className="text-sm text-muted-foreground mb-2">Your Rating</p>
                                <div className="flex gap-1">
                                    {renderStars(book.rating || 0)}
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">
                                    {book.rating || 0} out of 5 stars
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title and Author */}
                        <div>
                            <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                                {book.title}
                            </h1>
                            <p className="text-xl text-muted-foreground flex items-center gap-2">
                                <User size={20} />
                                by {book.author}
                            </p>
                        </div>

                        {/* Status Badge */}
                        <div>
                            <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(book.readingStatus)}`}>
                                {book.readingStatus}
                            </span>
                        </div>

                        {/* Description */}
                        {book.description && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Description</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {book.description}
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Book Details Grid */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Book Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {book.category && (
                                        <div className="flex items-start gap-3">
                                            <BookOpen className="text-primary mt-1" size={20} />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Category</p>
                                                <p className="font-medium">{book.category}</p>
                                            </div>
                                        </div>
                                    )}

                                    {book.isbn && (
                                        <div className="flex items-start gap-3">
                                            <Hash className="text-primary mt-1" size={20} />
                                            <div>
                                                <p className="text-sm text-muted-foreground">ISBN</p>
                                                <p className="font-medium">{book.isbn}</p>
                                            </div>
                                        </div>
                                    )}

                                    {book.publisher && (
                                        <div className="flex items-start gap-3">
                                            <BookOpen className="text-primary mt-1" size={20} />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Publisher</p>
                                                <p className="font-medium">{book.publisher}</p>
                                            </div>
                                        </div>
                                    )}

                                    {book.publicationYear && (
                                        <div className="flex items-start gap-3">
                                            <Calendar className="text-primary mt-1" size={20} />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Publication Year</p>
                                                <p className="font-medium">{book.publicationYear}</p>
                                            </div>
                                        </div>
                                    )}

                                    {book.pages && (
                                        <div className="flex items-start gap-3">
                                            <BookOpen className="text-primary mt-1" size={20} />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Pages</p>
                                                <p className="font-medium">{book.pages}</p>
                                            </div>
                                        </div>
                                    )}

                                    {book.language && (
                                        <div className="flex items-start gap-3">
                                            <Globe className="text-primary mt-1" size={20} />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Language</p>
                                                <p className="font-medium">{book.language}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Notes */}
                        {book.notes && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Your Notes</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                        {book.notes}
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Timestamps */}
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Added: {new Date(book.createdAt).toLocaleDateString()}</span>
                                    <span>Updated: {new Date(book.updatedAt).toLocaleDateString()}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BookDetails;
