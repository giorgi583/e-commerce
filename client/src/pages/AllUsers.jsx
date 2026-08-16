import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
const AllUsers = () => {
    const [userInfos, setUserInfos] = React.useState([])
    const [users, setUsers] = React.useState([])
    const { user, loading } = useSelector(state => state.user)
    const [search, setSearch] = React.useState('')
    const apiURL = import.meta.env.VITE_API_URL
    const getUsers = async () => {
        const token = localStorage.getItem('token')
        if(!token) return
        try {
            const response = await fetch(`${apiURL}/auth/user-info`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await response.json();
            setUserInfos(result.AlluserInfo);
            setUsers(result.Allusers);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUsers();
    }, [])
    if(!user && !loading) return <Navigate to='*'/>
  return (
    <>
    <Header/>
    <div className='max-w-7xl mx-auto py-15 px-10 max-sm:px-5'>
        <h1 className='text-2xl font-bold text-[var(--accent)] mb-10'>All Users</h1>
        <div>
            <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder='Search by username' className='border border-gray-300 p-3 px-5 mb-10 max-sm:p-1 rounded-full  focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all duration-200'></input>
            <div className='overflow-x-auto'>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                username
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Full Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Contact Number
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Address
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {userInfos && userInfos.filter((user) => users.find(u => u.id === user.userId).username.includes(search)).filter((user) => users.find(u => u.id === user.userId).role === 'customer').map((user, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.userId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{users.find(u => u.id === user.userId)?.username}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{users.find(u => u.id === user.userId)?.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.firstName} {user.lastName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.contactNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.address || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default AllUsers