import {EmployeeForm} from "../profile/EmployeeForm"
import { CustomerForm } from "../profile/CustomerForm"

export const Profile = () => {
    
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)  
        
        if (honeyUserObject.staff) {
           
            return <EmployeeForm/>
        }
        else {
            
            return <CustomerForm/>
        }
}