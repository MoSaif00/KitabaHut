import { ActivitySquare, CalendarClock, Infinity, Palette } from "lucide-react";

const features = [
  {
    name: "Fast Setup",
    description:
      "Create your blog in minutes, with no technical skills needed. Get started with a professional-looking blog instantly.",
    icon: CalendarClock,
  },
  {
    name: "Unlimited Content",
    description:
      "Publish and manage unlimited articles on your blog. Easily update and add new content anytime.",
    icon: Infinity,
  },
  {
    name: "Beautiful Design",
    description:
      "Your blog will look stunning with our single, well-crafted template that is clean, modern, and fully responsive.",
    icon: Palette,
  },
  {
    name: "Scalable Growth",
    description:
      "With our subscription, you can create multiple blogs and grow your online presence with unlimited articles for each blog.",
    icon: ActivitySquare,
  },
];

export function Features() {
  return (
    <div className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-2xl text-center lg:text-center">
        <p className="text-sm font-semibold leading-7 text-primary sm:text-base">
          Blog in No Time
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          Launch Your Blog in Just Minutes
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-base">
          Get your blog up and running effortlessly. We simplify the process so
          you can create a professional blog in no time. No coding required —
          just quick, easy, and intuitive setup, allowing you to focus on what
          matters most: your content.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl sm:mt-16 lg:mt-24 lg:max-w-4xl">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:max-w-none lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-14 sm:pl-16">
              <div className="text-base font-semibold leading-7">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="size-5 text-white sm:size-6" />
                </div>
                {feature.name}
              </div>
              <p className="mt-2 text-sm leading-snug text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
