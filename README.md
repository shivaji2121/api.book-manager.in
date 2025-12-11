# Book Manager Application

A full-stack book management application with user authentication and CRUD operations for books. Built with React/Vite on the frontend and Node.js/Express on the backend, using MongoDB for data storage.

## Features

- 📚 **Book Management**: Add, edit, view, and delete books in your personal collection
- 🔐 **User Authentication**: Secure JWT-based authentication with login and registration
- 🎨 **Modern UI**: Clean, responsive interface with Tailwind CSS styling
- 📱 **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- ⚡ **Fast Performance**: Optimized with Vite for rapid development and production builds

## Tech Stack

### Frontend
- **Framework**: React + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6+
- **State Management**: React Context API
- **UI Components**: Custom component library
- **HTTP Client**: Fetch API
- **Notifications**: React Toastify
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Security**: bcrypt for password hashing
- **CORS**: Enabled for cross-origin requests

### Database
- **MongoDB Atlas**: Cloud-hosted MongoDB database
- **Mongoose**: Object Data Modeling (ODM) library

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB database (local or cloud)

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=3000
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory with:
   ```
   VITE_API_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

### Backend
```
backend/
├── src/
│   ├── config/        # Database configuration
│   ├── controllers/   # Request handlers
│   ├── middleware/    # Custom middleware
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── validation/    # Input validation
│   └── app.js         # Express application setup
├── .env               # Environment variables
├── index.js           # Server entry point
└── package.json       # Backend dependencies
```

### Frontend
```
frontend/
├── src/
│   ├── components/    # Reusable UI components
│   ├── context/       # React context providers
│   ├── lib/           # Utility functions
│   ├── pages/         # Page components
│   ├── services/      # API service functions
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
├── .env               # Environment variables
├── index.html         # HTML template
└── vite.config.js     # Vite configuration
```

## Core Application Architecture

### Frontend Architecture

The frontend follows a component-based architecture with clear separation of concerns:

1. **Components**: Reusable UI elements such as buttons, inputs, cards, and forms
2. **Pages**: Full-page components that represent different views (Dashboard, Login, Book Details, etc.)
3. **Context**: Global state management using React Context API for authentication and user data
4. **Services**: API service layer that handles all HTTP requests to the backend
5. **Routing**: Protected route implementation to ensure only authenticated users can access certain pages

### Backend Architecture

The backend follows a modular MVC-like architecture:

1. **Controllers**: Handle incoming requests, process data, and send responses
2. **Models**: Define data schemas and interact with the MongoDB database using Mongoose
3. **Routes**: Define API endpoints and map them to controller functions
4. **Middleware**: Custom functions that process requests before they reach controllers (authentication, validation)
5. **Validation**: Input validation using express-validator to ensure data integrity
6. **Configuration**: Database connection setup and environment configuration

### Authentication Flow

1. User registers with email, password, and other details
2. Password is hashed using bcrypt before storing in the database
3. Upon login, credentials are verified and a JWT token is generated
4. Token is sent to the client and stored in localStorage
5. For subsequent requests, the token is included in the Authorization header
6. Middleware verifies the token and attaches user information to the request object

### Data Models

#### User Model
- name: String (required)
- email: String (required, unique)
- password: String (required, hashed)
- gender: String (required, enum: male/female/other)
- role: String (default: user, enum: user/admin)
- timestamps: createdAt/updatedAt

#### Book Model
- title: String (required)
- author: String (required)
- category: String (default: Uncategorized)
- description: String (max 1000 characters)
- readingStatus: String (enum: To Read/Reading/Completed/On Hold, default: To Read)
- userId: ObjectId (reference to User, required)
- timestamps: createdAt/updatedAt

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Books
- `GET /books/my-books` - Get all books for authenticated user
- `GET /books/:id` - Get a specific book by ID
- `POST /books/create` - Create a new book
- `PUT /books/update/:id` - Update an existing book
- `DELETE /books/delete/:id` - Delete a book

## Environment Variables

### Backend (.env)
```
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key_for_jwt_signing
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
```

## Development

### Running in Development Mode

1. Start the backend server:
   ```bash
   cd backend && npm run dev
   ```

2. In a separate terminal, start the frontend:
   ```bash
   cd frontend && npm run dev
   ```

### Building for Production

#### Backend
```bash
cd backend && npm start
```

#### Frontend
```bash
cd frontend && npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.