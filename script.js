const kittens = [
  {
    id: "leo",
    name: "Léo",
    breed: "British Shorthair",
    age: "2 mois",
    price: "1 200 €",
    description:
      "Léo est un petit mâle très calme et affectueux. Il adore les câlins et a déjà commencé sa socialisation avec d'autres animaux.",
    image:
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "misty",
    name: "Misty",
    breed: "Siamois",
    age: "3 mois",
    price: "950 €",
    description:
      "Misty est une femelle pleine d'énergie et très bavarde, typique de sa race. Elle cherche une famille joueuse.",
    image:
      "https://images.unsplash.com/photo-1513245543132-31f507417b26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "simba",
    name: "Simba",
    breed: "Maine Coon",
    age: "2.5 mois",
    price: "1 500 €",
    description:
      "Simba est déjà un grand gabarit pour son âge. Très sociable, il fera un compagnon de vie exceptionnel.",
    image:
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "nala",
    name: "Nala",
    breed: "Ragdoll",
    age: "2 mois",
    price: "1 300 €",
    description:
      "Nala porte bien son nom de Ragdoll : elle devient une vraie poupée de chiffon dès qu'on la prend dans les bras.",
    image:
      "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "oscar",
    name: "Oscar",
    breed: "Bengal",
    age: "3.5 mois",
    price: "1 800 €",
    description:
      "Oscar est un petit léopard de salon. Très intelligent et actif, il a besoin d'espace pour s'épanouir.",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "bella",
    name: "Bella",
    breed: "Persan",
    age: "2 mois",
    price: "1 100 €",
    description:
      "Bella est la douceur incarnée. Son pelage nécessite un entretien régulier qu'elle apprécie énormément.",
    image:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

// Rendu des cartes
function renderKittens() {
  const grid = document.getElementById("kitten-grid");
  if (grid) {
    grid.innerHTML = kittens
      .map(
        (kitten) => `
            <div class="card" onclick="openModal('${kitten.id}')">
                <img src="${kitten.image}" alt="${kitten.name}" class="card-img">
                <div class="card-content">
                    <h3 class="card-title">${kitten.name}</h3>
                    <p class="card-info">${kitten.breed} • ${kitten.age}</p>
                    <p class="price">${kitten.price}</p>
                </div>
            </div>
        `,
      )
      .join("");
  }
}

// Gestion de la Modale
const modal = document.getElementById("kitten-modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.querySelector(".close-modal");

function openModal(id) {
  const kitten = kittens.find((k) => k.id === id);
  if (kitten) {
    modalBody.innerHTML = `
            <div class="modal-body-content">
                <img src="${kitten.image}" alt="${kitten.name}" class="modal-img">
                <div class="modal-text">
                    <h2 class="section-title" style="text-align: left; margin-bottom: 1rem;">${kitten.name}</h2>
                    <p><strong>Race:</strong> ${kitten.breed}</p>
                    <p><strong>Âge:</strong> ${kitten.age}</p>
                    <p><strong>Prix:</strong> <span class="price">${kitten.price}</span></p>
                    <p style="margin-top: 1rem;">${kitten.description}</p>
                    <button class="btn-primary" style="margin-top: 2rem;" onclick="closeModalAndContact('${kitten.id}')">Réserver ${kitten.name}</button>
                </div>
            </div>
        `;
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Empêcher le scroll
  }
}

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

function closeModalAndContact(id) {
  closeModal();
  const kitten = kittens.find((k) => k.id === id);
  const subject = encodeURIComponent(
    `Demande de réservation : ${kitten ? kitten.name : id}`,
  );
  window.location.href = `mailto:contact@chattonsprestige.fr?subject=${subject}`;
}

closeBtn.onclick = closeModal;
window.onclick = (event) => {
  if (event.target == modal) closeModal();
};

// Animation au défilement
function revealOnScroll() {
  const cards = document.querySelectorAll(
    ".card, .about-container, .testimonial-card",
  );
  cards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < window.innerHeight - 50) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
}

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  renderKittens();

  // Setup initial des éléments pour l'animation
  const animElements = document.querySelectorAll(
    ".card, .about-container, .testimonial-card",
  );
  animElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease-out";
  });

  window.addEventListener("scroll", revealOnScroll);
  setTimeout(revealOnScroll, 100); // Petit délai pour le premier rendu
});
