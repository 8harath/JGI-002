"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Code, Shield, Database, BarChart3, Wifi, Server, Globe, Cpu, ArrowLeft } from "lucide-react"

const specializations = [
  {
    id: "ai",
    name: "AI",
    fullName: "Artificial Intelligence",
    description: "Machine learning, neural networks, and AI applications",
    icon: Brain,
    isActive: true,
  },
  {
    id: "bca-general",
    name: "BCA General",
    fullName: "BCA General",
    description: "Comprehensive computer applications curriculum",
    icon: Code,
    isActive: true,
  },
  {
    id: "cs",
    name: "CS",
    fullName: "Cyber Security",
    description: "Information security and cybersecurity practices",
    icon: Shield,
    isActive: true,
  },
  {
    id: "ctis",
    name: "CTIS",
    fullName: "Computer Technology & Information Systems",
    description: "Technology integration and information systems",
    icon: Database,
    isActive: true,
  },
  {
    id: "da",
    name: "DA",
    fullName: "Data Analytics",
    description: "Data analysis, visualization, and business intelligence",
    icon: BarChart3,
    isActive: true,
  },
  {
    id: "iot",
    name: "IOT",
    fullName: "Internet of Things",
    description: "Connected devices and IoT applications",
    icon: Wifi,
    isActive: true,
  },
  {
    id: "isma",
    name: "ISMA",
    fullName: "Information Systems Management & Analytics",
    description: "Systems management and analytics",
    icon: Server,
    isActive: true,
  },
  {
    id: "ith",
    name: "ITH",
    fullName: "Information Technology & Hardware",
    description: "Hardware systems and IT infrastructure",
    icon: Globe,
    isActive: true,
  },
  {
    id: "mact",
    name: "MACT",
    fullName: "Multimedia & Computer Technology",
    description: "Multimedia applications and computer technology",
    icon: Cpu,
    isActive: true,
  },
]

export default function Semester4Page() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <Link href="/" className="back-button mb-3 md:mb-4">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
        <h1 className="text-2xl md:text-4xl font-bold gradient-text mb-1 md:mb-2">Semester 4</h1>
        <p className="text-sm md:text-lg text-muted-foreground">Choose your specialization track</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {specializations.map((spec, index) => {
          const IconComponent = spec.icon

          return (
            <div key={spec.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
              <Link href={`/semester/4/${spec.id}`}>
                <Card className="semester-card group">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center gap-3 mb-3 md:mb-4">
                      <div className="bg-primary p-2 md:p-3 border-2 border-foreground">
                        <IconComponent className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-base md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {spec.name}
                        </h3>
                        <p className="text-xs md:text-sm text-secondary font-medium">{spec.fullName}</p>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground">{spec.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
