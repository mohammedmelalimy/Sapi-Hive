export const services = [
  {slug: "hive-corporate", title: "Hive Corporate", short: "Business operations and support", description: "Managed teams for everyday business operations.", offerings: ["Finance support & bookkeeping", "Admin & back-office operations", "Customer & technical support", "Logistics", "Business consultation & process improvement"]},
  {slug: "hive-tech", title: "Hive Tech", short: "Software & IT", description: "Engineering and technical solutions built around your business.", offerings: ["Software & systems development", "Web design & development", "IT support & tech solutions"]},
  {slug: "hive-people", title: "Hive People", short: "Recruitment, HR & payroll", description: "HR professionals who find, onboard, pay and support your people.", offerings: ["HR operations", "Recruitment & mass hiring", "Payroll processing"]},
  {slug: "hive-talent", title: "Hive Talent", short: "Event & campaign staffing", description: "People who represent your brand at events, activations and launches.", offerings: ["Models & promoters", "Brand ambassadors", "Ushers & event staff", "Event & campaign staffing"]},
  {slug: "hive-creative", title: "Hive Creative", short: "Branding & content", description: "Marketing and design teams that give your brand a consistent voice.", offerings: ["Graphic design", "Branding & visual identity", "Content creation"]},
] as const;
export const serviceSlugs = services.map((s) => s.slug);
