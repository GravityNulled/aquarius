"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { toast, useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, MouseEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { BloodRequest } from "@prisma/client";

const Request = () => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [bloodGroup, setBloodGroup] = useState<string>();
  const [reason, setReason] = useState<string>();
  const [date, setDate] = useState<Date>();

  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      const res = await axios.post<BloodRequest>("/api/bloodrequest", {
        name,
        email,
        phone,
        group: bloodGroup,
        reason,
        date,
      });
      toast({
        title: "Schedule: Blood Request",
        description:
          "Your blood request has been received on " +
          format(date!, "dd/MM/yyyy"),
        action: <ToastAction altText="Confirm ok">Ok</ToastAction>,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-1/3">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Blood Request Form</CardTitle>
            <CardDescription>Request details</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Full Name</Label>
              <Input
                onChange={(e) => setName(e.target.value)}
                id="name"
                type="text"
                placeholder=""
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="omar@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                onChange={(e) => setPhone(e.target.value)}
                id="phone"
                type="text"
                placeholder=""
              />
            </div>
            <div className="grid gap-2">
              <Label>Blood group</Label>
              <Select onValueChange={(e) => setBloodGroup(e)}>
                <SelectTrigger className="w-[100%]">
                  <SelectValue placeholder="Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Group A</SelectItem>
                  <SelectItem value="B">Group B</SelectItem>
                  <SelectItem value="O">Group O</SelectItem>
                  <SelectItem value="AB">Group AB</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Reason</Label>
              <Textarea
                onChange={(e) => setReason(e.target.value)}
                placeholder="Type your message here."
                id="message"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} className="w-full">
              Request Blood
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Request;
