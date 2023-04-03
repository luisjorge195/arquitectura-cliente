import { createContext, useState } from "react";

interface DataContextValue{
    formValues:object,
    open:Boolean,
    setFormValues:React.Dispatch<React.SetStateAction<any>>
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
}
export const DataContext = createContext<DataContextValue>({
    formValues:{name:'',edad:0},
    open:false,
    setFormValues: () => {},
    setOpen: ()=>{}
});

interface dataChildren{
    children:any
}
export const DataProvider:React.FC<dataChildren> = ({children})=>{
   const [formValues, setFormValues]= useState({})
   const [open, setOpen] = useState(false)
    return(
        <DataContext.Provider
            value={{
                formValues,
                setFormValues,
                open,
                setOpen
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

