"use client";

import React, { useState } from "react";
import {
    Form,
    Button,
    Fieldset,
    TextField,
    Label,
    Input,
    TextArea,
    Description,
    FieldError,
    Select,
    ListBox
} from "@heroui/react";

// Gravity UI Icons
import { TrashBin, CloudArrowUpIn, Heading, CircleDollar, Layers, FileText } from "@gravity-ui/icons";

export default function ArtSubmissionForm() {
    // Form States
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");

    // Image Upload States
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [uploadedUrl, setUploadedUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // Categories list
    const categories = ["Painting", "Digital Art", "Sculpture", "Photography", "Illustration"];

    // Handle local image preview selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
            // ইমেজ সিলেক্ট করলে এরর রিমুভ হবে
            if (hasSubmitted) {
                setErrors(prev => ({ ...prev, image: false }));
            }
        }
    };

    // Remove selected image
    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview("");
        setUploadedUrl("");
        if (hasSubmitted) {
            setErrors(prev => ({ ...prev, image: true }));
        }
    };

    // Validation Function
    const validateForm = () => {
        const newErrors = {};
        if (!title.trim() || title.length < 3) newErrors.title = true;
        if (!description.trim() || description.length < 10) newErrors.description = true;
        if (!price || parseFloat(price) <= 0) newErrors.price = true;
        if (!category) newErrors.category = true;
        if (!imageFile && !uploadedUrl) newErrors.image = true;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);


        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        let finalImageUrl = uploadedUrl;
        if (imageFile && !uploadedUrl) {
            const formData = new FormData();
            formData.append("image", imageFile);

            try {
                const apiKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
                const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();
                if (data.success) {
                    finalImageUrl = data.data.url;
                    setUploadedUrl(finalImageUrl);
                } else {
                    alert("Failed to upload image to imgBB.");
                    setIsSubmitting(false);
                    return;
                }
            } catch (error) {
                console.error("Error uploading image:", error);
                alert("An error occurred during image upload.");
                setIsSubmitting(false);
                return;
            }
        }

        const artData = {
            title,
            description,
            price: parseFloat(price),
            category,
            imageUrl: finalImageUrl,
        };

        console.log("Submitted Art Work Data:", artData);
        alert("Art piece submitted successfully!");
        handleReset();
    };

    const handleReset = () => {
        setTitle("");
        setDescription("");
        setPrice("");
        setCategory("");
        handleRemoveImage();
        setErrors({});
        setHasSubmitted(false);
    };

    return (
        <div className="w-full max-w-2xl mx-auto mt-10 px-4 sm:px-6 py-6 bg-content1 rounded-xl shadow-md border border-divider">
            <Form onSubmit={handleSubmit} onReset={handleReset} className="w-full" validationBehavior="aria">
                <Fieldset className="w-full flex flex-col gap-6">
                    <Fieldset.Legend className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        🎨 Share Your Masterpiece
                    </Fieldset.Legend>

                    <Fieldset.Group className="flex flex-col gap-5 w-full">

                        {/* Title Field */}
                        <TextField
                            isInvalid={hasSubmitted && errors.title}
                            className="w-full"
                        >
                            <Label htmlFor="title" className="flex items-center gap-2 text-sm font-medium">
                                <Heading className="w-4 h-4 text-muted-foreground" /> Title
                            </Label>
                            <Input
                                id="title"
                                placeholder="Enter artwork title"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    if (hasSubmitted) setErrors(prev => ({ ...prev, title: e.target.value.length < 3 }));
                                }}
                                className="mt-1"
                            />
                            <FieldError>Title is required and must be at least 3 characters long</FieldError>
                        </TextField>

                        {/* Description Field */}
                        <TextField
                            isInvalid={hasSubmitted && errors.description}
                            className="w-full"
                        >
                            <Label htmlFor="description" className="flex items-center gap-2 text-sm font-medium">
                                <FileText className="w-4 h-4 text-muted-foreground" /> Description
                            </Label>
                            <TextArea
                                id="description"
                                aria-describedby="description-count"
                                placeholder="Tell the story behind your art..."
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    if (hasSubmitted) setErrors(prev => ({ ...prev, description: e.target.value.length < 10 }));
                                }}
                                className="mt-1"
                            />
                            <div className="flex justify-between items-center mt-1 w-full">
                                {hasSubmitted && errors.description ? (
                                    <p className="text-xs text-danger">Description must be at least 10 characters long</p>
                                ) : <div />}
                                <Description id="description-count" className="text-xs text-right text-muted-foreground">
                                    Characters: {description.length}
                                </Description>
                            </div>
                        </TextField>

                        {/* Price & Category Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                            {/* Price Field */}
                            <TextField isInvalid={hasSubmitted && errors.price} className="w-full">
                                <Label htmlFor="price" className="flex items-center gap-2 text-sm font-medium">
                                    <CircleDollar className="w-4 h-4 text-muted-foreground" /> Price ($)
                                </Label>
                                <Input
                                    id="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={price}
                                    onChange={(e) => {
                                        setPrice(e.target.value);
                                        if (hasSubmitted) setErrors(prev => ({ ...prev, price: !e.target.value || parseFloat(e.target.value) <= 0 }));
                                    }}
                                    className="mt-1"
                                />
                                <FieldError>Please enter a valid price greater than 0</FieldError>
                            </TextField>

                            {/* Category Field */}
                            <div className="w-full flex flex-col justify-end">
                                <Label id="category-label" className="flex items-center gap-2 text-sm font-medium mb-1">
                                    <Layers className="w-4 h-4 text-muted-foreground" /> Category
                                </Label>
                                <Select
                                    aria-labelledby="category-label"
                                    placeholder="Select a category"
                                    selectedKey={category}
                                    onSelectionChange={(key) => {
                                        setCategory(key);
                                        if (hasSubmitted) setErrors(prev => ({ ...prev, category: !key }));
                                    }}
                                    isInvalid={hasSubmitted && errors.category}
                                >
                                    <Select.Trigger>
                                        <Select.Value>{category || "Choose art style"}</Select.Value>
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover>
                                        <ListBox>
                                            {categories.map((cat) => (
                                                <ListBox.Item key={cat} id={cat} textValue={cat}>
                                                    <Label>{cat}</Label>
                                                </ListBox.Item>
                                            ))}
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                                {hasSubmitted && errors.category && (
                                    <p className="text-xs text-danger mt-1">Please select a category</p>
                                )}
                            </div>
                        </div>

                        {/* Image Upload Block via imgBB */}
                        <div className="flex flex-col gap-2 w-full">
                            <Label className="flex items-center gap-2 text-sm font-medium">
                                <CloudArrowUpIn className="w-4 h-4 text-muted-foreground" /> Artwork Image
                            </Label>

                            {!imagePreview ? (
                                <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer hover:bg-default-100 transition duration-200 text-center p-4
                                    ${hasSubmitted && errors.image ? 'border-danger bg-danger-50/20' : 'border-divider'}`}
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <CloudArrowUpIn className={`w-8 h-8 mb-2 animate-bounce ${hasSubmitted && errors.image ? 'text-danger' : 'text-muted-foreground'}`} />
                                        <p className={`text-sm font-medium ${hasSubmitted && errors.image ? 'text-danger' : 'text-foreground/80'}`}>Click to upload image</p>
                                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG, or WEBP up to 32MB</p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            ) : (
                                <div className={`relative border rounded-xl p-3 bg-default-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3
                                    ${hasSubmitted && errors.image ? 'border-danger' : 'border-divider'}`}
                                >
                                    <div className="flex items-center gap-3 w-full sm:w-auto min-w-0">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-16 h-16 flex-shrink-0 object-cover rounded-lg border border-divider"
                                        />
                                        <div className="flex flex-col min-w-0 w-full">
                                            <span className="text-sm font-medium truncate max-w-[200px] sm:max-w-[260px]">
                                                {imageFile?.name || "Selected Artwork"}
                                            </span>
                                            <span className="text-xs text-success font-medium">
                                                {uploadedUrl ? "Uploaded to imgBB" : "Ready to upload"}
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        isIconOnly
                                        variant="light"
                                        color="danger"
                                        onClick={handleRemoveImage}
                                        title="Remove Image"
                                        className="self-end sm:self-auto"
                                    >
                                        <TrashBin className="w-5 h-5" />
                                    </Button>
                                </div>
                            )}
                            {hasSubmitted && errors.image && (
                                <p className="text-xs text-danger">An artwork image is required</p>
                            )}
                        </div>

                    </Fieldset.Group>

                    {/* Form Actions */}
                    <Fieldset.Actions className="flex flex-wrap items-center justify-end gap-3 mt-4 w-full">
                        <Button type="reset" variant="flat" color="default" className="w-full sm:w-auto order-2 sm:order-1">
                            Reset Form
                        </Button>
                        <Button
                            type="submit"
                            variant="light" 
                            isLoading={isSubmitting}
                            className="w-full sm:w-auto font-bold shadow-sm border border-purple-200 dark:border-purple-900/30 order-1 sm:order-2 px-6"
                        >
                            {isSubmitting ? (
                                <span className="text-purple-500">Uploading Art...</span>
                            ) : (
                                <span className="bg-linear-to-r from-[#a78bfa] via-[#c084fc] to-[#f472b6] bg-clip-text text-transparent">
                                    Publish Artwork
                                </span>
                            )}
                        </Button>
                    </Fieldset.Actions>
                </Fieldset>
            </Form>
        </div>
    );
}