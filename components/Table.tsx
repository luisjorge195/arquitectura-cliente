import React from 'react'
import Cliente from './Cliente';
import Modal from './Modal';


interface Usuario{
  id: string;
  name: string;
  apellido: string;
  telefono: string;
  edad: number;
  correo: string;
}
interface tableProps {
  data: {
    obtenerUsuario:Usuario[]
  },
  loading: Boolean
}
const Table: React.FC<tableProps> = ({data, loading}) => {
  return (
    <div>
        <table className='table mx-auto w-4/5  text-md'>
            <thead className='bg-blue-500'>
                <tr>
                    <th className='border-solid border-2 border-white text-white'>Nombre</th>
                    <th  className='border-solid border-2 border-white text-white'>Apellido</th>
                    <th  className='border-solid border-2 border-white text-white'>Telefono</th>
                    <th  className='border-solid border-2 border-white text-white'>email</th>
                    <th  className='border-solid border-2 border-white text-white'>edad</th>
                    <th className='border-solid border-2 border-white text-white'>Acciones</th>
                </tr>
            </thead>
            <tbody className='text-center'>
              {!loading ? (data?.obtenerUsuario?.map((item)=>(
               <Cliente
                key={item.id}
                item={item}
               />
              ))):''}
            </tbody>
           
        </table>
        
        </div>
  )
}

export default Table