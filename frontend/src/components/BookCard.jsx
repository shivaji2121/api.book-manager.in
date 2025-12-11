import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, Star, BookOpen } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const BookCard = ({ book, onEdit, onDelete }) => {
    const navigate = useNavigate();

    const getStatusColor = (status) => {
        const colors = {
            'To Read': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            'Reading': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
            'Completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            'On Hold': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
        };
        return colors[status] || colors['To Read'];
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                size={14}
                className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
            />
        ));
    };

    const handleCardClick = () => {
        navigate(`/book/${book._id}`);
    };

    return (
        <Card className="flex flex-col h-full hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-primary/10 hover:border-primary/30 cursor-pointer group">
            {/* Cover Image or Placeholder */}
            <div
                onClick={handleCardClick}
                className="relative h-48 bg-gradient-to-br from-primary/20 to-purple-600/20 overflow-hidden"
            >
                {book.coverImage ? (
                    <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <BookOpen size={60} className="text-primary/40" />
                    </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(book.readingStatus)}`}>
                        {book.readingStatus}
                    </span>
                </div>
            </div>

            <CardHeader className="pb-3" onClick={handleCardClick}>
                <div className="flex justify-between items-start mb-2">
                    <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-primary to-purple-600 rounded-full shadow">
                        {book.category || 'Uncategorized'}
                    </span>
                </div>
                <CardTitle className="leading-tight text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 line-clamp-2">
                    {book.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground font-medium">by {book.author}</p>
            </CardHeader>

            <CardContent className="flex-grow" onClick={handleCardClick}>
                {/* Rating */}
                <div className="flex gap-1 mb-3">
                    {renderStars(book.rating || 0)}
                    {book.rating > 0 && (
                        <span className="text-xs text-muted-foreground ml-1">
                            ({book.rating})
                        </span>
                    )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm line-clamp-3">
                    {book.description || 'No description available for this book.'}
                </p>

                {/* Additional Info */}
                <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                    {book.publicationYear && (
                        <p>Published: {book.publicationYear}</p>
                    )}
                    {book.pages && (
                        <p>{book.pages} pages</p>
                    )}
                </div>
            </CardContent>

            <CardFooter className="pt-0 flex justify-end gap-2 border-t border-primary/10 mt-2 pt-3">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/edit/${book._id}`);
                    }}
                    title="Edit"
                    className="hover:bg-primary hover:text-white transition-colors"
                >
                    <Pencil size={16} />
                </Button>
                <Button
                    variant="destructive"
                    size="icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(book._id);
                    }}
                    title="Delete"
                    className="bg-gradient-to-r from-destructive to-red-600 hover:from-red-600 hover:to-destructive text-white"
                >
                    <Trash2 size={16} />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default BookCard;