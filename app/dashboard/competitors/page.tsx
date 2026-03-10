

import { Suspense } from "react"
import CompetitorsClient from "./CompetitorsClient"

export default function Page() {
  return (
    <Suspense fallback={<div style={{padding:20}}>Loading...</div>}>
      <CompetitorsClient />
    </Suspense>
  )
}