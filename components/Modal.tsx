import React from 'react'
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { useMutation, gql } from '@apollo/client';

const CREATE_CLIENTE = gql`
    mutation crearUsuario($input:createUsuarioInput!){
        crearUsuario(data:$input){
        id,
        name,
        apellido,
        edad,
        telefono
        }
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

const Modal = () => {
    const {open,setOpen,formValues, setFormValues} = useContext(DataContext)
    const[crearUsuario,{loading,error}]= useMutation(CREATE_CLIENTE,{
        refetchQueries:[{
            query:OBTENER_USUARIOS
        }]
    })
   const prueba = async (e:any)=>{
    e.preventDefault();
    await crearUsuario({
        variables:{
            input:formValues
        }
    })
    if(!loading){
       setOpen(false)
    }
   }
  return (
    <div>
{open===true ?(<div className="fixed z-10 inset-0 overflow-y-auto">
  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
   
    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
      <div className="absolute inset-0 bg-gray-500 opacity-25"></div>
    </div>

    
    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <button onClick={()=>{setOpen(!open), setFormValues({})}}className='bg-red-500 text-white rounded-md p-1 ml-auto mr-2 mt-1 block'>x</button>
        <form onSubmit={(e)=>prueba(e)}className='mx-auto w-5/6'>
            
            <h1 className='text-center text-indigo-800 font-bold text-lg p-4'>
                {Object.entries(formValues).length>0 ?'Editar Cliente': 'Crear cliente '}  
            </h1>    
            <div className='mb-2 flex flex-col'>
                <label className=''>Ingresa el Nombre del cliente</label>
                <input
                    type="text"
                    value={(Object.entries(formValues).length>0 && formValues.hasOwnProperty('name')) ? formValues?.name : ''}
                    className='border-blue-700 focus:outline-none border-2'
                    onChange={(e)=>setFormValues({...formValues, name:e.target.value})}
                />
            </div>
            <div className='mb-2 flex flex-col'>
                <label>Ingresa el apellido</label>
                <input
                    type="text"
                    value={(Object.entries(formValues).length>0 && formValues.hasOwnProperty('apellido')) ? formValues?.apellido : ''}
                    className='border-blue-700 focus:outline-none border-2'
                    onChange={(e)=>setFormValues({...formValues, apellido:e.target.value})}
                />
            </div>
            <div className=' mb-2 flex flex-col'>
                <label>Ingresa la edad</label>
                <input
                    type="number"
                    value={(Object.entries(formValues).length>0 && formValues.hasOwnProperty('edad')) ? formValues?.edad : ''}
                    className='border-blue-700 focus:outline-none border-2'
                    onChange={(e)=>setFormValues({...formValues, edad:Number(e.target.value)})}
                />
            </div>
            <div className=' mb-2 flex flex-col'>
                <label>Ingresa el correo electronico</label>
                <input
                    type="text"
                    value={(Object.entries(formValues).length>0 && formValues.hasOwnProperty('correo')) ? formValues?.correo : ''}
                    className='border-blue-700 focus:outline-none border-2'
                    onChange={(e)=>setFormValues({...formValues, correo:e.target.value})}
                />
            </div>
            <div className='mb-2 flex flex-col'>
                <label>Ingresa el Telfono</label>
                <input
                    type="text"
                    value={(Object.entries(formValues).length>0 && formValues.hasOwnProperty('telefono')) ? formValues?.telefono : ''}
                    className='border-blue-700 focus:outline-none border-2'
                    onChange={(e)=>setFormValues({...formValues, telefono:e.target.value})}
                />
            </div>
            <button
                type='submit'
                className='bg-blue-500 w-full hover:bg-blue-800 p-2 text-md mb-6 mt-4 text-white rounded-md'
            >
                Guardar
            </button>
            
        </form>
    </div>
  </div>
</div>):''}
</div>
  )
}

export default Modal