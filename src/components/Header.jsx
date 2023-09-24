import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Context, server } from '../main'
import toast from 'react-hot-toast'

const Header = () => {
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context)
    const logOutHandler = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(
                `${server}/users/logout`, {
                    withCredentials: true
                }
            )
            // toast.success(data.message)
            toast.success("Logged out!")
            setIsAuthenticated(false)
            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.message)
            setIsAuthenticated(true)
            setLoading(false)
        }
    }
    return (
        <nav className="header">
            <div>
                <h2>TODO</h2>
            </div>
            <article>
                <Link to="/">HOME</Link>
                <Link to="/profile">PROFILE</Link>
                {
                    isAuthenticated ? (
                            <button disabled={loading} onClick={logOutHandler} className="btn">LOGOUT</button> 
                        ) : (
                            <Link to="/login">LOGIN</Link>
                        )
                }
            </article>
        </nav>
    )
}

export default Header