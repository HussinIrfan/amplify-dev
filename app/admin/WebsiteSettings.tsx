"use client";

import react, { useState } from "react";
import { useCollapse } from "@/app/supportFunctions/ToggleCollase";

import AboutUs from "./aboutUs/AboutUs";
import OurWork from "./ourWork/OurWork";
import Calendar from "../Calendar/admin-calendar/AdminCalendar";
import Donations from "./donations/Donations";
import StoreFront from "./store/Store";
import News from "./news/News";

export default function Store() {
  const { isContentCollapsed, toggleCollapse } = useCollapse();

  return (
    <>
      <div className="div">
        <h2 className="admin-h2" onClick={toggleCollapse}>
          Website Settings{" "}
          <span
            className={`dropdown-arrow ${
              isContentCollapsed ? "collapsed" : ""
            }`}
            style={{
              display: "inline-block",
              marginLeft: "8px",
              transition: "transform 0.3s",
              transform: isContentCollapsed ? "rotate(0deg)" : "rotate(-90deg)",
            }}
          >
            ▼
          </span>
        </h2>
        {/* Collapsible Section */}
        {isContentCollapsed && (
          <>
            <AboutUs />
            <OurWork />
            <News />
            <Calendar />
            <Donations />
            <StoreFront />
          </>
        )}
      </div>
    </>
  );
}
