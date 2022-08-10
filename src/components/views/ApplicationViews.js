import {CustomerViews} from "../views/CustomerViews"
import {EmployeeViews} from "../views/EmployeeViews"

export const ApplicationViews = () => {
	
        
        const localHoneyUser = localStorage.getItem("honey_user")
        const honeyUserObject = JSON.parse(localHoneyUser)  
        
        if (honeyUserObject.staff) {
            //Return employee views
            return <EmployeeViews/>
        }
        else {
            //Return customer views
            return <CustomerViews/>
        }
        
}