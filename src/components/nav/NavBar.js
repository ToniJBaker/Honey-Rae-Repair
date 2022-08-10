
import {CustomerNav} from "../nav/CustomerNav"
import {EmployeeNav} from "../nav/EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {
    
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)  
        
        if (honeyUserObject.staff) {
            //Return employee views
            return <EmployeeNav/>
        }
        else {
            //Return customer views
            return <CustomerNav/>
        }
}

