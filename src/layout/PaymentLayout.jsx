import React from 'react';
import Logo from '../components/Logo';
import { Outlet } from 'react-router';
import HomeButton from '../components/HomeButton';

const PaymentLayout = () => {
    return (
        <div className='flex flex-col justify-between items-center'>
            <div className='mb-30'>
                <Logo></Logo>
            </div>
            <Outlet></Outlet>
            <div className='my-20'>
                <HomeButton></HomeButton>
            </div>
        </div>
    );
};

export default PaymentLayout;