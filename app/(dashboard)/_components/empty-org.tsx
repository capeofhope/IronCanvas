import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import Image from "next/image";

export const EmptyOrg = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src={"/elements.svg"} alt="" width={150} height={150} />
      <h2 className="text-3xl font-semibold mt-6">Welcome to IronCanvas</h2>
      <p className="text-muted-foreground text-1xl mt-2 ">
        Create an organization to get started
      </p>
      <div className="mt-6">
        <Dialog>
          <DialogTitle></DialogTitle>
          <DialogTrigger>
            <Button size={"lg"}>Create organization</Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
