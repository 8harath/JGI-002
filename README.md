# Resource Management System

A modern web application built with Next.js 15 and TypeScript for managing educational resources and materials. This project provides a comprehensive platform for organizing and accessing academic resources across different semesters.

## 🌟 Project Philosophy

At its core, this project is a response to disorganization in academic resource sharing. In most colleges—including Jain University—study materials are often shared through informal or fragmented channels: WhatsApp groups, scattered Google Drive links, or inconsistent folder structures. As a result, students waste time hunting for files, miss out on important documents, or struggle to prepare effectively during crucial periods like exams or assignments.

### Core Principles

#### 🧩 Structured Organization
- Students can navigate by semester, subject, and type of resource
- No more digging through messages or repeatedly asking seniors
- Clear, intuitive categorization of all materials

#### 🚪 Open & Collaborative
- Starting with BCA (Data Analytics), but built to expand to other departments
- Anyone with access to verified documents can contribute
- Community-driven through GitHub or contact form submissions
- Living, crowd-powered archive of academic resources

#### 🌐 Static, Fast, and Accessible
- Completely static architecture for reliability
- Mobile-optimized for on-the-go access
- Deployed on free, fast platforms (Vercel)
- Sustainable without recurring costs

#### 💡 Minimal, Not Feature-Heavy
- Not trying to be the next Google Classroom
- Focus on essential features only
- Intuitive and frictionless user experience
- Purpose-built for student needs

## 🚀 Features

- Modern UI with Tailwind CSS and Radix UI components
- Responsive design for all devices
- Dark/Light mode support
- Semester-wise resource organization
- Contact management system
- Type-safe development with TypeScript
- SEO optimized

## 🛠️ Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Form Handling:** React Hook Form with Zod validation
- **State Management:** React Hooks
- **Date Handling:** date-fns
- **Charts:** Recharts
- **Animations:** tailwindcss-animate

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

1. **Add Resources**
   - Submit verified study materials
   - Organize existing resources
   - Update outdated content

2. **Improve Documentation**
   - Enhance README files
   - Add inline code comments
   - Create usage examples

3. **Code Contributions**
   - Fix bugs
   - Add new features
   - Improve performance
   - Enhance accessibility

### Contribution Process

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Open a Pull Request

### Pull Request Guidelines

- Ensure your code follows the project's style guide
- Add tests for new features
- Update documentation as needed
- Provide clear commit messages
- Reference any related issues

### Code of Conduct

- Be respectful and inclusive
- Give constructive feedback
- Help others learn
- Be patient with new contributors

## 📦 Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd resource-management
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
├── app/                 # Next.js app directory
│   ├── semester/       # Semester-specific pages
│   ├── contact/        # Contact management
│   └── layout.tsx      # Root layout
├── components/         # Reusable UI components
├── data/              # Static data and configurations
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and configurations
├── public/            # Static assets
└── styles/            # Global styles
```

## 🎨 UI Components

The project uses a comprehensive set of UI components from Radix UI, including:
- Accordion
- Alert Dialog
- Avatar
- Dialog
- Dropdown Menu
- Navigation Menu
- Toast notifications
- And many more...

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- Bharath K (BCA-DA) - All materials
- [Your Name] - Add your contributions here

## 🔗 Links

- [GitHub Repository](https://github.com/8harath/JGI-002)
- [Live Demo](https://www.jainuniversity.live/)

---

Made with ❤️ using Next.js and TypeScript 