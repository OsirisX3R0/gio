import { useState } from "react"

const useCopy = () => {
    const [copied, setCopied] = useState(false)

    const copy = () => {
        setCopied(true)
    }

    return [copied, copy]
}

export default useCopy