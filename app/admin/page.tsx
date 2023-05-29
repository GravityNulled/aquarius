"use client";

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

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { BloodRequest } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

const Admin = () => {
  const [requestInfo, setRequestInfo] = useState<BloodRequest[]>();
  const [requestStatus, setRequestStatus] = useState<string>("Pending");
  const [idRequest, setIdRequest] = useState<string>("");

  useEffect(() => {
    const data = async () => {
      const response = await fetch("http://localhost:3000/api/bloodrequest", {
        cache: "no-store",
      });
      const res = await response.json();
      setRequestInfo(res);
    };
    data();
  }, []);

  return (
    <div className="mt-10 container w-full p-4 md:w-5/6 mx-auto">
      <h1 className="text-3xl font-medium mb-5 text-center uppercase">
        Welcome Admin
      </h1>
      <p className="text-center mb-5 font-semibold">
        Here you can see all the requests
      </p>
      <Table className="w-3/4 mx-auto">
        <TableCaption>A list of Blood Requests.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requestInfo?.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">{request.name}</TableCell>
              <TableCell>{request.phone}</TableCell>
              <TableCell>{request.reason}</TableCell>
              <TableCell className="text-right">{request.status}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Edit Request</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Request</DialogTitle>
                      <DialogDescription>
                        Edit the request status
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={request.name}
                          className="col-span-3"
                          disabled
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          ID
                        </Label>
                        <Input
                          id="name"
                          value={request.id}
                          className="col-span-3"
                          readOnly
                        />
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
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Admin;
