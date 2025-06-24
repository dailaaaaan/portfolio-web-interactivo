document.getElementById("btnCV").addEventListener("click", () => {
  document.getElementById("modalCV").classList.remove("hidden");
});

document.getElementById("cerrarModal").addEventListener("click", () => {
  document.getElementById("modalCV").classList.add("hidden");
});
