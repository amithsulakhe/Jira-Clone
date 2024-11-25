"use client";
import { deleteProject } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { useOrganization } from "@clerk/nextjs";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

export default function DeleteProject({ projectId }) {
  const { membership } = useOrganization();
  const router = useRouter();

  const {
    data: deleted,
    error,
    loading: isDeleting,
    fn: deleteProjectFn,
  } = useFetch(deleteProject);

  const handleDelete = () => {
    if (window.confirm("Are Sure want to Delete this Project?")) {
      deleteProjectFn(projectId);
    }
  };

  useEffect(() => {
    if (deleted?.success) {
      toast.error("Project Deleted Successfully");
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleted]);
  const isAdmin = membership?.role === "org:admin";
  if (!isAdmin) return null;
  return (
    <>
      <Button
        disabled={isDeleting}
        onClick={handleDelete}
        className={`${isDeleting ? "animate-pulse" : ""}`}
        size="sm"
        variant="ghost"
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </>
  );
}
