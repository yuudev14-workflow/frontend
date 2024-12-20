import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <div className="py-3 px-5 flex justify-between items-center h-16">
        <div className="flex gap-2 ml-auto">
          <Link href="/playbooks/upsert">
            <Button>Create Playbook</Button>
          </Link>

        </div>
      </div>
    </div>
  )
}
