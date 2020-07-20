import { useEffect, useState } from 'react'

const defaultHookOptions = {
    automatic: true,
    json: true
}

const useRequest = (requestUrl, requestOptions, initialState, hookOptions = defaultHookOptions) => {
    const [url, setUrl] = useState(requestUrl)
    const [options, setOptions] = useState(requestOptions)
    const [data, setData] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if(hookOptions.automatic) fetchData()
    }, [])

    const fetchData = () => {
        setLoading(true)
        
        fetch(url, options)
            .then(res => {
                if(hookOptions.json) return res.json()

                return res
            })
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

    return {data, loading, error, success, fetchData, setUrl, setOptions}
}

export default useRequest