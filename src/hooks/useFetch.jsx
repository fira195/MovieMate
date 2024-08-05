import { useState } from "react"

const [loading, setLoading]=useState(false)
const fetch=(link, option, setTo)=>{
    setLoading(true)
    fetch(link, option)

    .then(res=>res.json())
    .then(res=>setTo(res))
    .catch(e=>console.log(e))

    setLoading(false)
}
export {loading,}