import { useEffect, useState } from "react"
import "./Employees.css"
import {Employee} from "../employees/Employee"
import { getAllEmployees } from "../ApiManager"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect (
        ()=> {
            getAllEmployees() //fetch call
            .then((employeeArray) => {
                setEmployees(employeeArray)
            })
        },
        []
    )
        return <article className="employees">
        {
            employees.map(employee => <Employee key={`employee--${employee.id}`}
                 id={employee.id} 
                 fullName={employee.fullName} 
                 email={employee.email}/>)
        }
        
        </article>
}