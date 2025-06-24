const username = "dailaaaaan";

// Mostrar CV modal
document.getElementById("btnCV").addEventListener("click", () => {
  document.getElementById("modalCV").classList.remove("hidden");
});

document.getElementById("cerrarModal").addEventListener("click", () => {
  document.getElementById("modalCV").classList.add("hidden");
});

// 2. Obtener y mostrar repos desde GitHub
fetch(`https://api.github.com/users/${username}/repos`)
  .then(response => response.json())
  .then(repos => {
    const contenedor = document.getElementById("repos");
    repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count) // orden por estrellas
      .slice(0, 6) // Esto limita a los 6 mas destacados
      .forEach(repo => {
        const card = document.createElement("div");
        card.className = "card";
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
