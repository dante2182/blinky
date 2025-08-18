// src/components/shortlinks-table.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ButtonDelete from "./buttondelete";
import { CheckLogo, CopyLogo, EyeLogo } from "../icons/logos";

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
                    variant="default"
                    size="sm"
                    onClick={() => handleCopy(link.short)}
                    className="text-gray-400 hover:text-white h-8 w-8 p-0"
                  >
                    {copiedId === link.short ? <CopyLogo /> : <CheckLogo />}
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
                    variant="default"
                    size="sm"
                    onClick={() => window.open(`/${link.short}`, "_blank")}
                    className="text-gray-400 text-xs"
                  >
                    <EyeLogo />
                  </Button>
                  <ButtonDelete
                    id={link.id}
                    onDelete={handleDelete}
                    loading={loadingId === link.id}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
