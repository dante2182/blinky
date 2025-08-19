"use client";

import React, { useState } from "react";
import { CheckLogo, CopyLogo, EyeLogo } from "../icons/logos";
import { ShortLink } from "@/types/shortlink.tipe";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import ButtonDelete from "./buttondelete";

interface CardLinkProps {
  shortLinks: ShortLink[];
}

export const CardLinks: React.FC<CardLinkProps> = ({ shortLinks }) => {
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
    });
  };

  return (
    <>
      {shortLinks.map((link) => (
        <div
          key={link.id}
          className="rounded-lg p-4 border border-gray-500 transition-all duration-400 hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between mb-4">
            <a
              href={`/${link.short}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-bold text-gray-200 flex items-center"
            >
              <span className="text-3xl font-semibold">/</span>
              {link.short}
            </a>
            <div className="flex items-center">
              <Button
                variant="link"
                size="sm"
                onClick={() => handleCopy(link.short)}
                className="text-muted-foreground hover:text-blue-500"
              >
                {copiedId === link.short ? <CheckLogo /> : <CopyLogo />}
              </Button>
              <Button
                variant="link"
                size="sm"
                onClick={() => window.open(`/${link.short}`, "_blank")}
                className="text-muted-foreground hover:text-blue-500"
              >
                <EyeLogo />
              </Button>
              <ButtonDelete
                id={link.id}
                onDelete={handleDelete}
                loading={loadingId === link.id}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2 mt-4">
            <div className="p-2 rounded-md flex items-center justify-between">
              <p className="text-blue-500 hover:text-blue-400 cursor-pointer transition-colors">
                {link.originalUrl}
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <span className="text-muted-foreground text-sm">
              {formatDate(link.createdAt)}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};
