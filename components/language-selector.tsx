import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Languages } from "lucide-react"

interface LanguageSelectorProps {
  semesterId: number
}

const languages = [
  {
    id: "kannada",
    name: "Kannada",
    description: "Learn Kannada language and literature",
    icon: Languages,
  },
  {
    id: "hindi",
    name: "Hindi",
    description: "Study Hindi language and culture",
    icon: Languages,
  },
  {
    id: "sanskrit",
    name: "Sanskrit",
    description: "Explore Sanskrit language and ancient texts",
    icon: Languages,
  },
]

export function LanguageSelector({ semesterId }: LanguageSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {languages.map((language, index) => {
        const LanguageIcon = language.icon

        return (
          <div key={language.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
            <Link href={`/semester/${semesterId}/languages/${language.id}`}>
              <Card className="subject-card group">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary p-2 border-2 border-foreground mt-1 flex-shrink-0">
                      <LanguageIcon className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm md:text-base text-foreground group-hover:text-primary transition-colors mb-1">
                        {language.name}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground">{language.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        )
      })}
    </div>
  )
} 