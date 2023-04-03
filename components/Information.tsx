import {useContext, useState} from 'react'
import Table from './Table'
import {useQuery, gql} from '@apollo/client'
import Modal from './Modal'
import { DataContext } from '../context/DataContext'
import Cliente from './Cliente'
const OBTENER_USUARIOS =gql`
    query obtenerUsuario{
        obtenerUsuario {
            id
            name
            apellido
            telefono
            edad
            correo
        }
    }
`
const Information = () => {
    const {data, loading, error} = useQuery(OBTENER_USUARIOS)
    const {setOpen,open} = useContext(DataContext)
  return (
    <>
        <div className='bg-indigo-500  text-white text-center p-6'>
            <h1 className='text-3xl'>Plataforma de gestión de clientes</h1>
            <h2 className='text-xs'>Acá podrás crear, actualizar y eliminar tus clientes.</h2>
        </div>
            <h2 className='text-md text-center p-4'>{!loading ? 'Listado de clientes': 'No tienes clientes en tu lista'}</h2>
            <div className='flex justify-between items-center mx-auto w-4/5'>
                <input
                    type="text"
                    className='border-2 border-gray-400 w-1/3 focus:outline-none'
                    placeholder='Ingresa el nombre del cliente'
                />
                <button
                    type='submit'
                    className='bg-blue-500 p-2 rounded-md text-white hover:bg-blue-700'
                    onClick={()=>(setOpen(!open))}
                >
                    Crear Cliente
                </button>
            </div>
            
            <Table
                data={data}
                loading={loading}
            />
            <Modal/>
    </>
  )
}

export default Information