import { Link } from "react-router-dom"
import { TicketClaim, TicketClose, TicketDelete } from "../ApiManager"

export const Ticket = ({ticketObject, currentUser, employees, getAllTickets}) => {
    
   //find the assigned employee for the current ticket
    let assignedEmployee = null
    
    if(ticketObject.employeeTickets?.length > 0) {
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }
    //find the employee profile object for the current user
    const userEmployee = employees.find(employee => employee.userId === currentUser.id)
    
    
    //function for employee to delete thier own ticket
    const deleteButton =()=> {
        if(!currentUser.staff ){
            return <button onClick={()=>{
                TicketDelete(ticketObject) //fetch call
                .then(() => {
                    getAllTickets()

                })
            }} className="ticket__delete">Delete</button>
        }
        else{
            return ""
        }
    }
    
    
    //function that determines if the current user can close the ticket
    const canClose =()=> {
        if(currentUser.staff && userEmployee?.id === assignedEmployee?.id && ticketObject.dateCompleted === ""){
            return <button onClick={closeTicket} className="ticket__finished">Complete Ticket</button>
        }
        else{
            return ""
        }
    }
    //functon that updates the ticket with a new date completed
    const closeTicket = ()=> {
        const copy ={
            userId: ticketObject.id,
            description: ticketObject.description,
            emergency: ticketObject.emergency,
            dateCompleted: new Date()
        }
        return TicketClose(ticketObject, copy)//fetch call 
        .then(getAllTickets)
    }


    const claimTicket = ()=> {
        if(currentUser.staff){
            return <button  //button will modify the API state and then display the modified ticket
            onClick = {()=> {
                TicketClaim(ticketObject, userEmployee)
               .then(()=>{
                  //Get the state from the API again  
                  getAllTickets()
               })
            }} 
            
            >Claim</button> 
        } 
        else {
            return ""
        }
    }
     
    return <section className="ticket" key={`ticket--${ticketObject.id}`}>
        <header className="ticket__header">
            {
                currentUser.staff//becuase user is staff ...what should be displayed in the header
                    ?`Ticket ${ticketObject.id}`
                    :<Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link> //not staff so a link for modifying a ticket by the customer only
            }
        </header>
        <section>{ticketObject.description}</section>
        <section> Emergency: {ticketObject.emergency ? "Yes" : "No" }</section>
        <br></br>
        <footer className="ticket__footer">
            {
                currentUser.staff && ticketObject.employeeTickets?.length
                    ?`Currently Assigned to ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : "" }`
                    
                    : claimTicket()
            } 
            {
                      canClose()
            }
            {
                      deleteButton()
            }

        </footer>

    </section>
}