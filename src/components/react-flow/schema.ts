import { Tasks } from "@/services/worfklows/workflows.schema";

export type PlaybookTaskNode = ({task: Tasks} | Partial<{task: Partial<Tasks>}>) & {
  label?: string
};