import React, { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';

const DeliveryForm: React.FC = () => {
  const {
    currentAddress,
    setCurrentAddress,
    saveAddress,
    states,
    cities,
    isLoadingStates,
    isLoadingCities,
    fetchStates,
    fetchCities,
    fetchAddresses,
  } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fullLocation, setFullLocation] = useState(''); 

  const user = useAuthStore();

  useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedAddress = { ...currentAddress, [name]: value };

    setCurrentAddress(updatedAddress);
    getFullLocation(updatedAddress);
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }

    if (name === 'state') {
      const selectedState = states.find(state => state.name === value);
      if (selectedState) {
        fetchCities(selectedState.id);
      }
      setCurrentAddress({ ...currentAddress, [name]: value, city: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const validateField = (field: keyof typeof currentAddress, errorMessage: string) => {
      if (!currentAddress[field] || (typeof currentAddress[field] === 'string' && currentAddress[field].trim() === '')) {
        newErrors[field] = errorMessage;
      }
    };

    validateField('house', 'House number is required');
    validateField('street', 'Street is required');
    validateField('city', 'City is required');
    validateField('state', 'State is required');
    validateField('postalCode', 'Postal code is required');
    validateField('roadNearBy', 'Nearby road is required');


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getFullLocation = (updatedAddress: { id: number; house: string; street: string; city: string; state: string; postalCode: string; fullLocation: string; roadNearBy: string; userId: number; }) => {
    const house = currentAddress.house || '';
    const street = currentAddress.street || '';
    const city = currentAddress.city || '';
    const state = currentAddress.state || '';
    const postalCode = currentAddress.postalCode || '';
  
    const location = `${house}, ${street}, ${city}, ${state}, ${postalCode}`.replace(/(^[,\s]+)|([,\s]+$)/g, '').replace(/,+/g, ',').trim();
    setFullLocation(location); 

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the form first
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
  
    try {
      const updatedAddress = {
        ...currentAddress,
        fullLocation, 
        userId: user.user?.id || 0, 
      };

      await saveAddress(updatedAddress);
      await fetchAddresses();
    } catch (error) {
      console.error('Error saving address:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-full mx-auto border-2 border-gray w-full">
      <h2 className="text-purple text-2xl font-bold mb-6">Delivery Address</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="house">
            House Number
          </label>
          <input
            type="text"
            id="house"
            name="house"
            value={currentAddress.house}
            onChange={handleInputChange}
            className={`w-full p-3 rounded-lg text-gray-700 border ${errors.house ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.house && <p className="text-red-500 text-xs mt-1">{errors.house}</p>}
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="street">
            Street
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={currentAddress.street}
            onChange={handleInputChange}
            className={`w-full p-3 rounded-lg text-gray-700 border ${errors.street ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
            State
          </label>
          <select
            id="state"
            name="state"
            value={currentAddress.state}
            onChange={handleInputChange}
            className={`w-full p-3 rounded-lg text-gray-700 border ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
            disabled={isLoadingStates}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.id} value={state.name}>{state.name}</option>
            ))}
          </select>
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
            City
          </label>
          <select
            id="city"
            name="city"
            value={currentAddress.city}
            onChange={handleInputChange}
            className={`w-full p-3 rounded-lg text-gray-700 border ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
            disabled={isLoadingCities || !currentAddress.state}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>{city.name}</option>
            ))}
          </select>
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postalCode">
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={currentAddress.postalCode}
            onChange={handleInputChange}
            className={`w-full p-3 rounded-lg text-gray-700 border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullLocation">
            Full Location
          </label>
          <input
            type="text"
            id="fullLocation"
            name="fullLocation"
            value={fullLocation}
            onChange={handleInputChange}
            disabled
            className={`w-full p-3 rounded-lg text-gray-700 border  ${errors.fullLocation ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.fullLocation && <p className="text-red-500 text-xs mt-1">{errors.fullLocation}</p>}
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roadNearBy">
            Landmark
          </label>
          <input
            type="text"
            id="roadNearBy"
            name="roadNearBy"
            value={currentAddress.roadNearBy}
            onChange={handleInputChange}
            className={`w-full p-3 rounded-lg text-gray-700 border ${errors.roadNearBy ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.roadNearBy && <p className="text-red-500 text-xs mt-1">{errors.roadNearBy}</p>}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-3 bg-purple text-white rounded-lg font-bold"
          >
            {isSubmitting ? 'Saving...' : 'Save Address'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeliveryForm;