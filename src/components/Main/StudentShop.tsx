'use client'

import { Container, Grid, Paper, Snackbar } from '@mui/material'
import React, { useEffect, useState, useMemo } from 'react'
import Image from 'next/image'
import { ProductCardType, RolesEnum } from '@/utils/enum'
import CustomSelectV2 from '@/components/common/CustomSelectV2'
import CustomInputV2 from '@/components/common/CustomInputV2'
import CustomButton from '@/components/common/CustomButton'
import ProductCard from '@/components/common/ProductCard'
import { useCardStore } from '@/store/cardStore'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { CartItem, useCartStore } from '@/store/cartStore'
import { Item } from '@/utils/types'
import axios from 'axios'
import { networkService } from '@/network/NetworkService'
import { useErrorStore } from '../../store/errorStore'
import { useDiscountStore } from '@/store/discountStore'



const StudentShop = () => {
  const router = useRouter();
  const getCardList = useCardStore((state) => state.getCardList);
  const getDiscountList = useDiscountStore((state) => state.getDiscount);
  const discount = useDiscountStore((state) => state.discount); // Get discount from store
  const [dis, setDis] = useState(0);
  const cardList = useCardStore((state) => state.cardList);
  const [search, setSearch] = useState('');
  const user = useAuthStore((state) => state.user);
  const cartItems = useCartStore((state) => state.items);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const setUserId = useCartStore((state) => state.setUserId);
  const [selectedCategory, setSelectedCategory] = useState<{ label: string; value: string }>({ label: 'All', value: 'all' });
  const [sort, setSort] = useState('new' as 'new' | 'old');
  const [open, setOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const addToCart = useCartStore((state) => state.addItem);
  const removeFromCart = useCartStore((state) => state.removeItem);
  
  const handleAddToCart = (product: Item, quantity: number) => {
    if (!user) {
      setErrorMessage('Please log in to add items to your cart.');
      setSnackbarOpen(true);
      return;
    }

    const cartUserId = useCartStore.getState().userId;
    if (cartUserId !== user.id) {
      setErrorMessage('User ID mismatch. Please log out and log in again.');
      setSnackbarOpen(true);
      return;
    }

    if (quantity > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image,
        maxQuantity: product.quantity,
        categoryId: product.categoryId
      });
      setErrorMessage('');
      setSnackbarOpen(true);
    } else {
      removeFromCart(product.id);
    }
  };
  console.log("Discount:", discount);

  useEffect(() => {
    const totalItems = getTotalItems();
    setSnackbarOpen(totalItems > 0);
  }, [cartItems, getTotalItems]);
  
  useEffect(() => {
    if (user) {
      setUserId(user.id);
      if (user.role.toLowerCase() === RolesEnum.Student) {
        getCardList('5');
      } else if (user.role.toLowerCase() === RolesEnum.Parent) {
        getCardList('4');
      }
    }
    //console.log("Discount123:test");

     //getDiscountList(5); // Fetch discounts

    //console.log("Discount123:", discount);

  }, [user, getCardList, setUserId,getDiscountList]);
  useEffect(() => {
    const fetchDiscount = async () => {
      await getDiscountList(5);
      console.log("Discount1234:", discount);
    };
  
    fetchDiscount();
  }, [getDiscountList]);

  const handleViewCart = () => {
    router.push('/cart');
  };
  useEffect(() => {
    if (user && user.role.toLowerCase() === RolesEnum.Student) {
      getCardList('5');
    }
    if (user && user.role.toLocaleLowerCase() === RolesEnum.Parent) {
      getCardList('4')
    }
  }, [user, getCardList]);

  const calculateTotalItems = useMemo(() => {
    return cardList.reduce((total, category) => total + category.items.length, 0);
  }, [cardList]);

  const getFilteredCards = useMemo(() => {
    let filteredList = cardList;

    // Filter by category
    if (selectedCategory.value !== 'all') {
      filteredList = filteredList.filter((category) => category.id.toString() === selectedCategory.value);
    }

    // Filter by search
    if (search.trim() !== '') {
      filteredList = filteredList.map(category => ({
        ...category,
        items: category.items.filter(item =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      })).filter(category => category.items.length > 0);
    }

    // Sort
    filteredList = filteredList.map(category => ({
      ...category,
      items: category.items.sort((a, b) => {
        if (sort === 'new') {
          return new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime();
        } else {
          return new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime();
        }
      })
    }));

    return filteredList;
  }, [cardList, selectedCategory, search, sort]);

  const handleSearch = () => {
    console.log('Searching for:', search);
  };

    const handleItemAdded = () => {
    // This function is no longer needed as the snackbar visibility
    // is controlled by the cart items
  };
  
  
  
  
  
  
  return (
    <Container maxWidth="lg" className="py-8">
      <h1 className="text-indigo text-5xl font-bold">Online Store</h1>
      <div className="mb-[75px] mt-12">
        {/* ... (rest of the existing code) ... */}
        {getFilteredCards.map((category) => (
          <div key={category.id}>
            <div className="flex justify-between items-center mt-10 md:mt-16 mb-8 md:mb-12">
              <h2 className="text-3xl font-bold text-indigo">{category.name}</h2>
            </div>
            <Grid container spacing={5}>
              {category.items.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                   <ProductCard
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    quantity= {product.quantity}
                    image={product.image}
                    type={product.type}
                    categoryId={product.categoryId}
                    createdOn={product.createdOn}
                    onItemAdded={handleItemAdded}
                    subItems={product?.subItems}
                    isStudent={user?.role.toLowerCase() === RolesEnum.Student}
                    isOutOfStock={product.quantity === 0}
                    onViewCart={handleViewCart}
                    discountPercentage = {discount ? discount : 0}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        ))}
      </div>
      <Snackbar 
        open={snackbarOpen} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ bottom: '24px' }}
      >
        <Paper 
          elevation={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: errorMessage ? '#f44336' : '#4CAF50',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            minWidth: '300px',
            maxWidth: '400px',
          }}
        >
          {errorMessage ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>{errorMessage}</span>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
                <CheckCircleIcon sx={{ marginRight: '8px' }} />
                <span style={{ fontWeight: 'bold' }}>
                  {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in cart
                </span>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <button style={{ marginRight: '4px' }} onClick={() => router.push('/cart')}>View Cart</button>
                <ArrowForwardIcon fontSize="small" />
              </div>
            </>
          )}
        </Paper>
      </Snackbar>
    </Container>
  )
}

export default StudentShop;