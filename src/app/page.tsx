import Head from "next/head";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Highlights from "@/components/Highlights";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Eduardo Greb | Senior Full Stack Engineer & Game Developer
        </title>
        <meta name="description" content="Portfolio of Eduardo Greb" />
      </Head>

      <header className="fixed inset-x-0 top-0 bg-gray-900/90 backdrop-blur-sm z-50">
        <Navigation />
      </header>

      <main
        className="
          bg-gray-900 text-white
          pt-[4rem] md:pt-32
          px-4 sm:px-8
          space-y-24 md:space-y-32
        "
      >
        <Reveal>
          <HeroSection />
        </Reveal>

        <section
          id="experience"
          className="
            container mx-auto
            px-4 md:px-0
            py-8 md:py-12
          "
        >
          <Reveal>
            <div className="mb-6 md:mb-8">
              <p className="text-xs md:text-sm uppercase text-gray-400 tracking-widest">
                What I’ve done
              </p>
              <h2 className="text-2xl md:text-3xl font-bold">
                Professional Experience
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <ExperienceTimeline />
          </Reveal>
        </section>

        <section
          id="highlights"
          className="
            container mx-auto
            px-4 md:px-0
            py-8 md:py-12
          "
        >
          <Reveal>
            <div className="mb-6 md:mb-8">
              <p className="text-xs md:text-sm uppercase text-gray-400 tracking-widest">
                My expertise
              </p>
              <h2 className="text-2xl md:text-3xl font-bold">
                Highlights & Specialties
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <Highlights />
          </Reveal>
        </section>

        <section
          id="skills"
          className="
            container mx-auto
            px-4 md:px-0
            py-8 md:py-12
          "
        >
          <Reveal>
            <div className="mb-6 md:mb-8">
              <p className="text-xs md:text-sm uppercase text-gray-400 tracking-widest">
                What I’m good at
              </p>
              <h2 className="text-2xl md:text-3xl font-bold">Skills</h2>
            </div>
          </Reveal>
          <Reveal>
            <Skills />
          </Reveal>
        </section>

        <section
          id="projects"
          className="
            container mx-auto
            px-4 md:px-0
            py-8 md:py-12
          "
        >
          <Reveal>
            <div className="mb-6 md:mb-8">
              <p className="text-xs md:text-sm uppercase text-gray-400 tracking-widest">
                Some things I’ve built
              </p>
              <h2 className="text-2xl md:text-3xl font-bold">Projects</h2>
            </div>
          </Reveal>
          <Projects itemsKey="projects" />
        </section>

        <section
          id="personal-projects"
          className="
            container mx-auto
            px-4 md:px-0
            py-8 md:py-12
          "
        >
          <Reveal>
            <div className="mb-6 md:mb-8">
              <p className="text-xs md:text-sm uppercase text-gray-400 tracking-widest">
                Side projects
              </p>
              <h2 className="text-2xl md:text-3xl font-bold">
                Personal Projects
              </h2>
            </div>
          </Reveal>
          <Projects itemsKey="personalProjects" />
        </section>
      </main>
      <Footer />
    </>
  );
}
