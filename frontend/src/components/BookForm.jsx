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
        readingStatus: 'To Read'
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
                readingStatus: initialData.readingStatus || 'To Read'
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

            default:
                break;
        }

        return error;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Handle checkbox inputs if we had any (we don't currently)
        const fieldValue = type === 'checkbox' ? checked : value;
        
        setFormData(prev => ({ ...prev, [name]: fieldValue }));

        if (touched[name]) {
            const error = validateField(name, fieldValue);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling

        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
            }
        });

        setErrors(newErrors);
        setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

        // Only submit if there are no errors
        if (Object.keys(newErrors).length === 0) {
            console.log('Submitting form data:', formData); // Debug log
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

            <div className="space-y-2">
                <Label htmlFor="description" className="text-primary font-medium">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter a brief description of the book..."
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