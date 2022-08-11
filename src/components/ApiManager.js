
//CustomerList.js
export const getAllCustomers = () => {
    return fetch(`http://localhost:8088/users?isStaff=false&_embed=customers`)
    .then(response => response.json())
    
}

//Register.js
export const PostNewUser = (customer) => {
return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(res => res.json())
        }

//Register.js
export const RegisterUser =  (customer)=> {     
return fetch(`http://localhost:8088/users?email=${customer.email}`)
            .then(res => res.json())
 }

 //CustomerDetails.js
export const customerDetailsUpdate = (customerId) => {
return fetch (`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
    .then(response => response.json())
}

//EmployeeDetails.js
export const employeeDetailsUpdate = (employeeId) => {
return fetch (`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
    .then(response => response.json())
}
//EmployeeList.js
export const getAllEmployees = () => {
return fetch(`http://localhost:8088/users?isStaff=true`)
    .then(response => response.json())
}
//CustomerForm.js
export const getCustomerProfile = (honeyUserObject) => {
return fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
    .then(response => response.json())
}

//CustomerForm.js
export const putCustomerProfile = (profile) => {
return fetch(`http://localhost:8088/customers/${profile.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    })
    .then(response => response.json())
}
//EmployeeForm.js
export const getEmployeeProfile = (honeyUserObject) => {
return fetch(`http://localhost:8088/employees?userId=${honeyUserObject.id}`)
    .then(response => response.json())
}
//EmployeeForm.js
export const putEmployeeProfile = (profile) => {
return fetch(`http://localhost:8088/employees/${profile.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    })
    .then(response => response.json())
}
//Tickets.js delete button
export const  TicketDelete = (ticketObject) => {
return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`,{
        method: "DELETE"
    })
    .then(response => response.json())
}
//Tickets.js close ticket
export const TicketClose = (ticketObject, copy) => {
return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(copy)
    })
    .then(response=> response.json())
}
//Tickets.js claim ticket
export const TicketClaim = (ticketObject, userEmployee) => {
return fetch(`http://localhost:8088/employeeTickets`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            employeeId: userEmployee.id,
            serviceTicketId: ticketObject.id
        })
   }) 
   .then(response=> response.json())
}
//TicketForm.js post a new ticket to API
export const postNewTicket = (ticketToSendToAPI) => {
return fetch(`http://localhost:8088/serviceTickets`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ticketToSendToAPI)
    } )
        .then(response => response.json())
}
//TicketList.js get all service tickets
export const getAllServiceTickets = () => {
return fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
    .then (response => response.json())
}
//TicketList.js get employees with user expanded
export const getEmployeesWithUsers = () => {
return fetch(`http://localhost:8088/employees?_expand=user`)
.then (response => response.json())
}