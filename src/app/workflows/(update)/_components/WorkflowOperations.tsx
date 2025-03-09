import { Workflow } from "@/services/worfklows/workflows.schema"
import { UseQueryResult } from "@tanstack/react-query"
import React, { useContext, useMemo, useState } from "react"
import ConnectorOperation from "./ConnectorOperation"
import { Button } from "@/components/ui/button"
import SelectWorkflowTrigger from "./SelectWorkflowTrigger"
import SelectTaskOptions from "./SelectTaskOptions"
import ConnectorList from "./ConnectorList"
import { MoveLeft, X } from "lucide-react"
import { WorkflowOperationContext } from "../_providers/WorkflowOperationProvider"
import WorkFlowTriggerParameters from "./WorkFlowTriggerParameters"
import { FLOW_SELECT_TRIGGER_ID, FLOW_START_ID } from "@/settings/reactFlowIds"

export type TaskOperationType = "connector" | "utility" | "code" | "decision" | "wait" | "approval" | "input_prompt" | null

const WorkflowOperations: React.FC<{
  workflowQuery: UseQueryResult<Workflow, Error>
}> = ({ workflowQuery}) => {
  const [taskOperation, setTaskOperation] = useState<TaskOperationType>(null) // this is to show what operation we need to show in the container
  const {hasTriggerStep, currentNode, setOpenOperationSidebar, setCurrentNode, setNodes} = useContext(WorkflowOperationContext)
  const [openCancelModal, setOpenCancelModal] = useState(false)

  const cancelHandler = () => {
    setOpenOperationSidebar(false)
    if (currentNode)

    setNodes((nodes) => {
      if (currentNode == null || [FLOW_START_ID, FLOW_SELECT_TRIGGER_ID].includes(currentNode.id)) {
        return nodes
      }
      return nodes.filter(_node => _node.id !== currentNode.id)
    })
    setCurrentNode(null)

  }
  
  return (

    <div className='absolute flex flex-col max-w-[500px] w-full bg-background border-r border-r-border h-full top-0 left-0 z-50'>
      <button className="absolute top-5 right-5" onClick={cancelHandler}>
        <X size={16} />
      </button>
      {!hasTriggerStep && currentNode?.id == FLOW_SELECT_TRIGGER_ID  ? (
        <SelectWorkflowTrigger />
      ) : hasTriggerStep && currentNode?.id == FLOW_START_ID ? (
        <WorkFlowTriggerParameters />
      ) : taskOperation === null ? (
        <SelectTaskOptions setTaskOperation={setTaskOperation} />
      ) : (
        <div>
          <div className="p-3 pb-0">
            <Button variant="outline" onClick={() => setTaskOperation(null)}>
              <MoveLeft />
              Back
            </Button>
          </div>
          <OperationWindow taskOperation={taskOperation} setTaskOperation={setTaskOperation} />
        </div>
      )

      }
      {/* <SelectWorkflowTrigger /> */}
      {/* <SelectTaskOptions /> */}

      {/* <ConnectorOperation /> */}
      {/* <ConnectorList /> */}

    </div>

  )
}

const OperationWindow: React.FC<{
  taskOperation: TaskOperationType,
  setTaskOperation: React.Dispatch<React.SetStateAction<TaskOperationType>>
}> = ({ taskOperation }) => {

  switch (taskOperation) {
    case "connector":
      return <ConnectorList />
  }
  return null
}


export default WorkflowOperations