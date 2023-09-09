import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { TypographyH1 } from "@/components/typography/typographyH1"
import { MoreHorizontal, Users2 } from "lucide-react"
import FriendData from "@/public/friendData"

const friendData = FriendData

// Helper function to calculate the number of days between two dates
function calculateDaysAgo(dateString: string): number {
  const currentDate = new Date();
  const lastMessagedDate = new Date(dateString);
  const timeDifference = currentDate.getTime() - lastMessagedDate.getTime();
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return daysAgo;
}

// Helper function to format a date relative to today
function formatDateBasedOnDistance(inputDate: string): string {
  // Parse the input date string
  const inputDateObj = new Date(inputDate);
  const currentDate = new Date();

  // Calculate the difference in days between the two dates
  const timeDifference = inputDateObj.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  if (daysDifference <= 0) {
    // Handle dates in the past (not expected in this case)
    return "Invalid date";
  } else if (daysDifference <= 7) {
    // Within the current week
    const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][inputDateObj.getUTCDay()];
    return `This ${dayOfWeek}`;
  } else if (daysDifference <= 14) {
    // On or before the Sunday of the next week
    const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][inputDateObj.getUTCDay()];
    return `Next ${dayOfWeek}`;
  } else {
    // After the Sunday of the next week
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return inputDateObj.toLocaleDateString(undefined, options);
  }
}


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-row justify-between " >
          <div className="flex flex-row gap-6">
            <Users2 className="h-12 w-12" />
            <TypographyH1>
              Rememberly
            </TypographyH1>
          </div>
          <div className="flex items-center">
            <Button>Add friend</Button>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <Input placeholder="Search for a friend" />
          <DropdownMenu>
            <DropdownMenuTrigger><Button variant="outline">Sort</Button></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Sort</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Recently spoken to</DropdownMenuItem>
              <DropdownMenuItem>Oldest spoken to</DropdownMenuItem>
              <DropdownMenuItem>Favourites</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


        </div>
        <div className="flex grow grid grid-cols-3 gap-4">
          {friendData.friends.map((friend, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex row">
                  <div className="flex row items-center gap-4">
                    <Avatar>
                      <AvatarImage src={friend.profile_picture_url} />
                      <AvatarFallback>
                        {friend.first_name[0]}{friend.last_name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle>{friend.nickname}</CardTitle>
                  </div>
                  <div className="flex grow justify-end	">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>Last spoke {calculateDaysAgo(friend.date_last_messaged)} days ago</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  <span className="font-medium">Topics:</span> {friend.upcoming_thing}
                </p>
                <p>
                  <span className="font-medium">Next meet:</span> {formatDateBasedOnDistance(friend.date_next_meet)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
