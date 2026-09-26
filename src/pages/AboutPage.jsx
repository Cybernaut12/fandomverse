import './AboutPage.css';

export function AboutPage() {
  return (
    <main className="fv-bg-ink-900 about-page">
      <section className="about-overview">
        <div className="container-narrow about-narrow">
          {/* Title */}
          <h1
            className="fv-display-font fv-text-4xl fv-md-text-5xl fv-text-paper-50 fv-tracking-wide text-center fv-mb-10 about-title"
          >
            Platform Overview
          </h1>

          {/* Body text */}
          <p
            className="fv-text-paper-200 fv-text-lg fv-body-font text-justify fv-mt-8 about-intro-copy"
          >
            FandomVerse was built for people who know what it feels like to fall in love with a
            story  whether that's an anime you couldn't stop watching, a game you lost sleep over,
            or a K-Pop group that somehow became a core part of your identity. We get it, because
            we're fans too. That's exactly why we created a place where all of that lives together,
            side by side. No more jumping between a dozen tabs just to keep up. FandomVerse brings
            anime, gaming, movies, TV shows, K-Pop, comics, and manga into one warm, welcoming
            space  with articles worth reading, galleries worth exploring, events worth knowing
            about, and a community worth being part of.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-pillars">
        <div className="container-narrow about-narrow">
          <div className="row g-4 g-lg-5">

            {/* Our Mission */}
            <div className="col-12 col-md-6 about-pillar-column">
              <h2 className="fv-display-font fv-text-3xl fv-md-text-4xl fv-tracking-wide fv-mb-5 about-section-title">
                Our Mission
              </h2>
              <p className="fv-text-paper-200 fv-text-base fv-body-font text-justify about-copy">
                Our mission is simple  give every fan a place they actually want to come back to.
                We want FandomVerse to feel less like a website and more like a home for the things
                you're passionate about. We're here to make sure you never miss a release, never
                lose track of an event, and always have something worth reading. We believe that
                fan culture deserves real, thoughtful coverage  not just clickbait and hot takes.
                So everything we build, every article we write, and every feature we add comes from
                a genuine love for the fandoms we cover. Our goal is to keep that spirit alive,
                and to make FandomVerse a space where your passion is always welcome.
              </p>
            </div>

            {/* Our Vision */}
            <div className="col-12 col-md-6 about-pillar-column">
              <h2 className="fv-display-font fv-text-3xl fv-md-text-4xl fv-tracking-wide fv-mb-5 about-section-title">
                Our Vision
              </h2>
              <p className="fv-text-paper-200 fv-text-base fv-body-font text-justify about-copy">
                We envision FandomVerse as the go-to destination for pop culture fans around the
                world  a platform where anime lovers, gamers, K-Pop stans, comic readers, and
                movie enthusiasts all feel equally at home. We want to break down the walls between
                fandoms and show that the things we love are more connected than we think. In the
                future, we see a place where discovering something new feels exciting rather than
                overwhelming, where communities grow naturally, and where being a fan isn't just
                something you do alone in your room it's something you share. That's the world
                FandomVerse is working toward, one fandom at a time.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="about-team-section">
        <div className="container-wide about-wide">

          {/* Section heading */}
          <h2
            className="fv-display-font fv-text-4xl fv-md-text-5xl fv-text-paper-50 fv-tracking-wide text-center about-title about-team-heading"
          >
            Meet Our Team
          </h2>

          {/* Team cards */}
          <div className="row justify-content-center g-4 g-xl-5 about-team-grid">
            {[
              {
                name: 'Victor Olamilekan Ajisola',
                role: 'Web Developer',
                desc: 'Specializes in frontend architecture and user experience for FandomVerse.',
                avatar: 'https://ui-avatars.com/api/?name=Victor+Ajisola&background=1c2333&color=ffffff&size=160&bold=true&font-size=0.4',
              },
              {
                name: 'Oladipo Taiwo',
                role: 'Web Developer',
                desc: 'I build modern, responsive web experiences with clean UI and practical problem-solving in mind.',
                avatar: '/oladipo.jpg',
                avatarPosition: 'center top',
              },
              {
                name: 'Ogunmuyiwa Ireoluwa',
                role: 'Web Developer',
                desc: 'Responsible for UI enhancements, performance optimisation, and maintaining code quality.',
                avatar: 'https://ui-avatars.com/api/?name=Ogunmuyiwa+Ireoluwa&background=1c2333&color=ffffff&size=160&bold=true&font-size=0.4',
              },
              {
                name: 'Stacey Ifeanyichukwu',
                role: 'UI/UX Designer',
                desc: 'Crafts intuitive and visually engaging interfaces that keep FandomVerse fans coming back for more.',
                avatar: 'https://ui-avatars.com/api/?name=Stacey+Ifeanyichukwu&background=1c2333&color=ffffff&size=160&bold=true&font-size=0.4',
              },
              {
                name: 'Oluwagbebemi Ososanya',
                role: 'Content Strategist',
                desc: 'Drives the content vision for FandomVerse, ensuring every article and feature resonates with fans.',
                avatar: 'https://ui-avatars.com/api/?name=Oluwagbebemi+Ososanya&background=1c2333&color=ffffff&size=160&bold=true&font-size=0.4',
              },
            ].map((member) => (
              <div key={member.name} className="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">
                <div
                  className="text-center rounded-4 fv-bg-ink-800 border fv-border-ink-600 w-100 about-team-card"
                >
                  {/* Avatar */}
                  <div className="d-flex justify-content-center fv-mb-5">
                    <img
                      className="about-avatar"
                      src={member.avatar}
                      alt={member.name}
                    />
                  </div>

                  {/* Name */}
                  <h3
                    className="fv-heading-font fv-text-xl fv-font-semibold fv-mb-1 about-member-name"
                  >
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className="fv-text-sm fv-text-brand-400 fv-heading-font fv-mb-3 about-member-role">
                    {member.role}
                  </p>

                  {/* Description */}
                  <p className="fv-text-paper-300 fv-text-sm fv-body-font about-member-bio">
                    {member.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
