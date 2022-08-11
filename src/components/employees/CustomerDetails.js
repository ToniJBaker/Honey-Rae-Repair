import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { customerDetailsUpdate } from "../ApiManager";


export const CustomerDetails = () => {
    const {customerId} = useParams()
    const [customer, updateCustomer] = useState({})

    useEffect(
        ()=> {
            customerDetailsUpdate(customerId) //fetch call
            .then((data)=> {
                const singleCustomer =data[0]
                updateCustomer(singleCustomer)
            })
        },
        [customerId]
    )

    return <section className="customer" >
    
        <header className="customer_header">{customer?.user?.fullName}</header>
        <div>Email:{customer?.user?.email}</div>
        <div>Phone:{customer.phoneNumber}</div>
        <div>Address:{customer.address}</div>
        </section>



}