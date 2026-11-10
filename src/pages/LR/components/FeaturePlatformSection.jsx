import { featureGroups } from "../data/featureGroups";
import FeatureAccordionGroup from "./FeatureAccordionGroup";
import ConnectionExperiences from "./ConnectionExperiences";
import { SectionTitle } from "./SectionTitle";

export default function FeaturePlatformSection() {
  return (
    <section className="py-20 sm:py-24" id="platform">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionTitle
              eyebrow="Remote Access capabilities"
              title="Key Features"
              description="A flexible set of connection, administration, printing, and security tools for remote desktops and published applications."
              centered
            />
            <div className="space-y-20">
              {featureGroups.map((group, groupIndex) =>
                group.title === "Connection experiences" ? (
                  <ConnectionExperiences key={group.title} />
                ) : (
                  <FeatureAccordionGroup
                    group={group}
                    groupIndex={groupIndex}
                    key={group.title}
                  />
                ),
              )}
            </div>
          </div>
        </section>
  );
}
