import {  ChevronRight, Home, Pen, Save, User2, XIcon } from 'lucide-react'
import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { logout } from '../slices/userSlice'
import {Navigate, useNavigate, NavLink} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import MyOrders from '../components/MyOrders'
const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL
  const [userInfo, setUserInfo] = React.useState({})
  const [editedUserInfo, setEditedUserInfo] = React.useState({})
  const [currentPassword, setCurrentPassword] = React.useState('')
  const [changePasswordOpen, setChangePasswordOpen] = React.useState(false)
  const [newPassword, setNewPassword] = React.useState('')
  const {user, loading} = useSelector(state => state.user)
  const [editPanelOpen, setEditPanelOpen] = React.useState(false)
  const getMyInfo = async () => {
    const token = localStorage.getItem('token') 
    if(!token) return
    try {
    const response = await fetch(apiUrl + '/auth/me/user-info', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    if(!response.ok) {
      throw new Error(data.message)
      if (response.status === 401) {
        localStorage.removeItem("token");
        dispatch(logout())
        navigate('/login')
      }
    }
    const data = await response.json()
    setUserInfo(data.myuserInfo)
    console.log(data)
    }
    catch (error) {
      console.log(error)
    }
  }
  const handleSave = async () => {
    const token = localStorage.getItem('token') 
    if(!token) return
    try {
    const response = await fetch(apiUrl + '/auth/me/user-info', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(editedUserInfo)
    })
    const data = await response.json()
    if(!response.ok) {
      throw new Error(data.message)
      if (response.status === 401) {
        localStorage.removeItem("token");
        toast.error('unauthorized')
        dispatch(logout())
        navigate('/login')
      }
    }
    setUserInfo(data.updateduserInfo)
    toast.success(data.message)
    console.log(data)
    }
    catch (error) {
      toast.error(error.message)
    }
  }
  const deleteAccount = async () => {
    const confirm = window.confirm('Are you sure you want to delete your account?')
    if(!confirm) return
    const token = localStorage.getItem('token') 
    if(!token) return
    try {
    const response = await fetch(apiUrl + '/auth/me/delete-account', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json()
    if(!response.ok) {
      throw new Error(data.message)
      if (response.status === 401) {
        localStorage.removeItem("token");
        toast.error('unauthorized')
        dispatch(logout())
        navigate('/login')
      }
    }
    toast.success(data.message)
    dispatch(logout())
    navigate('/login')
    console.log(data)
    }
    catch (error) {
      toast.error(error.message)
    }
  }
  const changePassword = async () => {
    const confirm = window.confirm('Are you sure you want to change your password?')
    if(!confirm) return
    const token = localStorage.getItem('token') 
    if(!token) return
    try {
    const response = await fetch(apiUrl + '/auth/me/change-password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({currentPassword, newPassword})
    })
    const data = await response.json()
    if(!response.ok) {
      throw new Error(data.message)
    }
    toast.success(data.message)
    console.log(data)
    }
    catch (error) {
      toast.error('invalid credentials')
    }
  }
  useEffect(() => {
    getMyInfo()
  }, [])
