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
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const Donate = () => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [age, setAge] = useState<number>();
  const [weight, setWeight] = useState<number>();
  const [date, setDate] = useState<Date>();

  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      const res = await axios.post<IDonation>("/api/donate", {
        name,
        email,
        phone,
        age,
        weight,
        date,
        gender,
      });

      toast({
        title: "Schedule: Appointment",
        description:
          "Your appointment has been scheduled on " +
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
            <CardTitle className="text-2xl">Appointment Form</CardTitle>
            <CardDescription>Fill in the appoitment</CardDescription>
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
              <Label htmlFor="age">Age</Label>
              <Input
                onChange={(e) => setAge(e.target.valueAsNumber)}
                id="age"
                type="number"
                placeholder=""
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="age">Weight</Label>
              <Input
                onChange={(e) => setWeight(e.target.valueAsNumber)}
                id="weight"
                type="number"
                placeholder=""
              />
            </div>
            <div className="grid gap-2">
              <Label>Gender</Label>
              <Select onValueChange={(e) => setGender(e)}>
                <SelectTrigger className="w-[100%]">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
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
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} className="w-full">
              Book an Appointment
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Donate;
