const steps = [
  {
    title: "Report an Issue",
    desc: "Citizens submit issues with images, category, and location.",
  },
  {
    title: "Admin Review & Assign",
    desc: "Admin verifies the issue and assigns it to staff.",
  },
  {
    title: "Staff Starts Work",
    desc: "Staff updates the issue status as work progresses.",
  },
  {
    title: "Issue Resolved",
    desc: "The problem is fixed and marked as resolved.",
  },
  {
    title: "Issue Closed",
    desc: "Final closure with complete timeline history.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-10">
      <div className="max-w-5xl mx-auto px-4">
      <div className="m-20 lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-center">How It <span className="text_design_like_btn">Works</span></div>

        <div className="relative">
          <div className="absolute left-5 top-0 h-full w-0.5 bg-red-500/30"></div>

          <div className="space-y-10">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6">
                <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold z-10">
                  {index + 1}
                </div>
                <div className="bg-red-100 p-6 rounded-xl shadow w-full hover:bg-red-600 hover:text-white transition">
                  <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                  <p className=" text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
