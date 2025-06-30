"use client"

import Link from "next/link"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FilePreview } from "@/components/file-preview"
import { FileIcon, FolderIcon } from "lucide-react"
import type { Subject } from "@/types"

interface Folder {
  name: string
  description: string
}

interface FileExplorerProps {
  folders: Folder[]
  subject: Subject
}

// Mock files for demonstration
const mockFiles = [
  {
    name: "FCA-TLEP.pdf",
    path: "/Resources/Semister%20-%201/FCA/TLEP/FCA-TLEP.pdf",
    size: "~1 MB",
    type: "pdf",
  },
  {
    name: "Assignment_Guidelines.docx",
    path: "/assets/documents/sample.pdf",
    size: "450 KB",
    type: "docx",
  },
  {
    name: "Course_Overview.pptx",
    path: "/assets/documents/sample.pdf",
    size: "2.8 MB",
    type: "pptx",
  },
]

export function FileExplorer({ folders, subject }: FileExplorerProps) {
  let filteredFolders = folders;
  let labFiles = [];
  if (subject.name === "Fundamentals of Computer Application Lab") {
    filteredFolders = [
      { name: "Lab Assignments", description: "All lab assignments for this subject." },
    ];
    labFiles = [
      { name: "EXP-1_FCA.pdf", path: "/Resources/Semister%20-%201/FCA_LAB/EXP-1_FCA.pdf", size: "-", type: "pdf" },
      { name: "EXP-2_FCA.pdf", path: "/Resources/Semister%20-%201/FCA_LAB/EXP-2_FCA.pdf", size: "-", type: "pdf" },
      { name: "EXP-3_FCA.pdf", path: "/Resources/Semister%20-%201/FCA_LAB/EXP-3_FCA.pdf", size: "-", type: "pdf" },
      { name: "EXP-4_FCA.pdf", path: "/Resources/Semister%20-%201/FCA_LAB/EXP-4_FCA.pdf", size: "-", type: "pdf" },
      { name: "EXP-5_FCA.pdf", path: "/Resources/Semister%20-%201/FCA_LAB/EXP-5_FCA.pdf", size: "-", type: "pdf" },
      { name: "Exp-6_FCA .pdf", path: "/Resources/Semister%20-%201/FCA_LAB/Exp-6_FCA%20.pdf", size: "-", type: "pdf" },
      { name: "EXP-7_FCA.pptx", path: "/Resources/Semister%20-%201/FCA_LAB/EXP-7_FCA.pptx", size: "-", type: "pptx" },
      { name: "EXP-8_FCA.pptx", path: "/Resources/Semister%20-%201/FCA_LAB/EXP-8_FCA.pptx", size: "-", type: "pptx" },
      { name: "EXP-9.html", path: "/Resources/Semister%20-%201/FCA_LAB/EXP-9.html", size: "-", type: "html" },
      { name: "EXP-10.HTML", path: "/Resources/Semister%20-%201/FCA_LAB/EXP-10.HTML", size: "-", type: "html" },
      { name: "EXP-11.HTML", path: "/Resources/Semister%20-%201/FCA_LAB/EXP-11.HTML", size: "-", type: "html" },
      { name: "EXP-12.HTML", path: "/Resources/Semister%20-%201/FCA_LAB/EXP-12.HTML", size: "-", type: "html" },
      { name: "Outputs_html.pdf", path: "/Resources/Semister%20-%201/FCA_LAB/Outputs_html.pdf", size: "-", type: "pdf" },
    ];
  }
  const [selectedFolder, setSelectedFolder] = useState(filteredFolders[0].name)

  // Custom logic for FCA TLEP
  const isFcaTlep =
    selectedFolder === "TLEP" &&
    subject.name === "Fundamentals of Computer Applications" &&
    subject.semesterId === 1;

  const tlepFiles = [
    {
      name: "FCA-TLEP.pdf",
      path: "/Resources/Semister%20-%201/FCA/TLEP/FCA-TLEP.pdf",
      size: "~1 MB",
      type: "pdf",
    },
  ];

  const isFcaPresentations =
    selectedFolder === "Presentations" &&
    subject.name === "Fundamentals of Computer Applications" &&
    subject.semesterId === 1;

  const presentationFiles = [
    {
      name: "FCA-MODULE-1.pdf",
      path: "/Resources/Semister%20-%201/FCA/Presentations/FCA-MODULE-1.pdf",
      size: "~1 MB",
      type: "pdf",
    },
    {
      name: "FCA-MODULE-2.pdf",
      path: "/Resources/Semister%20-%201/FCA/Presentations/FCA-MODULE-2.pdf",
      size: "~1 MB",
      type: "pdf",
    },
    {
      name: "FCA-MODULE-3.pdf",
      path: "/Resources/Semister%20-%201/FCA/Presentations/FCA-MODULE-3.pdf",
      size: "~1 MB",
      type: "pdf",
    },
    {
      name: "FCA-MODULE-4.pdf",
      path: "/Resources/Semister%20-%201/FCA/Presentations/FCA-MODULE-4.pdf",
      size: "~1 MB",
      type: "pdf",
    },
    {
      name: "FCA-MODULE-5.pdf",
      path: "/Resources/Semister%20-%201/FCA/Presentations/FCA-MODULE-5.pdf",
      size: "~1 MB",
      type: "pdf",
    },
  ];

  const isFomNotes =
    selectedFolder === "Notes" &&
    subject.name === "Fundamentals of Mathematics";
  
  const fomNotesFiles = [
    { name: "Module-1.pdf", path: "/Resources/Semister%20-%201/FOM/Module-1.pdf", size: "-", type: "pdf" },
    { name: "Permutation_&_Combination.pdf", path: "/Resources/Semister%20-%201/FOM/Permutation_&_Combination.pdf", size: "-", type: "pdf" },
    { name: "Set's.pdf", path: "/Resources/Semister%20-%201/FOM/Set's.pdf", size: "-", type: "pdf" },
    { name: "System-of-Linear-Equation.pdf", path: "/Resources/Semister%20-%201/FOM/System-of-Linear-Equation.pdf", size: "-", type: "pdf" },
    { name: "Module-3.pdf", path: "/Resources/Semister%20-%201/FOM/Module-3.pdf", size: "-", type: "pdf" },
  ];

  const isFomTlep =
    selectedFolder === "TLEP" &&
    subject.name === "Fundamentals of Mathematics";
  
  const fomTlepFiles = [
    { name: "TLEP_23BCA1C03_FOM.pdf", path: "/Resources/Semister%20-%201/FOM/TLEP_23BCA1C03_FOM.pdf", size: "-", type: "pdf" },
  ];

  const isFomActivity1 =
    selectedFolder === "Activity 1" &&
    subject.name === "Fundamentals of Mathematics";
  
  const fomActivity1Files = [
    { name: "Activity-1.pdf", path: "/Resources/Semister%20-%201/FOM/Activity-1.pdf", size: "-", type: "pdf" },
  ];

  const filesToShow =
    subject.name === "Fundamentals of Computer Application Lab"
      ? labFiles
      : isFomNotes
      ? fomNotesFiles
      : isFomTlep
      ? fomTlepFiles
      : isFomActivity1
      ? fomActivity1Files
      : isFcaTlep
      ? tlepFiles
      : isFcaPresentations
      ? presentationFiles
      : selectedFolder === "Notes"
      ? mockFiles
      : [];

  return (
    <div>
      <Tabs defaultValue={filteredFolders[0].name} onValueChange={setSelectedFolder}>
        <TabsList className="mb-4 md:mb-6 flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-x-visible pb-1 scrollbar-hide snap-x snap-mandatory md:snap-none relative bg-background">
          {filteredFolders.map((folder) => (
            <TabsTrigger
              key={folder.name}
              value={folder.name}
              className="mb-2 border-t-2 border-t-accent data-[state=active]:border-t-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border-2 border-foreground text-xs md:text-sm whitespace-nowrap mx-1 snap-center min-w-[110px]"
            >
              {folder.name}
            </TabsTrigger>
          ))}
          {/* Gradient overlay for right edge, only on mobile */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent z-10 md:hidden" />
        </TabsList>

        {filteredFolders.map((folder) => (
          <TabsContent key={folder.name} value={folder.name}>
            <Card className="retro-card">
              <CardContent className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-1 md:mb-2">{folder.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">{folder.description}</p>

                {filesToShow.length > 0 ? (
                  <div>
                    <div className="border-2 border-accent rounded-lg overflow-hidden">
                      <div className="bg-card px-3 md:px-4 py-2 md:py-3 border-b-2 border-accent">
                        <div className="grid grid-cols-12 text-xs md:text-sm font-semibold text-foreground">
                          <div className="col-span-6">Name</div>
                          <div className="col-span-3">Type</div>
                          <div className="col-span-3">Size</div>
                        </div>
                      </div>
                      <div className="divide-y divide-accent/30">
                        {filesToShow.map((file, index) => (
                          <div
                            key={file.name}
                            className="grid grid-cols-12 px-3 md:px-4 py-2 md:py-3 hover:bg-accent/10 cursor-pointer transition-colors animate-fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onClick={() => window.open(file.path, '_blank')}
                          >
                            <div className="col-span-6 flex items-center gap-1 md:gap-2">
                              <FileIcon className="h-3 w-3 md:h-4 md:w-4 text-accent flex-shrink-0" />
                              <span className="text-xs md:text-sm font-medium text-foreground truncate">
                                {file.name}
                              </span>
                            </div>
                            <div className="col-span-3 text-xs md:text-sm text-muted-foreground font-medium">
                              {file.type.toUpperCase()}
                            </div>
                            <div className="col-span-3 text-xs md:text-sm text-muted-foreground">{file.size}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 md:py-12 border-2 border-dashed border-accent rounded-lg bg-card">
                    <FolderIcon className="h-10 w-10 md:h-16 md:w-16 text-accent mx-auto mb-3 md:mb-4" />
                    <h4 className="text-base md:text-xl font-bold text-foreground mb-1 md:mb-2">No files available</h4>
                    <p className="text-xs md:text-sm text-muted-foreground max-w-md mx-auto px-2">
                      No files have been uploaded for this section yet. If you have access to materials, please{" "}
                      <a href="https://github.com" className="text-accent hover:underline font-semibold">
                        contribute
                      </a>{" "}
                      or{" "}
                      <Link href="/contact" className="text-accent hover:underline font-semibold">
                        contact us
                      </Link>
                      .
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
