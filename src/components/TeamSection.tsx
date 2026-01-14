const TeamSection = () => {
  const managementTeam = [
    {
      name: "A. S. M. Al-Amin",
      role: "Chairman",
      qualification: "Honours Islamic Studies, National University, Bangladesh",
      avatar: "AA",
    },
    {
      name: "Mufti Mohammad Arif Hossain",
      role: "Director & Madina Co-ordinator",
      qualification: "Imam and Khatib, Savar Thana Bus-stand Jame Masjid. Senior Muhaddith, Jamia Mahmudia Madrasha.",
      avatar: "MA",
    },
    {
      name: "Abul Kalam",
      role: "Director",
      qualification: "Honours Islamic Studies, National University, Bangladesh",
      avatar: "AK",
    },
    {
      name: "Muzahidul Islam Nahid",
      role: "Asst. Director & Makkah Co-ordinator",
      qualification: "Masters, Al-Hadith, Islamic Arabic University, Bangladesh",
      avatar: "MN",
    },
  ];

  const shariahBoard = [
    {
      name: "Habibullah Mesbah Madani",
      role: "Shariah Consultant",
      qualification: "Honours Islamic Law and Jurisprudence, Madina Islami University, Saudi Arabia",
      avatar: "HM",
    },
    {
      name: "Anamul Hasan Sadi",
      role: "Consultant",
      qualification: "Hafez, International Qari",
      avatar: "AS",
    },
  ];

  return (
    <section id="team" className="py-24 bg-background">
      <div className="container">
        {/* Management Board */}
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold uppercase tracking-wider">
            Meet Our Team
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
            Management Board
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our dedicated team of experienced professionals ensures your sacred journey 
            is comfortable, safe, and spiritually fulfilling.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {managementTeam.map((member) => (
            <div
              key={member.name}
              className="bg-card rounded-2xl p-6 shadow-elegant hover:shadow-lg transition-all duration-300 group text-center"
            >
              <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-heading font-bold text-primary-foreground">
                  {member.avatar}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-secondary font-medium text-sm mb-3">{member.role}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {member.qualification}
              </p>
            </div>
          ))}
        </div>

        {/* Shariah Board */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shariah Board
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our Shariah advisors ensure all our services comply with Islamic principles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {shariahBoard.map((member) => (
            <div
              key={member.name}
              className="bg-muted rounded-2xl p-6 shadow-elegant hover:shadow-lg transition-all duration-300 group text-center"
            >
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-xl font-heading font-bold text-secondary-foreground">
                  {member.avatar}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {member.qualification}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
