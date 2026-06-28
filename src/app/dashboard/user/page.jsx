"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Card, CardHeader, Input, Button, Spinner } from "@heroui/react";
import { User, Mail, Camera, Save } from "lucide-react";
import { updateUserProfile } from "@/lib/profile/profile-management";

const UserProfilePage = () => {
    const { data: session, isPending } = useSession();
    const [isProfileSubmitting, setIsProfileSubmitting] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted || isPending) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner size="lg" label="Loading Profile..." />
            </div>
        );
    }

    if (!session?.user) {
        return <div className="text-center p-10 text-danger">Please log in first!</div>;
    }

    const currentUser = session.user;

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setIsProfileSubmitting(true);

        try {
            const updatedName = e.target.name.value;
            const updatedEmail = e.target.email.value;
            const updatedImage = e.target.image.value;

            const data = await updateUserProfile({
                currentEmail: currentUser.email,
                email: updatedEmail,
                name: updatedName,
                image: updatedImage,
            });

            if (data.modifiedCount > 0) {
                alert("Profile updated successfully!");
                window.location.reload();
            } else {
                alert("No changes made.");
            }
        } catch (error) {
            console.error(error);
            alert("Error updating profile.");
        } finally {
            setIsProfileSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Account Settings</h1>
            <p className="text-default-400 text-sm">Update your ArtHub profile details here.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <Card className="md:col-span-1 p-4 flex flex-col items-center justify-center text-center">
                    <div className="flex flex-col items-center gap-4">
                        <img
                            src={currentUser?.image || "https://i.ibb.co.com/bRyYCrnk/Chloe-Miller.png"}
                            alt={currentUser?.name || "Artist Profile"}
                            className="w-32 h-32 rounded-full border-2 border-primary object-cover shadow-sm"
                        />
                        <div>
                            <h3 className="font-semibold text-lg">{currentUser?.name}</h3>
                            <p className="text-xs bg-default-100 px-2 py-1 rounded-full mt-1 capitalize">{currentUser?.role}</p>
                        </div>
                    </div>
                </Card>

                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader className="flex gap-2 items-center px-6 pt-6">
                            <User className="w-5 h-5 text-primary" />
                            <span className="font-semibold text-lg">Profile Details</span>
                        </CardHeader>
                        <hr className="border-default-100 mx-6" />
                        <div className="p-6">
                            <form onSubmit={handleProfileSubmit} className="space-y-4">
                                <Input
                                    name="name"
                                    label="Artist Name"
                                    variant="bordered"
                                    defaultValue={currentUser?.name ?? ""}
                                />

                                <div className="relative flex items-center">
                                    <Input
                                        name="email"
                                        label="Email Address"
                                        variant="bordered"
                                        defaultValue={currentUser?.email ?? ""}
                                        className="w-full"
                                    />
                                    <Mail className="absolute right-4 text-default-400 w-4 h-4 z-10 top-[38%]" />
                                </div>

                                <div className="relative flex items-center">
                                    <Input
                                        name="image"
                                        label="Profile Image URL"
                                        variant="bordered"
                                        defaultValue={currentUser?.image ?? ""}
                                        className="w-full"
                                    />
                                    <Camera className="absolute right-4 text-default-400 w-4 h-4 z-10 top-[38%]" />
                                </div>

                                <Button
                                    type="submit"
                                    isLoading={isProfileSubmitting}
                                    startContent={<Save className="w-4 h-4" />}
                                    className="bg-[#2A1146] rounded-xl text-[#D5ADF9] font-semibold"
                                >
                                    Save Changes
                                </Button>
                            </form>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;