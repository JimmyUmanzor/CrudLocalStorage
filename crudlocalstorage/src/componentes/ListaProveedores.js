import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ListaProveedores = ({ proveedores, abrirModalEdicion, eliminarProveedor }) => {
  return (
    <div>
      <h3>Lista de Proveedores Registrados</h3>
      <ul className="list-group">
        {proveedores.map((proveedor) => (
          <li key={proveedor.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>Nombre:</strong> {proveedor.nombre} <br />
              <strong>Correo:</strong> {proveedor.email} <br />
              <strong>Teléfono:</strong> {proveedor.telefono} <br />
              <strong>Nombre de empresa:</strong> {proveedor.empresa} <br />
              <strong>Categoría de empresa:</strong> {proveedor.categoria}
            </div>
            <div>
              <button
                onClick={() => abrirModalEdicion(proveedor)}
                className="btn btn-warning btn-sm mx-2"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                onClick={() => eliminarProveedor(proveedor.id)}
                className="btn btn-danger btn-sm"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListaProveedores
