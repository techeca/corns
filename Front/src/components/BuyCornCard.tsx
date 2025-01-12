import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card"
import { Button } from "./ui/button"
import { Skeleton } from "./ui/skeleton"
import useTimerControl from "@/hooks/useTimerControl"
import { buyCorn } from "@/lib/requests"
import { toast } from "sonner"
import { BuyCornCardProps } from "@/types/BuyCornCardProps"

export default function BuyCornCard({updateCorns, isLoading}: BuyCornCardProps): React.ReactNode {
  const { state, start } = useTimerControl()

  const handleBuyCorn = async () => {
    const actualDate = new Date();
    if (state) {
      toast('You must wait a little', {
        description: `Wait for the countdown to finish ⏰`,
        action: {
          label: "Close",
          onClick: () => console.log("Nada por aqui"),
        },
      })
    } else {
      const { status } = await buyCorn()
      if(status === 200){
        start()
        updateCorns()
        toast('Purchase completed', {
          description: `You have bought a corn 🌽at ${actualDate.getHours()}:${actualDate.getMinutes()}`,
          action: {
            label: "Close",
            onClick: () => console.log("Nada por aqui"),
          },
        })
      }else{
        toast('Error', {
          description: `Something went wrong ⛔`,
          action: {
            label: "Close",
            onClick: () => console.log("Nada por aqui"),
          },
        })
      }
    }
  }

  return (
    <Card className='h-full min-w-[237px] min-h-[153px]'>
      {isLoading ?
        <div className='flex flex-col gap-2 item mx-4 mt-6'>
          <Skeleton className='w-[100px] h-[20px] rounded-full' />
          <Skeleton className='w-[200px] h-[20px] rounded-full' />
          <Skeleton className='mt-3 w-[100px] h-[35px] rounded-lg' />
        </div>
        :
        <>
          <CardHeader>
            <CardTitle>Get your Corn</CardTitle>
            <CardDescription>Click the button to buy a corn.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className={`${state && `cursor-not-allowed`}`} onClick={handleBuyCorn}>Buy 🌽</Button>
          </CardContent>
        </>
      }
    </Card>
  )
}