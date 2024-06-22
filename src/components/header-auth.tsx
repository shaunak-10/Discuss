"use client";

import {
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Divider,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function HeaderAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();

  let authContent: React.ReactNode;

  if (session.status === "loading") {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={session.data.user.image || ""} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <Avatar size="lg" src={session.data.user.image || ""} />
              <div>
                <p className="text-lg font-bold">{session.data.user.name}</p>
                <p className="text-sm text-gray-400">
                  {session.data.user.email}
                </p>
              </div>
            </div>
            <Divider />
            {children}
            <form action={actions.signOut}>
              <Button type="submit" className="w-full">
                Sign Out
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <Popover placement="left">
        <PopoverTrigger>
          <Button color="primary">Sign In</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4 flex flex-col gap-4">
            <form action={actions.signInWithGoogle}>
              <Button type="submit" color="primary" variant="flat">
                <GoogleIcon />
                Sign In with Google
              </Button>
            </form>
            <form action={actions.signInWithGithub}>
              <Button type="submit" color="primary" variant="flat">
                <GitHubIcon />
                Sign In with GitHub
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return authContent;
}
