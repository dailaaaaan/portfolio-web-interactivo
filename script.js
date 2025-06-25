const username = "dailaaaaan";

// Traducciones dinamicas (sin cargar la pagina)
const translations = {
  es: {
    navProjects: "Proyectos",
    navActivity: "Actividad",
    btnCV: "Ver CV",
    heroTitle: "Desarrollador Web Full Stack",
    heroText: "Pequeño concepto de pagina web donde se muestran proyectos, commits y el CV.",
    projectsTitle: "Mis Proyectos",
    activityTitle: "Actividad Reciente en GitHub (Commits)",
    rights: "Todos los derechos reservados.",
  },
  en: {
    navProjects: "Projects",
    navActivity: "Activity",
    btnCV: "View CV",
    heroTitle: "Full Stack Web Developer",
    heroText: "A small concept portfolio page showing projects, commits and a CV.",
    projectsTitle: "My Projects",
    activityTitle: "Recent GitHub Activity (Commits)",
    rights: "All rights reserved.",
  }
};

document.getElementById("languageSelector").addEventListener("change", (e) => {
  const lang = e.target.value;

  // Traduccion de textos
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Cambiar PDF del CV segun idioma
  const embed = document.querySelector("#modalCV embed");
  if (lang === "en") {
    embed.setAttribute("src", "Curriculum Dylan Fiallos - EN.pdf");
  } else {
    embed.setAttribute("src", "Curriculum Dylan Fiallos.pdf");
  }
});


// Mostrar CV modal
document.getElementById("btnCV").addEventListener("click", () => {
  document.getElementById("modalCV").classList.remove("hidden");
});

document.getElementById("cerrarModal").addEventListener("click", () => {
  document.getElementById("modalCV").classList.add("hidden");
});

// Obtener y mostrar repos desde GitHub
fetch(`https://api.github.com/users/${username}/repos`)
  .then(response => response.json())
  .then(repos => {
    const contenedor = document.getElementById("repos");
    repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .forEach((repo, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.animationDelay = `${(index + 1) * 0.1}s`;
        card.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || "Sin descripción."}</p>
          <a href="${repo.html_url}" target="_blank">Ver en GitHub ↗</a>
        `;
        contenedor.appendChild(card);
      });
  })
  .catch(err => {
    console.error("Error al cargar repos:", err);
    document.getElementById("repos").innerHTML =
      "<p>No se pudieron cargar los proyectos. Verifica tu usuario.</p>";
  });

// Obtener commits de los primeros 3 repos públicos
fetch(`https://api.github.com/users/${username}/repos`)
  .then(response => response.json())
  .then(repos => {
    const commitsUl = document.getElementById("commits");
    const primerosRepos = repos.slice(0, 3);

    primerosRepos.forEach(repo => {
      fetch(`https://api.github.com/repos/${username}/${repo.name}/commits`)
        .then(res => res.json())
        .then(commits => {
          commits.slice(0, 1).forEach(commit => {
            const li = document.createElement("li");
            li.innerHTML = `
              <strong>${repo.name}</strong>: 
              ${commit.commit.message} 
              <em>(${new Date(commit.commit.author.date).toLocaleDateString()})</em>
              <br>
              <a href="${commit.html_url}" target="_blank">Ver commit ↗</a>
            `;
            commitsUl.appendChild(li);
          });
        })
        .catch(err => {
          console.error(`Error cargando commits de ${repo.name}`, err);
        });
    });
  });
