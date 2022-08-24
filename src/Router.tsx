import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from '@/components/templates/DefaultLayout'
import { History } from '@/pages/History'
import HomePage from '@/pages/Home'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
