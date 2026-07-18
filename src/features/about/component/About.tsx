"use client";

import { motion, Variants } from "framer-motion";
import { XCircle, ArrowRight, Quote } from "lucide-react";
import Link from "next/link";
import ParticlesBackground from "@/components/shared/ParticlesBackground";
import Image from "next/image";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const sectionClassName =
  "mx-auto mb-16 grid max-w-[1100px] grid-cols-1 gap-12 px-6 lg:grid-cols-[280px_1fr] lg:gap-24";
const sectionTitleClassName =
  "mb-6 text-[1.75rem] font-extrabold tracking-[-0.01em] text-[var(--primary)]";
const paragraphClassName =
  "mb-8 text-[1.125rem] font-normal leading-[1.85] text-slate-600";
const contentBlockClassName = "max-w-[750px]";

export default function About() {
  return (
    <div className="mx-auto w-full font-inherit">
      {/* Hero Section with Particles Background */}
      <div className="relative overflow-hidden bg-[var(--secondary)] pb-16">
        <div className="absolute inset-0 z-0">
          <ParticlesBackground />
        </div>

        <motion.header
          className="relative z-10 mx-auto max-w-[1200px] px-6 pb-24 pt-40 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="mb-6 inline-flex items-center rounded-full border border-slate-900/10 bg-white/40 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-slate-900 backdrop-blur-md">
            <span className="mr-2 inline-block size-1.5 rounded-full bg-slate-900" />
            Strategic Foresight
          </span>
          <h1 className="mb-8 text-[clamp(2.5rem,8vw,4.75rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#0F172A]">
            The Intelligence Layer for High-Stakes Planning
          </h1>
          <p className="mx-auto max-w-[800px] text-lg font-medium leading-[1.6] text-[#5B6B82]">
            Empowering boardroom leaders and strategy teams to navigate modern
            complexity with unmatched clarity and conviction.
          </p>
        </motion.header>
      </div>

      <div className="bg-[#fcfbf8] py-20 md:pb-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Our Mission Section */}
          <motion.section className={sectionClassName} variants={itemVariants}>
            <aside className="h-fit">
              <h2 className={sectionTitleClassName}>Our Mission</h2>
              <div className="h-1 w-16 bg-[#0F172A]/10 rounded-full" />
            </aside>

            <div className={contentBlockClassName}>
              <motion.p
                className="mb-14 rounded-r-[1.5rem] rounded-l-none border-l-4 border-[#0F172A] bg-white p-10 text-[1.35rem] font-bold leading-[1.6] text-[#0F172A] shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)]"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Second Sight exists to give every strategic leader the
                intelligence needed to make decisions with conviction.
              </motion.p>

              <p className={paragraphClassName}>
                Businesses suffer from a shortage of clarity. Every boardroom, every strategy team, every leadership table is drowning in signals, like market reports, competitor moves, regulatory shifts, macro tremors, with no reliable framework for translating that noise into decisive action.
              </p>

              <p className={paragraphClassName}>
                We built Second Sight to change that.
              </p>

              <p className={paragraphClassName}>
                By combining the analytical power of LLMs with a rigorous, battle-tested scenario planning methodology, Second Sight transforms uncertainty from a liability into a strategic asset. In minutes your team can explore multiple futures, stress-test your current strategy against thousands of edge cases and produce board-ready intelligence that drives high-conviction decision making.
              </p>

              <p className={paragraphClassName}>
                This is not your normal forecasting or prediction. This is scenario intelligence, a discipline that separates the organizations that merely react to the future from the ones that shape it.
              </p>
            </div>
          </motion.section>

          {/* The Founder Section */}
          <motion.section className={sectionClassName} variants={itemVariants}>
            <aside className="h-fit lg:sticky lg:top-28 lg:self-start">
              <h2 className={sectionTitleClassName}>The Founder</h2>
              <div className="h-1 w-16 bg-[#0F172A]/10 rounded-full mb-6" />

              {/* Founder Avatar Card for Desktop/Large Screens */}
              <div className="mt-8 hidden lg:block">
                <div className="group w-full max-w-[30rem] rounded-[2rem] border border-slate-900/6 bg-white py-6 text-center shadow-[0_22px_55px_rgba(15,23,42,0.08)] transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1.5 hover:border-slate-900/12 hover:shadow-[0_28px_55px_rgba(15,23,42,0.1)]">
                  <div className="relative mx-auto mb-8 h-[220px] w-[220px] overflow-hidden rounded-3xl border border-slate-900/10 shadow-[0_18px_36px_rgba(15,23,42,0.1)]">
                    <Image
                      src="/images/MohamedEltawous.jpg"
                      alt="Mohamed Eltawous"
                      fill
                      sizes="140px"
                      priority
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <h3 className="mb-2 whitespace-nowrap text-[1.25rem] font-semibold leading-[1.2] text-[var(--primary)]">
                      Mohamed Eltawous
                    </h3>
                    <p className="mb-4 text-[1.2rem] font-semibold text-slate-500">
                      Founder & CEO
                    </p>
                    <span className="inline-flex rounded-full border border-sky-100 bg-sky-50 px-4 py-[0.45rem] text-base font-bold text-sky-700">
                      Second Sight
                    </span>
                  </div>
                </div>
              </div>
            </aside>

            <div className={contentBlockClassName}>
              {/* Founder Avatar for Mobile Screens */}
              <div className="mb-8 flex w-full max-w-96 items-center gap-6 rounded-3xl border border-slate-900/6 bg-white p-7 shadow-[0_14px_32px_rgba(15,23,42,0.05)] lg:hidden">
                <div className="relative h-[108px] w-[108px] shrink-0 overflow-hidden rounded-[1.15rem] border border-slate-900/10 shadow-[0_14px_28px_rgba(15,23,42,0.1)]">
                  <Image
                    src="/images/MohamedEltawous.jpg"
                    alt="Mohamed Eltawous"
                    fill
                    sizes="88px"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <h3 className="mb-[0.45rem] whitespace-nowrap text-[1.4rem] font-extrabold leading-[1.2] text-[#0f172a]">
                    Mohamed Eltawous
                  </h3>
                  <p className="mb-3 text-[1.05rem] font-semibold leading-[1.5] text-slate-500">
                    Founder & CEO
                  </p>
                  <span className="inline-flex rounded-full border border-sky-100 bg-sky-50 px-4 py-[0.45rem] text-base font-bold text-sky-700">
                    Second Sight
                  </span>
                </div>
              </div>

              <p className={paragraphClassName}>
                Mohamed Eltawous spent around 10 years at the intersection of strategy, operations, and project delivery in some of the GCC&apos;s most dynamic financial services organizations. He was part of programs that most strategy teams only read about in case studies, like a post-acquisition integration spanning ten workstreams and five departments, a digital wallet rollout, and partner onboarding programs generating over $200 million in new revenue.
              </p>

              <p className={paragraphClassName}>
                Across every one of those initiatives, he worked closely with leadership teams making decisions under genuine uncertainty, including regulatory direction, digital adoption curves, competitor moves, and the pace of organizational change. He observed, repeatedly, that the tools available to those leadership teams were not adequate for the complexity of the decisions they were making. The spreadsheets, slide decks, consultant reports that arrived after the decision window had closed and strategy frameworks that produced a single forecast and called it a plan.
              </p>

              <p className={paragraphClassName}>
                There was no platform that helped leadership teams think rigorously about multiple futures simultaneously and connect that thinking directly to the decisions on the table.
              </p>

              <p className="text-xl font-bold text-[#0F172A] mt-6 mb-8 border-l-2 border-[#0F172A]/20 pl-4">
                That gap is what Second Sight is built to close.
              </p>

              {/* Elegant Blockquote for the Quote */}
              <div className="relative mt-12 overflow-hidden rounded-3xl border border-[#def0fa]/80 border-l-4 border-l-[var(--primary)] bg-[linear-gradient(135deg,rgba(255,255,255,0.95)_0%,rgba(222,240,250,0.25)_100%)] p-10 shadow-[0_10px_30px_rgba(15,23,42,0.02)]">
                {/* Decorative Quote Icon */}
                <div className="pointer-events-none absolute right-4 top-4 z-[1] text-[rgba(15,23,42,0.03)]">
                  <Quote size={100} strokeWidth={1} />
                </div>

                <blockquote className="relative z-10 text-[1.15rem] font-semibold italic leading-[1.8] text-slate-800 md:text-[1.25rem]">
                  &ldquo;Every big strategic decision I have seen made was made under uncertainty. It was never whether the future was uncertain, it was whether the leadership team had thought carefully about what that uncertainty meant for their choices. Second Sight exists to make that thinking structured, accessible, and actionable.&rdquo;
                </blockquote>

                <div className="relative z-10 mt-6 flex items-center gap-3">
                  <div className="h-px w-8 bg-slate-300" />
                  <span className="text-sm font-bold text-[var(--primary)]">
                    Mohamed Eltawous, Founder & CEO
                  </span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* The Problem We Solve Section */}
          <motion.section className={sectionClassName} variants={itemVariants}>
            <aside className="h-fit">
              <h2 className={sectionTitleClassName}>The Problem We Solve</h2>
              <div className="h-1 w-16 bg-[#0F172A]/10 rounded-full" />
            </aside>

            <div className={contentBlockClassName}>
              <p className={paragraphClassName}>
                Traditional strategic planning was built for a world that no
                longer exists:
              </p>

              <ul className="my-12 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                {[
                  "Annual planning cycles",
                  "Static SWOT analyses",
                  "Linear forecasting",
                  "Rigid budgeting",
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-center gap-5 rounded-3xl border border-slate-900/10 bg-white px-8 py-6 font-bold text-[#0F172A] shadow-[0_10px_30px_rgba(15,23,42,0.02)] transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                    whileHover={{
                      y: -5,
                      boxShadow: "0 20px 40px rgba(15, 23, 42, 0.12)",
                      borderColor: "#0F172A",
                    }}
                  >
                    <XCircle className="shrink-0 text-[#ff6b6b]" size={22} />
                    {item}
                  </motion.li>
                ))}
              </ul>

              <p className={paragraphClassName}>
                In an era of accelerating technological disruption, geopolitical
                volatility, regulatory complexity, and compressed decision
                timelines, these tools actively mislead.
              </p>

              <p className={paragraphClassName}>
                The organizations that suffered most during recent market shocks
                were the ones with brittle strategies; plans built on a single
                assumed future that never arrived.
              </p>

              <p className={paragraphClassName}>
                The organizations that thrived were the ones that had already
                mapped multiple futures. That had already asked:{" "}
                <span className="italic text-[#5B6B82]">
                  What if? What then? How do we respond?
                </span>
              </p>

              <div className="mt-24 rounded-[2.5rem] border border-slate-900/10 bg-white p-10 shadow-[0_32px_80px_rgba(15,23,42,0.08)] md:p-16">
                <p className="mb-5 text-2xl font-extrabold text-[#0F172A]">
                  Democratizing Excellence
                </p>
                <p className={paragraphClassName}>
                  Scenario intelligence has historically been the exclusive
                  domain of large enterprises with access to elite multi-month
                  consulting engagements.
                </p>
                <p className={paragraphClassName}>
                  Second Sight democratizes it. We put that same rigour, that
                  same analytical depth, into the hands of every strategic
                  leader, instantly, affordably, and when it is needed most.
                </p>
                <Link
                  href="/how-it-works"
                  className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-[#0F172A] px-8 py-4 font-bold text-white transition-all duration-300 ease-out hover:translate-x-1 hover:opacity-95 hover:shadow-[0_10px_25px_rgba(15,23,42,0.15)]"
                >

                  Explore our methodology <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}
