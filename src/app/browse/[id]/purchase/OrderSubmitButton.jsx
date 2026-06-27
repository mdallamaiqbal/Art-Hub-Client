'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createOrder } from '@/lib/api/order'; 

const OrderSubmitButton = ({ orderData }) => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const handleConfirmPurchase = async () => {
        setSubmitting(true);
        const response = await createOrder(orderData);

        if (response) {
            router.push('/dashboard/user/purchaseHistory');
            router.refresh();
        }
        
        setSubmitting(false);
    };

    return (
        <button
            onClick={handleConfirmPurchase}
            disabled={submitting}
            className="w-full bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-black font-black py-3.5 px-6 rounded-xl transition-all uppercase tracking-wider text-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {submitting ? '⏳ Processing Order...' : `Confirm & Pay $${orderData.price}`}
        </button>
    );
};

export default OrderSubmitButton;