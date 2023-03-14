import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.PERSONAL_ACCESS_TOKEN,
});


export async function fetchIssues(page: number) {
  const response = await octokit.issues.listForRepo({
    owner: "Angular",
    repo: "Angular-cli",
    sort: "comments",
    direction: "desc",
    state: "open",    
    per_page: 10,
    page:page + 1,
  });
  return response.data;
}

