//typing effect
const roles = ["Fullstack Engineer", "Frontend Developer", "Backend Developer"];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;
const typingSpeed = 120;
const deletingSpeed = 70;
const delayBetweenWords = 1000;

const typingElement = document.getElementById("typing-text");

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (!deleting) {
    typingElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      deleting = true;
      setTimeout(typeEffect, delayBetweenWords);
      return;
    }
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, deleting ? deletingSpeed : typingSpeed);
}

document.addEventListener("DOMContentLoaded", typeEffect);

//get project data
fetch("assets/data/projects.json")
  .then((response) => response.json())
  .then((projects) => {
    const container = document.getElementById("projects-container");

    projects.forEach((project) => {
      const card = `
        <div class="col pt-4">
          <div class="card h-100 shadow-sm border-0 rounded-4" style="overflow: hidden;">
            <img src="${project.img}" class="card-img-top" alt="${
        project.title
      }" style="height: 200px; object-fit: cover;">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title fw-bold">${project.title}</h5>
              <p class="card-text flex-grow-1">${project.desc}</p>

              <div class="mt-3 d-flex gap-2">
                ${
                  project.link
                    ? `
                  <a href="${project.link}" target="_blank" class="btn btn-primary w-100">View Project</a>
                `
                    : ""
                }

                <a href="${
                  project.github
                }" target="_blank" class="btn btn-dark w-100">View Github</a>
              </div>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += card;
    });
  })
  .catch((error) => console.error("Failed to load project data:", error));
