import BuyCornCard from './components/BuyCornCard'
import StatsCard from './components/StatsCard'
import useUserData from './hooks/useUserData'

function App() {
  const { corns, isLoading, updateCorns } = useUserData()

  return (
    <div className='container mx-auto flex gap-6 justify-center p-6'>
      <BuyCornCard updateCorns={updateCorns} isLoading={isLoading} />
      <StatsCard corns={corns} isLoading={isLoading} />
    </div>
  )
}

export default App
