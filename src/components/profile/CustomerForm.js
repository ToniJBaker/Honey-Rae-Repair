import { useEffect, useState } from "react"
import { getCustomerProfile, putCustomerProfile } from "../ApiManager"



export const CustomerForm = () => {
    // TODO: Provide initial state for profile
    const [profile, updateProfile] = useState({
        address: "",
        phoneNumber:""
    })
    
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser) 

    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])
   
   
   
    // TODO: Get customer profile info from API and update state
    useEffect( () => {
        getCustomerProfile(honeyUserObject) //fetch call
        .then((data)=> {
            const customerObject = data[0]
            updateProfile(customerObject)
        })
    },
    []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
            return putCustomerProfile(profile)
            .then(() => {
                setFeedback("Customer profile successfully saved")
            })
    }

    return (<>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <form className="profile">
            <h2 className="profile__title">Customer Profile Update</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        defaultValue={profile.address}
                        onChange={
                            (evt) => {
                                // TODO: Update address property
                                const copy = {...profile}
                                copy.address = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number:</label>
                    <input type="text"
                        className="form-control"
                        defaultValue={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                // TODO: Update phoneNumber property
                                const copy = {...profile}
                                copy.phoneNumber = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
    </>)
}