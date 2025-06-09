import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Github } from "lucide-react"
import { contributors } from "@/data/contributors"

export function Contributors() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contributors.map((contributor, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Avatar>
                <AvatarImage src={`https://github.com/${contributor.github}.png`} />
                <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{contributor.name}</h3>
                <p className="text-sm text-slate-500">{contributor.specialization}</p>
              </div>
              <a
                href={`https://github.com/${contributor.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-slate-500 hover:text-slate-900"
                aria-label={`${contributor.name}'s GitHub profile`}
              >
                <Github size={18} />
              </a>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Contributions:</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                {contributor.contributions.map((contribution, i) => (
                  <li key={i}>{contribution}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
