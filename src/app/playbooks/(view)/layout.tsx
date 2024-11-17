import Link from 'next/link';
import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex">
      <div className="md:flex w-[350px] border-r bg-sidebar h-[calc(100vh-4rem)] overflow-auto">

        <div className="px-0 w-full">
          <ul>
            {[...Array(50)].map((_, i) => (
              <Link
                href={"#"}
                key={`playbook-${i}`}
                className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <div className="flex w-full items-center gap-2">
                  <span className="font-medium">Playbook 1</span>{" "}
                  <span className="ml-auto text-xs">active</span>
                </div>

                <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                  Elit minim nostrud eiusmod commodo cillum reprehenderit in. Elit sunt in exercitation ipsum do eiusmod cillum veniam quis consequat tempor nulla aliqua laborum. Cillum anim dolore id esse enim elit mollit amet eu cupidatat et. Incididunt nostrud velit deserunt eiusmod culpa est veniam pariatur adipisicing dolore ex in excepteur. Et nostrud reprehenderit minim exercitation in id velit in aliquip magna irure sint. Exercitation adipisicing ea irure ullamco pariatur quis mollit labore amet tempor labore qui aliquip. Officia nostrud elit reprehenderit reprehenderit amet qui nisi deserunt elit amet anim.
                </span>
              </Link>
            ))}
          </ul>

        </div>
      </div>
      <div className="flex-1">
        {children}

      </div>
    </div>
  )
}

export default layout