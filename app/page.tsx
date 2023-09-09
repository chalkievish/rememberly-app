import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TypographyH1 } from "@/components/typography/typographyH1"
import { MoreHorizontal } from "lucide-react"
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


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row justify-between mb-6" >
          <div className="flex flex-col">
            <TypographyH1>
              Rememberly
            </TypographyH1>
            <br />
            <p>
              Have more engaging and rewarding conversations with your mates.
            </p>
          </div>
          <Button>Add friend</Button>
        </div>
        <div className="flex grow grid grid-cols-3 gap-4">
          {friendData.friends.map((friend, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex row justify-between">
                  <Avatar>
                    <AvatarImage src={friend.profile_picture_url} />
                    <AvatarFallback>
                      {friend.first_name[0]}{friend.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle>{friend.nickname}</CardTitle>
                <CardDescription>Last spoke {calculateDaysAgo(friend.date_last_messaged)} days ago</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  <span className="font-medium">Topics:</span> {friend.upcoming_thing}
                </p>
                <p>
                  <span className="font-medium">Next meet:</span> {friend.date_next_meet}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
