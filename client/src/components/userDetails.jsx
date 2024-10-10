import { useUserContext } from "../context/user"
import Wrapper from "./wrapper"

const UserDetails = ()=>{

    const {user} = useUserContext()

    return(
        <div className="flex-1">
            <Wrapper header={`User Details`}>
                <article className={`flex w-full h-full bg-blue p-5 flex-col justify-evenly rounded-b-xl`}>
                    <p>
                        <span className='inline-block w-52'>
                            User Id:
                        </span>
                        <span>
                            {user&&user.userId?user.userId:'-'}
                        </span>
                    </p>
                    <p>
                        <span className='inline-block w-52'>
                            First Name:
                        </span>
                        <span>
                            {user&&user.fname?user.fname:'-'}
                        </span>
                    </p>
                    <p>
                        <span className='inline-block w-52'>
                            Last Name:
                        </span>
                        <span>
                            {user&&user.lname?user.lname:'-'}
                        </span>
                    </p>
                    <p>
                        <span className='inline-block w-52'>
                            Mobile:
                        </span>
                        <span>
                            {user&&user.mobile?user.mobile:'-'}
                        </span>
                    </p>
                </article>
            </Wrapper>
        </div>
    )
}

export default UserDetails