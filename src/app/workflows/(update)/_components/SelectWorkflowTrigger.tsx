import React, { useCallback, useContext } from 'react'

import OptionButton from '@/components/buttons/OptionButton'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { MousePointerClick, Webhook } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import WorkflowService from '@/services/worfklows/workflows'
import { WorkflowOperationContext } from '../_providers/WorkflowOperationProvider'
import { WorkflowTriggerType } from '@/services/worfklows/workflows.schema'

const SelectWorkflowTrigger = () => {

  const { setWorkflowData, setCurrentNode, setOpenOperationSidebar } = useContext(WorkflowOperationContext)
  const triggerTypesQuery = useQuery({
    queryKey: ['workflow-trigger-type-lists'],
    queryFn: async () => {
      return WorkflowService.getWorkflowTriggerTypes()
    }
  })

  const renderIcon = useCallback((triggerName: string) => {
    switch (triggerName) {
      case "manual":
        return MousePointerClick
      case "webhook":
        return Webhook
      default:
        return MousePointerClick // for now
    }
  }, [])

  const selectTriggerType = (trigger: WorkflowTriggerType) => {
    setWorkflowData(workflow => ({ ...workflow, trigger_type: trigger.id }))
    setCurrentNode(null)
    setOpenOperationSidebar(false)
  }

  return (
    <div className='flex flex-col gap-3 px-3 py-5'>
      <Label className="uppercase text-lg">
        Choose a trigger
      </Label>
      <Separator />

      <div className="flex flex-col gap-3">
        {triggerTypesQuery.data?.map(trigger => (
          <OptionButton Icon={renderIcon(trigger.name)} key={`trigger-type-${trigger.id}`} onClick={() => selectTriggerType(trigger)}>
            <div>
              <Label className='uppercase text-base'>{trigger.name}</Label>
              <p>Small description about manual</p>
            </div>

          </OptionButton>
        ))}
      </div>
    </div>
  )
}

export default SelectWorkflowTrigger