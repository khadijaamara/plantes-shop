// ========= Données produits =========
const products = [
    {
      id: 1,
      nom: "Monstera Deliciosa",
      prix: 29.99,
      image:
        "https://images.unsplash.com/photo-1626929252164-27c26d107b00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zdGVyYSUyMHBsYW50fGVufDF8fHx8MTc2NTAzNDE3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description:
        "Plante tropicale élégante avec de grandes feuilles découpées",
      categorie: "Tropicales",
      stock: 15,
    },
    {
      id: 2,
      nom: "Collection Succulentes",
      prix: 15.99,
      image:
        "https://images.unsplash.com/photo-1621512367176-03782e847fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjdWxlbnQlMjBwbGFudHN8ZW58MXx8fHwxNzY1MDI5NDg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Assortiment de 3 succulentes faciles à entretenir",
      categorie: "Succulentes",
      stock: 25,
    },
    {
      id: 3,
      nom: "Fougère de Boston",
      prix: 19.99,
      image:
        "https://images.unsplash.com/photo-1627900425437-c100993f087a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXJuJTIwcGxhbnR8ZW58MXx8fHwxNzY1MTAxNjYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Fougère luxuriante qui purifie l'air naturellement",
      categorie: "Fougères",
      stock: 12,
    },
    {
      id: 4,
      nom: "Cactus Décoratif",
      prix: 12.99,
      image:
        "https://images.unsplash.com/photo-1660490272837-d33d73b9baa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWN0dXMlMjBwb3R8ZW58MXx8fHwxNzY1MDQyNjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Cactus résistant parfait pour les débutants",
      categorie: "Cactus",
      stock: 30,
    },
    {
      id: 5,
      nom: "Plante d'Intérieur Mix",
      prix: 24.99,
      image:
        "https://images.unsplash.com/photo-1634886153044-17aff58eb865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBwbGFudHMlMjBwb3R8ZW58MXx8fHwxNzY1MTE5MDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Assortiment de plantes d'intérieur variées",
      categorie: "Mix",
      stock: 18,
    },
    {
      id: 6,
      nom: "Plantes Tropicales",
      prix: 34.99,
      image:
        "https://images.unsplash.com/photo-1600333591199-1c7f60b0c6a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHBsYW50c3xlbnwxfHx8fDE3NjUwMzYwMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Lot de plantes tropicales exotiques",
      categorie: "Tropicales",
      stock: 10,
    },
  ];
  
  let cart = [];
  let currentFilter = "Tous";
  
  document.addEventListener("DOMContentLoaded", () => {
    const filtersContainer = document.getElementById("product-filters");
    const productsGrid = document.getElementById("products-grid");
    const cartItemsEl = document.getElementById("cart-items");
    const cartEmptyEl = document.getElementById("cart-empty");
    const cartSummaryEl = document.getElementById("cart-summary");
    const cartTotalEl = document.getElementById("cart-total");
    const orderButton = document.getElementById("order-button");
    const resetButton = document.getElementById("reset-button");
    const orderConfirmation = document.getElementById("order-confirmation");
  
    // --- Catégories ---
    const categories = ["Tous", ...new Set(products.map((p) => p.categorie))];
  
    function renderFilters() {
      filtersContainer.innerHTML = "";
      categories.forEach((cat) => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.className =
          "filter-button" + (cat === currentFilter ? " active" : "");
        btn.addEventListener("click", () => {
          currentFilter = cat;
          renderFilters();
          renderProducts();
        });
        filtersContainer.appendChild(btn);
      });
    }
  
    // --- Produits ---
    function getFilteredProducts() {
      if (currentFilter === "Tous") return products;
      return products.filter((p) => p.categorie === currentFilter);
    }
  
    function renderProducts() {
      const list = getFilteredProducts();
      productsGrid.innerHTML = "";
  
      list.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${product.image}" alt="${product.nom}" class="product-card-image" />
          <div class="product-card-body">
            <h3 class="product-card-title">${product.nom}</h3>
            <p class="product-card-description">${product.description}</p>
            <div class="product-card-row">
              <span class="product-card-price">${product.prix.toFixed(2)}DT</span>
              <span class="product-card-stock">Stock: ${product.stock}</span>
            </div>
            <button class="add-to-cart-btn" data-id="${product.id}">
              <span class="add-to-cart-icon">🛒</span>
              <span>Ajouter au panier</span>
            </button>
          </div>
        `;
        productsGrid.appendChild(card);
      });
    }
  
    // --- Panier ---
    function addToCart(productId) {
      const product = products.find((p) => p.id === productId);
      if (!product) return;
  
      const existing = cart.find((item) => item.id === productId);
      if (existing) {
        const newQty = Math.min(existing.quantite + 1, existing.stock);
        existing.quantite = newQty;
      } else {
        cart.push({ ...product, quantite: 1 });
      }
      renderCart();
    }
  
    function updateQuantity(productId, delta) {
      cart = cart
        .map((item) => {
          if (item.id === productId) {
            const newQty = Math.max(
              0,
              Math.min(item.quantite + delta, item.stock)
            );
            return { ...item, quantite: newQty };
          }
          return item;
        })
        .filter((item) => item.quantite > 0);
  
      renderCart();
    }
  
    function getTotalPrice() {
      const total = cart.reduce(
        (sum, item) => sum + item.prix * item.quantite,
        0
      );
      return total.toFixed(2);
    }
  
    function renderCart() {
      cartItemsEl.innerHTML = "";
  
      if (cart.length === 0) {
        cartEmptyEl.style.display = "block";
        cartSummaryEl.style.display = "none";
        return;
      }
  
      cartEmptyEl.style.display = "none";
      cartSummaryEl.style.display = "block";
  
      cart.forEach((item) => {
        const row = document.createElement("div");
        row.className = "cart-item";
        row.innerHTML = `
          <img src="${item.image}" alt="${item.nom}" class="cart-item-image" />
          <div class="cart-item-main">
            <div class="cart-item-name">${item.nom}</div>
            <div class="cart-item-price">${item.prix.toFixed(2)}€</div>
            <div class="cart-item-controls" data-id="${item.id}">
              <button class="qty-btn qty-minus">−</button>
              <span class="cart-item-qty">${item.quantite}</span>
              <button class="qty-btn qty-plus">+</button>
            </div>
          </div>
        `;
        cartItemsEl.appendChild(row);
      });
  
      cartTotalEl.textContent = getTotalPrice() + "DT";
    }
  
    // --- Commande ---
    function handleOrder() {
      if (cart.length === 0) return;
  
      const existingOrders =
        JSON.parse(localStorage.getItem("plantshop_orders") || "[]") || [];
  
      const newOrder = {
        id: Date.now(),
        items: cart,
        total: getTotalPrice(),
        date: new Date().toISOString(),
        status: "En attente",
      };
  
      existingOrders.push(newOrder);
      localStorage.setItem("plantshop_orders", JSON.stringify(existingOrders));
  
      cart = [];
      renderCart();
  
      orderConfirmation.style.display = "flex";
      setTimeout(() => {
        orderConfirmation.style.display = "none";
      }, 5000);
    }
  
    // --- Réinitialiser panier + filtres ---
    function resetCartAndFilters() {
      cart = [];
      renderCart();
  
      currentFilter = "Tous";
      renderFilters();
      renderProducts();
    }
  
    // --- Events ---
  
    // Click sur "Ajouter au panier"
    productsGrid.addEventListener("click", (e) => {
      const btn = e.target.closest(".add-to-cart-btn");
      if (!btn) return;
      const id = Number(btn.getAttribute("data-id"));
      addToCart(id);
    });
  
    // Click sur +/− dans le panier
    cartItemsEl.addEventListener("click", (e) => {
      const minus = e.target.closest(".qty-minus");
      const plus = e.target.closest(".qty-plus");
      if (!minus && !plus) return;
  
      const controls = e.target.closest(".cart-item-controls");
      if (!controls) return;
  
      const id = Number(controls.getAttribute("data-id"));
  
      if (minus) updateQuantity(id, -1);
      if (plus) updateQuantity(id, 1);
    });
  
    // Boutons
    orderButton.addEventListener("click", handleOrder);
    resetButton.addEventListener("click", resetCartAndFilters);
  
    // Initial render
    renderFilters();
    renderProducts();
    renderCart();
  });
  