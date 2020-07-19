import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'

const Addresses = () => {
    const { addresses, setAddresses, addAddress, removeAddress } = useContext(GlobalContext)

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

    let addAddressButton = addresses.length < 5 && (
        <button className='success' onClick={() => addAddress()}>+ Add Address</button>
    )

    let addressInputs = addresses && 
        addresses.length > 0 && 
        addresses.map((address, i) => (
        <div className='field' key={i}>
            <input type='text' value={address} onChange={(e) => handleAddressChange(e, i)} />
            {addresses.length > 1 && <button className='danger close' onClick={() => removeAddress(i)}>X</button>}
        </div>
        ))

    let geocodeButton = <button className='primary'>Geocode</button>
    return (
        <>
            {addAddressButton}
            <div>Add addresses below</div>
            {addressInputs}
            {geocodeButton}
        </>
    )
}

export default Addresses