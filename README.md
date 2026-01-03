# GitHub Stats Checker

A beautiful **Next.js** application to fetch and display GitHub user statistics, including interactive contribution graphs, repository details, language analytics, and more. Perfect for developers who want to showcase their GitHub activity visually.

## ✨ Features

- 🔍 **Search GitHub Users** - Instantly find any GitHub user by username
- 📊 **Profile Overview** - View comprehensive user profile information
- 📈 **Contribution Graph** - Interactive contribution calendar for the last 3 years
- 🗂️ **Repository List** - Browse repositories with stars, forks, and issue counts
- 🎨 **Language Analytics** - Visual breakdown of programming languages used
- 📋 **Statistics Dashboard** - Quick stats including followers, following, and public repos
- 🌙 **Dark/Light Theme** - Toggle between dark and light modes
- ✨ **Smooth Animations** - Enhanced UX with GSAP and Framer Motion
- 📱 **Responsive Design** - Works seamlessly on all devices

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/github-stats-checker.git
cd github-stats-checker
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open in browser**
Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📖 Usage

1. Enter a GitHub username in the search bar on the home page
2. Press Enter or click search
3. Explore the user's complete GitHub profile including:
   - Profile card with bio and avatar
   - All public repositories with statistics
   - Contribution activity graph
   - Programming language distribution
   - Account statistics

## 🔧 Environment Setup

Create a `.env.local` file in the project root:
```env
GITHUB_TOKEN=your_github_personal_access_token
```

> **Tip:** While `GITHUB_TOKEN` is optional, it's highly recommended to avoid GitHub API rate limits (60 requests/hour without token vs 5000 with token).

## 📦 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | React framework with server-side rendering |
| **React 19** | Frontend library |
| **Tailwind CSS 4** | Utility-first CSS styling |
| **Material-UI (MUI)** | Component library |
| **Redux** | State management for theme |
| **Recharts** | Data visualization & charts |
| **React GitHub Calendar** | Contribution graph |
| **GSAP + Framer Motion** | Smooth animations |
| **Lucide React** | Icon library |

## 📁 Project Structure

```
your-github/
├── app/                      # Next.js app directory
│   ├── api/
│   │   └── github/[username]/ # GitHub API endpoint
│   ├── profile/              # Profile page route
│   ├── page.js               # Home/search page
│   ├── layout.js             # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── common/
│   │   └── SearchBar.js      # Username search input
│   ├── profile/
│   │   ├── ProfileCard.js    # User profile info
│   │   ├── RepoList.js       # Repository list
│   │   ├── ActivityGraph.js  # Contribution graph
│   │   ├── LanguageStats.js  # Language visualization
│   │   ├── ContributionGraph.js
│   │   ├── StatsGrid.js      # Statistics grid
│   │   └── DecryptedText.jsx # Animated text
│   └── ui/
│       ├── SkeletonLoader.js # Loading state
│       └── sparkles.jsx      # Visual effects
├── hooks/
│   └── useGithubProfile.js   # Custom hook for GitHub API
├── lib/
│   └── utils.js              # Utility functions
├── store/
│   ├── store.js              # Redux store
│   └── theme.slice.js        # Theme slice
└── public/                    # Static assets
```

## 🛠️ Available Scripts

```bash
# Development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 🚀 Deployment

### Deploy on Vercel

The easiest way to deploy is via [Vercel](https://vercel.com):

1. Push your project to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Add environment variable: `GITHUB_TOKEN=your_token`
4. Click Deploy

For more details, see [Next.js Deployment Documentation](https://nextjs.org/docs/deployment).

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Guide](https://tailwindcss.com/docs)
- [GitHub API Docs](https://docs.github.com/en/rest)
- [Redux Documentation](https://redux.js.org)
- [Material-UI Components](https://mui.com)

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## ❤️ Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Icons from [Lucide React](https://lucide.dev) and [MUI Icons](https://mui.com/material-icons)
- Charts powered by [Recharts](https://recharts.org)
- Animations by [GSAP](https://greensock.com/gsap)

---

**Made with ❤️ by Aditya Singh**
