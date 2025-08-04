# 🛍️ E-Commerce Product Showcase

A modern, responsive e-commerce product showcase built with React and TypeScript. This project demonstrates best practices in frontend development, featuring a clean architecture, comprehensive testing, and production-ready deployment setup.

## ✨ Features

- **🔍 Real-time Product Search** - Debounced search with instant results
- **📱 Responsive Design** - Mobile-first approach with modern UI
- **⚡ Fast Performance** - Optimized with React Query and lazy loading
- **🛡️ Security First** - Input sanitization and XSS protection
- **♿ Accessibility** - ARIA labels and keyboard navigation
- **🎨 Modern UI** - Clean, professional design with CSS variables

## 🏗️ Architecture

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── layout/          # Page layout components
│   ├── featuredProducts/ # Featured products section
│   └── newArrivals/     # New arrivals section
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
├── config/              # API configuration
└── styles/              # Global styles and variables
```

## 🛠️ Tech Stack

### Core Technologies

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server

### State Management & Data Fetching

- **TanStack Query (React Query)** - Server state management
- **React Hooks** - Local state management

### Styling

- **CSS Modules** - Scoped styling
- **CSS Variables** - Design system consistency
- **Responsive Design** - Mobile-first approach

### Development Tools

- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Commitlint** - Conventional commits

### Testing

- **Vitest** - Fast unit testing
- **React Testing Library** - Component testing
- **Testing Coverage** - Comprehensive test coverage

### Deployment

- **Docker** - Containerized development and production
- **Docker Compose** - Multi-service orchestration

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Docker (optional)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ol1mowski/zadanie_sigmacem.git
   cd zadanie_sigmacem
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Docker Setup

1. **Build and run with Docker**

   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   Navigate to `http://localhost:5173`

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:coverage # Run tests with coverage

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # TypeScript type checking
```

## 🧪 Testing

The project includes comprehensive testing:

- **Unit Tests** - Component and hook testing
- **Integration Tests** - API integration testing
- **Accessibility Tests** - ARIA compliance
- **Error Handling Tests** - Error boundary testing

```bash
# Run all tests
npm run test:run

# Run tests with coverage
npm run test:coverage
```

## 🔧 API Integration

The application integrates with the [DummyJSON API](https://dummyjson.com/) for product data:

### Endpoints Used

- `GET /products` - Fetch all products
- `GET /products/search` - Search products

### Features

- **Debounced Search** - 300ms delay to prevent API spam
- **Caching** - React Query for efficient data caching
- **Error Handling** - Graceful error states
- **Loading States** - Skeleton loaders and spinners

## 🔒 Security Features

- **Input Sanitization** - Query parameter cleaning
- **XSS Protection** - React's built-in escaping
- **URL Validation** - Image source validation
- **Content Security** - Safe rendering practices

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

## 🚀 Performance Optimizations

- **Code Splitting** - Lazy loading of components
- **Image Optimization** - Lazy loading and error handling
- **Memoization** - Strategic use of React.memo and useCallback
- **Bundle Optimization** - Tree shaking and minification

## 🐳 Docker Configuration

The project includes Docker setup for both development and production:

```dockerfile
# Development
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

## 📊 Project Structure

```
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── layout/        # Layout components
│   │   └── [features]/    # Feature-specific components
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript definitions
│   ├── config/            # Configuration files
│   └── styles/            # Global styles
├── tests/                 # Test utilities
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker orchestration
└── package.json           # Dependencies and scripts
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [DummyJSON](https://dummyjson.com/) for providing the API
- [React](https://reactjs.org/) team for the amazing framework
- [Vite](https://vitejs.dev/) for the fast build tool
- [TanStack Query](https://tanstack.com/query) for server state management

---

**Built with ❤️ using modern web technologies**
