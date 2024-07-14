"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import prisma from "@/lib/db";

export default function () {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  async function postData(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
  }

  return (
    <div>
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Your Notes</h1>
          <p className="text-lg text-muted-foreground">
            Organize, update, and delete your notes effortlessly. Start by
            creating a new note with just a click.
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen((prev) => !prev)}>
          <Plus className="mr-2 h-3 w-3" /> Create New Note
        </Button>
      </div>
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Note</DialogTitle>
            <DialogDescription>
              Effortlessly add, edit, or delete your notes with ease
            </DialogDescription>
          </DialogHeader>

          <form className="w-full py-4 space-y-8" action={}>
            <div className="w-full">
              <Label htmlFor="title" className="mb-2 block">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Enter your title here..."
              />
            </div>
            <div className="w-full">
              <Label htmlFor="description" className="mb-2 block">
                Description
              </Label>
              <Textarea
                name="description"
                id="description"
                placeholder="Enter your description here..."
              />
            </div>
          </form>

          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
