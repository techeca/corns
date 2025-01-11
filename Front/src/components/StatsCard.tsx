import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import CountDown from "./CountDown"
import { Skeleton } from "./ui/skeleton"
import { StatsCardProps } from "@/types/StatsCardProps"

export default function StatsCard({corns, isLoading}: StatsCardProps): React.ReactNode {
  return (
    <Card className="w-[310px] h-[166px]">
      {isLoading ?
        <div className="flex flex-col gap-2 item mx-4 mt-6">
          <Skeleton className='w-[100px] h-[20px] rounded-full' />
          <Skeleton className='w-[200px] h-[15px] rounded-full' />
          <Skeleton className='mt-3 w-[100px] h-[20px] rounded-lg' />
          <Skeleton className='w-[200px] h-[20px] rounded-full' />
        </div>
        :
        <>
          <CardHeader>
            <CardTitle>Your Stats</CardTitle>
            <CardDescription>See how much corn do you have.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>My Corns: <span>{corns}🌽</span></p>
            <p className='flex'>Time until the next purchase:<CountDown /></p>
          </CardContent>
        </>
      }
    </Card>
  )
}