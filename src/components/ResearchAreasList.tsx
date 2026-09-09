import { cardStyle, cardHover } from '../data/cardPalette'
import type { ResearchArea } from '../types'

interface ResearchAreasListProps {
  areas: ResearchArea[]
}

function ResearchAreasList({ areas }: ResearchAreasListProps) {
  return (
    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {areas.map((area, i) => {
        const style = cardStyle(i)
        return (
          <li key={area.name} className={`rounded-lg border p-4 ${style.card} ${cardHover}`}>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: style.dot }} />
              <p className="font-medium text-stone-900 dark:text-stone-100">{area.name}</p>
            </div>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{area.description}</p>
          </li>
        )
      })}
    </ul>
  )
}

export default ResearchAreasList
