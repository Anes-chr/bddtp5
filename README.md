# 🚀 TP4 Ultimate Guide - Next.js Web Application

An interactive, beautiful, and feature-rich web application to Master Bdd extraction queries!

## ✨ Features

- 🎨 **Beautiful UI** with Shadcn components
- 🌗 **Dark/Light Mode** toggle
- 📊 **Interactive Visualizations** with Recharts
- 💻 **Syntax Highlighted Code** blocks
- 🔍 **Search Functionality** to find queries
- 🎯 **All 35 SQL Queries** with detailed explanations
- ✅ **Interactive Checklist** to track progress
- 📱 **Fully Responsive** design
- ⚡ **Smooth Animations** with Framer Motion
- 🎭 **Test Query Buttons** for interactive learning

## 🛠️ Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **React Syntax Highlighter** - Code highlighting
- **React Hot Toast** - Notifications

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the webapp directory:
```bash
cd tp_4/webapp
```

2. Install dependencies:
```bash
npm install
```

3. Install required additional packages:
```bash
npm install tailwindcss-animate
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📂 Project Structure

```
webapp/
├── app/                # Next.js app directory
│   ├── layout.tsx     # Root layout
│   ├── page.tsx       # Home page
│   └── globals.css    # Global styles
├── components/        # React components
│   ├── sections/      # Page sections
│   ├── ui/           # Reusable UI components
│   ├── header.tsx
│   ├── navigation.tsx
│   └── ...
├── lib/              # Utilities
│   ├── utils.ts      # Helper functions
│   └── queries-data.ts  # All 35 queries data
└── public/           # Static assets
```

## 🎯 Features Breakdown

### 1. Interactive Query Explorer
- All 35 queries with expandable sections
- Difficulty badges (Easy/Medium/Hard)
- Concept tags
- Copy-to-clipboard functionality
- Test query buttons

### 2. Database Visualizations
- Bar chart showing top salaries
- Pie chart for position distribution
- Stats cards with key metrics

### 3. SQL Concepts Section
- Tabbed interface for different concepts
- Interactive examples
- Comparison tables (WHERE vs HAVING, ANY vs ALL)

### 4. Tips & Mistakes
- Common mistakes with corrections
- Best practices
- Query structure guide

### 5. Progress Tracking
- Interactive checklist
- Progress bar
- Success message on completion

## 🎨 Customization

### Colors
Edit `app/globals.css` to customize the color scheme

### Data
Edit `lib/queries-data.ts` to modify queries and examples

### Components
All components are in the `components/` directory

## 📱 Responsive Design

The app is fully responsive and works great on:
- 📱 Mobile devices
- 📟 Tablets
- 💻 Desktop computers
- 🖥️ Large screens

## 🌟 Key Components

- **Header**: Animated gradient header with theme toggle
- **Navigation**: Sticky navigation with smooth scrolling
- **Search Bar**: Real-time query filtering
- **Code Blocks**: Syntax highlighted with copy button
- **Charts**: Interactive data visualizations
- **Accordion**: Expandable query sections
- **Progress Bar**: Scroll progress indicator

## 🤝 Contributing

Feel free to fork and modify this project for your own use!

## 📄 License

This project is created for educational purposes.

## 🎓 Made for 1CS Students

Created with ❤️ to help students Master Bdd queries!

---

**Happy Learning! 🚀**


