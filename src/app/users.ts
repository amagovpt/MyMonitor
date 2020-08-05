const users = {
  "9.1.1.1": {
    "Description": "Non-text content",
    "WCAG 2.1": "1.1.1",
    "Benefits": "WVp LVp WHp LHs LCs Ps"
  },
  "9.1.2.1": {
    "Description": "Audio-only and video-only (pre-recorded)",
    "WCAG 2.1": "1.2.1",
    "Benefits": "WVp LVp WHp LHp LCs"
  },
  "9.1.2.2": {
    "Description": "Captions (pre-recorded)",
    "WCAG 2.1": "1.2.2",
    "Benefits": "WHp LHp LCs"
  },
  "9.1.2.3": {
    "Description": "Audio description or media alternative (pre-recorded)",
    "WCAG 2.1": "1.2.3",
    "Benefits": "WVp LVs LCs"
  },
  "9.1.2.4": {
    "Description": "Captions (live)",
    "WCAG 2.1": "1.2.4",
    "Benefits": "WHp LHp LCs"
  },
  "9.1.2.5": {
    "Description": "Audio description (pre-recorded)",
    "WCAG 2.1": "1.2.5",
    "Benefits": "WVp LVs LCs"
  },
  "9.1.3.1": {
    "Description": "Info and relationships",
    "WCAG 2.1": "1.3.1",
    "Benefits": "WVp LVs LCs"
  },
  "9.1.3.2": {
    "Description": "Meaningful sequence",
    "WCAG 2.1": "1.3.2",
    "Benefits": "WVp LVs LCs"
  },
  "9.1.3.3": {
    "Description": "Sensory characteristics",
    "WCAG 2.1": "1.3.3",
    "Benefits": "WVp LVp WPCp WHp LHp LCs"
  },
  "9.1.3.4": {
    "Description": "Orientation",
    "WCAG 2.1": "1.3.4 [2.1]",
    "Benefits": "LMSp LRp LCs"
  },
  "9.1.3.5": {
    "Description": "Identify input purpose",
    "WCAG 2.1": "1.3.5 [2.1]",
    "Benefits": "LVp"
  },
  "9.1.4.1": {
    "Description": "Use of colour",
    "WCAG 2.1": "1.4.1",
    "Benefits": "WVp LVp WPCp LCs"
  },
  "9.1.4.2": {
    "Description": "Audio control",
    "WCAG 2.1": "1.4.2",
    "Benefits": "WVp LHp LCs"
  },
  "9.1.4.3": {
    "Description": "Contrast (minimum)",
    "WCAG 2.1": "1.4.3",
    "Benefits": "LVp WPCp LCs"
  },
  "9.1.4.4": {
    "Description": "Resize text",
    "WCAG 2.1": "1.4.4",
    "Benefits": "LVp LMSs"
  },
  "9.1.4.5": {
    "Description": "Images of text",
    "WCAG 2.1": "1.4.5",
    "Benefits": "LVp WPCp LCs"
  },
  "9.1.4.10": {
    "Description": "Reflow",
    "WCAG 2.1": "1.4.10 [2.1]",
    "Benefits": "LVp"
  },
  "9.1.4.11": {
    "Description": "Non-text contrast",
    "WCAG 2.1": "1.4.11 [2.1]",
    "Benefits": "LVp WPCp LCs"
  },
  "9.1.4.12": {
    "Description": "Text spacing",
    "WCAG 2.1": "1.4.12 [2.1]",
    "Benefits": "LVp LCp"
  },
  "9.1.4.13": {
    "Description": "Content on hover or focus",
    "WCAG 2.1": "1.4.13 [2.1]",
    "Benefits": "LVp LCp"
  },
  "9.2.1.1": {
    "Description": "Keyboard",
    "WCAG 2.1": "2.1.1",
    "Benefits": "WVp LVp WVCs LMSp"
  },
  "9.2.1.2": {
    "Description": "No keyboard trap",
    "WCAG 2.1": "2.1.2",
    "Benefits": "WVp LVp WVCs LMSp"
  },
  "9.2.1.4": {
    "Description": "Character key shortcuts",
    "WCAG 2.1": "2.1.4 [2.1]",
    "Benefits": "LMSp LRp LCs"
  },
  "9.2.2.1": {
    "Description": "Timing adjustable",
    "WCAG 2.1": "2.2.1",
    "Benefits": "WVp LVp WHp LHp LMSp LCp"
  },
  "9.2.2.2": {
    "Description": "Pause, stop, hide",
    "WCAG 2.1": "2.2.2",
    "Benefits": "WVp LVp WHp LHp LMSp LCp"
  },
  "9.2.3.1": {
    "Description": "Three flashes or below threshold",
    "WCAG 2.1": "2.3.1",
    "Benefits": "PSTp"
  },
  "9.2.4.1": {
    "Description": "Bypass blocks",
    "WCAG 2.1": "2.4.1",
    "Benefits": "WVp LVp WVCs LMSp LCp"
  },
  "9.2.4.2": {
    "Description": "Page titled",
    "WCAG 2.1": "2.4.2",
    "Benefits": "WVp LVp LMSp LCp"
  },
  "9.2.4.3": {
    "Description": "Focus Order",
    "WCAG 2.1": "2.4.3",
    "Benefits": "WVp LVp WHs LMSp LCp"
  },
  "9.2.4.4": {
    "Description": "Link purpose (in context)",
    "WCAG 2.1": "2.4.4",
    "Benefits": "WVp LVp WVCs LMSp LCp"
  },
  "9.2.4.5": {
    "Description": "Multiple ways",
    "WCAG 2.1": "2.4.5",
    "Benefits": "WVp LVp WVCs LMSp LCp"
  },
  "9.2.4.6": {
    "Description": "Headings and labels",
    "WCAG 2.1": "2.4.6",
    "Benefits": "WVp LVp WHs WVCs LMSp LCp"
  },
  "9.2.4.7": {
    "Description": "Focus visible",
    "WCAG 2.1": "2.4.7",
    "Benefits": "WVp LVp WVCs LMSp LCp"
  },
  "9.2.5.1": {
    "Description": "Pointer gestures",
    "WCAG 2.1": "2.5.1 [2.1]",
    "Benefits": "LMSp LRp LCp"
  },
  "9.2.5.2": {
    "Description": "Pointer cancellation",
    "WCAG 2.1": "2.5.2 [2.1]",
    "Benefits": "- LVp LMSp LRp LCs"
  },
  "9.2.5.3": {
    "Description": "Label in name",
    "WCAG 2.1": "2.5.3 [2.1]",
    "Benefits": "LMSp LRp LCs"
  },
  "9.2.5.4": {
    "Description": "Motion actuation",
    "WCAG 2.1": "2.5.4 [2.1]",
    "Benefits": "WVs LVs LMSp LRp LCp"
  },
  "9.3.1.1": {
    "Description": "Language of page",
    "WCAG 2.1": "3.1.1",
    "Benefits": "WVp LVs WHs LHs LCs"
  },
  "9.3.1.2": {
    "Description": "Language of parts",
    "WCAG 2.1": "3.1.2",
    "Benefits": "WVp LVs WHs LHs LCs"
  },
  "9.3.2.1": {
    "Description": "On focus",
    "WCAG 2.1": "3.2.1",
    "Benefits": "WVp LVp LMSp LCp"
  },
  "9.3.2.2": {
    "Description": "On input",
    "WCAG 2.1": "3.2.2",
    "Benefits": "WVp LVp LMSp LCp"
  },
  "9.3.2.3": {
    "Description": "Consistent navigation",
    "WCAG 2.1": "3.2.3",
    "Benefits": "WVp LVp LCp"
  },
  "9.3.2.4": {
    "Description": "Consistent identification",
    "WCAG 2.1": "3.2.4",
    "Benefits": "WVs LVp LCp"
  },
  "9.3.3.1": {
    "Description": "Error identification",
    "WCAG 2.1": "3.3.1",
    "Benefits": "WVp LVp WPCp LCp"
  },
  "9.3.3.2": {
    "Description": "Labels or instructions",
    "WCAG 2.1": "3.3.2",
    "Benefits": "WVp LVp WVCs LMSs LCp"
  },
  "9.3.3.3": {
    "Description": "Error suggestion",
    "WCAG 2.1": "3.3.3",
    "Benefits": "WVp LVp WVCs LMSs LCp"
  },
  "9.3.3.4": {
    "Description": "Error prevention (legal, financial, data)",
    "WCAG 2.1": "3.3.4",
    "Benefits": "WVp LVp LMSs LCp"
  },
  "9.4.1.1": {
    "Description": "Parsing",
    "WCAG 2.1": "4.1.1",
    "Benefits": "WVp LVs"
  },
  "9.4.1.2": {
    "Description": "Name, role, value",
    "WCAG 2.1": "4.1.2",
    "Benefits": "WVp LVp LMSs"
  },
  "9.4.1.3": {
    "Description": "Status messages",
    "WCAG 2.1": "4.1.3 [2.1]",
    "Benefits": "WVp LVp WPCp WHp LHp WVCs LMSp LRp PSTp LCp"
  }
};

export default users;
