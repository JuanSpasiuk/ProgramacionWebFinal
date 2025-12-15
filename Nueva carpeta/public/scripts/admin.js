document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
});



async function cargarProductos() {
  const res = await fetch('/api/productos');
  const productos = await res.json();

  const grid = document.querySelector('.products-grid');
  grid.innerHTML = '';

  productos.forEach(prod => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
      <img src="images/images/${prod.imagen}">
      <h3>${prod.nombre}</h3>
      <p>$${Number(prod.precio).toLocaleString()}</p>

      <button class="btn-delete" data-id="${prod.id}">Eliminar</button>
    `;

    grid.appendChild(card);
  });

  activarEliminar();
}



document.getElementById('form-producto').addEventListener('submit', async (e) => {
  e.preventDefault();

  const producto = {
    nombre: nombre.value,
    descripcion: descripcion.value,
    precio: precio.value,
    stock: stock.value,
    imagen: imagen.value
  };

  const res = await fetch('/api/productos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });

  if (res.ok) {
    e.target.reset();
    cargarProductos();
  } else {
    alert('Error al crear producto');
  }
});



function activarEliminar() {
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('¿Eliminar producto?')) return;

      const res = await fetch(`/api/productos/${btn.dataset.id}`, {
        method: 'DELETE'
      });

      if (res.ok) cargarProductos();
      else alert('No autorizado');
    });
  });
}