console.log(userInfo, editedUserInfo)
if(!user && !loading) return <Navigate to='/login'/>
if(loading) return <Loader />
  return (
    <>
    <Header />
    <div className='max-w-7xl mx-auto py-15 overflow-x-hidden relative'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold text-[var(--accent)] mb-10'>{user?.username || 'User'}'s Profile</h1>
          <button onClick={deleteAccount} className='text-red-500 bg-white border border-red-500 px-3 py-1 cursor-pointer hover:bg-red-500 hover:text-white'>Delete Account</button>
        </div>
      <div className='flex items-center gap-2 mb-5 p-2 px-3 rounded-full bg-gray-200 text-gray-600 font-semibold max-w-fit'>
        <NavLink to='/' className='flex items-center gap-2 hover:text-[var(--accent)]'> <Home size={20} /> Home</NavLink>
        <span><ChevronRight size={20} /></span>
        <span className='text-[var(--accent)] flex items-center gap-2'><User2 size={20} /> Profile</span>
      </div>
        <div className='flex items-center flex-col p-5 rounded-4xl bg-amber-50 border border-amber-100 relative'> 
          <button onClick={() => {setEditPanelOpen(!editPanelOpen); setEditedUserInfo({...userInfo})}} className='absolute top-5 right-5 cursor-pointer '><Pen className='inline mr-2 size-5'/> Edit</button>
          <div className='flex items-center justify-between gap-5'>
          <div className='flex items-center w-30 h-30 rounded-full bg-amber-100 justify-center'><User2 className='size-15'/></div><div className='mt-5'><h2 className='text-3xl font-bold text-[var(--secondary)]'>Profile information</h2></div></div>
          <div className='mt-10 grid grid-cols-3 gap-5'>
            <div className='text-[var(--secondary)] rounded-xl p-2 hover:bg-amber-300/10 cursor-pointer '><p className='text-xl font-semibold'>First Name: <p className='text-lg text-black'>{userInfo?.firstName}</p></p></div>
            <div className='text-[var(--secondary)] rounded-xl p-2 hover:bg-amber-300/10 cursor-pointer '><p className='text-xl font-semibold'>Last Name: <p className='text-lg text-black'>{userInfo?.lastName}</p></p></div>
            <div className='text-[var(--secondary)] rounded-xl p-2 hover:bg-amber-300/10 cursor-pointer '><p className='text-xl font-semibold'>Username: <p className='text-lg text-black'>{user?.username}</p></p></div>
            <div className='text-[var(--secondary)] rounded-xl p-2 hover:bg-amber-300/10 cursor-pointer '><p className='text-xl font-semibold'>Email: <p className='text-lg text-black'>{user?.email}</p></p></div>
            <div className='text-[var(--secondary)] rounded-xl p-2 hover:bg-amber-300/10 cursor-pointer '><p className='text-xl font-semibold'>Phone: <p className='text-lg text-black'>{userInfo?.contactNumber}</p></p></div>
            <div className='text-[var(--secondary)] rounded-xl p-2 hover:bg-amber-300/10 cursor-pointer row-span-2'><p className='text-xl font-semibold'>Bio: <p className='text-lg text-black'>{userInfo?.bio || 'N/A'}</p></p></div>
            <div className='text-[var(--secondary)] rounded-xl p-2 hover:bg-amber-300/10 cursor-pointer '><p className='text-xl font-semibold'>Address:<p className='text-lg text-black'> {userInfo?.address || 'N/A'}</p></p></div>
            <div className='text-[var(--secondary)] rounded-xl p-2 hover:bg-amber-300/10 cursor-pointer '><p className='text-xl font-semibold'>Gender: <p className='text-lg text-black'>{userInfo?.gender || 'N/A'}</p></p></div>
          </div>
        </div>
        {editPanelOpen && <div className='flex items-center mt-10 flex-col p-5 rounded-4xl bg-amber-50 border border-amber-100 relative'>
          <button onClick={() => {handleSave(); setEditPanelOpen(!editPanelOpen)}} className='absolute top-5 right-25 cursor-pointer flex items-center gap-2'><Save /> Save</button>
          <button className='absolute top-5 right-5 cursor-pointer' onClick={() => {setEditPanelOpen(!editPanelOpen)}}><XIcon  size={20}/></button>
          <button onClick={() => {setChangePasswordOpen(!changePasswordOpen)}} className='absolute top-5 left-5 cursor-pointer flex items-center gap-2'>Change password</button>
          <h2 className='text-3xl font-bold text-[var(--accent)] mb-10'>Edit Panel</h2>
          <div className='grid grid-cols-2 gap-5'>
          <div>
            <label htmlFor="">First Name</label>
            <input required type="text" value={editedUserInfo?.firstName || ''} onChange={(e)=> setEditedUserInfo({...editedUserInfo, firstName: e.target.value})} placeholder='First Name' className='border border-gray-200 p-2 w-full' />
          </div>
          <div>
            <label htmlFor="">Last Name</label>
            <input required type="text" value={editedUserInfo?.lastName || ''} onChange={(e)=> setEditedUserInfo({...editedUserInfo, lastName: e.target.value})} placeholder='Last Name' className='border border-gray-200 p-2 w-full' />
          </div>
          <div>
            <label htmlFor="">Phone Number</label>
            <input required type="text" value={editedUserInfo?.contactNumber || ''} onChange={(e)=> setEditedUserInfo({...editedUserInfo, contactNumber: e.target.value})} placeholder='Phone Number' className='border border-gray-200  p-2 w-full' />
          </div>
          <div>
            <label htmlFor="">Address</label>
            <input type="text" value={editedUserInfo?.address || ''} onChange={(e)=> setEditedUserInfo({...editedUserInfo, address: e.target.value})} placeholder='Address' className='border border-gray-200 p-2 w-full' />
          </div>
          <div>
            <label htmlFor="">Gender</label>
            <input type="text" value={editedUserInfo?.gender || ''} onChange={(e)=> setEditedUserInfo({...editedUserInfo, gender: e.target.value})} placeholder='Gender' className='border border-gray-200 p-2 w-full' />
          </div>
          <div>
            <label htmlFor="">Bio</label>
            <input type="text" value={editedUserInfo?.bio || ''} onChange={(e)=> setEditedUserInfo({...editedUserInfo, bio: e.target.value})} placeholder='Bio' className='border border-gray-200 p-2 w-full' />
          </div>  
        </div>
        </div>}
        {changePasswordOpen && <div className='flex items-center mt-10 flex-col p-5 rounded-4xl bg-amber-50 border border-amber-100 relative'>
          <button className='absolute top-5 right-5 cursor-pointer' onClick={() => {setChangePasswordOpen(!changePasswordOpen)}}><XIcon  size={20}/></button>
          <h2 className='text-3xl font-bold text-[var(--accent)] mb-10'>Change Password</h2>
          <div className='grid grid-cols-2 gap-5'>
            <div>
              <label htmlFor="">Old Password</label>
              <input required type="password" value={currentPassword} onChange={(e)=> setCurrentPassword(e.target.value)} placeholder='Old Password' className='border border-gray-200 p-2 w-full' />
            </div>
            <div>
              <label htmlFor="">New Password</label>
              <input required type="password" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} placeholder='New Password' className='border border-gray-200 p-2 w-full' />
            </div>
            <button onClick={() => {changePassword(); setChangePasswordOpen(!changePasswordOpen)}}>Change</button>
          </div>
         </div>}
        <MyOrders />
    </div>
    <Footer />
    </>
  )
}

export default Profile