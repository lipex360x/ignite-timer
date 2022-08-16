import { Outlet } from 'react-router-dom'
import { Header } from '@/components/organisms/Header'

export const DefaultLayout = () => (
  <div>
    <Header />
    <Outlet />
  </div>
)
