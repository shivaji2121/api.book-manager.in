import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bookService from '../services/bookService';
import BookCard from '../components/BookCard';
import BookForm from '../components/BookForm';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Plus, BookOpen, Search, Filter } from 'lucide-react';
import { toast } from 'react-toastify';
import { Input } from '../components/ui/input';

const Dashboard = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [categories, setCategories] = useState(['All']);
    const [statistics, setStatistics] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    useEffect(() => {
        filterBooks();
    }, [books, searchQuery, selectedCategory, selectedStatus]);

    const fetchBooks = async () => {
        try {
            const data = await bookService.getMyBooks();
            setBooks(data);
            setCategories(bookService.getCategories(data));
            setStatistics(bookService.getStatistics(data));
        } catch (error) {
            console.error('Failed to fetch books:', error);
            toast.error('Failed to load books');
        } finally {
            setLoading(false);
        }
    };

    const filterBooks = () => {
        let result = books;
        result = bookService.searchBooks(result, searchQuery);
        result = bookService.filterByCategory(result, selectedCategory);
        result = bookService.filterByStatus(result, selectedStatus);
        setFilteredBooks(result);
    };

    const handleCreate = async (formData) => {
        setIsSubmitting(true);
        try {
            console.log('Creating book with data:', formData); // Debug log
            await bookService.createBook(formData);
            toast.success('Book added successfully');
            setIsFormOpen(false);
            fetchBooks();
        } catch (error) {
            console.error('Error creating book:', error);
            toast.error(error.response?.data?.message || error.message || 'Failed to add book');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (bookId) => {
        if (!window.confirm('Are you sure you want to delete this book?')) return;
        try {
            await bookService.deleteBook(bookId);
            toast.success('Book deleted successfully');
            fetchBooks();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to delete book');
        }
    };

    const openCreateForm = () => {
        setIsFormOpen(true);
    };

    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                            Your Book Collection
                        </h1>
                        <p className="text-muted-foreground mt-2">Manage and track your personal library</p>
                    </div>
                    <Button
                        onClick={openCreateForm}
                        className="gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all"
                    >
                        <Plus size={20} />
                        Add Book
                    </Button>
                </div>

                {statistics && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                        <Card className="border-2 border-primary/20">
                            <CardContent className="p-4 text-center">
                                <p className="text-2xl font-bold text-primary">{statistics.total}</p>
                                <p className="text-sm text-muted-foreground">Total Books</p>
                            </CardContent>
                        </Card>
                        <Card className="border-2 border-blue-500/20">
                            <CardContent className="p-4 text-center">
                                <p className="text-2xl font-bold text-blue-600">{statistics.toRead}</p>
                                <p className="text-sm text-muted-foreground">To Read</p>
                            </CardContent>
                        </Card>
                        <Card className="border-2 border-purple-500/20">
                            <CardContent className="p-4 text-center">
                                <p className="text-2xl font-bold text-purple-600">{statistics.reading}</p>
                                <p className="text-sm text-muted-foreground">Reading</p>
                            </CardContent>
                        </Card>
                        <Card className="border-2 border-green-500/20">
                            <CardContent className="p-4 text-center">
                                <p className="text-2xl font-bold text-green-600">{statistics.completed}</p>
                                <p className="text-sm text-muted-foreground">Completed</p>
                            </CardContent>
                        </Card>
                        <Card className="border-2 border-orange-500/20">
                            <CardContent className="p-4 text-center">
                                <p className="text-2xl font-bold text-orange-600">{statistics.averageRating}</p>
                                <p className="text-sm text-muted-foreground">Avg Rating</p>
                            </CardContent>
                        </Card>
                    </div>
                )}

                <div className="mb-6 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                        <Input
                            type="text"
                            placeholder="Search by title or author..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 border-2 border-primary/20 focus:border-primary"
                        />
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                            <Filter size={20} className="text-muted-foreground" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2 border-2 border-primary/20 rounded-lg bg-background focus:border-primary focus:ring-2 focus:ring-primary/30"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-4 py-2 border-2 border-primary/20 rounded-lg bg-background focus:border-primary focus:ring-2 focus:ring-primary/30"
                        >
                            <option value="All">All Statuses</option>
                            <option value="To Read">To Read</option>
                            <option value="Reading">Reading</option>
                            <option value="Completed">Completed</option>
                            <option value="On Hold">On Hold</option>
                        </select>

                        {(searchQuery || selectedCategory !== 'All' || selectedStatus !== 'All') && (
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('All');
                                    setSelectedStatus('All');
                                }}
                                className="border-primary/20"
                            >
                                Clear Filters
                            </Button>
                        )}
                    </div>
                </div>

                {isFormOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                        <div className="bg-background rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative border-t-4 border-primary">
                            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                                Add New Book
                            </h2>
                            <BookForm
                                onSubmit={handleCreate}
                                isSubmitting={isSubmitting}
                                initialData={{}} // Ensure we pass an empty initialData object
                            />
                            <Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-4 right-4 hover:bg-destructive/10"
                                onClick={() => setIsFormOpen(false)}
                            >
                                ✕
                            </Button>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : filteredBooks.length === 0 ? (
                    <div className="text-center py-16 border-2 border-dashed rounded-xl bg-gradient-to-br from-primary/5 to-purple-600/5">
                        <div className="bg-gradient-to-r from-primary to-purple-600 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-muted-foreground text-lg mb-4">
                            {books.length === 0
                                ? 'No books found in your collection.'
                                : 'No books match your filters.'}
                        </p>
                        {books.length === 0 ? (
                            <Button
                                onClick={openCreateForm}
                                variant="outline"
                                className="bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white border-0"
                            >
                                Add your first book
                            </Button>
                        ) : (
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('All');
                                    setSelectedStatus('All');
                                }}
                            >
                                Clear all filters
                            </Button>
                        )}
                    </div>
                ) : (
                    <>
                        <p className="text-sm text-muted-foreground mb-4">
                            Showing {filteredBooks.length} of {books.length} books
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredBooks.map((book) => (
                                <BookCard
                                    key={book._id}
                                    book={book}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default Dashboard;