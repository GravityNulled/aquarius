import Modal from "@/components/modal";

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
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

const getdata = async () => {
  const response = await fetch("http://localhost:3000/api/bloodrequest", {
    cache: "force-cache",
  });
  const res = await response.json();
  return res;
};

const Admin = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  const requestInfo: BloodRequest[] = await getdata();
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
                <Modal
                  date={request.date}
                  email={request.email}
                  id={request.id}
                  group={request.group}
                  name={request.name}
                  phone={request.phone}
                  reason={request.reason}
                  status={request.status}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Admin;
