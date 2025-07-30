"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Feed } from "@/components/feed"
import { Stories } from "@/components/stories"
import { SuggestedUsers } from "@/components/suggested-users"
import { MoodFilter } from "@/components/mood-filter"

export default function MainPage() {
  const [selectedMood, setSelectedMood] = useState<string>("all")

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 max-w-2xl mx-auto px-4 py-6 md:ml-64">
          <Stories />
          <MoodFilter selectedMood={selectedMood} onMoodChange={setSelectedMood} />
          <Feed mood={selectedMood} />
        </main>
        <aside className="hidden lg:block w-80 p-6">
          <SuggestedUsers />
        </aside>
      </div>
    </div>
  )
}
