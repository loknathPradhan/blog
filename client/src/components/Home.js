import axios from 'axios'
import React, { useEffect } from 'react'
import { AuthConsumer } from './AuthProvider'

export default function Home() {

    const value = AuthConsumer();
    // console.log(value.user,value.accesstoken)

    useEffect(()=> {
        console.log("insid use effect")
        
        const fetchData = async()=> {
            // console.log(value.user)

            const config = {
                header: {
                    "content-type": "application/json",
                },
            };
          await  axios.get(`http://localhost:8000/api/posts/${value.user}`,config).then((res)=> {
            console.log(res)
        }).catch(console.error)
        }

        fetchData();
    },[value.user]);
  return (
    <div>
      hello home
    </div>
  )
}
