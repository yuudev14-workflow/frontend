import { Tasks } from "@/services/worfklows/workflows.schema";

export type PlaybookTaskNode = Tasks | (Tasks & { label: string });