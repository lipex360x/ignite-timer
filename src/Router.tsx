import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from '@/components/templates/DefaultLayout'
import HistoryPage from '@/pages/HistoryPage'
import HomePage from '@/pages/HomePage'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Route>
    </Routes>
  )
}
