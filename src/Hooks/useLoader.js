import React from 'react'

const useLoader = () => {
    const [loading, setLoading] = React.useState(false)

    return [loading, setLoading]
}

export default useLoader