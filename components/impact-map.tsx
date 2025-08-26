"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Baby } from "lucide-react"

export function ImpactMap() {
  const [selectedState, setSelectedState] = useState<string | null>(null)

  const stateData = [
    {
      name: "Maharashtra",
      deliveries: 3200,
      midwives: 120,
      villages: 45,
      position: { x: 35, y: 60 },
    },
    {
      name: "Rajasthan",
      deliveries: 2800,
      midwives: 95,
      villages: 38,
      position: { x: 25, y: 35 },
    },
    {
      name: "Odisha",
      deliveries: 2400,
      midwives: 85,
      villages: 32,
      position: { x: 65, y: 55 },
    },
    {
      name: "Bihar",
      deliveries: 2100,
      midwives: 75,
      villages: 28,
      position: { x: 60, y: 40 },
    },
  ]

  return (
    <div className="space-y-4">
      {/* Simplified India Map */}
      <div className="relative bg-muted/30 rounded-lg p-8 h-80">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full max-w-sm">
            {/* India outline (simplified) */}
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
              <path
                d="M20,20 L80,20 L85,30 L80,40 L85,50 L80,60 L75,70 L70,80 L30,80 L25,70 L20,60 L15,50 L20,40 L15,30 Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>

            {/* State markers */}
            {stateData.map((state, index) => (
              <div
                key={index}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                  selectedState === state.name ? "scale-125" : "hover:scale-110"
                }`}
                style={{
                  left: `${state.position.x}%`,
                  top: `${state.position.y}%`,
                }}
                onClick={() => setSelectedState(selectedState === state.name ? null : state.name)}
              >
                <div
                  className={`w-4 h-4 rounded-full ${
                    selectedState === state.name ? "bg-destructive" : "bg-primary"
                  } shadow-lg`}
                >
                  <div className="absolute -inset-2 rounded-full bg-current opacity-20 animate-pulse"></div>
                </div>
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <Badge variant="secondary" className="text-xs">
                    {state.name}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* State Details */}
      {selectedState && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-4">
            {(() => {
              const state = stateData.find((s) => s.name === selectedState)
              if (!state) return null

              return (
                <div>
                  <h4 className="font-semibold text-lg mb-3 font-[family-name:var(--font-space-grotesk)]">
                    {state.name} Impact
                  </h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="space-y-1">
                      <div className="flex items-center justify-center">
                        <Baby className="h-4 w-4 text-primary mr-1" />
                        <span className="font-bold text-primary">{state.deliveries.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Safe Deliveries</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary mr-1" />
                        <span className="font-bold text-primary">{state.midwives}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Trained Midwives</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-primary mr-1" />
                        <span className="font-bold text-primary">{state.villages}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Villages</p>
                    </div>
                  </div>
                </div>
              )
            })()}
          </CardContent>
        </Card>
      )}

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span>Active Programs</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-destructive rounded-full"></div>
          <span>Selected State</span>
        </div>
      </div>
    </div>
  )
}
