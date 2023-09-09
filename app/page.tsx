import { Button } from "@/components/ui/button"
import { TypographyH1 } from "@/components/typography/TypographyH1"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <TypographyH1>
          Rememberly
        </TypographyH1>
      </div>
      <div>
        <Button>Add new note</Button>
      </div>
    </main>
  )
}
