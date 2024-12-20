import { Tasks } from "@/services/worfklows/workflows.schema";

export type PlaybookTaskNode = Tasks | Partial<Tasks> & {
  label?: string
};