'use client'

export function Ticker() {
  const items = [
    { text: 'BYHORMIGA', highlight: true },
    { text: 'EVENTS', highlight: false },
    { text: 'CREATIVE', highlight: false },
    { text: 'CORPORATE', highlight: false },
    { text: 'MONTEVIDEO', highlight: false },
  ]

  const tickerContent = (
    <>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex items-center shrink-0">
          {items.map((item, j) => (
            <span key={j} className="flex items-center">
              <span
                className={`text-[10px] tracking-[.25em] uppercase ${
                  item.highlight ? 'text-white font-bold' : 'text-gray-500'
                }`}
              >
                {item.text}
              </span>
              <span className="mx-6 text-white/30 text-[8px]">●</span>
            </span>
          ))}
        </div>
      ))}
    </>
  )

  return (
    <div className="w-full bg-[#111111] border-y border-white/[.08] py-4 overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap">
        {tickerContent}
        {tickerContent}
      </div>
    </div>
  )
}
