import { allProducts } from './products.js';

const SESSION_STORAGE_KEY = 'scroll-position-product-id-marker';
let products;

function loadProducts() {
  // Simulate async API request
  setTimeout(() => {
    products = [...allProducts];
    render();
  }, 300)
}

function restoreScroll() {
  const storedId = sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (!storedId) {
    return;
  }

  sessionStorage.removeItem(SESSION_STORAGE_KEY)
  document.querySelector(`[data-product-id="${storedId}"]`).scrollIntoView({ behavior: 'auto', block: 'center' });
}

function render() {
  const productsList = document.querySelector('.products');
  products.forEach((product) => {
    const template = document.getElementById('product-card-template');
    const instance = document.importNode(template.content, true);

    instance.querySelector('[data-product-id]').dataset.productId = product.id;
    instance.querySelector('.product-card__image').setAttribute('src', product.image);
    instance.querySelector('.product-card__image').setAttribute('alt', product.name);
    instance.querySelector('.product-card__link--name').innerHTML = product.name;
    instance.querySelector('.product-card__price').innerHTML = `$${product.price}`;

    productsList.append(instance);
  });

  document.querySelector('.product--loading').remove();

  restoreScroll();
}

function persistScrollPosition(id) {
  // Use sessionStorage as there won't be a persistent JavaScript memory across a page navigation
  sessionStorage.setItem(SESSION_STORAGE_KEY, id);
}

attachListeners();
loadProducts();

function attachListeners() {
  document.addEventListener('click', (e) => {
    if (!e.target.matches('.product-card__link') && !e.target.closest('.product-card__link')) {
      console.log({target: e.target})
      return;
    }

    const selectedProductLi = e.target.closest('li');
    const productId = selectedProductLi.dataset.productId;
    persistScrollPosition(productId);
  })
}
