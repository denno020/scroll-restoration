import { allProducts } from './products.js';

let products;

function loadProducts() {
  // Simulate async API request
  setTimeout(() => {
    products = [...allProducts];
    render();
  }, 300)
}

function render() {
  const productsList = document.querySelector('.products');
  products.forEach((product) => {
    const template = document.getElementById('product-card-template');
    const instance = document.importNode(template.content, true);

    instance.querySelector('.product-card__image').setAttribute('src', product.image);
    instance.querySelector('.product-card__image').setAttribute('alt', product.name);
    instance.querySelector('.product-card__link--name').innerHTML = product.name;
    instance.querySelector('.product-card__price').innerHTML = `$${product.price}`;

    productsList.append(instance);
  });

  document.querySelector('.product--loading').remove();
}

loadProducts();
