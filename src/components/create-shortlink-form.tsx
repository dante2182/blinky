// src/components/create-shortlink-form.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CreateShortLinkFormProps {}

export const CreateShortLinkForm: React.FC<CreateShortLinkFormProps> = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customShort, setCustomShort] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/shortlinks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalUrl,
          customShort: customShort || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create short link");
      }

      setSuccess("Short link created successfully!");
      setOriginalUrl("");
      setCustomShort("");

      // Refresh the page to show the new link
      router.refresh();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Error Message */}
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Original URL */}
        <div className="space-y-2">
          <label
            htmlFor="originalUrl"
            className="text-sm font-medium text-gray-300"
          >
            Original URL *
          </label>
          <Input
            id="originalUrl"
            type="url"
            placeholder="https://example.com/very-long-url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
          />
        </div>

        {/* Custom Short Code */}
        <div className="space-y-2">
          <label
            htmlFor="customShort"
            className="text-sm font-medium text-gray-300"
          >
            Custom Short Code (optional)
          </label>
          <Input
            id="customShort"
            type="text"
            placeholder="my-custom-link"
            value={customShort}
            onChange={(e) => setCustomShort(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
          />
          <p className="text-xs text-gray-400">
            Leave empty for auto-generated code
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading || !originalUrl.trim()}
        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Creating...
          </>
        ) : (
          "Create Short Link"
        )}
      </Button>
    </form>
  );
};
