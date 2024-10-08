import { useState } from "react"
import { FaSearch, FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
import { User } from "../types/types"
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

interface PropsType{
    user: User | null;
}

const Header = ({user}: PropsType) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const LogOutHandler = async ()=>{
        try{
            await signOut(auth)
            toast.success("Signed Out Successfully")
            setIsOpen(false)
        } catch (error) {
            toast.error("Sign Out Failed")
        }
    }

    return (
        <nav className="header">
            <Link onClick={()=>setIsOpen(false)} to={"/"}>Home</Link>
            <Link onClick={()=>setIsOpen(false)} to={"/search"}> <FaSearch /> </Link>
            <Link onClick={()=>setIsOpen(false)} to={"/cart"}> <FaShoppingCart /> </Link>

            {user?._id ? (
                <>
                    <button onClick={()=>setIsOpen(prev => !prev)}>
                        <FaUser />
                    </button>
                    <dialog open={isOpen}>
                        <div>
                            {user.role === 'admin' && (
                                <Link onClick={()=>setIsOpen(false)} to='/admin/dashboard'>Admin</Link>
                            )}
                            <Link onClick={()=>setIsOpen(false)} to='/orders'>Orders</Link>
                            <button onClick={LogOutHandler}><FaSignOutAlt/></button>
                        </div>
                    </dialog>
                </>
            ) : (
                <Link to={"/login"}> <FaSignInAlt /> </Link>
            )}
        </nav>
    )
}

export default Header