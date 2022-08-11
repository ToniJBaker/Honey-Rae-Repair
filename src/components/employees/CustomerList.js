import { useEffect, useState } from "react"
import "./Employees.css"
import {Customer} from "../employees/Customer"
import { getAllCustomers } from "../ApiManager"

export const CustomerList = () => {
    const [customersList, setCustomers] = useState([])

    useEffect (
        ()=> {
            getAllCustomers()
            .then((customerArray) => {
                setCustomers(customerArray)
            })
        },
        []
    )
        return <article className="customers">
        {
            customersList.map(customer => <Customer key={`customer--${customer.id}`}
                 id={customer.id} 
                 fullName={customer.fullName} 
                 email={customer.email}/>)
        }
        
        </article>
}