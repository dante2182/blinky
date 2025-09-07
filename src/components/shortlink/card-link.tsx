"use client";

import React, { useState, useEffect } from "react";
import { CheckLogo, CopyLogo, EyeLogo } from "../icons/logos";
import { ShortLink } from "@/types/shortlink.tipe";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import ButtonDelete from "./buttondelete";
import dayjs from "dayjs";

interface CardLinkProps {
  shortLinks: ShortLink[];
}

export const CardLinks: React.FC<CardLinkProps> = ({ shortLinks }) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [origin, setOrigin] = useState<string>("");
  const router = useRouter();

  // Establecer el origin solo en el cliente
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

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
    // Solo proceder si origin está disponible (cliente)
    if (!origin) return;

    const fullUrl = `${origin}/${shortCode}`;

    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopiedId(shortCode);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format("MMM D, YYYY");
  };

  return (
    <>
      {shortLinks.map((link) => (
        <div
          key={link.id}
          className="rounded-md p-3 border border-neutral-500 bg-card/80 hover:bg-card/50 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <a
                href={`/${link.short}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-card-foreground hover:text-foreground transition-colors"
              >
                /{link.short}
              </a>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(link.short)}
                className="h-8 w-8 p-0 text-muted-foreground"
              >
                {copiedId === link.short ? <CheckLogo /> : <CopyLogo />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(`/${link.short}`, "_blank")}
                className="h-8 w-8 p-0 text-muted-foreground"
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
          <p className="mt-2 block text-sm text-muted-foreground truncate transition-colors">
            {link.originalUrl}
          </p>
          <div className="flex items-center justify-end">
            <span className="text-xs text-muted-foreground/70">
              {formatDate(link.createdAt)}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};
