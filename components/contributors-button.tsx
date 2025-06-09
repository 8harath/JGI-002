"use client"

import { useState } from "react"
import { ContributorsModal } from "@/components/contributors-modal"
import { Users } from "lucide-react"

export function ContributorsButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="keyboard-button relative">
        <Users className="mr-2 h-4 w-4 inline" />
        View Contributors
      </button>
      <ContributorsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
