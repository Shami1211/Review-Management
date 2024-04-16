import React from 'react'

export default function Home() {
  return (
    <div>Home

    <div onClick={() => (window.location.href = "/ratedetails")}>
    <h1>View Rates</h1>
     </div>


     <div onClick={() => (window.location.href = "/complaints")}>
    <h1>View Complaints</h1>
     </div>




  </div>
  )
}
