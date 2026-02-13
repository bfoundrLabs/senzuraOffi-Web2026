// @ts-nocheck
import React, { useState, useRef } from "react";
import { UploadIcon, XIcon, Loader2Icon, ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Image",
  placeholder = "https://example.com/image.jpg",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setError("Image must be less than 8MB");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const res = await fetch("/api/upload-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: reader.result }),
          });

          const data = await res.json();

          if (res.ok) {
            onChange(data.url);
          } else {
            setError(data.message || "Upload failed");
          }
        } catch {
          setError("Upload failed. Please try again.");
        }
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      setError("Failed to read file");
      setUploading(false);
    }

    // Reset input so same file can be re-selected
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-[#2E86A7] focus:outline-none focus:ring-1 focus:ring-[#2E86A7] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          {uploading ? (
            <Loader2Icon className="animate-spin" size={16} />
          ) : (
            <UploadIcon size={16} />
          )}
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      {value && (
        <div className="relative mt-2 inline-block">
          <img
            src={value}
            alt="Preview"
            className="h-20 w-20 rounded-lg border border-zinc-200 object-cover dark:border-zinc-700"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -right-2 -top-2 rounded-full bg-red-500 p-0.5 text-white shadow-sm hover:bg-red-600"
          >
            <XIcon size={12} />
          </button>
        </div>
      )}
    </div>
  );
}

interface MultiImageUploadProps {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  label?: string;
}

export function MultiImageUpload({
  value,
  onChange,
  label = "Images (comma separated)",
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const images = value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setError("Image must be less than 8MB");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const res = await fetch("/api/upload-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: reader.result }),
          });

          const data = await res.json();

          if (res.ok) {
            const newValue = value ? `${value}, ${data.url}` : data.url;
            onChange(newValue);
          } else {
            setError(data.message || "Upload failed");
          }
        } catch {
          setError("Upload failed. Please try again.");
        }
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      setError("Failed to read file");
      setUploading(false);
    }

    if (fileRef.current) fileRef.current.value = "";
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages.join(", "));
  };

  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
      )}

      <div className="flex gap-2">
        <textarea
          rows={2}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste URLs or upload images"
          className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-[#2E86A7] focus:outline-none focus:ring-1 focus:ring-[#2E86A7] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-1.5 self-start rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          {uploading ? (
            <Loader2Icon className="animate-spin" size={16} />
          ) : (
            <UploadIcon size={16} />
          )}
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      {images.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {images.map((img, i) => (
            <div key={i} className="relative inline-block">
              <img
                src={img}
                alt={`Image ${i + 1}`}
                className="h-16 w-16 rounded-lg border border-zinc-200 object-cover dark:border-zinc-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.nextElementSibling?.classList.remove("hidden");
                }}
              />
              <div className="hidden h-16 w-16 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                <ImageIcon size={16} className="text-zinc-400" />
              </div>
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute -right-1.5 -top-1.5 rounded-full bg-red-500 p-0.5 text-white shadow-sm hover:bg-red-600"
              >
                <XIcon size={10} />
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="mt-1 text-xs text-zinc-500">
        Enter image URLs separated by commas, or use the Upload button to add
        images. First image will be used as the main image.
      </p>
    </div>
  );
}
