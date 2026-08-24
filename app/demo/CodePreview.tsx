"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function CodePreview({
  children,
  code,
}: {
  children: React.ReactNode
  code: string
}) {
  return (
    <Tabs defaultValue="preview" className="my-6 w-full">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>

      <TabsContent
        value="preview"
        className="mt-2 rounded-xl border p-6"
      >
        {children}
      </TabsContent>

      <TabsContent
        value="code"
        className="mt-2 rounded-xl border"
      >
        <pre className="overflow-x-auto p-4">
          <code>{code}</code>
        </pre>
      </TabsContent>
    </Tabs>
  )
}