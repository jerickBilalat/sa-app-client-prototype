import React from 'react'
import axios from 'axios'

function useData(initialData, initialURL, payPeriodID = null ) {
  const [ data, setData ] = React.useState(initialData)
  const [ URL, setURL ] = React.useState(initialURL)

  React.useEffect(() => {

  
    function fetchData() {

      if(!URL) return

      axios.get(URL)
      .then( result => setData(result.data))

    }

    fetchData()

  },[URL])

  return [{data}, setURL]
}

export default useData