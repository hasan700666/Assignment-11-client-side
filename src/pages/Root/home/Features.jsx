import {
  FileText,
  Activity,
  Rocket,
  ThumbsUp,
  Users,
  ShieldCheck,
  BarChart3,
  Receipt,
} from "lucide-react";

const features = [
  {
    title: "Smart Issue Reporting",
    desc: "Report public infrastructure issues with images, category, and location.",
    icon: FileText,
  },
  {
    title: "Real-Time Tracking",
    desc: "Track issue progress from pending to closed with full transparency.",
    icon: Activity,
  },
  {
    title: "Priority Boost",
    desc: "Boost urgent issues to get faster attention from authorities.",
    icon: Rocket,
  },
  {
    title: "Public Upvoting",
    desc: "Users can upvote issues to show public importance.",
    icon: ThumbsUp,
  },
  {
    title: "Role-Based Dashboards",
    desc: "Separate dashboards for citizens, staff, and admins.",
    icon: Users,
  },
  {
    title: "Secure System",
    desc: "Protected routes with token and role-based authorization.",
    icon: ShieldCheck,
  },
  {
    title: "Analytics & Reports",
    desc: "View charts and statistics for issues and payments.",
    icon: BarChart3,
  },
  {
    title: "Payments & Invoices",
    desc: "Secure payments with downloadable PDF invoices.",
    icon: Receipt,
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
      <div className="m-20 lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-center">Powerful <span className="text_design_like_btn">Features</span></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#fee9e6] p-6 rounded-xl shadow hover:shadow-lg transition hover:-translate-y-1"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-800/10 mb-4">
                <feature.icon className="text-red-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-red-600">{feature.title}</h3>
              <p className="text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
