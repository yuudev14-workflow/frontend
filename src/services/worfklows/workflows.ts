import settings from "@/settings";
import { EnrtyResponse } from "../common/schema";
import {
  CreateWorkflowPayload,
  Workflow,
  WorkflowFilterPayload,
} from "./workflows.schema";
import apiClient from "../common/client";

export default class WorkflowService {
  private static BASE_URL =
    settings.BASE_URL.WORKFLOW_SERVICE_API;

  /**
   * get workflows lists
   * @param offset 
   * @param limit 
   * @param worfklowFilter 
   * @returns an entry response ex:
   * {
   *  "entries": [],
   *  "total": 0
   * }
   */
  public static getWorkflows = async (
    offset: number = 0,
    limit: number = 50,
    worfklowFilter: WorkflowFilterPayload = {}
  ): Promise<EnrtyResponse<Workflow>> => {
    const res = await apiClient.get(
      this.BASE_URL + "/api/v1/workflows",
      {
        params: {
          offset,
          limit,
          ...worfklowFilter
        }
      }
    );
    return res.data;
  };

  /**
   * get workflows by id
   * @param workflowId
   * @returns worfklow object
   */
  public static getWorkflowById = async (
    workflowId: string
  ): Promise<Workflow> => {
    const res = await apiClient.get(
      this.BASE_URL + "/api/v1/workflows/" + workflowId,
    );
    return res.data;
  };

  /**
   * create worflow api
   * @param payload 
   * @returns 
   */
  public static createWorkflow = async(
    payload: CreateWorkflowPayload
  ): Promise<Workflow> => {
    const res = await apiClient.post(
      this.BASE_URL + "/api/v1/workflows",
      payload
    );
    return res.data;
  }
}
