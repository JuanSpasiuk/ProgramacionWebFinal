let esAdmin = false;

document.addEventListener('DOMContentLoaded', async () => {
  await obtenerUsuario();
  await cargarProductos();
});



async function obtenerUsuario() {
  const btnAdmin = document.querySelector('.btn-admin');

  try {
    const res = await fetch('/api/auth/me');
    if (!res.ok) {
      if (btnAdmin) btnAdmin.remove();
      return;
    }

    const { user } = await res.json();

    if (user.rol === 'admin') {
      esAdmin = true;
    } else {
      if (btnAdmin) btnAdmin.remove();
    }

  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    if (btnAdmin) btnAdmin.remove();
  }
}



async function cargarProductos() {
  const grid = document.querySelector('.products-grid');
  if (!grid) return;

  try {
    const res = await fetch('/api/productos');
    const productos = await res.json();

    grid.innerHTML = '';

    productos.forEach(prod => {
      const card = document.createElement('div');
      card.classList.add('product-card');

      card.innerHTML = `
        <img src="/images/images/${prod.imagen}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p class="price">$${Number(prod.precio).toLocaleString('es-AR')}</p>

        ${
          esAdmin
            ? `
              <button class="btn-edit" data-id="${prod.id}">Editar</button>
              <button class="btn-delete" data-id="${prod.id}">Eliminar</button>
            `
            : ''
        }
      `;

      grid.appendChild(card);
    });

    if (esAdmin) {
      activarBotonesEliminar();
      activarBotonesEditar();
    }

  } catch (error) {
    console.error('Error cargando productos:', error);
  }
}



function activarBotonesEliminar() {
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;

      if (!confirm('¿Eliminar producto?')) return;

      const res = await fetch(`/api/productos/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        cargarProductos();
      } else {
        alert('No autorizado');
      }
    });
  });
}



function activarBotonesEditar() {
  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;

      const nombre = prompt('Nuevo nombre');
      const precio = prompt('Nuevo precio');
      const stock = prompt('Nuevo stock');

      if (!nombre || !precio || !stock) return;

      const res = await fetch(`/api/productos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, precio, stock })
      });

      if (res.ok) {
        cargarProductos();
      } else {
        alert('Error al editar');
      }
    });
  });
}




