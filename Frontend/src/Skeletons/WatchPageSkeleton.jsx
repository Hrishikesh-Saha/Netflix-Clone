import React from 'react'

const WatchPageSkeleton = () => {
  return (
    <div className='animate-pulse'>
      <div className='bg-gray-700 shimmer rounded-md mb-4 h-6 w-40'></div> 
      <div className='bg-gray-700 shimmer rounded-md mb-4 h-96 w-full'></div> 
      <div className='bg-gray-700 shimmer rounded-md mb-2 h-6 w-3/4'></div> 
      <div className='bg-gray-700 shimmer rounded-md mb-4 h-6 w-1/2'></div>   
      <div className='bg-gray-700 shimmer rounded-md  h-24 w-full'></div>   
    </div>
  )
}

export default WatchPageSkeleton
