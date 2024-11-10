"use client";

import React from "react";
import { Container } from "./container";
import ReactStories from "react-insta-stories";
import { X } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

type StoryItem = {
  id: number;
  imageUrl: string;
};

type Story = {
  id: number;
  previewImageUrl: string;
  items: StoryItem[];
};

const storieItems = [
  {
    id: 1,
    previewImageUrl: "/stories/how-to-pay-background.png",
    items: [
      {
        id: 1,
        imageUrl: "/stories/how-to-pay.png",
      },
    ],
  },
];

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = React.useState<Story[]>(storieItems);
  const [open, setOpen] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState<Story>();

  const onClickStory = (story: Story) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  return (
    <>
      <Container
        className={cn(
          "flex items-center justify-between gap-2 my-10",
          className
        )}
      >
        {stories.length === 0 &&
          [...Array(6)].map((_, index) => (
            <div
              key={index}
              className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse"
            />
          ))}
        {stories.map((story) => (
          <img
            key={story.id}
            onClick={() => onClickStory(story)}
            className="rounded-md cursor-pointer object-cover"
            height={250}
            width={200}
            src={story.previewImageUrl}
          />
        ))}
      </Container>
      {open && (
        <div className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-50">
          <div className="relative" style={{ width: 520 }}>
            <button
              className="absolute -right-10 -top-5 z-30"
              onClick={() => setOpen(false)}
            >
              <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
            </button>
            <ReactStories
              onAllStoriesEnd={() => setOpen(false)}
              stories={
                selectedStory?.items.map((item) => ({ url: item.imageUrl })) ||
                []
              }
              defaultInterval={30000}
              width={520}
              height={800}
            />
          </div>
        </div>
      )}
    </>
  );
};
