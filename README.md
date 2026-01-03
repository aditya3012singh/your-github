GitHub Stats Checker
A Next.js app to fetch and display GitHub user statistics, including contribution graphs, repository details, languages, and other metrics. Perfect for developers who want to showcase their GitHub activity visually.
Features

View GitHub profile information
Interactive contribution graph for the last 3 years
Repository list with key stats (stars, forks, issues)
Language breakdown of repositories
Dynamic statistics grid (followers, following, public repos, etc.)
Dark/light theme support
Search GitHub users by username

Demo
You can see a live demo here: Your Demo Link
Getting Started
Clone the repository
bashgit clone https://github.com/yourusername/github-stats-checker.git
cd github-stats-checker
Install dependencies
bashnpm install
# or
yarn install
# or
pnpm install
Start the development server
bashnpm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
Open http://localhost:3000 in your browser to view the app.
Usage

Enter a GitHub username in the search bar
Explore the user's profile, contribution graph, repositories, languages, and stats

Environment Variables
Create a .env.local file at the root of your project:
envGITHUB_TOKEN=your_github_personal_access_token

Note: GITHUB_TOKEN is optional but recommended to avoid rate limiting by GitHub's API.

Technologies Used

Next.js – React framework for server-side rendering
React – Frontend library
Tailwind CSS – Styling
Redux Toolkit – State management
React GitHub Calendar – Contribution graph visualization
Lucide Icons – Icons

Learn More

Next.js Documentation
Tailwind CSS Documentation
GitHub API Documentation

Deploy on Vercel
The easiest way to deploy this app is via Vercel:

Push your project to GitHub
Import the repository in Vercel
Set the environment variable GITHUB_TOKEN in Vercel
Deploy and enjoy your live GitHub Stats Checker!

Check Next.js Deployment Docs for more details.
Contributing
Contributions are welcome! Feel free to open issues or submit pull requests for new features and improvements.
License
This project is licensed under the MIT License.

Made with ❤️ by Your Namegive readme.md copy paste7:48 PMHere's a clean, ready-to-copy README.md for your GitHub Stats Checker project:
markdown# GitHub Stats Checker

A **Next.js** app to fetch and display GitHub user statistics, including contribution graphs, repository details, languages, and other metrics. Perfect for developers who want to showcase their GitHub activity visually.

## Features

- View GitHub profile information
- Interactive contribution graph for the last 3 years
- Repository list with key stats (stars, forks, issues)
- Language breakdown of repositories
- Dynamic statistics grid (followers, following, public repos, etc.)
- Dark/light theme support
- Search GitHub users by username

## Demo

You can see a live demo here: [Your Demo Link](https://your-demo-link.com)

## Getting Started

### Clone the repository
```bash
git clone https://github.com/yourusername/github-stats-checker.git
cd github-stats-checker
```

### Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Start the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Usage

1. Enter a GitHub username in the search bar
2. Explore the user's profile, contribution graph, repositories, languages, and stats

## Environment Variables

Create a `.env.local` file at the root of your project:
```env
GITHUB_TOKEN=your_github_personal_access_token
```

> **Note:** `GITHUB_TOKEN` is optional but recommended to avoid rate limiting by GitHub's API.

## Technologies Used

- **Next.js** – React framework for server-side rendering
- **React** – Frontend library
- **Tailwind CSS** – Styling
- **Redux Toolkit** – State management
- **React GitHub Calendar** – Contribution graph visualization
- **Lucide Icons** – Icons

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [GitHub API Documentation](https://docs.github.com/en/rest)

## Deploy on Vercel

The easiest way to deploy this app is via [Vercel](https://vercel.com):

1. Push your project to GitHub
2. Import the repository in Vercel
3. Set the environment variable `GITHUB_TOKEN` in Vercel
4. Deploy and enjoy your live GitHub Stats Checker!

Check [Next.js Deployment Docs](https://nextjs.org/docs/deployment) for more details.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for new features and improvements.

## License

This project is licensed under the MIT License.

---

**Made with ❤️ by Aditya Singh
