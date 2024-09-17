import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import CustomButton from './CustomButton'
import { CartItem, useCartStore } from '@/store/cartStore'
import StarsIcon from '@mui/icons-material/Stars'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Item } from '@/utils/types'

interface ProductCardProps {
  id: number
  name: string
  price: number
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
  const [itemCount, setItemCount] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const handlePrevItem = () => {
    if (subItems.length > 0) {
      setCurrentItemIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : subItems.length - 1
      );
    }
  };

  const handleNextItem = () => {
    if (subItems.length > 0) {
      setCurrentItemIndex((prevIndex) =>
        prevIndex < subItems.length - 1 ? prevIndex + 1 : 0
      );
    }
  };

  const currentItem = subItems.length > 0 ? subItems[currentItemIndex] : null;

  useEffect(() => {
    const cartItem = items.find(item => item.id === id);
    setItemCount(cartItem ? cartItem.quantity : 0);
  }, [items, id]);

  const handleIncrease = () => {
    if (itemCount < quantity) {
      const newCount = itemCount + 1;
      if (itemCount === 0) {
        addItem({ id, name, price, quantity: newCount, image, maxQuantity: quantity });
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
              {price} POINT
            </>
          ) : (
            <>INR{price.toFixed(2)}</>
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
              <Typography variant="h6" component="h2" className="font-semibold p-1 text-base rounded-sm w-28 text-center text-indigo border border-indigo">
                {name} 
              </Typography>
            ) : (
              <Typography variant="caption" className="text-[#22CC9B] text-base font-bold">
                {quantity-  itemCount} ITEMS IN STOCK
              </Typography>
            )}
          </Box>

          <Typography variant="h6" component="h2" className="font-bold mb-2">
            {name}
          </Typography>

          <Typography variant="body2" color="text.secondary" className="mb-4">
            {description}
          </Typography>

              {subItems.length > 0 && currentItem ? (
          <Box className="flex items-center justify-between mb-4">
              <Box className="flex items-center rounded-md">
                {currentItem.image && currentItem.image != 'string'  && (
                  <Image src={currentItem.image} alt={currentItem.name}
                    width={60} height={60} 
                    className=' rounded-md h-16 w-16 object-cover'
                  />
                )}
            </Box>
            <Box className="flex-grow mx-4">
              <Typography variant="subtitle2" className="font-semibold">
                {currentItem.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" className="block">
                {currentItem.name}
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
         null
        )}
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