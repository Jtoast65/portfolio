import { fetchJSON, renderProjects, fetchGitHubData } from './global.js';

const projects = await fetchJSON('./lib/projects.json');
const sortedProjects = projects.sort((a, b) => Number(b.year) - Number(a.year));
const latestProjects = sortedProjects.slice(0, 3);

const projectsContainer = document.querySelector('.projects');
renderProjects(latestProjects, projectsContainer, 'h2');

const githubData = await fetchGitHubData('Jtoast65');
const profileStats = document.querySelector('#profile-stats');

if (profileStats && githubData) {
  profileStats.innerHTML = `
    <dl class="github-stats">
      <div>
        <dt>Public Repos</dt>
        <dd>${githubData.public_repos}</dd>
      </div>
      <div>
        <dt>Public Gists</dt>
        <dd>${githubData.public_gists}</dd>
      </div>
      <div>
        <dt>Followers</dt>
        <dd>${githubData.followers}</dd>
      </div>
      <div>
        <dt>Following</dt>
        <dd>${githubData.following}</dd>
      </div>
    </dl>
    <p class="github-stats-source">Live from the GitHub API</p>
  `;
} else if (profileStats) {
  profileStats.innerHTML = `
    <p class="empty-state">GitHub stats are temporarily unavailable.</p>
  `;
}
