import { NextResponse } from "next/server";

const GITHUB_API = "https://api.github.com";

export async function GET(req, { params }) {
  const username = params.username;

  if (!username) {
    return NextResponse.json(
      { error: "Username required" },
      { status: 400 }
    );
  }

  if (!process.env.GITHUB_TOKEN) {
    return NextResponse.json(
      { error: "GitHub token missing" },
      { status: 500 }
    );
  }

  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
  };

  try {
    const userRes = await fetch(
      `${GITHUB_API}/users/${username}`,
      { headers }
    );

    if (!userRes.ok) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const user = await userRes.json();

    const reposRes = await fetch(
      `${GITHUB_API}/users/${username}/repos?per_page=100&sort=stars`,
      { headers }
    );

    const repos = await reposRes.json();

    return NextResponse.json({ user, repos });
  } catch (err) {
    return NextResponse.json(
      { error: "GitHub API failed" },
      { status: 500 }
    );
  }
}
