"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { TrashBin, CloudArrowUpIn, Heading, CircleDollar, Layers, FileText } from "@gravity-ui/icons";

import { updateArt} from "@/lib/api/arts";
import { getArtById } from "@/lib/actions/arts";

export default function EditArtArtworkForm() {
    const { id } = useParams();
    const router = useRouter();

    // Form States
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");

    // Image States
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [uploadedUrl, setUploadedUrl] = useState("");
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const categories = ["Painting", "Digital Art", "Sculpture", "Photography", "Illustration"];

    useEffect(() => {
        async function loadArtDetails() {
            try {
                const art = await getArtById(id); 
                if (art) {
                    setTitle(art.title);
                    setDescription(art.description);
                    setPrice(art.price.toString());
                    setCategory(art.category);
                    setImagePreview(art.imageUrl);
                    setUploadedUrl(art.imageUrl);
                }
            } catch (error) {
                console.error("Error fetching artwork:", error);
            } finally {
                setIsLoadingData(false);
            }
        }
        if (id) loadArtDetails();
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
            setUploadedUrl(""); 
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview("");
        setUploadedUrl("");
    };

    const validateForm = () => {
        const newErrors = {};
        if (!title.trim() || title.length < 3) newErrors.title = true;
        if (!description.trim() || description.length < 10) newErrors.description = true;
        if (!price || parseFloat(price) <= 0) newErrors.price = true;
        if (!category) newErrors.category = true;
        if (!imagePreview && !uploadedUrl) newErrors.image = true;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (!validateForm()) return;
        setIsSubmitting(true);

        let finalImageUrl = uploadedUrl;

        if (imageFile) {
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
                } else {
                    alert("Failed to upload new image.");
                    setIsSubmitting(false);
                    return;
                }
            } catch (error) {
                console.error("Image upload error:", error);
                setIsSubmitting(false);
                return;
            }
        }

        const updatedArtData = {
            title,
            description,
            price: parseFloat(price),
            category,
            imageUrl: finalImageUrl,
        };

        const res = await updateArt(id, updatedArtData);
        if (res?.success || res?.modifiedCount > 0) {
            alert("Artwork updated successfully!");
            router.push('/dashboard/artist/manageArtworks');
            router.refresh();
        } else {
            alert("Something went wrong or no changes made.");
            setIsSubmitting(false);
        }
    };

    if (isLoadingData) {
        return <div className="text-center text-white mt-20">Loading artwork data...</div>;
    }

    return (
        <div className="w-full max-w-2xl mx-auto mt-10 px-4 py-6 bg-content1 rounded-xl shadow-md border border-divider">
            <Form onSubmit={handleSubmit} className="w-full" validationBehavior="aria">
                <Fieldset className="w-full flex flex-col gap-6">
                    <Fieldset.Legend className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        ✏️ Edit Your Masterpiece
                    </Fieldset.Legend>

                    <Fieldset.Group className="flex flex-col gap-5 w-full">
                        {/* Title */}
                        <TextField isInvalid={hasSubmitted && errors.title} className="w-full">
                            <Label htmlFor="title" className="flex items-center gap-2 text-sm font-medium">
                                <Heading className="w-4 h-4" /> Title
                            </Label>
                            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1" />
                            <FieldError>Title must be at least 3 characters</FieldError>
                        </TextField>

                        {/* Description */}
                        <TextField isInvalid={hasSubmitted && errors.description} className="w-full">
                            <Label htmlFor="description" className="flex items-center gap-2 text-sm font-medium">
                                <FileText className="w-4 h-4" /> Description
                            </Label>
                            <TextArea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1" />
                            <Description className="text-xs text-right">Characters: {description.length}</Description>
                        </TextField>

                        {/* Price & Category */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                            <TextField isInvalid={hasSubmitted && errors.price} className="w-full">
                                <Label htmlFor="price" className="flex items-center gap-2 text-sm font-medium">
                                    <CircleDollar className="w-4 h-4" /> Price ($)
                                </Label>
                                <Input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1" />
                            </TextField>

                            <div className="w-full flex flex-col justify-end">
                                <Label id="category-label" className="text-sm font-medium mb-1">
                                    <Layers className="w-4 h-4 inline mr-2" /> Category
                                </Label>
                                <Select aria-labelledby="category-label" placeholder="Select a category" selectedKey={category} onSelectionChange={(key) => setCategory(key)} isInvalid={hasSubmitted && errors.category}>
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
                            </div>
                        </div>

                        {/* Image Block */}
                        <div className="flex flex-col gap-2 w-full">
                            <Label className="text-sm font-medium"><CloudArrowUpIn className="w-4 h-4 inline mr-2" /> Artwork Image</Label>
                            {!imagePreview ? (
                                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer border-divider p-4">
                                    <CloudArrowUpIn className="w-8 h-8 mb-2 text-muted-foreground" />
                                    <p className="text-sm font-medium">Click to upload new image</p>
                                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                </label>
                            ) : (
                                <div className="relative border rounded-xl p-3 bg-default-50 flex items-center justify-between gap-3 border-divider">
                                    <div className="flex items-center gap-3">
                                        <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded-lg border" />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{imageFile ? imageFile.name : "Current Artwork"}</span>
                                            <span className="text-xs text-success font-medium">{imageFile ? "New image ready" : "Saved URL"}</span>
                                        </div>
                                    </div>
                                    <Button type="button" isIconOnly variant="light" color="danger" onClick={handleRemoveImage}>
                                        <TrashBin className="w-5 h-5" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Fieldset.Group>

                    <Fieldset.Actions className="flex items-center justify-end gap-3 mt-4 w-full">
                        <Button type="button" variant="flat" color="default" onClick={() => router.push('/dashboard/artist')}>
                            Cancel
                        </Button>
                        <Button type="submit" isLoading={isSubmitting} className="font-bold bg-linear-to-r from-[#a78bfa] via-[#c084fc] to-[#f472b6] bg-clip-text text-transparent px-6">
                            {isSubmitting ? "Updating..." : "Update Artwork"}
                        </Button>
                    </Fieldset.Actions>
                </Fieldset>
            </Form>
        </div>
    );
}