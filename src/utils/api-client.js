import axios from 'axios'
import * as AuthUtils from './auth'

const apiURL = process.env.REACT_APP_API_URL


async function client(
    endpoint,
    {data, token, headers: customHeaders, ...customConfig} = {}
) {
    const config = {
        method: data ? 'POST' : 'GET',
        baseURL: apiURL,
        url: endpoint,
        body: data ? JSON.stringify(data) : undefined,
        headers: {
            'x-auth-token': token,
            'Content-Type': data ? 'application/json' : undefined,
            ...customHeaders,
        },
        ...customConfig,
    }


    return axios({
        ...config
    }).then(
        async res => {
            if(res.status === 401) {
                await AuthUtils.logout()
                window.location.assign(window.location)
                return Promise.reject({message: 'Please re-authenticate.'})
            }

            const data = res.data

            if(res.status === 200) {
                return data
            }else {
                return Promise.reject(data)
            }

        }
    )
}

// async function client(
//   endpoint,
//   {data, token, headers: customHeaders, ...customConfig} = {},
// ) {
//   const config = {
//     method: data ? 'POST' : 'GET',
//     body: data ? JSON.stringify(data) : undefined,
//     headers: {
//       Authorization: token ? `Bearer ${token}` : undefined,
//       'Content-Type': data ? 'application/json' : undefined,
//       ...customHeaders,
//     },
//     ...customConfig,
//   }

//   return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
//     if (response.status === 401) {
//       queryCache.clear()
//       await auth.logout()
//       // refresh the page for them
//       window.location.assign(window.location)
//       return Promise.reject({message: 'Please re-authenticate.'})
//     }
//     const data = await response.json()
//     if (response.ok) {
//       return data
//     } else {
//       return Promise.reject(data)
//     }
//   })
// }

export {client}