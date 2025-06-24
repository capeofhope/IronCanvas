"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { MoreHorizontal } from "lucide-react";
import { Overlay } from "./overlay";
import { formatDistanceToNow } from "date-fns";
import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import { useApiMutation } from "@/convex/hooks/use_api_mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface BoardCardProps {
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavorite: boolean;
}
const BoardCard = ({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });
  const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(
    api.board.favorite
  );
  const { mutate: onUnfavorite, pending: pendingUnfavorite } = useApiMutation(
    api.board.unfavorite
  );
  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await onUnfavorite({ id })
          .then(() => {
            toast.success("Board unfavorited");
          })
          .catch(() => {
            toast.error("Failed to unfavorite board");
          });

        isFavorite = false;
      } else {
        await onFavorite({ id, orgId })
          .then(() => {
            toast.success("Board favorited");
          })
          .catch(() => {
            toast.error("Failed to favorite board");
          });
        isFavorite = true;
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt="Doodle" fill className="object-fill" />
          <Overlay />
          <Actions side={"right"} id={id} title={title}>
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <Footer
          title={title}
          authorLabel={authorLabel}
          isFavorite={isFavorite}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={pendingFavorite || pendingUnfavorite}
        />
      </div>
    </Link>
  );
};
BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg justify-between overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
export default BoardCard;
