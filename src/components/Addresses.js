import React, { useContext, useReducer, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import useRequest from '../hooks/useRequest'

const Addresses = () => {
    const { 
        addresses, 
        setAddresses, 
        coordResults,
        fetchCoords,
        fetchBatchCoords,
        addAddress, 
        removeAddress 
    } = useContext(GlobalContext)

    const fetchAddresses = () => {

    }

    const handleAddressChange = (e, index) => {
        let { value } = e.target
        setAddresses(prevAddresses => ([
            ...prevAddresses.map((address, i) => {
                // debugger;
                return i === index
                    ? value
                    : address
            })
        ]))
    }

    const geocode = () => {
        if (addresses.length > 1) {
            // setUrl(`${baseUrl}?api_key=${process.env.REACT_APP_GEOCODIO_API_KEY}`)
            // setOptions({ method: 'POST', body: JSON.stringify(addresses) })
            fetchBatchCoords()
        } else {
            // let [address] = addresses
            // setUrl(`${baseUrl}?q=${address}&api_key=${process.env.REACT_APP_GEOCODIO_API_KEY}`)
            // setOptions(baseOptions)
            fetchCoords()
        }
    }

    let addAddressButton = addresses.length < 5 && (
        <button className='success' onClick={() => addAddress()}>+ Add Address</button>
    )

    let addressInputs = addresses && 
        addresses.length > 0 && 
        addresses.map((address, i) => (
        <div className={`field${addresses.length === 1 ? ' only' : ''}`} key={i}>
            <input type='text' value={address} onChange={(e) => handleAddressChange(e, i)} />
            {addresses.length > 1 && <button className='danger close' onClick={() => removeAddress(i)}>X</button>}
        </div>
        ))

    let geocodeButton = (
        <button 
            className='primary' 
            onClick={() => geocode()}
            disabled={addresses.every(a => a === '')}
        >
            Geocode
        </button>
    )
    return (
        <>
            {addAddressButton}
            <div className='fields'>
                {addressInputs}
            </div>
            {geocodeButton}
        </>
    )
}

export default Addresses