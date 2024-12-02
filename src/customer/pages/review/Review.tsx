import React from 'react'
import ReviewCard from './ReviewCard'

const Review = () => {
  return (
    <div className='flex lg:px-20 flex-col lg:flex-row gap-10'>
      <section className='w-full md:w-1/2 lg:w-[30%] space-y-2'>

        <img src='https://starsbiopedia.com/wp-content/uploads/2022/12/Liya-Silver-9-780x975.jpg'/>
        <div>
          <div>
            <p className='font-bold text-xl'>Eidos</p>
            <p className='text-lg text-gray-600 '>Tomb Raider Legend</p>
          </div>

          <div>
            <div className="price flex items-center gap-3 mt-5 text-2xl">
              <span className="font-semibold text-gray-800">Rs 400</span>
              <span className="font-thin line-through text-gray-400">
                Rs 999
              </span>
              <span className="text-primary-color font-semibold">60%</span>
            </div>
            <p className="text-sm text-gray-400">
              Inclusive of all taxes. Free Shipping above Rs 1500.
            </p>
          </div>
        </div>

      </section>

      <section className='w-full space-y-2'>
        {[1,2,3,4,5].map(()=><div className=''><ReviewCard /></div>)}
      </section>
    </div>
  )
}

export default Review
