# JGI-002: Academic Resource Platform

<div align="center">

**An Open-Source Educational Hub for BCA Students**

[![Live Platform](https://img.shields.io/badge/Live-jainuniversity.live-blue?style=for-the-badge)](https://www.jainuniversity.live)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Educational-green?style=for-the-badge)](LICENSE)

[Live Demo](https://www.jainuniversity.live) • [Report Issue](https://github.com/8harath/JGI-002/issues) • [Contribute](#contributing)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Mission Statement](#mission-statement)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [Academic Content Coverage](#academic-content-coverage)
- [Contributing](#contributing)
- [Project Structure](#project-structure)
- [Development Guidelines](#development-guidelines)
- [Limitations and Future Work](#limitations-and-future-work)
- [License and Disclaimer](#license-and-disclaimer)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

---

## Overview

**JGI-002** is a production-ready, open-source academic resource platform designed specifically for Bachelor of Computer Applications (BCA) students at Jain Group of Institutions (JGI). The platform serves as a centralized repository for study materials, notes, assignments, laboratory work, and other educational resources spanning all six semesters of the BCA curriculum.

Built with modern web technologies and guided by principles of accessibility and community collaboration, JGI-002 addresses a critical gap in resource availability across different specialization tracks and student cohorts. The platform enables students to discover, access, and contribute educational materials that support their academic journey.

### What Makes This Different

- **Semester-Centric Organization**: Resources are hierarchically structured by semester, subject, and material type
- **Advanced Search Capabilities**: Fuzzy search with intelligent relevance scoring across all resources
- **Responsive Design**: Fully optimized experience across desktop, tablet, and mobile devices
- **Performance-Optimized**: Static site generation and code splitting for fast page loads
- **Community-Driven**: Open contribution model encouraging student participation

---

## Mission Statement

**To create an accessible, community-driven platform where students can freely find, share, and contribute academic resources, democratizing access to quality educational materials for all BCA students regardless of specialization or batch.**

Many students face challenges accessing comprehensive study materials for their specific tracks. JGI-002 bridges this gap by providing a single, organized platform where the student community collectively builds a knowledge repository that benefits current and future cohorts.

---

## Key Features

### 1. Intelligent Search System

The platform features a sophisticated search implementation with:

- **Fuzzy Matching Algorithm**: Finds relevant results even with partial or misspelled queries
- **Weighted Relevance Scoring**: Prioritizes results based on title, subject, description, and type matches
- **Multi-Criteria Filtering**: Filter by semester (1-6) and resource type (Notes, Books, Assignments, Projects)
- **Keyboard-First Design**: Global search accessible via `Cmd/Ctrl + K` shortcut
- **Real-Time Results**: Instant search feedback with visual indicators

**Technical Implementation**: The search engine (lib/search.ts:14-92) uses a custom fuzzy matching algorithm that scores matches based on character sequence alignment and exact substring matching, with configurable weights for different fields.

### 2. Comprehensive Content Organization

- **6 Semesters**: Complete curriculum coverage from foundation to advanced topics
- **50+ Subjects**: Including core courses, specialization tracks, and electives
- **Multiple Material Types**:
  - TLEP (Teaching Learning Evaluation Plans)
  - Lecture Notes
  - Presentations
  - Lab Manuals and Programs
  - Assignments and Activities
  - Previous Year Papers
  - Reference Books

### 3. File Explorer Interface

A tabbed navigation system allows users to browse materials by type:

- **Category-Based Tabs**: Separate sections for different material types
- **PDF Preview Support**: In-browser document viewing via react-pdf
- **Direct Downloads**: One-click download for all resources
- **File Metadata Display**: Clear presentation of file names, types, and descriptions

### 4. Keyboard Navigation

Power users can navigate efficiently using keyboard shortcuts:

- `Cmd/Ctrl + K`: Open search modal
- `Alt + 1` through `Alt + 6`: Quick jump to semesters 1-6
- `Esc`: Close modals and overlays

**Implementation Details**: hooks/use-keyboard-shortcuts.ts:6-40

### 5. Responsive User Interface

- **Retro-Inspired Design**: Custom keyboard button aesthetics with press animations
- **Adaptive Layouts**: Mobile-first responsive design using Tailwind CSS breakpoints
- **Dynamic Header Behavior**: Auto-hiding navigation on scroll for maximum content visibility
- **Theme Support**: Light and dark mode via next-themes
- **Smooth Transitions**: Custom animations including fade-in, slide-up, and bounce effects

### 6. Contact and Community Features

- **Contact Form**: EmailJS integration for student inquiries and feedback
- **Contributors Modal**: Recognition for community members who contribute resources
- **GitHub Integration**: Direct links to contributor profiles

---

## Technology Stack

### Core Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.2.4 | React framework with App Router for server-side rendering and static generation |
| **React** | 19.x | Component-based UI library |
| **TypeScript** | 5.x | Type-safe development with static analysis |
| **Node.js** | Latest LTS | JavaScript runtime environment |

### Styling and UI Components

| Library | Version | Purpose |
|---------|---------|---------|
| **Tailwind CSS** | 3.4.17 | Utility-first CSS framework for rapid UI development |
| **Radix UI** | Various | Accessible, unstyled component primitives (20+ components) |
| **shadcn/ui** | Latest | Pre-built accessible components based on Radix UI |
| **Lucide React** | 0.454.0 | Comprehensive icon library (1000+ icons) |
| **class-variance-authority** | 0.7.1 | Type-safe component variants |
| **tailwindcss-animate** | 1.0.7 | Animation utilities |

### Functionality Libraries

| Library | Purpose |
|---------|---------|
| **react-pdf** & **pdfjs-dist** | PDF rendering and preview capabilities |
| **emailjs-com** | Client-side email service for contact form |
| **next-themes** | Theme management (dark/light mode) |
| **embla-carousel-react** | Touch-friendly carousel components |
| **react-hook-form** & **zod** | Form handling and schema validation |
| **cmdk** | Command menu component for search |
| **sonner** | Toast notification system |

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser (Client)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  UI Layer    │  │ Search Modal │  │ File Preview │      │
│  │ (Components) │  │   (cmdk)     │  │ (react-pdf)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         ↓                  ↓                  ↓              │
│  ┌──────────────────────────────────────────────────┐      │
│  │         React Context (Search State)              │      │
│  └──────────────────────────────────────────────────┘      │
│         ↓                  ↓                  ↓              │
│  ┌──────────────────────────────────────────────────┐      │
│  │         Custom Hooks & Utilities                  │      │
│  │  • useKeyboardShortcuts  • fuzzyMatch            │      │
│  └──────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
                           ↕
┌─────────────────────────────────────────────────────────────┐
│                  Next.js Server Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  App Router  │  │  API Routes  │  │     SSG      │      │
│  │   (Pages)    │  │  (Contact)   │  │ (Static Gen) │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         ↓                  ↓                  ↓              │
│  ┌──────────────────────────────────────────────────┐      │
│  │            Data Layer (TypeScript)                │      │
│  │  • semesters.ts  • subjects.ts  • resources.ts   │      │
│  └──────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
                           ↕
┌─────────────────────────────────────────────────────────────┐
│                   Static File System                         │
│  /public/                                                    │
│  ├── Resources/      (Academic materials)                    │
│  └── CLG STUFF!/     (Semester-wise organized content)      │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Initial Page Load**: Next.js generates static HTML with semester/subject metadata
2. **User Interaction**: Client-side React handles navigation and search
3. **Search Query**: Fuzzy matching algorithm processes query against resource catalog
4. **Resource Access**: Direct file system links to PDF/document files
5. **Contact Form**: API route handles email submission via EmailJS

### Component Hierarchy

```
app/layout.tsx (Root)
├── components/header.tsx (Navigation)
├── app/page.tsx (Homepage)
│   ├── components/semester-grid.tsx
│   └── components/search.tsx
├── app/semester/[id]/page.tsx
│   ├── components/subject-list.tsx
│   └── components/keyboard-shortcuts.tsx
└── app/semester/[id]/[subject]/page.tsx
    ├── components/file-explorer.tsx
    └── components/file-preview.tsx
```

---

## Getting Started

### Prerequisites

Before running JGI-002 locally, ensure you have:

- **Node.js**: Version 18.x or higher ([Download](https://nodejs.org/))
- **npm**, **yarn**, or **pnpm**: Package manager (npm comes with Node.js)
- **Git**: For cloning the repository ([Download](https://git-scm.com/))

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/8harath/JGI-002.git
   cd JGI-002
   ```

2. **Install Dependencies**

   Choose your preferred package manager:

   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn install

   # Using pnpm
   pnpm install
   ```

3. **Configure Environment Variables** (Optional)

   For the contact form feature, create a `.env.local` file:

   ```env
   # EmailJS Configuration (required for contact form)
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id
   ```

   > **Note**: The platform functions without these variables, but the contact form will be non-functional.

4. **Run the Development Server**

   ```bash
   # Using npm
   npm run dev

   # Using yarn
   yarn dev

   # Using pnpm
   pnpm dev
   ```

5. **Access the Application**

   Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

### Production Build

To create an optimized production build:

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

The production build includes:
- Static site generation for faster page loads
- Code splitting for optimized bundle sizes
- Minification and compression
- Optimized images and assets

---

## Usage Guide

### For Students

#### Browsing Resources

1. **Navigate to Your Semester**: Click on the semester card from the homepage or use keyboard shortcuts (`Alt + 1` through `Alt + 6`)
2. **Select a Subject**: Browse the subject list for your current semester
3. **Choose Material Type**: Use the tabbed interface to select Notes, TLEP, Assignments, etc.
4. **Preview or Download**: Click to preview PDFs in-browser or download directly

#### Using Search

1. **Open Search Modal**: Press `Cmd/Ctrl + K` or click the search icon
2. **Enter Keywords**: Type subject names, topics, or keywords
3. **Apply Filters**: Use semester and type filters to narrow results
4. **Navigate to Resource**: Click any result to jump directly to that material

#### Keyboard Navigation Tips

- Use `Tab` to navigate through interface elements
- Press `Esc` to close modals
- Use `Alt + Number` for quick semester jumps
- Leverage `Cmd/Ctrl + K` for instant search access

### For Contributors

See the [Contributing](#contributing) section below for detailed guidelines on adding resources and improving the platform.

---

## Academic Content Coverage

### Curriculum Overview

The platform covers the complete BCA curriculum across six semesters:

#### **Semester 1** (8 Subjects)
*Foundation courses establishing core competencies*

- Fundamentals of Computer Applications (FCA)
- Fundamentals of Mathematics (FOM)
- General English
- Languages (Kannada/Hindi/Sanskrit)
- Moral and Human Values (MMHV)
- Programming in C + Lab
- FCA Lab

#### **Semester 2** (9 Subjects)
*Core programming and system fundamentals*

- Digital Design (DD)
- Data Structures + Lab
- Operating Systems (OS)
- Programming in Java + Lab
- General English
- Languages
- MMHV

#### **Semester 3** (8 Subjects)
*Networks, databases, and software engineering principles*

- Computer Networks + Lab
- Database Management Systems (DBMS) + Lab
- Environmental Studies
- Professional Communication Management (PCM)
- Software Engineering
- Open Electives (AI, Aesthetics, Commerce, etc.)

#### **Semester 4** (7 Subjects)
*Specialization tracks begin*

**Data Analytics Track**:
- Introduction to Data Analytics + Lab
- Programming in Python + Lab
- Network Administration + Lab
- Indian Constitution
- Open Electives

**Other Specializations**: CS, CTIS, IoT, ISMA, ITH, MACT, AI

#### **Semester 5** (8 Subjects)
*Advanced specialization courses*

**Data Analytics Track**:
- Cloud Data Analytics
- Programming with R + Lab
- Data Warehouse and Data Management + Lab
- Technical Writing
- Entrepreneurship
- Capstone Project

#### **Semester 6**
*Final semester with project work* (Currently inactive - to be populated)

### Material Types Available

| Material Type | Description | Typical Use Case |
|---------------|-------------|------------------|
| **TLEP** | Teaching Learning Evaluation Plans | Course syllabus and evaluation criteria |
| **Notes** | Lecture notes and study materials | Primary learning resource |
| **Presentations** | Faculty slide decks | Lecture review and exam preparation |
| **Assignments** | Practice problems and homework | Skill development |
| **Activities** | Practical exercises | Hands-on learning |
| **Lab Manuals** | Structured lab exercises | Practical implementation |
| **Previous Papers** | Past examination papers | Exam preparation |

---

## Contributing

JGI-002 thrives on community contributions. Whether you're a student, alumni, or educator, your participation strengthens the platform for everyone.

### Ways to Contribute

#### 1. **Add Academic Resources**

Help expand the resource library:

- Upload your notes, solved assignments, or study guides
- Share previous year question papers
- Contribute lab programs and project reports
- Provide subject-wise reference materials

**Process**:

```bash
# Fork the repository
# Add files to appropriate directory in /public/
# Example: /public/Resources/SEM-III/DBMS/Notes/your-file.pdf

# Update data/resources.ts with metadata
{
  id: "unique-id",
  title: "DBMS Normalization Guide",
  description: "Comprehensive guide to database normalization",
  type: "Notes",
  semester: 3,
  subject: "Database Management Systems",
  path: "/Resources/SEM-III/DBMS/Notes/normalization.pdf"
}

# Commit and create pull request
```

#### 2. **Report Issues**

Found a problem? Help us fix it:

- Broken links or missing resources
- UI/UX issues
- Browser compatibility problems
- Performance concerns

[Create an Issue](https://github.com/8harath/JGI-002/issues/new)

#### 3. **Improve Code**

Technical contributions welcome:

- Bug fixes
- Performance optimizations
- New feature implementations
- Code refactoring
- Test coverage improvements

#### 4. **Enhance Documentation**

- Improve README clarity
- Add code comments
- Create tutorials or guides
- Translate content

### Contribution Workflow

#### Standard Fork and Pull Request

1. **Fork** the repository to your GitHub account
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/your-username/JGI-002.git
   cd JGI-002
   ```
3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes** and commit:
   ```bash
   git add .
   git commit -m "feat: add comprehensive DBMS notes for Semester 3"
   ```
5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request** from your fork to the main repository

#### Commit Message Convention

Follow conventional commits for clarity:

```
feat: add new feature
fix: resolve bug
docs: update documentation
style: format code
refactor: restructure code
test: add tests
chore: maintenance tasks
```

### Contribution Guidelines

- **Respect Copyrights**: Only share materials you have permission to distribute
- **Quality Over Quantity**: Ensure resources are accurate and helpful
- **Proper Attribution**: Credit original authors when applicable
- **Organized Structure**: Follow existing directory and naming conventions
- **Test Your Changes**: Verify functionality before submitting pull requests

---

## Project Structure

```
JGI-002/
├── app/                          # Next.js App Router
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Contact form API endpoint
│   ├── contact/
│   │   └── page.tsx              # Contact page
│   ├── cookies/
│   │   └── page.tsx              # Cookie policy
│   ├── privacy-policy/
│   │   └── page.tsx              # Privacy policy
│   ├── semester/
│   │   ├── [id]/                 # Dynamic semester routes
│   │   │   ├── [subject]/        # Dynamic subject routes
│   │   │   │   └── page.tsx      # Subject detail page
│   │   │   └── page.tsx          # Semester overview page
│   │   └── 4/                    # Semester 4 specializations
│   │       ├── ai/
│   │       ├── bca-general/
│   │       ├── cs/
│   │       ├── ctis/
│   │       ├── da/               # Data Analytics
│   │       ├── iot/
│   │       ├── isma/
│   │       ├── ith/
│   │       └── mact/
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
│
├── components/                   # React components
│   ├── ui/                       # shadcn/ui component library
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...                   # 80+ components
│   ├── contact-form.tsx          # EmailJS contact form
│   ├── contributors-button.tsx   # Contributors trigger
│   ├── contributors-modal.tsx    # Contributors display
│   ├── contributors.tsx          # Contributors data
│   ├── file-explorer.tsx         # File browsing interface
│   ├── file-preview.tsx          # PDF preview modal
│   ├── footer.tsx                # Site footer
│   ├── header.tsx                # Navigation header
│   ├── keyboard-shortcuts.tsx    # Shortcuts display
│   ├── loading.tsx               # Loading states
│   ├── search.tsx                # Global search component
│   ├── semester-grid.tsx         # Semester card grid
│   ├── subject-list.tsx          # Subject listing
│   └── theme-provider.tsx        # Dark/light theme
│
├── data/                         # Static data definitions
│   ├── contributors.ts           # Contributors information
│   ├── resources.ts              # Resource catalog
│   ├── semesters.ts              # Semester definitions
│   └── subjects.ts               # Subject catalog (50+ subjects)
│
├── hooks/                        # Custom React hooks
│   ├── use-keyboard-shortcuts.ts # Keyboard navigation
│   ├── use-mobile.tsx            # Mobile detection
│   └── use-toast.ts              # Toast notifications
│
├── lib/                          # Utility functions
│   ├── resources.ts              # Resource file operations
│   ├── search-context.tsx        # Search state management
│   ├── search.ts                 # Fuzzy search algorithm
│   └── utils.ts                  # Common utilities
│
├── public/                       # Static assets
│   ├── Logo/                     # Brand assets
│   │   ├── favicon.ico
│   │   └── icon.png
│   ├── Resources/                # Academic materials
│   │   ├── SEM - I/
│   │   └── Semister - 1/
│   └── CLG STUFF!/               # Main resource directory
│       ├── SEM - I/
│       ├── SEM - II/
│       ├── SEM - III/
│       └── SEM-IV/
│
├── styles/                       # Additional styles
├── types/                        # TypeScript definitions
│   └── index.ts                  # Type interfaces
│
├── .gitignore                    # Git ignore rules
├── components.json               # shadcn/ui config
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies
├── postcss.config.mjs            # PostCSS config
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript config
└── README.md                     # This file
```

### Key Directories Explained

- **`/app`**: Next.js 15 App Router structure with file-based routing
- **`/components`**: Reusable React components, including 80+ UI components from shadcn/ui
- **`/data`**: TypeScript files containing semester, subject, and resource metadata
- **`/hooks`**: Custom React hooks for keyboard shortcuts, mobile detection, etc.
- **`/lib`**: Utility functions including search algorithms and resource management
- **`/public`**: Static files served directly, including all academic materials

---

## Development Guidelines

### Code Standards

- **TypeScript**: All new code must use TypeScript with proper typing
- **Component Structure**: Follow functional component patterns with React Hooks
- **Styling**: Use Tailwind utility classes; avoid custom CSS when possible
- **Naming Conventions**:
  - Components: PascalCase (`FileExplorer.tsx`)
  - Utilities: camelCase (`fuzzyMatch()`)
  - Files: kebab-case for pages (`privacy-policy/page.tsx`)

### Development Scripts

```bash
# Start development server (port 3000)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

### Adding New Resources

1. **Organize Files**: Place materials in appropriate semester/subject folders under `/public/`
2. **Update Metadata**: Add entries to `data/resources.ts`
3. **Update Subjects**: If adding a new subject, update `data/subjects.ts`
4. **Test Locally**: Run dev server and verify resource appears correctly
5. **Submit PR**: Follow contribution workflow

### Testing Checklist

Before submitting changes:

- [ ] Application builds without errors (`npm run build`)
- [ ] All pages load correctly
- [ ] Search functionality works with new resources
- [ ] Mobile responsive design maintained
- [ ] No console errors or warnings
- [ ] TypeScript types are correct
- [ ] Links and downloads function properly

---

## Limitations and Future Work

### Current Limitations

1. **Semester 6 Content**: Not yet populated with resources (semester marked inactive)
2. **Static Resource Management**: Resources stored in file system rather than database
3. **No User Authentication**: Cannot save favorites or track personal progress
4. **Limited Analytics**: No tracking of popular resources or search patterns
5. **Single Language**: Interface currently English-only
6. **Manual Resource Updates**: Contributors must submit PRs; no self-service upload
7. **No Offline Support**: Requires internet connection for access
8. **Search Index**: Resources must be manually indexed in `data/resources.ts`

### Known Issues

- Build warnings for ESLint and TypeScript are currently suppressed (see next.config.mjs:3-4)
- Image optimization disabled for faster development builds
- Some older resource file paths may have inconsistent naming conventions

### Planned Improvements

See [Enhancements.md](./Enhancements.md) for detailed enhancement proposals including:

- Database integration for scalable resource management
- User authentication and personalization features
- Advanced analytics and insights
- Progressive Web App (PWA) capabilities
- Automated testing suite
- Enhanced accessibility features
- Multi-language support

---

## License and Disclaimer

### Educational Use License

This project is open source and freely available for educational purposes. The codebase is provided as-is under the MIT License principles for personal and educational use.

**Key Points**:

- ✅ Free to use for learning and education
- ✅ Open source code available for study and modification
- ✅ Encourages community contributions
- ❌ Not intended for commercial use without permission
- ❌ No warranty or guarantee of accuracy

### Disclaimer

**IMPORTANT**: This platform is a student-driven initiative and is not officially affiliated with or endorsed by Jain Group of Institutions (JGI).

- **Content Accuracy**: Materials are contributed by students and community members. While efforts are made to ensure quality, users should verify accuracy and consult official sources
- **Copyright Compliance**: Contributors must ensure they have rights to share materials. Copyrighted content should not be uploaded without permission
- **Supplementary Resource**: This platform provides supplementary materials and should not replace official course materials, lectures, or textbooks
- **Use at Your Own Risk**: The maintainers are not responsible for any consequences arising from use of materials on this platform
- **Academic Integrity**: Users must comply with their institution's academic integrity policies when using these resources

If you believe any content violates copyright or intellectual property rights, please contact the repository maintainer immediately.

---

## Acknowledgments

### Contributors

This project exists thanks to the contributions of students, educators, and supporters who share the vision of accessible education:

- **Bharath K** ([@8harath](https://github.com/8harath)) - Project creator and lead maintainer
- All students who have contributed notes, assignments, and study materials
- The BCA student community at JGI for feedback and support

### Technology Credits

Built with exceptional open-source tools:

- [Next.js](https://nextjs.org/) by Vercel
- [React](https://react.dev/) by Meta
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

### Inspiration

This project was inspired by the need to make quality educational resources accessible to all students, regardless of their specialization track or batch year. Special thanks to the open-source education community for demonstrating the power of collaborative learning.

---

## Contact

### Project Maintainer

**Bharath K**
- GitHub: [@8harath](https://github.com/8harath)
- Project: [JGI-002](https://github.com/8harath/JGI-002)

### Get Involved

- **Report Issues**: [GitHub Issues](https://github.com/8harath/JGI-002/issues)
- **Discussions**: [GitHub Discussions](https://github.com/8harath/JGI-002/discussions)
- **Contact Form**: Available on the [live platform](https://www.jainuniversity.live/contact)

### Support the Project

If you find this platform helpful:

- ⭐ **Star the repository** to show your support
- 🔄 **Share with fellow students** who might benefit
- 📝 **Contribute resources** to help others learn
- 🐛 **Report bugs** to improve the platform
- 💡 **Suggest features** for future development

---

<div align="center">

**Made with dedication for the student community**

[⬆ Back to Top](#jgi-002-academic-resource-platform)

</div>
