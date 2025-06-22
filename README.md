# JGI-002: TypeScript React Project

![GitHub repository size](https://img.shields.io/github/repo-size/8harath/JGI-002)
![GitHub language count](https://img.shields.io/github/languages/count/8harath/JGI-002)
![GitHub top language](https://img.shields.io/github/languages/top/8harath/JGI-002)

## 📖 Overview

JGI-002 is a modern web application built with TypeScript and React. This project demonstrates best practices for creating scalable, maintainable web applications using current technologies and development patterns.

## 🚀 Features

- TypeScript for type safety and improved developer experience
- React for building interactive user interfaces
- Vite for fast development and optimized production builds
- ESLint and Prettier for code quality and consistent formatting
- Responsive design for various device sizes
- Component-based architecture for reusability and maintainability

## 🛠️ Technologies Used

- **Frontend Framework**: React
- **Language**: TypeScript (96.8%), CSS (3.1%), JavaScript (0.1%)
- **Build Tool**: Vite
- **Package Manager**: npm
- **CSS Preprocessor**: Sass
- **Code Quality**: ESLint, Prettier

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (v8 or higher)

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/8harath/JGI-002.git
   ```

2. Navigate to the project directory:
   ```bash
   cd JGI-002
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## 🚀 Usage

### Development Server

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production

Create a production build:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```
JGI-002/
├── public/            # Static assets
├── src/               # Source code
│   ├── assets/        # Images, fonts, etc.
│   ├── components/    # Reusable React components
│   ├── pages/         # Page components
│   ├── styles/        # Global styles and themes
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main application component
│   ├── main.tsx       # Application entry point
│   └── vite-env.d.ts  # Vite environment type definitions
├── .eslintrc.cjs      # ESLint configuration
├── .gitignore         # Git ignore rules
├── index.html         # HTML entry point
├── package.json       # Project dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── tsconfig.node.json # Node-specific TypeScript configuration
└── vite.config.ts     # Vite configuration
```

## 🧪 Testing

Run tests:

```bash
npm test
```

## 📝 Code Quality

Check for linting issues:

```bash
npm run lint
```

Fix linting issues automatically:

```bash
npm run lint:fix
```

Format code with Prettier:

```bash
npm run format
```

## 🔄 Continuous Integration/Continuous Deployment

This project is set up with GitHub Actions for CI/CD. Every push to the main branch triggers:
- Code linting
- Running tests
- Building the application

## 🛣️ Roadmap

- [ ] Add unit tests
- [ ] Implement authentication
- [ ] Create mobile-responsive views
- [ ] Add internationalization support
- [ ] Implement dark mode

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

Bharath - [@8harath](https://github.com/8harath)

Project Link: [https://github.com/8harath/JGI-002](https://github.com/8harath/JGI-002)

## 🙏 Acknowledgments

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/guide/)

## Contact Form EmailJS Setup

To enable the contact form to send emails, create a `.env.local` file in your project root with the following content:

```
EMAILJS_SERVICE_ID=service_6yd60g2
EMAILJS_TEMPLATE_ID=template_1118eta
EMAILJS_USER_ID=qx2jxijBdwq8Vvg0C
```

These credentials are required for the backend to send emails using EmailJS.
