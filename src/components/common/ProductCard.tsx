import React, { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import CustomButton from './CustomButton'
import { CartItem, useCartStore } from '@/store/cartStore'
import StarsIcon from '@mui/icons-material/Stars'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { Item } from '@/utils/types'

interface ProductCardProps {
  id: number
  name: string
  price: number
  discountPercentage?: number // Add discountPercentage prop here
  quantity: number
  image: string | undefined
  type: string
  categoryId: number
  createdOn: string
  description: string
  subItems?: Item[]
  onItemAdded: () => void
  isStudent: boolean
  isOutOfStock: boolean
  onViewCart: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  discountPercentage = 0, // Set default to 0 for no discount
  quantity,
  image,
  type,
  categoryId,
  createdOn,
  description,
  subItems = [],
  onItemAdded,
  isStudent,
  isOutOfStock,
  onViewCart,
}) => {
  const { items, addItem, updateItemQuantity, removeItem } = useCartStore();
  const itemInCart = useCartStore(state => state.items.find(item => item.id === id));
  const itemCount = itemInCart?.quantity || 0;

  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  // Calculate discounted price if discountPercentage is provided
  const discountedPrice = discountPercentage > 0
    ? price - (price * (discountPercentage / 100))
    : price;

  const handleIncrease = () => {
    if (itemCount < quantity) {
      const newCount = itemCount + 1;
      if (itemCount === 0) {
        addItem({ id, name, price: discountedPrice, quantity: newCount, image, maxQuantity: quantity, categoryId });
      } else {
        updateItemQuantity(id, newCount);
      }
      onItemAdded();
    }
  };

  const handleDecrease = () => {
    if (itemCount > 0) {
      const newCount = itemCount - 1;
      if (newCount === 0) {
        removeItem(id);
      } else {
        updateItemQuantity(id, newCount);
      }
    }
  };

  const renderActionButton = () => {
    if (isOutOfStock) {
      return (
        <CustomButton 
          variant="outlined" 
          className="!text-white text-md border-2 font-semibold !h-12 leading-none !rounded-md !shadow-sm !bg-gray-400"
          disabled
        >
          Out of Stock
        </CustomButton>
      );
    }

    if (itemCount === 0) {
      return (
        <CustomButton 
          variant="outlined" 
          className="!text-white text-md border-2 font-semibold !h-12 leading-none !rounded-md !shadow-sm !bg-indigo hover:!bg-indigo-700"
          onClick={handleIncrease}
        >
          {isStudent ? (
            <>
              <StarsIcon className="!text-[#fe9400] mr-2"/>
              {discountedPrice.toFixed(2)} POINTS
            </>
          ) : (
            <>INR {discountedPrice.toFixed(2)}</>
          )}
        </CustomButton>
      );
    }

    return (
      <Box className="flex items-center justify-between w-full mx-20">
        <IconButton onClick={handleDecrease} className="!bg-indigo !text-white">
          <RemoveIcon />
        </IconButton>
        <Typography variant="body1" className="font-bold">
          {itemCount}
        </Typography>
        <IconButton 
          onClick={handleIncrease} 
          className="!bg-indigo !text-white"
          disabled={itemCount >= quantity}
        >
          <AddIcon />
        </IconButton>
      </Box>
    );
  };

  return (
    <Card className="h-full flex flex-col shadow-md relative">
      <div className="relative h-56 bg-blue-400">
        {type === 'Courses' ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <IconButton
              className="w-12 h-12 border-2 border-white bg-white rounded-full flex items-center justify-center hover:bg-white"
              onClick={() => {
                /* Implement video play logic */
              }}
            >
              <PlayArrowIcon className="text-indigo" style={{ fontSize: '1.5rem' }} />
            </IconButton>
          </div>
        ) : (
          <div>
            {image && (
              <Image src={image} alt={name} layout="fill" objectFit="cover" />
            )}
          </div>
        )}
      </div>
      <CardContent className="flex-grow flex flex-col justify-between p-4">
        <div>
          <Box className="flex justify-between items-center mb-4 mt-2">
            {type === 'Courses' ? (
              <Typography
                variant="h6"
                component="h2"
                className="font-semibold p-1 text-base rounded-sm w-28 text-center text-indigo border border-indigo"
              >
                {name}
              </Typography>
            ) : quantity - itemCount === 0 ? (
              <CustomButton 
                variant="outlined" 
                className="!text-white text-md border-2 font-semibold !h-12 leading-none !rounded-md !shadow-sm !bg-gray-400"
                disabled
              >
                Out of Stock
              </CustomButton>
            ) : (
              <Typography variant="caption" className="text-[#22CC9B] text-base font-bold">
                {quantity - itemCount} ITEMS IN STOCK
              </Typography>
            )}
          </Box>

          <Typography variant="h6" component="h2" className="font-bold mb-2">
            {name}
          </Typography>

          <Typography variant="body2" color="text.secondary" className="mb-4">
            {description}
          </Typography>

          {/* Price with Discount */}
          <Box className="flex items-center mb-4">
            {discountPercentage > 0 ? (
              <>
                <Typography variant="h6" component="h2" className="text-red-500 font-bold">
                  -{discountPercentage}% 
                </Typography>
                <Typography variant="h6" component="h2" className="ml-2 font-bold">
                {isStudent ? `Points ${discountedPrice.toFixed(2)}` : `INR ${discountedPrice.toFixed(2)}`}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ textDecoration: 'line-through', marginLeft: '8px' }}
                >
                {isStudent ? `Points ${price.toFixed(2)}` : `INR ${price.toFixed(2)}`}
                </Typography>
              </>
            ) : null}
          </Box>
        </div>

        <Box className="flex items-center justify-between mt-4">
          <Box className="flex items-center justify-center w-full">
            {renderActionButton()}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
