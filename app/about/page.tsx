"use client"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"

export default function AboutPage() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="py-16 bg-gradient-to-br from-[#FFF3E6] via-white to-[#A5D6A7]/20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">{t("nav.about")}</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-merriweather)] text-primary">About Janam</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering safe births and stronger families through midwifery training, container clinics, and kangaroo care.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 grid gap-8 md:grid-cols-3">
          <div className="p-6 rounded-2xl bg-white shadow-sm border">
            <h2 className="text-2xl font-bold text-[#1B5E20] mb-2">Mission</h2>
            <p className="text-muted-foreground">Ensure every mother experiences a safe, dignified birth through community-driven care.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white shadow-sm border">
            <h2 className="text-2xl font-bold text-[#1B5E20] mb-2">Vision</h2>
            <p className="text-muted-foreground">A future where maternal and newborn deaths are prevented through skilled, compassionate support.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white shadow-sm border">
            <h2 className="text-2xl font-bold text-[#1B5E20] mb-2">Values</h2>
            <p className="text-muted-foreground">Respect, empathy, evidence-based practice, and local leadership.</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#FFF3E6]">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-3">About Us</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>India contributes to nearly one-quarter of the world’s maternal deaths. Harrowing stories of losing both mother and baby during a home birth are well documented.</p>
              <p>The solution to this is trained midwives, but finding one is a difficult task, and many ‘dais’ don’t even have the proper training and instruction to oversee complicated births.</p>
              <p>This is what led to the creation of Janam. Our goal is to help reduce infant, child and maternal mortality rates in states where nearly 3/4 of births in rural areas aren’t supervised.</p>
              <p>With the advent of cheap internet connectivity in our country and smart phones that are being used by millions, we hope to educate women of childbearing age to follow simple, safe and clean practices during pregnancy and childbirth.</p>
              <p>We hope that no mother – or her baby – suffer during one of the most beautiful moments in life: childbirth.</p>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white shadow-sm border">
            <h3 className="text-xl font-semibold mb-2">What makes us different</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Community midwives trained locally</li>
              <li>Evidence-based protocols and respectful care</li>
              <li>Digital strategy for education and follow-up</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-4">About Janam</h2>
          <div className="space-y-4 text-muted-foreground max-w-4xl">
            <p>In any community, mothers and children constitute not only a priority group, but also a vulnerable or special risk group: the risk is connected to childbearing in the case of women, and growth, development and survival in the case of infants and children.</p>
            <p>From commonly available data, it is seen that infant, child and maternal mortality rates are high in many developing nations. Moreover, much of this is preventable. By improving the health of mothers and children, we can contribute to the health of the general population.</p>
            <p>Social and environmental factors that influence human reproduction are legion: age of marriage, family size and child spacing, level of education of the mother, fertility patterns, economic status, social customs and beliefs, the role of women in society, etc, all play a role in the health of both the mother and her baby.</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-6">Leadership</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "Kavin Sharma", role: "Co-Founder, CEO" },
              { name: "Avantika Naina Mohan", role: "Co-Founder" },
              { name: "Krish Sharma", role: "Co-Founder" },
              { name: "Aarohi Murdia", role: "Co-Founder" },
              { name: "Eva Bothra", role: "Co-Founder" },
              { name: "Nitya Agarwal", role: "Design Head" },
            ].map((m) => (
              <div key={m.name} className="p-6 rounded-2xl bg-[#FFF3E6] border">
                <div className="text-lg font-semibold">{m.name}</div>
                <div className="text-primary">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#FFF3E6]">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">Antenatal</h2>
            <div className="space-y-3 text-muted-foreground">
              <h3 className="text-xl font-semibold text-[#1B5E20]">Importance of antenatal care</h3>
              <p>The aim of antenatal care is to achieve at the end of pregnancy a healthy mother and baby. This care should begin soon after confirmation of pregnancy and continue throughout the period.</p>
              <p>It is important to see your local doctor or health worker early in pregnancy to detect early high risk cases, remove anxiety and dread associated with delivery, reduce maternal and infant mortality and morbidity and to teach you, the mother elements of child care, nutrition, personal hygiene, environmental sanitation, family planning and spacing so that both you and your baby remain healthy and strong</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-[#1B5E20]">Antenatal Visits</h3>
              <p>These start with the detection and diagnosis of pregnancy which can be easily done by you at home using a simple home pregnancy test kit. A minimum of 4 visits are essential for a smooth pregnancy.</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><span className="font-medium">First visit:</span> within 12 weeks (preferably as soon as pregnancy is diagnosed or suspected)</li>
                <li><span className="font-medium">Second visit:</span> between 14-26 weeks</li>
                <li><span className="font-medium">Third visit:</span> between 28-34 weeks</li>
                <li><span className="font-medium">Fourth visit:</span> between 36 weeks to term</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-[#1B5E20]">How to calculate your expected delivery date (EDD)</h3>
              <ol className="list-decimal pl-6 space-y-1">
                <li>Note the Last Menstrual Period (LMP) date</li>
                <li>Calculate your EDD by adding 9 months and 7 days to this number.</li>
              </ol>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-[#1B5E20]">Looking after yourself during and after pregnancy</h3>
              <p>It is important to take care of yourself through the period of pregnancy to ensure you remain healthy. This will go a long way to help you have a healthy, strong baby this time, as well as ensure future pregnancies are smooth and uneventful.</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Personal cleanliness: bathe daily, and wear clean, washed clothes. Wash your hair frequently and ensure there are no infestations (lice etc).</li>
                <li>Rest and sleep at least 8 hours at night.</li>
                <li>Take regular, wholesome meals and ensure you are fully immunized for Tetanus during pregnancy. Remember to take the prescribed multivitamins and calcium. A high protein diet in the last trimester supports good birth weight.</li>
                <li>Avoid constipation: eat leafy greens, fruits and drink plenty of fluids. Avoid medicines and desi remedies for constipation that may trigger premature labour.</li>
                <li>Light exercise is advisable; avoid manual physical labour in the third trimester.</li>
                <li>Do not smoke or consume alcohol during pregnancy.</li>
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">Breastfeeding</h2>
            <div className="space-y-3 text-muted-foreground">
              <h3 className="text-xl font-semibold text-[#1B5E20]">Breastfeeding facts you must know</h3>
              <p><span className="font-medium">Breast milk is the best milk!</span> It provides the main source of nutrition in the first year of life. Colostrum is essential for the protection of the newborn from infection. Avoid bottle feeding due to hygiene risks.</p>
              <p>You can breastfeed for 18–24 months; after 6 months, introduce soft cooked and mashed foods gradually to meet caloric and nutritional needs.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-[#1B5E20]">Advantages of breastfeeding</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Safe, clean, hygienic, affordable, and at the right temperature</li>
                <li>Meets nutritional requirements in early months and is easily digested</li>
                <li>Contains antimicrobial factors; protects against diarrhoea and respiratory infections</li>
                <li>Promotes bonding; supports jaw and teeth development</li>
                <li>Prevents malnutrition and reduces infant mortality</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-[#1B5E20]">Benefits for mothers</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Early initiation lowers risk of post‑partum haemorrhage and anaemia</li>
                <li>Boosts immunity; delays next pregnancy</li>
                <li>Protects against ovarian and breast cancers</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-[#1B5E20]">Weaning</h3>
              <p>Weaning starts at 6 months by introducing foods other than breast milk gradually and systematically (e.g., cow’s milk, fruit juices, cooked rice, suji, dal, vegetables). By one year, children should receive solid foods (cereals, pulses, vegetables, fruits).</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-4">Milestones for Growth</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { age: "6–8 weeks", items: ["Looks at mother and smiles"] },
              { age: "3 months", items: ["Holds head erect"] },
              { age: "4–5 months", items: ["Listens (language development)", "Begins to reach for objects", "Recognises mother"] },
              { age: "6–8 months", items: ["Sits without support", "Experiments with noises", "Enjoys hide n seek", "Transfers objects hand to hand"] },
              { age: "9–10 months", items: ["Crawls", "Increases range of sounds", "Releases objects", "Suspicious of strangers"] },
              { age: "10–11 months", items: ["Stands with support", "First words"] },
              { age: "12–14 months", items: ["Walks with a wide base"] },
              { age: "18–24 months", items: ["Walks with a narrow base", "Begins to run", "Joining words"] },
              { age: "24 months", items: ["Explores", "Runs", "Short sentences"] },
            ].map((m) => (
              <div key={m.age} className="p-6 rounded-2xl bg-white shadow-sm border">
                <div className="text-lg font-semibold text-[#1B5E20]">{m.age}</div>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  {m.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


