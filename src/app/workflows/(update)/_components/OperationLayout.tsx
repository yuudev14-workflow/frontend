import { Button } from '@/components/ui/button'
import React, { useContext } from 'react'
import { WorkflowOperationContext } from '../_providers/WorkflowOperationProvider'
import { MoveLeft } from 'lucide-react'

const OperationLayout: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const { setTaskOperation } = useContext(WorkflowOperationContext)

  return (
    <div>
      <div className="p-3 pb-0">
        <Button variant="outline" onClick={() => setTaskOperation(null)}>
          <MoveLeft />
          Back
        </Button>
      </div>
      {children}
    </div>

  )
}

export default OperationLayout