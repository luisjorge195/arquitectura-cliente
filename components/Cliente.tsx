import React from 'react';
import {gql, useMutation, useLazyQuery} from '@apollo/client';
import { useContext } from 'react';
import { DataContext, DataProvider } from '../context/DataContext';
import Modal from './Modal';
interface Client{
    id:string,
    correo:string,
    name:String,
    apellido:String,
    edad:number,
    telefono:string
}
interface clienteProps{
    item:Client
}
const DELETE_CLIENT = gql`
  mutation deleteUsuario($id:ID!){
    deleteUsuario(data:$id)
  }
`
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
const OBTENER_UN_CLIENTE = gql`
  query obtenerOneUsuario($data: ID!){
    obtenerOneUsuario(data: $data) {
      name
      apellido
      telefono
      correo
      edad
    }
  }
`
const Cliente:React.FC<clienteProps> = ({item}) => {
  const {setFormValues,open,setOpen} = useContext(DataContext)
    const [deleteUsuario] = useMutation(DELETE_CLIENT,{
        refetchQueries:[{query:OBTENER_USUARIOS}]

    });
    const [obtenerOneUsuario] =useLazyQuery(OBTENER_UN_CLIENTE)
    const deleteClient = async()=>{
        await deleteUsuario({
            variables:{
                id: item.id
            }
        })
    }
    const editionClient = async()=>{
      setOpen(!open)
      const getOneUser = await obtenerOneUsuario({
        variables:{
          data:item.id
        }
      })
      setFormValues(getOneUser.data.obtenerOneUsuario)
     
    }
  return (
      <tr key={item?.id}>
        <td>{item.name}</td>
        <td>{item?.apellido}</td>
        <td>{item?.telefono}</td>
        <td>{item?.correo}</td>
        <td>{item?.edad}</td>
        <td>
          <div className='flex justify-center gap-3'>
            <button
              type='submit'
              onClick={()=>editionClient()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </button>
            <button
              type='submit'
              onClick={()=>deleteClient()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
        </td> 
    </tr>
   
  )
}

export default Cliente