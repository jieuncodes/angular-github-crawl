import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.PERSONAL_ACCESS_TOKEN,
});

export async function fetchIssues() {
  const response = await octokit.issues.listForRepo({
    owner: "angular",
    repo: "angular-cli",
  });

  const issues = response.data;

  console.log(issues);
}

