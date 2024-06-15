const products = document.querySelector('#products');
const searchInput = document.querySelector('#searchInput');
let allProducts;
let filteredProducts;

const getProduct = async () => {
  await fetch('https://mocki.io/v1/c74f248a-3e51-4c88-aaf4-fdc759f1c451')
    .then(res => res.json())
    .then(data => {
      allProducts = data;
      displayProducts(allProducts);
    })
    .catch(error => console.error("Error fetching products from server ", error))
}

const displayProducts = (productsToDisplay) => {
  products.innerHTML = '';
  productsToDisplay.map(item => {
    const card = document.createElement('div');
    card.className = 'card bg-white p-4 rounded-lg shadow-md';
    card.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="mx-auto h-60 object-contain mb-4">
            <h2 class="text-xl font-semibold mb-2">${item.title.slice(0, 20)}...</h2>
            <p class="text-gray-600 mb-4">${item.category}</p>
            <p class="text-gray-600 mb-4">${item.brand}</p>
            <p class="text-lg font-bold mb-4">$${item.price}</p>
            <button class="bg-blue-500 text-white px-4 py-2 rounded-lg">Add to Cart</button>    
          `;
    products.appendChild(card);
  })
}

const filterCategory = (category) => {
  if (!category) {
    filteredProducts = allProducts;
  } else {
    filteredProducts = allProducts.filter(item => item.category === category);
  }
  displayProducts(filteredProducts);
}

const filterBrand = (brand) => {
  if (!brand) {
    filteredProducts = allProducts;
  } else {
    filteredProducts = allProducts.filter(item => item.brand === brand)
  }
  displayProducts(filteredProducts)
}

searchInput.addEventListener('input', () => {
  const searchQuery = searchInput.value.toLowerCase();
  if (filteredProducts) {
    var searchedProducts = filteredProducts.filter(item =>
      item.title.toLowerCase().includes(searchQuery)
    );
  } else {
    var searchedProducts = allProducts.filter(item =>
      item.title.toLowerCase().includes(searchQuery)
    );
  }
  displayProducts(searchedProducts);
});

getProduct();

