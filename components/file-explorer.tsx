"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileIcon, FolderIcon, DownloadIcon, ChevronDown, ChevronRight } from "lucide-react"
import { formatFileSize } from "@/lib/file-utils"
import { useIsMobile } from "@/components/ui/use-mobile"
import type { Subject } from "@/types"

interface Folder {
  name: string
  description: string
}

interface FileExplorerProps {
  folders: Folder[]
  subject: Subject
}

interface FileInfo {
  name: string;
  path: string;
  size: number;
  type: string;
  extension: string;
}

export function FileExplorer({ folders, subject }: FileExplorerProps) {
  const [subjectFiles, setSubjectFiles] = useState<{folders: {[key: string]: FileInfo[]}} | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState(folders[0]?.name || "");
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  const isMobile = useIsMobile()

  // Mobile: Use accordion-style instead of tabs
  const toggleFolder = (folderName: string) => {
    if (expandedFolders.includes(folderName)) {
      setExpandedFolders(expandedFolders.filter(f => f !== folderName))
    } else {
      // On mobile, collapse others when opening one (accordion behavior)
      if (isMobile) {
        setExpandedFolders([folderName])
      } else {
        setExpandedFolders([...expandedFolders, folderName])
      }
    }
  }

  useEffect(() => {
    const loadFiles = async () => {
      try {
        setLoading(true);
        
        // Fetch files from API
        const response = await fetch(`/api/files?subject=${subject.slug}&semester=${subject.semesterId}`);
        
        if (response.ok) {
          const data = await response.json();
          setSubjectFiles(data);
        } else {
          // Fallback to mock data if API fails
          const mockSubjectFiles: {folders: {[key: string]: FileInfo[]}} = {
            folders: {}
          };

          // Add actual file data based on what we know exists
          if (subject.slug === "fundamentals-of-computer-applications") {
            mockSubjectFiles.folders = {
              "presentations": [
                {
                  name: "FCA-MODULE 1.pdf",
                  path: "/Resources/1/Fundamentals%20of%20Computer%20Applications/presentations/FCA-MODULE%201.pdf",
                  size: 1048576, // 1MB approximation
                  type: "PDF",
                  extension: ".pdf"
                },
                {
                  name: "FCA-MODULE 2.pdf", 
                  path: "/Resources/1/Fundamentals%20of%20Computer%20Applications/presentations/FCA-MODULE%202.pdf",
                  size: 1048576,
                  type: "PDF",
                  extension: ".pdf"
                },
                {
                  name: "FCA-MODULE-3.pdf",
                  path: "/Resources/1/Fundamentals%20of%20Computer%20Applications/presentations/FCA-MODULE-3.pdf", 
                  size: 1048576,
                  type: "PDF",
                  extension: ".pdf"
                },
                {
                  name: "FCA-MODULE-4.pdf",
                  path: "/Resources/1/Fundamentals%20of%20Computer%20Applications/presentations/FCA-MODULE-4.pdf",
                  size: 1048576,
                  type: "PDF", 
                  extension: ".pdf"
                },
                {
                  name: "FCA-MODULE-5.pdf",
                  path: "/Resources/1/Fundamentals%20of%20Computer%20Applications/presentations/FCA-MODULE-5.pdf",
                  size: 1048576,
                  type: "PDF",
                  extension: ".pdf"
                }
              ],
              "tlep": [
                {
                  name: "FCA-TLEP.docx",
                  path: "/Resources/1/Fundamentals%20of%20Computer%20Applications/tlep/FCA-TLEP.docx",
                  size: 524288, // 512KB approximation
                  type: "Word Document", 
                  extension: ".docx"
                }
              ],
              "notes": [],
              "activity-1": [],
              "activity-2": [],
              "previous-year-papers": []
            };
          } else if (subject.slug === "programming-in-c") {
            mockSubjectFiles.folders = {
              "presentations": [
                {
                  name: "MODULE-3.pptx",
                  path: "/Resources/1/Programming%20in%20C/presentations/MODULE-3.pptx",
                  size: 2097152, // 2MB approximation
                  type: "PowerPoint",
                  extension: ".pptx"
                },
                {
                  name: "MODULE-4.pptx", 
                  path: "/Resources/1/Programming%20in%20C/presentations/MODULE-4.pptx",
                  size: 2097152,
                  type: "PowerPoint",
                  extension: ".pptx"
                },
                {
                  name: "MODULE-5.pptx",
                  path: "/Resources/1/Programming%20in%20C/presentations/MODULE-5.pptx",
                  size: 2097152,
                  type: "PowerPoint",
                  extension: ".pptx"
                }
              ],
              "notes": [],
              "activity-1": [],
              "activity-2": [],
              "previous-year-papers": [],
              "tlep": []
            };
          } else {
            // For other subjects, create empty folder structure
            folders.forEach(folder => {
              const folderKey = folder.name.toLowerCase().replace(/\s+/g, '-');
              mockSubjectFiles.folders[folderKey] = [];
            });
          }

          setSubjectFiles(mockSubjectFiles);
        }
      } catch (error) {
        console.error("Error loading files:", error);
        
        // Fallback to empty structure
        const emptyStructure: {folders: {[key: string]: FileInfo[]}} = { folders: {} };
        folders.forEach(folder => {
          const folderKey = folder.name.toLowerCase().replace(/\s+/g, '-');
          emptyStructure.folders[folderKey] = [];
        });
        setSubjectFiles(emptyStructure);
      } finally {
        setLoading(false);
      }
    };

    loadFiles();
  }, [subject, folders]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getFilesForFolder = (folderName: string): FileInfo[] => {
    if (!subjectFiles) return [];
    
    const folderKey = folderName.toLowerCase().replace(/\s+/g, '-');
    return subjectFiles.folders[folderKey] || [];
  };

  const getFileTypeIcon = (type: string) => {
    const iconClass = "h-4 w-4 flex-shrink-0";
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileIcon className={`${iconClass} text-red-500`} />;
      case 'powerpoint':
        return <FileIcon className={`${iconClass} text-orange-500`} />;
      case 'word document':
        return <FileIcon className={`${iconClass} text-blue-500`} />;
      case 'excel':
        return <FileIcon className={`${iconClass} text-green-500`} />;
      default:
        return <FileIcon className={`${iconClass} text-gray-500`} />;
    }
  };

  return (
    <div>
      <Tabs defaultValue={folders[0]?.name || ""} onValueChange={setSelectedFolder}>
        <TabsList className="mb-4 md:mb-6 flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-x-visible pb-1 scrollbar-hide snap-x snap-mandatory md:snap-none relative bg-background">
          {folders.map((folder) => {
            const fileCount = getFilesForFolder(folder.name).length;
            return (
              <TabsTrigger
                key={folder.name}
                value={folder.name}
                className="mb-2 border-t-2 border-t-accent data-[state=active]:border-t-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border-2 border-foreground text-xs md:text-sm whitespace-nowrap mx-1 snap-center min-w-[110px] relative"
              >
                {folder.name}
                {fileCount > 0 && (
                  <Badge variant="secondary" className="ml-1 text-xs px-1 py-0">
                    {fileCount}
                  </Badge>
                )}
              </TabsTrigger>
            );
          })}
          {/* Gradient overlay for right edge, only on mobile */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent z-10 md:hidden" />
        </TabsList>

        {folders.map((folder) => {
          const filesToShow = getFilesForFolder(folder.name);
          
          return (
            <TabsContent key={folder.name} value={folder.name}>
              <Card className="retro-card">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">{folder.name}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">{folder.description}</p>
                    </div>
                    {filesToShow.length > 0 && (
                      <Badge variant="outline" className="ml-2">
                        {filesToShow.length} file{filesToShow.length !== 1 ? 's' : ''}
                      </Badge>
                    )}
                  </div>

                  {filesToShow.length > 0 ? (
                    <div>
                      <div className="border-2 border-accent rounded-lg overflow-hidden">
                        <div className="bg-card px-3 md:px-4 py-2 md:py-3 border-b-2 border-accent">
                          <div className="grid grid-cols-12 text-xs md:text-sm font-semibold text-foreground">
                            <div className="col-span-5">Name</div>
                            <div className="col-span-2">Type</div>
                            <div className="col-span-2">Size</div>
                            <div className="col-span-3">Action</div>
                          </div>
                        </div>
                        <div className="divide-y divide-accent/30">
                          {filesToShow.map((file, index) => (
                            <div
                              key={file.name}
                              className="grid grid-cols-12 px-3 md:px-4 py-2 md:py-3 hover:bg-accent/10 transition-colors animate-fade-in"
                              style={{ animationDelay: `${index * 0.1}s` }}
                            >
                              <div className="col-span-5 flex items-center gap-1 md:gap-2">
                                {getFileTypeIcon(file.type)}
                                <span className="text-xs md:text-sm font-medium text-foreground truncate">
                                  {file.name}
                                </span>
                              </div>
                              <div className="col-span-2 flex items-center">
                                <Badge variant="secondary" className="text-xs">
                                  {file.type}
                                </Badge>
                              </div>
                              <div className="col-span-2 text-xs md:text-sm text-muted-foreground flex items-center">
                                {formatFileSize(file.size)}
                              </div>
                              <div className="col-span-3 flex items-center">
                                <button
                                  onClick={() => window.open(file.path, '_blank')}
                                  className="flex items-center gap-1 text-xs md:text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                                >
                                  <DownloadIcon className="h-3 w-3" />
                                  Open
                                </button>
                              </div>
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
                        This section is currently empty. If you have relevant study materials, please consider{" "}
                        <a 
                          href="https://github.com/8harath/JGI-002" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-semibold"
                        >
                          contributing them
                        </a>
                        {" "}to help fellow students. Your contributions will appear here automatically once uploaded!
                      </p>
                      <div className="mt-4">
                        <Link 
                          href="/contact" 
                          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                        >
                          Contact us for help →
                        </Link>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  )
}
