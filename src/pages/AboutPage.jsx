export function AboutPage() {
  return (
    <div className="fv-bg-ink-900 fv-pt-16">
      <section className="fv-py-16 fv-md-py-24" style={{ paddingBottom: '5rem' }}>
        <div className="container-narrow">
          {/* Title */}
          <h1
            className="fv-display-font fv-text-4xl fv-md-text-5xl fv-text-paper-50 fv-tracking-wide text-center fv-mb-10"
            style={{ color: '#f5a623' }}
          >
            Platform Overview
          </h1>

          {/* Body text */}
          <p
            className="fv-text-paper-200 fv-text-lg fv-body-font text-justify fv-mt-8"
            style={{ lineHeight: 1.9 }}
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
      <section className="fv-pb-16 fv-md-pb-24">
        <div className="container-narrow">
          <div className="row g-5">

            {/* Our Mission */}
            <div className="col-12 col-md-6">
              <h2 className="fv-display-font fv-text-3xl fv-md-text-4xl fv-tracking-wide fv-mb-5"
                  style={{ color: '#f5a623' }}>
                Our Mission
              </h2>
              <p className="fv-text-paper-200 fv-text-base fv-body-font text-justify"
                 style={{ lineHeight: 1.9 }}>
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
            <div className="col-12 col-md-6">
              <h2 className="fv-display-font fv-text-3xl fv-md-text-4xl fv-tracking-wide fv-mb-5"
                  style={{ color: '#f5a623' }}>
                Our Vision
              </h2>
              <p className="fv-text-paper-200 fv-text-base fv-body-font text-justify"
                 style={{ lineHeight: 1.9 }}>
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
      <section className="fv-pb-20 fv-md-pb-28" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
        <div className="container-wide">

          {/* Section heading */}
          <h2
            className="fv-display-font fv-text-4xl fv-md-text-5xl fv-text-paper-50 fv-tracking-wide text-center"
            style={{ marginBottom: '4rem', color: '#f5a623' }}
          >
            Meet Our Team
          </h2>

          {/* Team cards */}
          <div className="row justify-content-center g-5">
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
                  className="text-center rounded-4 fv-bg-ink-800 border fv-border-ink-600 w-100"
                  style={{
                    padding: '2.5rem 2rem 2rem',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    maxWidth: '320px',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.4)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Avatar */}
                  <div className="d-flex justify-content-center fv-mb-5">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      style={{
                        width: '110px',
                        height: '110px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        objectPosition: member.avatarPosition || 'center',
                      }}
                    />
                  </div>

                  {/* Name */}
                  <h3
                    className="fv-heading-font fv-text-xl fv-font-semibold fv-mb-1"
                    style={{ color: '#4db8b8' }}
                  >
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className="fv-text-sm fv-text-brand-400 fv-heading-font fv-mb-3" style={{ opacity: 0.85 }}>
                    {member.role}
                  </p>

                  {/* Description */}
                  <p className="fv-text-paper-300 fv-text-sm fv-body-font" style={{ lineHeight: 1.7 }}>
                    {member.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="fv-py-12 fv-md-py-16" style={{ background: '#111827' }}>
        <div className="container-narrow">
          <div className="row justify-content-center text-center g-5 align-items-center">
            {[
              { value: '30+', label: 'Users' },
              { value: '10+', label: 'Anime' },
              { value: '5,468+', label: 'Category' },
            ].map((stat) => (
              <div key={stat.label} className="col-12 col-md-4">
                <div className="fv-display-font fv-text-5xl fv-md-text-7xl" style={{ color: '#f5a623', lineHeight: 1.1 }}>
                  {stat.value}
                </div>
                <div className="fv-text-paper-50 fv-text-2xl fv-md-text-3xl fv-body-font" style={{ marginTop: '1rem' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
