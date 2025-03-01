import { Workflow } from "@/services/worfklows/workflows.schema"
import { UseQueryResult } from "@tanstack/react-query"
import React, { useMemo, useState } from "react"
import ConnectorOperation from "./ConnectorOperation"
import { Button } from "@/components/ui/button"
import SelectWorkflowTrigger from "./SelectWorkflowTrigger"
import SelectTaskOptions from "./SelectTaskOptions"
import ConnectorList from "./ConnectorList"
import { MoveLeft } from "lucide-react"

export type TaskOperationType = "connector" | "utility" | "code" | "decision" | "wait" | "approval" | "input_prompt" | null

const WorkflowOperations: React.FC<{
  workflowQuery: UseQueryResult<Workflow, Error>
}> = ({ workflowQuery }) => {
  const [taskOperation, setTaskOperation] = useState<TaskOperationType>(null) // this is to show what operation we need to show in the container

  /**
   * return false if no tasks has a name start
   * else true. We need this to know if we have to show
   * options for the workflow trigger or
   * to select task options
   */
  const hasTriggerStep = useMemo(() => {
    if (workflowQuery.data) {
      if (workflowQuery.data.tasks) {
        return workflowQuery.data.tasks.some(task => task.name == "start")
      }
    }
    return false

  }, [workflowQuery.data])
  return (

    <div className='absolute flex flex-col max-w-[500px] w-full bg-background border-r border-r-border h-full top-0 left-0 z-50'>
      {!hasTriggerStep ? (
        <SelectWorkflowTrigger />
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