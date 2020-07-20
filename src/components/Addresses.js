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
        if (addresses.length > 1) fetchBatchCoords()
        else fetchCoords()
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

    let results = coordResults.results && 
        coordResults.results.map((result, i) => (
            <div key={i}>
                <div className='section'>
                    <div><strong>Address</strong></div>
                    <div>
                        {`${result.address_components.number} 
                        ${result.address_components.formatted_street}`}                                        
                    </div>
                    <div>
                        {`${result.address_components.city},
                        ${result.address_components.state}
                        ${result.address_components.zip}`}
                    </div>
                </div>
                <div className='section'>
                    {`${result.address_components.county},
                    ${result.address_components.country}`}
                </div>
                <div className='section'>
                    <div><strong>Coordinates</strong></div>
                    <div>{`Latitude: ${result.location.lat}`}</div>
                    <div>{`Longitude: ${result.location.lng}`}</div>
                </div>
            </div>
        ))

    return (
        <>
            {addAddressButton}
            <div className='fields'>
                {addressInputs}
            </div>
            {geocodeButton}
            {results}
        </>
    )
}

export default Addresses