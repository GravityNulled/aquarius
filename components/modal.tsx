"use client";

import { BloodRequest } from "@prisma/client";
import { toast, useToast } from "@/components/ui/use-toast";
import React, { FC, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { ToastAction } from "./ui/toast";

const Modal: FC<BloodRequest> = ({ id, name }) => {
  const [requestStatus, setRequestStatus] = useState<string>("Pending");

  const handleSubmit = async () => {
    const res = await axios.patch("/api/bloodrequest", {
      id: id,
      status: requestStatus,
    });
    if (res.status === 200) {
      toast({
        variant: "default",
        title: "Request updated",
        description: "Request status updated successfully",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Request Error",
        description: "Something went wrong",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Request</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Request</DialogTitle>
          <DialogDescription>Edit the request status</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} className="col-span-3" disabled />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              ID
            </Label>
            <Input id="name" value={id} className="col-span-3" readOnly />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Status</Label>
            <Select onValueChange={(e) => setRequestStatus(e)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="w-[200px]">
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
