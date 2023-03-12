import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.PERSONAL_ACCESS_TOKEN,
});

export async function fetchIssues(perPage: number) {
  const response = await octokit.issues.listForRepo({
    owner: "Angular",
    repo: "Angular-cli",
    sort: "comments",
    direction: "desc",
    per_page: perPage,
  });

  return response.data;
}

