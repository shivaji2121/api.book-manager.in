import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Star, AlertCircle } from 'lucide-react';

const BookForm = ({ initialData = {}, onSubmit, isSubmitting }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        category: '',
        description: '',
        isbn: '',
        publisher: '',
        publicationYear: '',
        pages: '',
        language: 'English',
        coverImage: '',
        rating: 0,
        readingStatus: 'To Read',
        notes: ''
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                author: initialData.author || '',
                category: initialData.category || '',
                description: initialData.description || '',
                isbn: initialData.isbn || '',
                publisher: initialData.publisher || '',
                publicationYear: initialData.publicationYear || '',
                pages: initialData.pages || '',
                language: initialData.language || 'English',
                coverImage: initialData.coverImage || '',
                rating: initialData.rating || 0,
                readingStatus: initialData.readingStatus || 'To Read',
                notes: initialData.notes || ''
            });
        }
    }, [initialData]);

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'title':
                if (!value.trim()) {
                    error = 'Title is required';
                } else if (value.length > 255) {
                    error = 'Title must not exceed 255 characters';
                } else if (!/^[a-zA-Z0-9\s\-:,.!?'"()]+$/.test(value)) {
                    error = 'Title contains invalid characters';
                }
                break;

            case 'author':
                if (!value.trim()) {
                    error = 'Author is required';
                } else if (value.length > 255) {
                    error = 'Author must not exceed 255 characters';
                } else if (!/^[a-zA-Z\s\-.']+$/.test(value)) {
                    error = 'Author name can only contain letters, spaces, hyphens, and periods';
                }
                break;

            case 'category':
                if (value && value.length > 100) {
                    error = 'Category must not exceed 100 characters';
                }
                break;

            case 'description':
                if (value && value.length > 1000) {
                    error = 'Description must not exceed 1000 characters';
                }
                break;

            case 'isbn':
                if (value && !/^(?:\d{10}|\d{13}|(?:\d{1,5}-\d{1,7}-\d{1,7}-[\dX])|(?:\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-\d))$/.test(value)) {
                    error = 'Invalid ISBN format (use ISBN-10 or ISBN-13)';
                }
                break;

            case 'publisher':
                if (value && value.length > 255) {
                    error = 'Publisher must not exceed 255 characters';
                }
                break;

            case 'publicationYear':
                const currentYear = new Date().getFullYear();
                if (value && (value < 1000 || value > currentYear + 1)) {
                    error = `Publication year must be between 1000 and ${currentYear + 1}`;
                }
                break;

            case 'pages':
                if (value && (value < 1 || value > 100000)) {
                    error = 'Pages must be between 1 and 100000';
                }
                break;

            case 'language':
                if (value && value.length > 50) {
                    error = 'Language must not exceed 50 characters';
                } else if (value && !/^[a-zA-Z\s]+$/.test(value)) {
                    error = 'Language can only contain letters and spaces';
                }
                break;

            case 'coverImage':
                if (value && !/^https?:\/\/.+/.test(value)) {
                    error = 'Cover image must be a valid URL starting with http:// or https://';
                }
                break;

            case 'notes':
                if (value && value.length > 2000) {
                    error = 'Notes must not exceed 2000 characters';
                }
                break;

            default:
                break;
        }

        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleRatingChange = (rating) => {
        setFormData(prev => ({ ...prev, rating }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
            }
        });

        setErrors(newErrors);
        setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

        if (Object.keys(newErrors).length === 0) {
            onSubmit(formData);
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
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="space-y-2">
                <Label htmlFor="title" className="text-primary font-medium">
                    Title <span className="text-destructive">*</span>
                </Label>
                <Input
                    id="title"
                    name="title"
                    placeholder="e.g., The Great Gatsby, 1984, To Kill a Mockingbird"
                    value={formData.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={`border-2 ${errors.title && touched.title ? 'border-destructive' : 'border-primary/20'} focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg`}
                />
                <ErrorMessage error={touched.title && errors.title} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="author" className="text-primary font-medium">
                        Author <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        id="author"
                        name="author"
                        placeholder="e.g., F. Scott Fitzgerald, George Orwell"
                        value={formData.author}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={`border-2 ${errors.author && touched.author ? 'border-destructive' : 'border-primary/20'} focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg`}
                    />
                    <ErrorMessage error={touched.author && errors.author} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="category" className="text-primary font-medium">Category</Label>
                    <Input
                        id="category"
                        name="category"
                        placeholder="e.g., Fiction, Science, Biography, Mystery"
                        value={formData.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`border-2 ${errors.category && touched.category ? 'border-destructive' : 'border-primary/20'} focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg`}
                    />
                    <ErrorMessage error={touched.category && errors.category} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="isbn" className="text-primary font-medium">ISBN</Label>
                    <Input
                        id="isbn"
                        name="isbn"
                        placeholder="e.g., 978-0-7432-7356-5 or 0743273567"
                        value={formData.isbn}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`border-2 ${errors.isbn && touched.isbn ? 'border-destructive' : 'border-primary/20'} focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg`}
                    />
                    <ErrorMessage error={touched.isbn && errors.isbn} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="publisher" className="text-primary font-medium">Publisher</Label>
                    <Input
                        id="publisher"
                        name="publisher"
                        placeholder="e.g., Penguin Books, HarperCollins, Scribner"
                        value={formData.publisher}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`border-2 ${errors.publisher && touched.publisher ? 'border-destructive' : 'border-primary/20'} focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg`}
                    />
                    <ErrorMessage error={touched.publisher && errors.publisher} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="publicationYear" className="text-primary font-medium">Publication Year</Label>
                    <Input
                        id="publicationYear"
                        name="publicationYear"
                        type="number"
                        placeholder="e.g., 1925, 2020"
                        value={formData.publicationYear}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        min="1000"
                        max={new Date().getFullYear() + 1}
                        className={`border-2 ${errors.publicationYear && touched.publicationYear ? 'border-destructive' : 'border-primary/20'} focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg`}
                    />
                    <ErrorMessage error={touched.publicationYear && errors.publicationYear} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="pages" className="text-primary font-medium">Pages</Label>
                    <Input
                        id="pages"
                        name="pages"
                        type="number"
                        placeholder="e.g., 180, 350"
                        value={formData.pages}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        min="1"
                        max="100000"
                        className={`border-2 ${errors.pages && touched.pages ? 'border-destructive' : 'border-primary/20'} focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg`}
                    />
                    <ErrorMessage error={touched.pages && errors.pages} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="language" className="text-primary font-medium">Language</Label>
                    <Input
                        id="language"
                        name="language"
                        placeholder="e.g., English, Spanish, French"
                        value={formData.language}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`border-2 ${errors.language && touched.language ? 'border-destructive' : 'border-primary/20'} focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg`}
                    />
                    <ErrorMessage error={touched.language && errors.language} />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="coverImage" className="text-primary font-medium">Cover Image URL</Label>
                <Input
                    id="coverImage"
                    name="coverImage"
                    type="url"
                    placeholder="https://example.com/book-cover.jpg"
                    value={formData.coverImage}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border-2 ${errors.coverImage && touched.coverImage ? 'border-destructive' : 'border-primary/20'} focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg`}
                />
                <ErrorMessage error={touched.coverImage && errors.coverImage} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="readingStatus" className="text-primary font-medium">Reading Status</Label>
                    <select
                        id="readingStatus"
                        name="readingStatus"
                        value={formData.readingStatus}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg bg-background"
                    >
                        <option value="To Read">To Read</option>
                        <option value="Reading">Currently Reading</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <Label className="text-primary font-medium">Your Rating</Label>
                    <div className="flex gap-2 items-center pt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => handleRatingChange(star)}
                                className="transition-transform hover:scale-110"
                            >
                                <Star
                                    size={28}
                                    className={
                                        star <= formData.rating
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300 hover:text-yellow-200'
                                    }
                                />
                            </button>
                        ))}
                        <span className="ml-2 text-sm text-muted-foreground">
                            {formData.rating > 0 ? `${formData.rating} / 5` : 'Not rated'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description" className="text-primary font-medium">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter a brief description of the book, its themes, or what it's about..."
                    value={formData.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    maxLength={1000}
                    className={`border-2 ${errors.description && touched.description ? 'border-destructive' : 'border-primary/20'} focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg`}
                />
                <div className="flex justify-between items-center">
                    <ErrorMessage error={touched.description && errors.description} />
                    <p className="text-xs text-muted-foreground">
                        {formData.description.length} / 1000
                    </p>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="notes" className="text-primary font-medium">Personal Notes</Label>
                <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Add your personal thoughts, favorite quotes, or reading notes..."
                    value={formData.notes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    maxLength={2000}
                    className={`border-2 ${errors.notes && touched.notes ? 'border-destructive' : 'border-primary/20'} focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg`}
                />
                <div className="flex justify-between items-center">
                    <ErrorMessage error={touched.notes && errors.notes} />
                    <p className="text-xs text-muted-foreground">
                        {formData.notes.length} / 2000
                    </p>
                </div>
            </div>

            <div className="pt-4 flex justify-end">
                <Button
                    type="submit"
                    disabled={isSubmitting || Object.keys(errors).some(key => errors[key])}
                    className="w-full sm:w-auto bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Saving...' : (initialData._id ? 'Update Book' : 'Add Book')}
                </Button>
            </div>
        </form>
    );
};

export default BookForm;