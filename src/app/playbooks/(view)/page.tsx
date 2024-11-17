import React from "react"
import ReactFlowPlayground from "@/components/ReactFlowPlayground"

import { Button } from "@/components/ui/button"

import Link from "next/link"


export default function Page() {
  return (
    <React.Fragment>
      <div className="py-3 px-5 flex justify-between h-16">
          <p className="font-medium text-xl">Playbook 1</p>
          <div className="flex gap-2">
            <Button>Trigger</Button>
            <Button>Delete</Button>
          </div>
        </div>
        <div className="h-[calc(100vh-8rem)]">
          <ReactFlowPlayground />
        </div>
    </React.Fragment>
  )
}
