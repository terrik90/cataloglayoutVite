import "../scss/style.scss";
import productsData from "../../products.json";

function filterProductsForGrid(products, screenWidth) {
  const productsCopy = [...products];
  let itemsPerRow;

  if (screenWidth <= 640) {
    itemsPerRow = 2; // Мобильные устройства
  } else if (screenWidth > 640 && screenWidth <= 1023) {
    itemsPerRow = 3; // Планшеты
  } else if (screenWidth >= 1024 && screenWidth <= 1360) {
    itemsPerRow = 4; // Небольшие десктопы
  } else {
    itemsPerRow = 5; // Большие экраны
  }

  const remainder = productsCopy.length % itemsPerRow;
  return remainder === 0
    ? productsCopy
    : productsCopy.slice(0, productsCopy.length - remainder);
}

// Функция для загрузки и отображения товаров
async function loadAndDisplayProducts() {
  try {
    // Получение контейнера для карточек товаров
    const containerCatalog = document.querySelector(".container-catalog");

    // Очистка контейнера перед добавлением новых карточек
    containerCatalog.innerHTML = "";

    // Фильтрация товаров для аккуратного отображения в сетке
    const screenWidth = window.innerWidth;
    const productsToShow = filterProductsForGrid(productsData, screenWidth);

    // Создание и добавление карточек товаров
    productsToShow.forEach((product) => {
      const productCard = `
        <div class="product">
          <div class="image">
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div class="info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="info-price">
              <span class="price">${product.price}<small>₽</small></span>
              <button class="add-to-cart">
                <i class="fa-solid fa-basket-shopping"></i>
              </button>
            </div>
          </div>
        </div>
      `;
      containerCatalog.innerHTML += productCard;
    });
  } catch (error) {
    console.error("Ошибка при загрузке товаров:", error);
  }
}

// Вызов функции при загрузке страницы
document.addEventListener("DOMContentLoaded", loadAndDisplayProducts);

// Обработчик изменения размера окна для адаптивности
window.addEventListener("resize", loadAndDisplayProducts);

document.querySelector(".hamburger").addEventListener("click", function () {
  this.classList.toggle("active");
  document.querySelector(".sidebar").classList.toggle("open");
});
