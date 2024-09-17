import React, { useState } from 'react'
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import CustomButton from './CustomButton'
import Image from 'next/image'
import StarsIcon from '@mui/icons-material/Stars'


interface Item {
  name: string;
  description: string;
}

interface ComboPackageCardProps {
  discount?: number
  image?: string
  title: string
  description: string
  price: number
  originalPrice?: number
  items?: Item[]
  inStock: number
  points?: number
  onAddToCart: () => void
}

const ComboPackageCard: React.FC<ComboPackageCardProps> = ({
  image,
  title,
  description,
  price,
  originalPrice,
  items = [], // Provide a default empty array
  inStock,
  discount,
  points,
  onAddToCart,
}) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const handlePrevItem = () => {
    setCurrentItemIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : items.length - 1
    );
  };

  const handleNextItem = () => {
    setCurrentItemIndex((prevIndex) => 
      prevIndex < items.length - 1 ? prevIndex + 1 : 0
    );
  };

  const currentItem = items.length > 0 ? items[currentItemIndex] : null;

  return (
    <Card className="h-full relative">
      {/* {discount && (
        <Box className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
          <Box className="bg-red-500 text-white text-xs py-1 px-4 absolute top-6 right-[-35px] transform rotate-45 w-40 text-center">
            GET {discount}% MORE
          </Box>
        </Box>
      )} */}

      <CardContent>
        {/* <Typography variant="caption" className="text-[#22CC9B] text-base font-bold">
          {inStock} ITEMS IN STOCK
        </Typography> */}

        <Typography variant="h6" component="h2" className="font-bold mt-2 mb-2">
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary" className="mb-4">
          {description}
        </Typography>

        {/* <Typography variant="subtitle1" className="text-indigo font-semibold mb-3">
          {items.length} Items Combo
        </Typography> */}

        {currentItem ? (
          <Box className="flex items-center justify-between mb-4">
            <Box className="w-16 h-16 bg-gray-200 flex-shrink-0 rounded-md">
            </Box>
            <Box className="flex-grow mx-4">
              <Typography variant="subtitle2" className="font-semibold">
                {currentItem.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" className="block">
                {currentItem.description}
              </Typography>
            </Box>
            <Box className="flex">
              <IconButton size="small" className="text-gray-400" onClick={handlePrevItem}>
                <ChevronLeftIcon className="text-xl md:text-3xl" />
              </IconButton>
              <IconButton size="small" className="text-gray-400" onClick={handleNextItem}>
                <ChevronRightIcon className="text-xl md:text-3xl"/>
              </IconButton>
            </Box>
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary" className="mb-4">
            No items available in this combo.
          </Typography>
        )}

        {points ? (
          <Box className="flex items-end justify-center w-full mt-16">
            <CustomButton variant="outlined" className="!bg-indigo  !text-white  text-md border-2 font-semibold !h-12 leading-none !rounded-md !shadow-sm">
              <StarsIcon className="!text-[#fe9400] mr-2" />
              {points} POINT
            </CustomButton>
          </Box>
        ) : (
            
          <Box className="flex items-center justify-between mt-4 md:mt-12 ">
            <Box className="flex flex-col items-baseline">
              <Typography variant="h6" className="font-bold text-indigo text-md">
                ${price.toFixed(2)}
              </Typography>
              {originalPrice && (
                <Typography variant="body2" color="text.secondary" className="line-through ml-2">
                  ${originalPrice.toFixed(2)}
                </Typography>
              )}
            </Box>
            <CustomButton variant="outlined" className="text-indigo !bg-white !w-[150px] text-md border-2 font-semibold !h-12 leading-none">
              <LocalMallIcon className="mr-2" />
              Add to cart
            </CustomButton>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default ComboPackageCard