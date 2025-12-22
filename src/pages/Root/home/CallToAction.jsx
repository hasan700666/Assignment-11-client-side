import { NavLink } from "react-router";

const CallToAction = () => {
  return (
    <section className="py-20 bg-[#fee9e6] text-black mb-10">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          See a Problem in Your Area?
        </h2>
        <p className="mb-8 text-lg opacity-90">
          Report public infrastructure issues and help make your city better for
          everyone.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <NavLink to="/add_issues" className="btn_css">
            Report an Issue
          </NavLink>
          <NavLink to="/all_issues" className="btn_css">
            View All Issues
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
