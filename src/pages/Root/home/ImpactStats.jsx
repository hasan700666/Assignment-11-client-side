import { FileCheck, Clock, Users, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Issues Reported",
    value: "2,450+",
    icon: FileCheck,
  },
  {
    title: "Issues Resolved",
    value: "1,980+",
    icon: TrendingUp,
  },
  {
    title: "Active Citizens",
    value: "3,200+",
    icon: Users,
  },
  {
    title: "Avg. Response Time",
    value: "24 Hours",
    icon: Clock,
  },
];

const ImpactStats = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
      <div className="m-20 lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-center">Platform <span className="text_design_like_btn">Impact</span></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-base-200 rounded-xl p-6 text-center shadow hover:shadow-lg transition"
            >
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-600/10">
                <stat.icon className="text-red-600" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-gray-500">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
