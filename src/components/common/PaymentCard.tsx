import React, { useEffect, useState } from 'react';
import CustomButton from './CustomButton';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useErrorStore } from '@/store/errorStore';
import { networkService } from '@/network/NetworkService';
import { usePointStore } from '@/store/pointStore';

interface PaymentCardProps {
  isStudent: boolean;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ isStudent }) => {
  const { items, getTotalPrice, validateCoupon, addItem, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { getPoints } = usePointStore();

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  // const [availablePoints, setAvailablePoints] = useState<number>(getPoints || 0);
  const [availablePoints, setAvailablePoints] = useState<number>(0);

  useEffect(() => {
    getPoints().then(points => setAvailablePoints(points || 0));
  }, []);
   const errorState = useErrorStore((state) => state)

  const subtotal = getTotalPrice();
  const deliveryFee = 400;
  const total = subtotal + deliveryFee - discount;
  const totalPoints = getTotalPrice();
  const currencySymbol = isStudent ? 'pts' : 'INR';

  const handleCouponValidation = async () => {
    if (couponCode.trim()) {
      const result = await validateCoupon(couponCode);
      if (result) {
        setDiscount(result.discountAmount);
      } else {
        setDiscount(0);
      }
    }
  };

  const handlePayment = () => {
    if (availablePoints >= totalPoints) {
      const newAvailablePoints = availablePoints - totalPoints;
      setAvailablePoints(newAvailablePoints);
      errorState.setAlert({ message: `Points deducted! New available points: ${newAvailablePoints}`, type: 'success' });
    } else {
      useErrorStore.getState().setAlert({
        message: "Available points are not sufficient for this payment.",
        type: 'error'
      });
    }
  };

  const loadRazorpayScript = () => {
    return new Promise<boolean>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePaymentParent = async () => {
    const isLoaded = await loadRazorpayScript();

    if (!isLoaded) {
      console.log("Razorpay SDK failed to load. Please check your internet connection");
      errorState.setAlert({ message: "Razorpay SDK failed to load. Please check your internet connection.", type: "error" });
      return;
    }

    try {
      const total = getTotalPrice();

      const orderResponse: any = await addItem({
        id: user?.id || 0,
        name: "Order",
        price: total,
        quantity: 1,
        maxQuantity: 1,
        categoryId: 0,
      });

      if (!orderResponse) {
        console.log("Failed to create Razorpay order");
        throw new Error("Failed to create Razorpay order");
      }

      const options = {
        key: "rzp_test_7Ix0unzbmeJAKO",
        amount: orderResponse.razorPayOrder.amount,
        currency: orderResponse.razorPayOrder.currency,
        name: "Your Shop Name",
        description: "Payment for Order",
        order_id: orderResponse.razorPayOrder.id,
        handler: async function (response: any) {
          try {
            const verificationResult = await networkService.post({
              url: '/api/verify-order-payments',
              data: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              }
            });

            if (verificationResult.isSuccess) {
              console.log("Payment successful!");
              errorState.setAlert({ message: "Payment successful!", type: "success" });
              clearCart();
            } else {
              console.log("Payment verification failed");
              throw new Error("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            errorState.setAlert({ message: "Payment verification failed", type: "error" });
          }
        },
        prefill: {
          name: user?.firstName,
          email: user?.email,
          contact: user?.email,
        },
        theme: {
          color: "#753CBD",
        },
        notes: orderResponse.razorPayOrder.notes,
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      errorState.setAlert({ message: "Failed to initiate payment. Please try again.", type: "error" });
    }
  };


  if (!isStudent) {
    return (
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-sm mx-auto border-2 border-gray">
        <h2 className="text-purple text-2xl font-bold mb-4">Payment</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Choose type of payment</label>
          <input type="text" className="w-full p-3 rounded-lg text-[14px] text-gray-400" placeholder="Bank Card" disabled />
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-700 font-semibold">Subtotal:</span>
          <span className="text-purple-600 font-bold text-purple">{currencySymbol}{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-700 font-semibold">Delivery:</span>
          <span className="text-purple-600 font-bold text-purple">{currencySymbol}{deliveryFee.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between mb-2">
            <span className="text-gray-700 font-semibold">Discount:</span>
            <span className="text-green-600 font-bold">-{currencySymbol}{discount.toFixed(2)}</span>
          </div>
        )}
        <hr className="my-4" />
        <div className="flex justify-between mb-4">
          <span className="text-gray-700 font-bold">Total to pay:</span>
          <span className="text-purple-600 font-bold text-purple">{currencySymbol}{total.toFixed(2)}</span>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Voucher Code</label>
          <div className="flex gap-6">
            <input
              type="text"
              className="w-full p-3 rounded-l-lg text-[14px]"
              placeholder="Enter voucher number..."
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <CustomButton
              color="#753CBD"
              textColor="#fff"
              className="rounded-r-lg"
              onClick={handleCouponValidation}
            >
              Apply
            </CustomButton>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          By paying, you accept the{' '}
          <a href="#" className="text-purple underline">
            Terms of Use
          </a>{' '}
          and{' '}
          <a href="#" className="text-purple underline">
            Privacy
          </a>
        </p>
        <CustomButton onClick={handlePaymentParent} color="#753CBD" textColor="#fff" className="w-full p-4">
          Continue to Pay
        </CustomButton>
      </div>
    );
  } else {
    return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-sm mx-auto">
      <div className="flex justify-start items-center mb-6 gap-8">
        <span className="text-black font-semibold text-2xl">Available Points:</span>
        <span className="text-purple font-semibold text-2xl">{availablePoints} Points</span>
      </div>
      
      <hr className="my-4" />
      
      <h2 className="text-purple text-3xl font-bold mb-4">Pay by Points</h2>
      
      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-700 font-semibold text-2xl">Total to pay:</span>
        <span className="text-purple font-bold text-2xl">{totalPoints} Points</span>
      </div>
          <CustomButton onClick={handlePayment}  color="#753CBD" textColor="#fff" className="w-full p-4">
          Continue to Pay
        </CustomButton>
    </div>
  );
  }
  
};

export default PaymentCard;