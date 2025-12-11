import apiRequest from './api';

const bookService = {
    getMyBooks: async () => {
        const data = await apiRequest('/books/my-books');
        return data.books || [];
    },

    getBookById: async (bookId) => {
        const data = await apiRequest(`/books/${bookId}`);
        return data.book;
    },

    createBook: async (bookData) => {
        try {
            const data = await apiRequest('/books/create', {
                method: 'POST',
                body: JSON.stringify(bookData),
            });
            return data.result;
        } catch (error) {
            console.error('BookService createBook error:', error);
            throw error;
        }
    },

    updateBook: async (bookId, bookData) => {
        const data = await apiRequest(`/books/update/${bookId}`, {
            method: 'PUT',
            body: JSON.stringify(bookData),
        });
        return data.result;
    },

    deleteBook: async (bookId) => {
        const data = await apiRequest(`/books/delete/${bookId}`, {
            method: 'DELETE',
        });
        return data;
    },

    getAllBooks: async () => {
        const data = await apiRequest('/books/all-books');
        return data.result || [];
    },

    filterByCategory: (books, category) => {
        if (!category || category === 'All') return books;
        return books.filter(book => book.category === category);
    },

    filterByStatus: (books, status) => {
        if (!status || status === 'All') return books;
        return books.filter(book => book.readingStatus === status);
    },

    searchBooks: (books, query) => {
        if (!query) return books;
        const lowerQuery = query.toLowerCase();
        return books.filter(book =>
            book.title.toLowerCase().includes(lowerQuery) ||
            book.author.toLowerCase().includes(lowerQuery)
        );
    },

    getCategories: (books) => {
        const categories = books.map(book => book.category).filter(Boolean);
        return ['All', ...new Set(categories)];
    },

    getStatistics: (books) => {
        return {
            total: books.length,
            toRead: books.filter(b => b.readingStatus === 'To Read').length,
            reading: books.filter(b => b.readingStatus === 'Reading').length,
            completed: books.filter(b => b.readingStatus === 'Completed').length,
            onHold: books.filter(b => b.readingStatus === 'On Hold').length,
            averageRating: 0 
        };
    }
};

export default bookService;