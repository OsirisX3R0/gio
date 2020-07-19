import React, { createContext, useState } from 'react'

export const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
    const [addresses, setAddresses] = useState(['', ''])
    const [coords, setCoords] = useState([''])

    const addAddress = () => {
        setAddresses(prevAddresses => [...prevAddresses, ''])
    }

    const removeAddress = index => {
        setAddresses(prevAddresses => [...prevAddresses.filter((a, i) => i !== index)])
    }

    const addCoords = () => {
        setCoords(prevCoords => [...prevCoords, ''])
    }

    const removeCoords = index => {
        setCoords(prevCoords => [...prevCoords.filter((c, i) => i !== index)])
    }

    return (
        <GlobalContext.Provider value={{
            addresses,
            setAddresses,
            coords,
            setCoords,
            addAddress,
            removeAddress,
            addCoords,
            removeCoords
        }}>
            {children}
        </GlobalContext.Provider>
    )
}