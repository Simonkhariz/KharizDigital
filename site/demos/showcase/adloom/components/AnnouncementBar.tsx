import { ArrowRight } from "lucide-react";
import { announcement } from "../data/content";
import "./AnnouncementBar.css";

export function AnnouncementBar() {
  return (
    <div className="al-announcement-bar-bar">
      <p>
        {announcement.text}{" "}
        <a href={announcement.href} className="al-announcement-bar-link">
          {announcement.cta}
          <ArrowRight size={15} strokeWidth={1.75} aria-hidden="true" />
        </a>
      </p>
    </div>
  );
}
