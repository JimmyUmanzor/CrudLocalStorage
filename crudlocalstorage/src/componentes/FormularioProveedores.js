import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormularioProveedores = ({ agregarProveedor, mostrarModal, setMostrarModal, proveedorEditado, editarProveedor }) => {
  const [proveedor, setProveedor] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    categoria: '',
  })

  useEffect(() => {
    if (proveedorEditado) {
      setProveedor(proveedorEditado)
    } else {
      setProveedor({
        nombre: '',
        email: '',
        telefono: '',
        empresa: '',
        categoria: '',
      })
    }
  }, [proveedorEditado])

  const manejarCambio = (e) => {
    setProveedor({ ...proveedor, [e.target.name]: e.target.value })
  };

  const manejarEnvio = (e) => {
    e.preventDefault()
    const { nombre, email, telefono, empresa, categoria } = proveedor

    if (!nombre || !email || !telefono || !empresa || !categoria) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error')
      return
    }

    if (proveedorEditado) {
      editarProveedor(proveedor)
    } else {
      agregarProveedor(proveedor)
    }
    
    setProveedor({
      nombre: '',
      email: '',
      telefono: '',
      empresa: '',
      categoria: '',
    })
  }

  return (
    <>
      <div className={`modal ${mostrarModal ? 'show' : ''}`} style={{ display: mostrarModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{proveedorEditado ? 'Editar Proveedor' : 'Agregar Proveedor'}</h5>
              <button type="button" className="close" onClick={() => setMostrarModal(false)}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={manejarEnvio}>
                <div className="form-group">
                  <label>Nombre Proveedor:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={proveedor.nombre}
                    onChange={manejarCambio}
                  />
                </div>
                <div className="form-group">
                  <label>Correo:</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={proveedor.email}
                    onChange={manejarCambio}
                  />
                </div>
                <div className="form-group">
                  <label>Teléfono:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="telefono"
                    value={proveedor.telefono}
                    onChange={manejarCambio}
                  />
                </div>
                <div className="form-group">
                  <label>Nombre de Empresa:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="empresa"
                    value={proveedor.empresa}
                    onChange={manejarCambio}
                  />
                </div>
                <div className="form-group">
                  <label>Categoría de empresa:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="categoria"
                    value={proveedor.categoria}
                    onChange={manejarCambio}
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  {proveedorEditado ? 'Actualizar' : 'Grabar'}
                </button>
                <button type="button" className="btn btn-secondary mt-3 ml-2" onClick={() => setMostrarModal(false)}>
                  Cancelar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FormularioProveedores
