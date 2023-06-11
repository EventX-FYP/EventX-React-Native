import { images } from "../assets";
const categories = [
  {
    title: "Wedding Planners",
    image: images.WeddingPlanner,
  },
  {
    title: "Birthday Planners",
    image: images.BirthdayPlanner,
  },
  {
    title: "Party Planners",
    image: images.PartyPlanner,
  },
  {
    title: "Financial Planners",
    image: images.FinancialPlanner,
  },
  {
    title: "Health & Fitness Planners",
    image: images.HealthFitnessPlanner,
  },
  {
    title: "Work Planners",
    image: images.WorkPlanner,
  },
  {
    title: "Weekly Planners",
    image: images.WeeklyPlanner,
  },
  {
    title: "Personal/Life Planners",
    image: images.PersonalPlanner,
  },
  {
    title: "Digital Planners",
    image: images.DigitalPlanner,
  },
];

const pickerCategories = [
  {
    label: "Wedding",
    value: "Wedding",
  },
  {
    label: "Birthday",
    value: "Birthday",
  },
  {
    label: "Party",
    value: "Party",
  },
  {
    label: "Financial",
    value: "Financial",
  },
  {
    label: "Health & Fitness",
    value: "HealthFitness",
  },
  {
    label: "Work",
    value: "Work",
  },
  {
    label: "Weekly",
    value: "Weekly",
  },
  {
    label: "Personal/Life",
    value: "Personal",
  },
  {
    label: "Digital",
    value: "Digital",
  },
];

const allCategories = [
  "Wedding",
  "Birthday",
  "Party",
  "Financial",
  "HealthFitness",
  "Work",
  "Weekly",
  "Personal",
  "Digital",
];

export { categories, pickerCategories, allCategories };
