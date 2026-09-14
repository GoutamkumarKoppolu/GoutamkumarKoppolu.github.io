document.getElementById("year").textContent = new Date().getFullYear();

const GITHUB_USERNAME = "GoutamkumarKoppolu";
const MAX_PROJECTS = 6;

async function loadProjects() {
  const container = document.getElementById("projects-list");

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
    );

    if (!res.ok) throw new Error(`GitHub API responded with ${res.status}`);

    const repos = await res.json();

    const ranked = repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.pushed_at) - new Date(a.pushed_at);
      })
      .slice(0, MAX_PROJECTS);

    if (ranked.length === 0) {
      container.innerHTML = fallbackMarkup();
      return;
    }

    container.innerHTML = ranked.map(renderProjectCard).join("");
  } catch (err) {
    console.error("Failed to load GitHub repositories:", err);
    container.innerHTML = fallbackMarkup();
  }
}

function renderProjectCard(repo) {
  const description = repo.description
    ? escapeHtml(repo.description)
    : "No description provided.";

  const meta = [
    repo.language ? escapeHtml(repo.language) : null,
    repo.stargazers_count > 0 ? `★ ${repo.stargazers_count}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return `
    <article class="project-card">
      <h3><a href="${repo.html_url}" target="_blank" rel="noopener">${escapeHtml(repo.name)}</a></h3>
      <p class="project-desc">${description}</p>
      ${meta ? `<p class="project-meta">${meta}</p>` : ""}
    </article>
  `;
}

function fallbackMarkup() {
  return `<p class="fallback">Couldn't load repositories right now — see them directly on
    <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener">GitHub</a>.</p>`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

loadProjects();
