/* eslint-disable react/prop-types */
import { useState, createContext} from 'react'
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero} from '../helpers'

const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(0)
    const [cargando, setCargando] = useState(false)

    const handleChangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }
    
    const cotizarSeguro = () => {
        //una base
        let resultado = 2000
        //obtener diferencia de años
        const diferencia = obtenerDiferenciaYear(datos.year)        
        //hay que restar el 3% x c/año        
        resultado -= ((diferencia * 3) * resultado ) / 100        
        //americano 15%
        //europeo 30%
        //asiatico 5%
        resultado *= calcularMarca(datos.marca)
        //basico 20%
        //completo 50%
        resultado *= calcularPlan(datos.plan)
        //Formatear dinero        
        resultado = formatearDinero(resultado)

        setCargando(true)
        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 3000);
        
    }

    return(
        <CotizadorContext.Provider
            value={{
                datos,
                handleChangeDatos,
                error,
                setError,
                cotizarSeguro,
                resultado,
                cargando
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