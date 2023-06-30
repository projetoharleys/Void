function addToCart(productName, price) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push({
      productName: productName,
      price: price,
      quantity: 1 // Adicionando a quantidade inicial como 1
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Exibindo mensagem de sucesso
    localStorage.setItem("carrinho", JSON.stringify(cartItems));
            alert("O produto " + productName + " foi adicionado ao seu carrinho!");

    loadCartItems();
  }

  function loadCartItems() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let tableBody = document.querySelector('#cartTable tbody');
    let totalValueCell = document.querySelector('#totalValue');
    let totalValue = 0;

    tableBody.innerHTML = '';
    cartItems.forEach(function(item) {
      let row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.productName}</td>
        <td>R$ ${item.price.toFixed(2)}</td>
        <td><input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${cartItems.indexOf(item)}, this.value)"></td>
        <td>R$ ${(item.price * item.quantity).toFixed(2)}</td>
      `;
      tableBody.appendChild(row);
      totalValue += item.price * item.quantity;
    });
    totalValueCell.textContent = `R$ ${totalValue.toFixed(2)}`;
  }

  function updateQuantity(index, quantity) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems'));
    cartItems[index].quantity = Number(quantity);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    loadCartItems();
  }

  function clearCart() {
    localStorage.removeItem('cartItems');
    location.reload();
  }

  document.addEventListener('DOMContentLoaded', function() {
    loadCartItems();
  });