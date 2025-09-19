"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, ChevronDown, ChevronUp } from "lucide-react"

const galleryImages = [
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307908/frame_3_22_22f_btfokc.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307909/frame_3_12_23f_d1rczo.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307905/frame_3_09_22f_zeau9z.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307903/frame_2_42_0f_woglxd.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307870/frame_2_37_21f_ti7a9t.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307908/frame_2_35_20f_jhfhqi.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307902/frame_2_31_23f_eujnro.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307870/frame_2_29_11f_d2jnc0.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307871/frame_2_26_3f_aufpb7.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307901/frame_2_18_9f_dzikrr.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307871/frame_2_10_21f_dtrpzr.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307897/frame_2_07_16f_jptjnl.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307896/frame_2_03_14f_vqbe6x.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307896/frame_1_52_21f_iqzcbg.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307871/frame_1_48_20f_uhsooh.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307892/frame_1_43_14f_wli1k3.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307870/frame_1_38_13f_bafolg.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307895/frame_1_31_17f_jdk3g6.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307870/frame_1_28_17f_mj6km4.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307891/frame_1_26_0f_j7q2bz.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307890/frame_1_21_20f_i4nryc.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307870/frame_1_17_7f_zqnxsl.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307888/frame_1_17_13f_qowz7u.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307885/frame_1_16_9f_dgmjuh.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307887/frame_1_08_20f_oy6dhn.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307870/frame_1_05_16f_fis5nu.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307885/frame_0_54_20f_ale2lk.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307871/frame_0_54_16f_o8cgli.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307871/frame_0_46_0f_lwx9ne.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307871/frame_0_46_0f_1_lz9mc2.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307884/frame_0_43_9f_hnbdbr.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307914/frame_0_37_6f_lyn5kr.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307871/frame_0_37_21f_ivomx5.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307915/frame_0_30_18f_jqzige.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307871/frame_0_19_22f_hqb9nk.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307915/frame_0_18_3f_fucwx2.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307914/frame_0_13_10f_apucfz.jpg" },
  { src: "https://res.cloudinary.com/dqv4mucxh/image/upload/v1758307908/frame_0_06_22f_zzopbp.jpg" },
  // Add more images as needed
]

const INITIAL_LIMIT = 12

export default function Gallery() {
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)

  const openDialog = (idx: number) => {
    setSelectedIndex(idx)
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
    setSelectedIndex(null)
  }

  const showPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length)
    }
  }

  const showNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % galleryImages.length)
    }
  }

  // Only show up to INITIAL_LIMIT unless showAll is true
  const imagesToShow = showAll ? galleryImages : galleryImages.slice(0, INITIAL_LIMIT)

  return (
    <section className="py-16 bg-gradient-to-br from-[#FFF3E6] via-white to-[#A5D6A7]/10">
      <div className="container mx-auto max-w-6xl">
        {/* <h2 className="text-4xl font-bold text-primary mb-6 text-center font-[family-name:var(--font-merriweather)]">
          Gallery
        </h2>
       */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {imagesToShow.map((img, idx) => (
            <button
              key={img.src}
              className="group relative rounded-xl overflow-hidden border bg-white shadow hover:shadow-lg transition-all focus:outline-none"
              onClick={() => openDialog(showAll ? idx : idx)}
              tabIndex={0}
            >
              <Image
                src={img.src}
                alt=""
                width={400}
                height={300}
                className="w-full h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
            </button>
          ))}
        </div>

        {/* Show More / Show Less Button */}
        {galleryImages.length > INITIAL_LIMIT && (
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2 px-6 py-2 rounded-full shadow-sm font-medium transition-all"
              onClick={() => setShowAll((prev) => !prev)}
              aria-expanded={showAll}
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show More <ChevronDown className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        )}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-3xl p-0 bg-transparent shadow-none flex items-center justify-center">
            {selectedIndex !== null && (
              <div className="relative w-full flex flex-col items-center">
                <button
                  className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow"
                  onClick={closeDialog}
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center justify-center w-full">
                  <button
                    className="hidden md:flex items-center justify-center absolute left-2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow"
                    onClick={showPrev}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <Image
                    src={galleryImages[selectedIndex].src}
                    alt=""
                    width={800}
                    height={600}
                    className="rounded-xl max-h-[70vh] object-contain bg-white"
                  />
                  <button
                    className="hidden md:flex items-center justify-center absolute right-2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow"
                    onClick={showNext}
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
             
                <div className="mt-2 text-xs text-muted-foreground">
                  {selectedIndex + 1} / {galleryImages.length}
                </div>
                <div className="flex justify-center gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={showPrev}
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={showNext}
                    aria-label="Next"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeDialog}
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
