/* eslint-disable react/prop-types */
import { useState, createContext} from 'react'

const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const [error, setError] = useState('')

    const handleChangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }
    
    const cotizarSeguro = () => {
        //una base

        //obtener diferencia de años

        //hay que restar el 3% x c/año

        //americano 15%
        //europeo 30%
        //asiatico 5%

        //basico 20%
        //completo 50%
    }

    return(
        <CotizadorContext.Provider
            value={{
                datos,
                handleChangeDatos,
                error,
                setError,
                cotizarSeguro
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}
export default CotizadorContext