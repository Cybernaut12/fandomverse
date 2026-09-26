import './AboutPage.css';

export function AboutPage() {
  const teamMembers = [
    {
      name: 'Victor Olamilekan Ajisola',
      role: 'Web Developer',
      desc: 'Specializes in frontend architecture and user experience for FandomVerse.',
      avatar: '/images/team/victor.jpg',
      avatarPosition: 'center 15%',
    },
    {
      name: 'Oladipo Taiwo',
      role: 'Web Developer',
      desc: 'I build modern, responsive web experiences with clean UI and practical problem-solving in mind.',
      avatar: '/oladipo.jpg',
      avatarPosition: 'center top',
    },
    {
      name: 'Feranmi Adeosun',
      role: 'Content Strategist',
      desc: 'Drives the content vision for FandomVerse, ensuring every article and feature resonates with fans.',
      avatar: '/images/team/fero.jpeg',
      avatarPosition: 'center',
    },
    {
      name: 'Stacey Ifeanyichukwu',
      role: 'UI/UX Designer',
      desc: 'Crafts intuitive and visually engaging interfaces that keep FandomVerse fans coming back for more.',
      avatar: '/images/team/stacey.png',
      avatarPosition: 'center 20%',
    },
    {
      name: 'Oluwagbebemi Ososanya',
      role: 'Web Developer',
      desc: 'Responsible for UI enhancements, performance optimisation, and maintaining code quality.',
      avatar: '/images/team/oluwagbebemi.png',
      avatarPosition: 'center 25%',
    },
  ];

  return (
    <main className="about-page">
      {/* 1. Platform Overview */}
      <section className="about-overview">
        <div className="about-container">
          <h1 className="about-title text-center">
            Platform <span className="about-title-highlight">Overview</span>
          </h1>

          <div className="about-overview-card">
            <p className="about-intro-copy">
              FandomVerse was built for people who know what it feels like to fall in love with a
              story — whether that's an anime you couldn't stop watching, a game you lost sleep over,
              or a K-Pop group that somehow became a core part of your identity. We get it, because
              we're fans too. That's exactly why we created a place where all of that lives together,
              side by side. No more jumping between a dozen tabs just to keep up. FandomVerse brings
              anime, gaming, movies, TV shows, K-Pop, comics, and manga into one warm, welcoming
              space — with articles worth reading, galleries worth exploring, events worth knowing
              about, and a community worth being part of.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Mission & Vision */}
      <section className="about-pillars">
        <div className="about-container">
          <div className="about-pillars-grid">

            {/* Our Mission */}
            <div className="about-pillar-column">
              <h2 className="about-section-title">
                Our <span className="about-title-highlight">Mission</span>
              </h2>
              <p className="about-copy">
                Our mission is simple — give every fan a place they actually want to come back to.
                We want FandomVerse to feel less like a website and more like a home for the things
                you're passionate about. We're here to make sure you never miss a release, never
                lose track of an event, and always have something worth reading. We believe that
                fan culture deserves real, thoughtful coverage — not just clickbait and hot takes.
                So everything we build, every article we write, and every feature we add comes from
                a genuine love for the fandoms we cover. Our goal is to keep that spirit alive,
                and to make FandomVerse a space where your passion is always welcome.
              </p>
            </div>

            {/* Our Vision */}
            <div className="about-pillar-column">
              <h2 className="about-section-title">
                Our <span className="about-title-highlight">Vision</span>
              </h2>
              <p className="about-copy">
                We envision FandomVerse as the go-to destination for pop culture fans around the
                world — a platform where anime lovers, gamers, K-Pop stans, comic readers, and
                movie enthusiasts all feel equally at home. We want to break down the walls between
                fandoms and show that the things we love are more connected than we think. In the
                future, we see a place where discovering something new feels exciting rather than
                overwhelming, where communities grow naturally, and where being a fan isn't just
                something you do alone in your room — it's something you share. That's the world
                FandomVerse is working toward, one fandom at a time.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Meet Our Team */}
      <section className="about-team-section">
        <div className="about-container about-team-container">
          <h2 className="about-title text-center about-team-heading">
            Meet Our <span className="about-title-highlight">Team</span>
          </h2>

          <div className="about-team-grid">
            {teamMembers.map((member) => (
              <div key={member.name} className="about-team-card">
                <div className="about-avatar-wrap">
                  <img
                    className="about-avatar"
                    src={member.avatar}
                    alt={member.name}
                    style={{ objectPosition: member.avatarPosition || 'center' }}
                  />
                </div>

                <h3 className="about-member-name">
                  {member.name}
                </h3>

                <p className="about-member-role">
                  {member.role}
                </p>

                <p className="about-member-bio">
                  {member.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
