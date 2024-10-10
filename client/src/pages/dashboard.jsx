import Appointment from "../components/appointment"
import ChartComponent from "../components/chartComponent"
import UserDetails from "../components/userDetails"

const DashBoard = ()=>{
    return(
        <div className="flex flex-wrap gap-4 p-5 justify-center">
            <ChartComponent/>
            <Appointment/>
            <UserDetails/>
        </div>
    )
}

export default DashBoard