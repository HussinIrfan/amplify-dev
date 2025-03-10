"use client";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useState } from "react";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);

// Generate the Amplify client
const client = generateClient<Schema>();

// Define the type for sizes and quantities
type SizeQuantities = {
  [key: string]: { checked: boolean; quantity: number };
};

// Add Product Edit Form component
const ProductEditForm = ({
  product,
  onSave,
  onCancel,
  isNewProduct,
}: {
  product: any;
  onSave: (updatedProduct: any) => void;
  onCancel: () => void;
  isNewProduct?: boolean;
}) => {
  // State for product fields
  const [name, setName] = useState(product.name || "");
  const [slug, setSlug] = useState(product.slug || "");
  const [price, setPrice] = useState(product.price || "");
  const [description, setDescription] = useState(product.description || "");
  const [photo, setPhoto] = useState<File | null>(null);
  const [defaultQuantity, setDefaultQuantity] = useState(product.defaultQuantity || 0);
  const [isFormVisible, setIsFormVisible] = useState(true); // Always show the form when editing

  // State for sizes and quantities
  const [sizes, setSizes] = useState<SizeQuantities>({
    S: { checked: false, quantity: 0 },
    M: { checked: false, quantity: 0 },
    L: { checked: false, quantity: 0 },
    XL: { checked: false, quantity: 0 },
  });

  // Generate slug from the name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-"); // Remove consecutive hyphens
  };
  

  // Handle photo upload
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  // Handle size checkbox change
  const handleSizeChange = (size: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSizes({
      ...sizes,
      [size]: { ...sizes[size], checked: e.target.checked },
    });
  };

  // Handle quantity input change
  const handleQuantityChange = (size: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSizes({
      ...sizes,
      [size]: { ...sizes[size], quantity: parseInt(e.target.value) || 0 },
    });
  };

  // Handle form submission
  const handleSave = async () => {
    // Validate name and description length
    if (name.length > 26) {
      alert("Product name must be 26 characters or less.");
      return;
    }
    if (description.length > 120) {
      alert("Product description must be 120 characters or less.");
      return;
    }

    // Prepare the product data
    const updatedProduct = {
      ...product,
      name,
      price: parseFloat(price), // Ensure price is a number
      description,
      photo,
      slug, // Now uses the generated slug from state
      defaultQuantity,
      variants: Object.entries(sizes)
        .filter(([_, value]) => value.checked) // Only include checked sizes
        .map(([size, value]) => ({
          size,
          quantity: value.quantity,
        })),
    };

    // Pass the updated product to the parent component
    onSave(updatedProduct);

    // If the product has an ID, update it. Otherwise, create a new product.
    if (product.id) {
      await updateProduct(updatedProduct); // Update existing product
    } else {
      await createProduct(updatedProduct); // Create new product
    }
  };

  // Update an existing product
  const updateProduct = async (updatedProduct: any) => {
    try {
      // Prepare product data for update
      const updatedData = {
        id: updatedProduct.id, // Include the product ID for updating
        name: updatedProduct.name,
        basePrice: updatedProduct.price,
        imageUrl: updatedProduct.photo ? URL.createObjectURL(updatedProduct.photo) : "", // Temporary URL until stored in S3
        slug: updatedProduct.slug,
        description: updatedProduct.description,
      };

      // Update product in the database
      const pushData = await client.models.Product.update(updatedData);
      console.log("Product updated:", pushData);

      alert("Product successfully updated!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  // Create a new product
  const createProduct = async (updatedProduct: any) => {
    try {
      // Prepare product data for creation
      const newProduct = {
        name: updatedProduct.name,
        basePrice: updatedProduct.price,
        imageUrl: updatedProduct.photo ? URL.createObjectURL(updatedProduct.photo) : "", // Temporary URL until stored in S3
        slug: updatedProduct.slug,
        description: updatedProduct.description,
      };

      // Create product in the database
      const pushData = await client.models.Product.create(newProduct);
      console.log("Product created:", pushData);

      alert("Product successfully added!");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product.");
    }
  };

  return (
    <div className="product-edit-form">
      <h3>{isNewProduct ? "Add New Product" : "Edit Product"}</h3>

      {/* Product Name */}
      <label>Product Name (Max 26 characters)</label>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setSlug(generateSlug(e.target.value)); // Auto-generate slug
        }}
        maxLength={26}
      />
      { /* Product Slug (Autogenerated)*/}
      <label>Product Link</label>
      <input
        type="text"
        value={slug}
        readOnly
        className="slug-input"
        />

      {/* Price */}
      <label>Price</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      {/* Description */}
      <label>Description (Max 120 characters)</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={120}
      />

      {/* Default Quantity */}
      <label>Default Quantity</label>
      <input
        type="number"
        value={defaultQuantity}
        onChange={(e) => setDefaultQuantity(parseInt(e.target.value) || 0)}
      />

      {/* Upload Photo */}
      <label>Upload Photo</label>
      <input type="file" accept="image/*" onChange={handlePhotoChange} />

      {/* Sizes and Quantities */}
      <label>Sizes</label>
      <div className="size-quantity-section">
        {Object.entries(sizes).map(([size, value]) => (
          <div key={size} className="size-quantity-input">
            <label>
              <input
                type="checkbox"
                checked={value.checked}
                onChange={handleSizeChange(size)}
              />
              {size}
            </label>
            {value.checked && (
              <input
                type="number"
                placeholder="Quantity"
                value={value.quantity}
                onChange={handleQuantityChange(size)}
              />
            )}
          </div>
        ))}
      </div>

      {/* Save and Cancel Buttons */}
      <div className="form-actions">
        <button onClick={handleSave}>{isNewProduct ? "Add Product" : "Save Product"}</button>
        <button onClick={onCancel} className="cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProductEditForm;