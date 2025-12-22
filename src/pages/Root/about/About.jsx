import React from "react";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">
        Public Infrastructure Issue Reporting System
      </h1>

      <p className="mb-4 text-gray-600">
        The Public Infrastructure Issue Reporting System is a digital platform
        designed to help citizens report real-world public infrastructure
        problems such as broken roads, damaged streetlights, water leakage,
        garbage overflow, and similar issues.
      </p>

      <p className="mb-4 text-gray-600">
        The main goal of this system is to create a transparent and efficient
        communication channel between citizens and public service authorities.
        Instead of informal complaints, all issues are recorded, tracked, and
        resolved through a structured workflow.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">How the System Helps</h2>

      <ul className="list-disc list-inside space-y-2 text-gray-600">
        <li>
          Citizens can report issues with detailed information and images.
        </li>
        <li>Admins review, verify, and assign issues to responsible staff.</li>
        <li>Staff update progress and change issue status.</li>
        <li>Each issue follows a clear lifecycle from pending to closed.</li>
        <li>All important actions are recorded for transparency.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">Our Objective</h2>

      <p className="text-gray-600">
        Our objective is to reduce response time, improve accountability, and
        make public service delivery more effective by using modern web
        technologies and data-driven decision-making.
      </p>
    </div>
  );
};

export default About;
