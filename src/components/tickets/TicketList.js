import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import "./Tickets.css"
import {Ticket} from "../tickets/Ticket"
import {Link} from "react-router-dom";
import { getAllServiceTickets, getEmployeesWithUsers } from "../ApiManager";


export const TicketList = ({searchTermsState}) => {
    const [tickets, setTickets] = useState([])
    const [employees, setEmployees] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] =useState(false)
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
   

    useEffect(
        ()=> {
            const searchedTickets = tickets.filter(ticket => ticket.description.toUpperCase().startsWith(searchTermsState.toUpperCase()))
            setFiltered(searchedTickets)
        },
        [searchTermsState]
    )

    useEffect(
        () => {
            if(emergency){
                const emergencyTickets = tickets.filter(ticket => ticket.emergency===true)
                setFiltered(emergencyTickets)
            }
            else{
                setFiltered(tickets)
            }
        },
        [emergency]
    )
    
    const getAllTickets = ()=>{
            getAllServiceTickets() //fetch call
            .then((ticketArray) =>{
                setTickets(ticketArray)
            })
    }

    useEffect(
        () => {
            getAllTickets()
            getEmployeesWithUsers() //fetch call
            .then((employeeArray) =>{
                setEmployees(employeeArray)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        ()=> {
            if(honeyUserObject.staff){
                //for employees
                setFiltered(tickets)
            }
            else{
                //for customers
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        
        [tickets]
    )

    useEffect (
        () => {
            if(openOnly) {
            const openTicketArray = tickets.filter(ticket => {
                return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
            })
            setFiltered(openTicketArray)
        } else {
            const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
            setFiltered(myTickets)
        }
        
        },
        [openOnly]
    )
    
    return <>
        {
            honeyUserObject.staff 
            ? <>
            <button onClick={() => {setEmergency(true)}}>Emergency Only</button>
            <button onClick={() => {setEmergency(false)}}>Show All</button>
            </>
            : <>
            <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
            <button onClick={() => updateOpenOnly(true) }>Open Ticket</button>
            <button onClick={() => updateOpenOnly(false) }>All My Tickets</button>
            </>
        }
     
            <h2>List of Tickets</h2>
            <article className="tickets">
                {
                    filteredTickets.map(
                        (ticket) => <Ticket key={ticket.id} 
                        employees={employees} 
                        getAllTickets={getAllTickets}
                        currentUser={honeyUserObject} 
                        ticketObject={ticket} />
                    )
                }
            </article></>
}

