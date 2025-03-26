"use client";

import { generateClient } from "aws-amplify/data";
import { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);

const client = generateClient<any>();

type SizeQuantities = {
  [key: string]: { checked: boolean; quantity: number };
};

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
  const [name, setName] = useState(product.name || "");
  const [slug, setSlug] = useState(product.slug || "");
  const [price, setPrice] = useState(product.price || "");
  const [description, setDescription] = useState(product.description || "");
  const [defaultQuantity, setDefaultQuantity] = useState(product.defaultQuantity || 0);
  const [photo, setPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(product.imageUrl || "/default_stor_image.jpg");
  const [isUploading, setIsUploading] = useState(false);

  const [sizes, setSizes] = useState<SizeQuantities>({
    S: { checked: false, quantity: 0 },
    M: { checked: false, quantity: 0 },
    L: { checked: false, quantity: 0 },
    XL: { checked: false, quantity: 0 },
  });

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSizeChange = (size: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSizes({
      ...sizes,
      [size]: { ...sizes[size], checked: e.target.checked },
    });
  };

  const handleQuantityChange = (size: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSizes({
      ...sizes,
      [size]: { ...sizes[size], quantity: parseInt(e.target.value) || 0 },
    });
  };

  const uploadPhoto = async (file: File): Promise<string> => {
    // Implement your actual photo upload logic here
    // This is a placeholder - replace with your S3 upload code
    console.log("Uploading file:", file.name);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("/default_stor_image.jpg"); // Return your actual uploaded URL
      }, 1000);
    });
  };

  const handleSave = async () => {
    if (name.length > 26) {
      alert("Product name must be 26 characters or less.");
      return;
    }
    if (description.length > 120) {
      alert("Product description must be 120 characters or less.");
      return;
    }

    setIsUploading(true);
    let imageUrl = product.imageUrl; // Keep existing URL for edits

    try {
      if (isNewProduct || photo) {
        imageUrl = photo 
          ? await uploadPhoto(photo) 
          : "/default_stor_image.jpg";
      }

      const updatedProduct = {
        ...product,
        name,
        price: parseFloat(price),
        description,
        slug,
        defaultQuantity,
        imageUrl,
        variants: Object.entries(sizes)
          .filter(([_, value]) => value.checked)
          .map(([size, value]) => ({
            size,
            quantity: value.quantity,
          })),
      };

      onSave(updatedProduct);

      if (product.id) {
        await updateProduct(updatedProduct);
      } else {
        await createProduct(updatedProduct);
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const updateProduct = async (updatedProduct: any) => {
    try {
      const updatedData = {
        id: updatedProduct.id,
        name: updatedProduct.name,
        basePrice: updatedProduct.price,
        imageUrl: updatedProduct.imageUrl,
        slug: updatedProduct.slug,
        description: updatedProduct.description,
      };

      const pushData = await client.models.Product.update(updatedData);
      console.log("Product updated:", pushData);
      alert("Product successfully updated!");
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  const createProduct = async (updatedProduct: any) => {
    try {
      const newProduct = {
        name: updatedProduct.name,
        basePrice: updatedProduct.price,
        imageUrl: updatedProduct.imageUrl,
        slug: updatedProduct.slug,
        description: updatedProduct.description,
      };

      const pushData = await client.models.Product.create(newProduct);
      console.log("Product created:", pushData);
      alert("Product successfully added!");
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  };

  return (
    <div className="product-edit-form">
      <h3>{isNewProduct ? "Add New Product" : "Edit Product"}</h3>

      <label>Product Name (Max 26 characters)</label>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setSlug(generateSlug(e.target.value));
        }}
        maxLength={26}
      />

      <label>Product Link</label>
      <input type="text" value={slug} readOnly className="slug-input" />

      <label>Price</label>
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

      <label>Description (Max 120 characters)</label>
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        maxLength={120} 
      />

      <label>Default Quantity</label>
      <input
        type="number"
        value={defaultQuantity}
        onChange={(e) => setDefaultQuantity(parseInt(e.target.value) || 0)}
      />

      <label>Upload Photo</label>
      <input type="file" accept="image/*" onChange={handlePhotoChange} />

      <div className="image-preview">
        <img
          src={previewUrl}
          alt="Product preview"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/default_stor_image.jpg";
          }}
          style={{ 
            maxWidth: "100px", 
            maxHeight: "100px",
            marginTop: "10px",
            display: previewUrl ? "block" : "none"
          }}
        />
      </div>

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

      <div className="form-actions">
        <button 
          onClick={handleSave} 
          disabled={isUploading}
        >
          {isUploading ? "Saving..." : isNewProduct ? "Add Product" : "Save Product"}
        </button>
        <button onClick={onCancel} className="cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProductEditForm;