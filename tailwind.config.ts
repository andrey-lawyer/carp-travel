import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        mob: { min: "480px" },

        tab: { min: "768px" },

        desk: { min: "1280px" },
      },
      colors: {
        "text-white": "#FFFFFF",
        "text-date": "rgba(255, 255, 255, 0.20)",
        "text-error": "#FF5757",
        "button-blue": "#1E90FF",
        "button-blue-hover": "#1C86E5"
      },
      backgroundColor: {
        "bg-label": "rgba(255, 255, 255, 0.05)",
        "button_join": "rgba(255, 255, 255, 0.1)",
        "button_join_hover": "rgba(255, 255, 255, 0.2)"
      },
      fontSize: {
        "button-font": [
          "14px",
          {
            lineHeight: "1.21",
            letterSpacing: "1.4px",
            fontWeight: "400",
          },
        ],
        "button-join": [
          "18px",
          {
            lineHeight: "2.667",
            fontWeight: "700",
          },
        ],
        "button-join-tab": [
          "18px",
          {
            lineHeight: "1.21",
            fontWeight: "700",
          },
        ],
        "button-join-desk": [
          "32px",
          {
            lineHeight: "1.21",
            fontWeight: "700",
          },
        ],

        xss: ["10px", "1.6"],
        xs: ["12px", "1.21"],
        xs_chose_us: ["12px", "1.667"],
        xs_checkbox: ["12px", "1.83333"],
        xs_slogan: ["12px", "2"],
        xs_13: ["13px", "1.53846"],
        xs_input: ["13px", "1.84615"],

        sm: ["14px", "1.42857"],
        sm_tab: ["14px", "1.14286"],
        sm_mob_footer: ["14px","1.7142"],
        sm_tab_h1: ["14px", "1.21"],

        base: ["16px", "1.25"],
        base_desk: ["16px", "1.21"],
        base_desk_place: ["16px", "1.5"],

        lg: ["18px", "1.33333"],
        lg_modal: ["18px", "1.21"],
        lg_career: ["18px", "1.33333"],

        lg_input_desk:["20px", "1.2"],
        xxl_mob_send:["30px", "1.21"],
        xxl_desk_send:["32px", "1.21"],
        xxl_tab_nav_image: ["33px", "1.21"],
        xxl_desk_career:["36px", "1.8333"],
        xxl_mob: ["37px", "1.21"],
        xxl_desk: ["98px", "1.21"],
        xxxl_mob: ["40px", "1.4"],
        xxxl_mob_date: ["43px", "1.21"],
        xxxl_tab: ["67px", "1.21"],
        xxxl_tab_date: ["67px", "1.16418"],
      },
    },
  },
  plugins: [],
};
export default config;