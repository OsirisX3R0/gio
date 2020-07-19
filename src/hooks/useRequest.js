import { useEffect, useState } from 'react'
const useRequest = (url, options, initialState, automatic = true) => {
    const [data, setData] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if(automatic) fetchData()
    }, [])

    const fetchData = () => {
        setLoading(true)
        
        fetch(url, options)
            .then(res => {
                setError(null)
                setSuccess(true)
                setData(res)
            })
            .catch(err => {
                setSuccess(false)
                setError(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return [data, loading, success, error, fetchData]
}

export default useRequest