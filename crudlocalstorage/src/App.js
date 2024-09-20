import React, { useState, useEffect } from 'react';
import FormularioProveedores from './componentes/FormularioProveedores';
import ListaProveedores from './componentes/ListaProveedores';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [proveedores, setProveedores] = useState([])
  const [mostrarModal, setMostrarModal] = useState(false)
  const [proveedorEditado, setProveedorEditado] = useState(null)

  useEffect(() => {
    const proveedoresGuardados = localStorage.getItem('proveedores')
    if (proveedoresGuardados) {
      setProveedores(JSON.parse(proveedoresGuardados))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('proveedores', JSON.stringify(proveedores))
  }, [proveedores])

  const agregarProveedor = (nuevoProveedor) => {
    setProveedores([...proveedores, { ...nuevoProveedor, id: Date.now() }])
    Swal.fire('Proveedor agregado', 'El proveedor ha sido agregado con éxito', 'success')
    setMostrarModal(false)
  }


  const editarProveedor = (proveedor) => {
    Swal.fire({
      title: '¿Deseas guardar los cambios realizados?',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const proveedoresActualizados = proveedores.map((item) =>
          item.id === proveedor.id ? proveedor : item
        )
        setProveedores(proveedoresActualizados)
        Swal.fire('Guardado', 'El proveedor ha sido editado con éxito', 'success')
        setMostrarModal(false)
        setProveedorEditado(null)
      }
    })
  }


  const eliminarProveedor = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const proveedoresActualizados = proveedores.filter((item) => item.id !== id)
        setProveedores(proveedoresActualizados)
        Swal.fire('Eliminado', 'El proveedor ha sido eliminado', 'success')
      }
    })
  }


  const abrirModalEdicion = (proveedor) => {
    setProveedorEditado(proveedor)
    setMostrarModal(true)
  }

  return (
    <div className="container">
      <h1 className="my-4 text-center">Mantenimiento de Proveedores</h1>
      <button className="btn btn-primary mb-4" onClick={() => setMostrarModal(true)}>
        Agregar Nuevo Proveedor
      </button>
      <FormularioProveedores 
        agregarProveedor={agregarProveedor} 
        mostrarModal={mostrarModal} 
        setMostrarModal={setMostrarModal} 
        proveedorEditado={proveedorEditado}
        editarProveedor={editarProveedor}
      />
      <ListaProveedores
        proveedores={proveedores}
        abrirModalEdicion={abrirModalEdicion}
        eliminarProveedor={eliminarProveedor}
      />
    </div>
  )
}

export default App
