import React, { createContext, useState } from 'react'

export const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
    const [addresses, setAddresses] = useState([''])
    const [coordResults, setCoordResults] = useState({})
    const [coords, setCoords] = useState([''])
    const [addressResults, setAddressResults] = useState({})

    const fetchCoords = () => {
        let [address] = addresses
        fetch(`https://api.geocod.io/v1.6/geocode?q=${address}&api_key=${process.env.REACT_APP_GEOCODIO_API_KEY}`)
            .then(res => res.json())
            .then(res => setCoordResults(res))
    }

    const fetchBatchCoords = () => {
        fetch(`https://api.geocod.io/v1.6/geocode?api_key=${process.env.REACT_APP_GEOCODIO_API_KEY}`, {
            method: 'POST',
            body: JSON.stringify(addresses)
        })
            .then(res => res.json())
            .then(res => setCoordResults(res))
    }

    const fetchAddresses = () => {
        let [singleCoords] = coords
        fetch(`https://api.geocod.io/v1.6/reverse?q=${singleCoords}&api_key=${process.env.REACT_APP_GEOCODIO_API_KEY}`)
            .then(res => res.json())
            .then(res => setAddressResults(res))
    }

    const fetchBatchAddresses = () => {
        fetch(`https://api.geocod.io/v1.6/reverse?api_key=${process.env.REACT_APP_GEOCODIO_API_KEY}`, {
            method: 'POST',
            body: JSON.stringify(coords)
        })
            .then(res => res.json())
            .then(res => setAddressResults(res))
    }

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
            coordResults,
            addressResults,
            fetchCoords,
            fetchBatchCoords,
            fetchAddresses,
            fetchBatchAddresses,
            addAddress,
            removeAddress,
            addCoords,
            removeCoords
        }}>
            {children}
        </GlobalContext.Provider>
    )
}