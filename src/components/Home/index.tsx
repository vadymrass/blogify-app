import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Home = (props: any) => {
   const user = useSelector((state: any) => state.userReducer.user);

   return (
      <div>
         <h1>{user.email}</h1>
      </div>
   );
};

export default Home;
