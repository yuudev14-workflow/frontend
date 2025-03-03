import React, { useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ConnectorInfo, Operation } from '@/services/connectors/connectors.schema'


const connectorInfo: ConnectorInfo = {
  "name": "",
  "id": "",
  "configuration": {
    "fields": [
      {
        "title": "Server URL",
        "description": "Specify the URL of the FortiWeb Cloud server to connect and perform automated operations.",
        "type": "text",
        "name": "server_url",
        "required": true,
        "editable": true,
        "visible": true,
        "value": "https://api.fortiweb-cloud.com",
        "tooltip": "Specify the URL of the FortiWeb Cloud server to connect and perform automated operations."
      },
      {
        "title": "API Key",
        "description": "Specify the API key to access the endpoint to connect and perform the automated operations",
        "required": true,
        "editable": true,
        "visible": true,
        "type": "password",
        "name": "api_key",
        "tooltip": "Specify the API key to access the endpoint to connect and perform the automated operations"
      },
      {
        "title": "Verify SSL",
        "description": "Specifies whether the SSL certificate for the server is to be verified. By default, this option is selected, i.e., set to true.",
        "name": "verify_ssl",
        "type": "checkbox",
        "required": false,
        "editable": true,
        "visible": true,
        "value": true,
        "tooltip": "Specifies whether the SSL certificate for the server is to be verified. By default, this option is selected, i.e., set to true."
      }
    ]
  },
  "operations": [
    {
      "operation": "get_incident_list",
      "title": "Get Incident List",
      "description": "",
      "annotation": "get_incident_list",
      "enabled": true,
      "parameters": [
        {
          "title": "z1",
          "description": "",
          "required": true,
          "editable": true,
          "visible": true,
          "type": "text",
          "tooltip": "",
          "name": "",
          "placeholder": ""
        }
      ]
    },
    {
      "operation": "get_incident_list2",
      "title": "Get Incident List2",
      "description": "",
      "annotation": "get_incident_list2",
      "enabled": true,
      "parameters": [
        {
          "title": "x1",
          "description": "",
          "required": true,
          "editable": true,
          "visible": true,
          "type": "text",
          "tooltip": "",
          "name": "",
          "placeholder": ""
        },
        {
          "title": "x2",
          "description": "",
          "required": true,
          "editable": true,
          "visible": true,
          "type": "text",
          "tooltip": "",
          "name": "",
          "placeholder": ""
        },
        {
          "title": "x3",
          "description": "",
          "required": true,
          "editable": true,
          "visible": true,
          "type": "text",
          "tooltip": "",
          "name": "",
          "placeholder": ""
        }
      ]
    },
    {
      "operation": "get_incident_list3",
      "title": "Get Incident List3",
      "description": "",
      "annotation": "get_incident_list3",
      "enabled": true,
      "parameters": [
        {
          "title": "y1",
          "description": "",
          "required": true,
          "editable": true,
          "visible": true,
          "type": "text",
          "tooltip": "",
          "name": "",
          "placeholder": ""
        }
      ]
    }
  ]
}


const ConnectorOperation = () => {
  const [currentOperation, setCurrentOperation] = useState<Operation | null>(null)

  const onChangeOperationHandler = (value: string) => {
    const filterOperation = connectorInfo.operations.filter(operation => value === operation.annotation)
    setCurrentOperation(filterOperation[0] ?? null)
  }
  return (
    <>
      <div className='flex-1 flex flex-col gap-3 p-3'>
        <div className='flex flex-col gap-2'>
          <Label className="font-normal">
            Step Name
          </Label>
          <Input />
        </div>

        <Separator className='bg-secondary' />

        <div className='py-7'>
          <p>connector information</p>
        </div>
        <Separator className='bg-secondary' />
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-2'>
            <Label className="font-normal">
              Configuration
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent className='bg-background'>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator className='bg-secondary' />
          <div className='flex flex-col gap-2'>
            <Label className="font-normal">
              Operation
            </Label>
            <Select onValueChange={onChangeOperationHandler}>
              <SelectTrigger>
                <SelectValue placeholder="Select Operation" />
              </SelectTrigger>
              <SelectContent className='bg-background'>
                {connectorInfo.operations.map((operation) => (
                  <SelectItem value={operation.annotation} key={`connector-operation-${operation.title}`}>{operation.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Separator className='bg-secondary' />

          {currentOperation && currentOperation.parameters && (
            <div className='flex flex-col gap-4'>
              <Label className='text-lg'>
                Parameters
              </Label>
              <div className='flex flex-col gap-4'>
                {currentOperation.parameters.map(param => (
                  <div className='flex flex-col gap-2' key={`connector-operation-${param.title}`}>
                    <Label className="font-normal">
                      {param.title}
                    </Label>
                    {param.type === "text" && (
                      <Input placeholder={param.placeholder} />
                    )}

                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <footer className='mt-auto border-t border-border border p-3'>
        <div className="flex justify-end gap-2">
          <Button>Close</Button>
          <Button>Save</Button>
        </div>
      </footer>

    </>
  )
}

export default ConnectorOperation