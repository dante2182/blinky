"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ShortLink {
  id: string;
  short: string;
  originalUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface ShortLinksTableProps {
  shortLinks: ShortLink[];
}

export const ShortLinksTable: React.FC<ShortLinksTableProps> = ({
  shortLinks,
}) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this link?")) {
      return;
    }

    setLoadingId(id);

    try {
      const response = await fetch(`/api/shortlinks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete link");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting link:", error);
      alert("Failed to delete link");
    } finally {
      setLoadingId(null);
    }
  };

  const handleCopy = async (shortCode: string) => {
    const fullUrl = `${window.location.origin}/${shortCode}`;

    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopiedId(shortCode);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (shortLinks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">No links created yet</div>
        <div className="text-gray-500 text-sm">
          Create your first short link using the form above
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="pb-3 text-gray-300 font-medium">Short Link</th>
            <th className="pb-3 text-gray-300 font-medium">Original URL</th>
            <th className="pb-3 text-gray-300 font-medium">Created</th>
            <th className="pb-3 text-gray-300 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shortLinks.map((link) => (
            <tr key={link.id} className="border-b border-gray-700/50">
              <td className="py-4">
                <div className="flex items-center space-x-2">
                  <code className="bg-gray-700 px-2 py-1 rounded text-blue-300 text-sm">
                    /{link.short}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(link.short)}
                    className="text-gray-400 hover:text-white h-8 w-8 p-0"
                  >
                    {copiedId === link.short ? (
                      <svg
                        className="w-4 h-4 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </Button>
                </div>
              </td>

              <td className="py-4">
                <div className="max-w-xs truncate text-gray-300 text-sm">
                  <a
                    href={link.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors"
                    title={link.originalUrl}
                  >
                    {link.originalUrl}
                  </a>
                </div>
              </td>

              <td className="py-4 text-gray-400 text-sm">
                {formatDate(link.createdAt)}
              </td>

              <td className="py-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(`/${link.short}`, "_blank")}
                    className="text-gray-400 hover:text-blue-400 text-xs"
                  >
                    Visit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(link.id)}
                    disabled={loadingId === link.id}
                    className="text-gray-400 hover:text-red-400 text-xs"
                  >
                    {loadingId === link.id ? (
                      <svg
                        className="w-3 h-3 animate-spin"
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
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
