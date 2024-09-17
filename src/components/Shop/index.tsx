'use client'
import { ProductCategoryTypes, SuccessResponse } from '@/utils/types'
import classNames from 'classnames'
import React, { useState } from 'react'
import CustomButton from '../common/CustomButton'

const Shop = ({ data }: { data?: SuccessResponse }) => {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <div>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        <ul className="flex flex-wrap justify-center -mb-px">
          <li
            onClick={() => setActiveTab(0)}
            className={classNames('inline-block p-4 border-b-2 border-transparent rounded-t-lg cursor-pointer', {
              'text-blue-600 border-blue-600': activeTab === 0,
            })}
          >
            Illumiya shop
          </li>
          <li
            onClick={() => setActiveTab(1)}
            className={classNames('inline-block p-4 border-b-2 border-transparent  rounded-t-lg cursor-pointer', {
              'text-blue-600 border-blue-600': activeTab === 1,
            })}
          >
            Educational shop
          </li>
        </ul>
      </div>
      <div>
        {activeTab === 0 ? (
          <div>
            {data?.returnObject?.map((item: ProductCategoryTypes) => {
              return (
                <div key={item.id} className="my-8">
                  <h2 className="text-xk font-bold">{item.name}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {item.getItemsModelForCategory.map((product) => {
                      return (
                        <div key={product.id} className="border border-gray-200 p-4 rounded-lg">
                          <img src={product.image || ''} alt={product.name} className="p-1" />
                          <h3>Name: {product.name}</h3>
                          <p>Price: {product.price}</p>
                          <p>Quantity: {product.quantity}</p>
                          <p>Type: {product.type}</p>
                          <p>Date: {product.createdOn}</p>
                          <CustomButton className="w-full max-w-[150px] h-9 !text-white mt-4" onClick={() => {}}>
                            Add to Cart
                          </CustomButton>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="my-5">
            Coming soon! <br /> Educational shop
          </p>
        )}
      </div>
    </div>
  )
}

export default Shop
