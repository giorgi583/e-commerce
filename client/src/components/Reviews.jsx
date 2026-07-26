import { Clipboard, Send, User } from 'lucide-react';
import React, { useEffect } from 'react'
import Stars from './Stars';
import {toast} from 'react-hot-toast'
const Reviews = ({product}) => {
  const apiURL = import.meta.env.VITE_API_URL;
  const [reviews, setReviews] = React.useState([]);
  const [newComment, setNewComment] = React.useState('');
  const getReviews = async () => {
    try {
      const response = await fetch(`${apiURL}/reviews/?productId=${product?.id}`);
      const result = await response.json();
      console.log(result);
      setReviews(result?.reviews);
    } catch (error) {
      console.log(error);
    }
  }
  const addReview = async () => {
    const token = localStorage.getItem('token');
    if (!token) {toast.error('Please login to add a review'); return;}
    if(!newComment) {toast.error('Please enter a comment'); return}
    try {
      const response = await fetch(`${apiURL}/reviews/${product?.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          comment: newComment
        })
      });
      if(!response.ok) throw new Error('Failed to add review');
      const result = await response.json();
      console.log(result);
      setNewComment('');
      toast.success(result.message);
      getReviews();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }
  function timeAgo(date) {
  const diff = Date.now() - new Date(date).getTime();

  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days !== 1 ? "s" : ""} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;

  const years = Math.floor(months / 12);
  return `${years} year${years !== 1 ? "s" : ""} ago`;
}
  useEffect(() => {
    getReviews();
  }, [product]);
  return (
    <div id='reviews' className='w-full bg-slate-50 p-5 rounded-2xl px-10'>
<div className='flex items-center justify-between w-full mb-5'>
  <h2 className='text-2xl font-bold text-[var(--accent)]'>Reviews</h2>
  <h3 className='text-2xl font-bold flex items-center gap-3'>Rating ({product?.rating}) <Stars rating={product?.rating}/></h3>
</div>
<div className='relative'>
  <input value={newComment} onChange={(e) => setNewComment(e.target.value)} type="text" placeholder='Write a review...' className='border border-gray-300 p-3 px-5 w-full max-sm:p-1 rounded-full  focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all duration-200' />
  <button onClick={addReview} className='absolute right-0 top-[50%] transform -translate-y-1/2 rounded-r-full h-full rounded flex items-center justify-center gap-4'>Send <Send size={24} className='rotate-45'/></button>
</div>
{reviews?.length > 0 ? reviews.map((review, index) => (
  <div className='my-5 p-5 bg-white rounded-2xl flex items-center gap-5 relative' key={index}>
    <div className='rounded-full w-15 h-15 flex items-center justify-center bg-gray-50'><User size={20} className='mx-auto'/></div>
    <div className='flex flex-col gap-3'>
      <h3 className='font-bold text-xl'>{review.username}</h3>
      <p>{review.comment}</p>
    </div>
    <p className='absolute top-5 right-5 text-sm text-gray-400'>{ timeAgo(review.createdAt)}</p>
  </div>
)) : <div className='text-center w-full text-gray-400 text-4xl p-10 font-bold'>
  <Clipboard size={50} className='mx-auto mb-5'/>
  <p>No comments added yet</p>
</div>}
    </div>
  )
}

export default Reviews