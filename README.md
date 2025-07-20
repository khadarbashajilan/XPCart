# XPCart - Gaming Products E-commerce

A modern e-commerce application for gaming products built with React and TypeScript, featuring a responsive design and seamless shopping cart experience.

## 🚀 Technologies Used

- **React 19** - Frontend library
- **TypeScript** - Type safety and better developer experience
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **LocalStorage** - For cart persistence

## 🎯 Key Features

- Responsive product catalog
- Detailed product pages with reviews
- Shopping cart functionality
- Real-time cart total calculation
- Persistent cart data
- Product quantity management
- Clean and modern UI

## 💡 Implementation Approach

### Context API Implementation
The project uses React's Context API for state management, specifically for the shopping cart functionality. The implementation includes:

1. **Cart Context Creation**
   - Centralized cart state management
   - Custom types for cart items and context
   - Provider wrapper for the application

2. **Custom Hook (useCart)**
   - Abstracted cart functionality into a custom hook
   - Simplified access to cart operations
   - Type-safe cart manipulation methods

3. **Local Storage Integration**
   - Persistent cart data across sessions
   - Automatic state synchronization
   - Cached cart totals

### Cart Operations
- Add/Remove items
- Update quantities
- Calculate totals
- Clear cart
- Delete specific items

## 🛠️ Installation and Setup

1. **Clone the repository**
```bash
git clone https://github.com/khadarbashajilan/xpcart.git
cd xpcart
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

The application will be available at `http://localhost:5173`

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 🔗 Links

- [Live Demo](https://your-live-demo-url.com)
- [GitHub Repository](https://github.com/khadarbashajilan/xpcart)

---

Made with ❤️ by [Khadar Basha Jilan](https://github.com/khadarbashajilan)
