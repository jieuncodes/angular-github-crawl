import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.REACT_APP_PERSONAL_ACCESS_TOKEN,
});

export async function fetchIssues(page: number) {
  const response = await octokit.issues.listForRepo({
    owner: "Angular",
    repo: "Angular-cli",
    sort: "comments",
    direction: "desc",
    state: "all",
    per_page: 10,
    page: page + 1,
  });
  return response.data;
}

export async function fetchIssueDetail(id: string) {
  const response = await octokit.rest.issues.get({
    owner: "Angular",
    repo: "Angular-cli",
    issue_number: Number(id),
  });
  return response.data;
}
