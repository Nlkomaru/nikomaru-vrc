"use client";

// Animation timing shared across header-related components
export const ANIMATION_TIMING = {
    // Title fade-in duration (seconds)
    titleDurationSec: 1.0,
    // Gap after title before navigation starts to appear (seconds)
    navAfterTitleGapSec: 0.15,
    // Interval to reveal each nav item sequentially (seconds)
    navStaggerSec: 0.6,
    // Each navigation item's own animation duration (seconds)
    navItemDurationSec: 0.6,
};

// Opacity used to dim non-hovered navigation items
export const HOVER_DIM_OPACITY = 0.45;

// Duration for dimming transition (seconds)
export const HOVER_DIM_DURATION_SEC = 0.18;
