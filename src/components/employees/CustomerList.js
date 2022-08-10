import { useEffect, useState } from "react"
import "./Employees.css"
import {Customer} from "../employees/Customer"

export const CustomerList = () => {
    const [customersList, setCustomers] = useState([])

    useEffect (
        ()=> {
        fetch(`http://localhost:8088/users?isStaff=false&_embed=customers`)
            .then(response => response.json())
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