import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container my-2 mx-auto px-10">
      <Image
        src="/images/background.jpg"
        alt="blood donation"
        width={500}
        height={500}
        className="object-cover w-full"
      />
      <h1 className="text-4xl font-bold text-center my-10">
        About blood donation
      </h1>
      <div className="flex flex-col w-[500px]">
        <p className="mt-5">
          A single act of <span className="font-bold">donating blood</span> has
          the potential to save up to three lives, underscoring the importance
          of
          <span className="font-bold"> sustainable</span> and
          <span className="font-bold"> reliable blood services</span>. These
          services are vital for maintaining a healthy society and for
          effectively addressing both expected and unforeseen emergencies.
        </p>
        <p className="mt-5">
          The versatility of <span className="font-bold">blood</span> makes it
          invaluable for various life-saving purposes. It aids patients in
          <span className="font-bold"> surgical procedures</span>, serves as a
          crucial treatment for ailments like
          <span className="font-bold"> anaemia</span> and
          <span className="font-bold"> malaria</span>, provides essential care
          for individuals undergoing
          <span className="font-bold"> chemotherapy</span>, and offers support
          to women experiencing
          <span className="font-bold"> childbirth complications</span>.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          className="px-2 py-3 border block w-[200px] mt-2 bg-black text-white"
          href="/donate"
        >
          Book an Appointment
        </Link>
        <Link
          className="px-2 py-3 border block w-[200px] mt-2 bg-black text-white"
          href="/request"
        >
          Request Blood
        </Link>
      </div>
    </div>
  );
}
