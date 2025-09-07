"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateLogo, LoadingLogo, RocketLogo } from "../icons/logos";

interface ValidationIssue {
  message: string;
}

interface ApiError {
  error?: string;
  details?: {
    issues: ValidationIssue[];
  };
}
export default function CreateLink() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customShort, setCustomShort] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isOpen, setIsOpen] = useState(false);
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
        if (data.error === "URL already exists") {
          throw new Error("Esta URL ya existe. Intenta con otra.");
        } else if (data.error === "Custom short code already taken") {
          throw new Error(
            "Este codigo personalizado ya esta en uso. Intenta con otro."
          );
        } else if (data.details?.issues) {
          const issues = data.details.issues
            .map((issue: ValidationIssue) => issue.message)
            .join(", ");
          throw new Error(`Error de validacion: ${issues}`);
        } else {
          throw new Error(data.error || "Error al crear el enlace corto.");
        }
      }

      setSuccess("¡Enlace corto creado con éxito!");
      setOriginalUrl("");
      setCustomShort("");
      setTimeout(() => {
        setIsOpen(false);
        router.refresh();
      }, 1500);
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Error al crear el enlace corto"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset form when closing
      setOriginalUrl("");
      setCustomShort("");
      setError("");
      setSuccess("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <CreateLogo />
          Create Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create new link</DialogTitle>
          </DialogHeader>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-3 py-2 rounded text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-900/50 border border-green-500 text-green-200 px-3 py-2 rounded text-sm">
              {success}
            </div>
          )}

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="originalUrl">Destination URL:</Label>
              <Input
                id="originalUrl"
                type="url"
                placeholder="https://example.com/very-long-url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="customShort">Short link:</Label>
              <Input
                id="customShort"
                type="text"
                placeholder="my-custom-link (optional)"
                value={customShort}
                onChange={(e) => setCustomShort(e.target.value)}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Leave empty for auto-generated code
              </p>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading || !originalUrl.trim()}>
              {isLoading ? (
                <>
                  <LoadingLogo />
                  Creating...
                </>
              ) : (
                <>
                  <RocketLogo />
                  Create Link
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
