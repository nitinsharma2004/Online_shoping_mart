import React, { useEffect, useState } from 'react';
import Adminnavbar from './Dashbord/Adminnavbar';
import Offlinecard from './Offlinecard';
import Onlinecard from './Onlinecard';
import axios from 'axios';

const Cartdetail = () => {
  const [offlineProducts, setOfflineProducts] = useState([]);
  const [onlineProducts, setOnlineProducts] = useState([]);

  const fetchOfflineProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8009/api/offline-payments');
      setOfflineProducts(response.data);
    } catch (error) {
      console.error('Error fetching offline products:', error);
    }
  };

  const fetchOnlineProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8009/api/online-payments');
      setOnlineProducts(response.data);
    } catch (error) {
      console.error('Error fetching online products:', error);
    }
  };

  useEffect(() => {
    fetchOfflineProducts();
    fetchOnlineProducts();
  }, []);

  const handleAssignClick = (productId, type) => {
    if (type === 'offline') {
      setOfflineProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
    } else if (type === 'online') {
      setOnlineProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
    }
  };

  return (
    <>
      <Adminnavbar />
      
        
          <Offlinecard products={offlineProducts} onAssignClick={handleAssignClick} />
          <Onlinecard products={onlineProducts} onAssignClick={handleAssignClick} />
        
      
    </>
  );
};


export default Cartdetail;
