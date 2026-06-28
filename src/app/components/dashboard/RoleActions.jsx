'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUserRole } from '@/lib/actions/userRole';


const RoleActions = ({ userId, currentRole }) => {
    const router = useRouter();
    const [isUpdating, setIsUpdating] = useState(null);

    const handleRoleChange = async (newRole) => {
        if (currentRole === newRole) return;

        const confirmChange = window.confirm(`Are you sure you want to change this user's role to ${newRole.toUpperCase()}?`);
        if (!confirmChange) return;

        setIsUpdating(newRole);

        try {
            const data = await updateUserRole(userId, newRole);

            if (data.success) {
                router.refresh(); 
            } else {
                alert(data.error || 'Failed to update role.');
            }
        } catch (error) {
            console.error('Error updating role:', error);
            alert('Something went wrong!');
        } finally {
            setIsUpdating(null);
        }
    };

    const roles = ['user', 'artist', 'admin'];

    return (
        <div className="flex justify-center gap-2">
            {roles.map((role) => {
                const isActive = (currentRole || 'user') === role;
                const isLoading = isUpdating === role;

                return (
                    <button
                        key={role}
                        onClick={() => handleRoleChange(role)}
                        disabled={isActive || isUpdating !== null}
                        className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border transition-all active:scale-95 disabled:pointer-events-none ${
                            isActive
                                ? 'bg-gray-800/40 border-gray-800 text-gray-500 opacity-40'
                                : 'bg-gray-900 border-gray-800 text-gray-300 hover:bg-gray-800 hover:text-white disabled:opacity-50'
                        }`}
                    >
                        {isLoading ? '⏳' : `Make ${role.charAt(0).toUpperCase() + role.slice(1)}`}
                    </button>
                );
            })}
        </div>
    );
};

export default RoleActions;