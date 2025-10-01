
const About = () => {
  return (
    <div className="page-container">
      <div className="space-y-16">
        <div className="page-header text-center">
          <h1
            className="text-6xl font-bold mb-6 font-rama-gothic"
            style={{ color: "var(--rich-black)" }}
          >
            ABOUT G-BO
          </h1>
          <div className="accent-line mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <p className="lead-text">Impact.</p>

            <h2
              className="text-3xl font-bold"
              style={{ color: "var(--rich-black)" }}
            >
              ABOUT G-BO THE PRO
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: "rgba(10, 10, 10, 0.8)" }}
            >
              G-BO The Pro first made his mark in the early 90s alongside his
              partner DJ Rei Double R, creating the most must-have mixtapes in
              New York City. Their tapes weren't just music—they were
              soundtracks to a movement, blending genres with precision, energy,
              and style that set them apart from their contemporaries. Using a
              multitrack recorder rather than the standard two-turntable setup,
              G-BO & Double R brought an innovative, polished sound to the
              mixtape game that cemented their place in hip-hop history.
            </p>
            <p
              className="text-lg leading-relaxed"
              style={{ color: "rgba(10, 10, 10, 0.8)" }}
            >
              Over the decades, G-BO's influence has stretched far beyond the
              streets where those tapes first circulated. Recognized in the
              documentary <em>Mixtape</em> and the Rizzoli book
              <em> Do Remember</em>, his work has become part of the cultural
              archive of hip-hop. Today, G-BO The Pro continues to honor that
              legacy while bringing the same passion, creativity, and
              versatility to live DJ sets, special events, and new projects that
              keep the spirit of those early days alive for both original fans
              and new generations.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
