import Aarti from "../assets/Aarti/Aarti.mp3";
import MorningAarti from "../assets/Aarti/MorningArti.mp3";
import EveningAarti from "../assets/Aarti/EveningArti.mp3";
import Nididhyasan from "../assets/Nididhyasan/Nididhyasan.mp3";
import BAPSSwaminarayanDhun1 from "../assets/Dhun/BAPSSwaminarayanDhun1.mp3";
import BAPSSwaminarayanDhun2 from "../assets/Dhun/BAPSSwaminarayanDhun2.mp3";
import Thal from "../assets/Thal/BAPSSwaminarayanThal.mp3";
import cheshta from "../assets/cheshta/cheshta.mp3";
import ShriSahajanandNamavaliPath from "../assets/Namavali/ShriSahajanandNamavaliPath.mp3";
import TamariMurtiVinaMaraNathRe from "../assets/Kirtan/TamariMurtiVinaMaraNathRe.mp3";
import SardhShatabdiUtsavGeet from "../assets/Kirtan/SardhShatabdiUtsavGeet.mp3";
import SwaminarayanDhaun3 from "../assets/Dhun/NonStopSwaminarayanDhunMahantSwamiMaharaj.mp3";

export const playlistTabs = {
  DailyRituals: [
    {
      title: "Nididhyasan",
      url: Nididhyasan,
    },
    {
      title: "Nididhyasan & Morning Aarti-Ashtak",
      url: MorningAarti,
    },
    {
      title: "Nididhyasan & Evening Aarti-Ashtak",
      url: EveningAarti,
    },
    {
      title: "Swaminarayan Dhun 1",
      url: BAPSSwaminarayanDhun1,
    },
    {
      title: "Swaminarayan Dhun - Mahant Swami Maharaj",
      url: SwaminarayanDhaun3,
    },
    {
      title: "Cheshta",
      url: cheshta,
    },
  ],
  Thal: [
    {
      title: "Thal",
      url: Thal,
    },
    {
      title: "Thal",
      url: Thal,
    },
  ],
  Kirtans: [
    {
      title: "Tamari Murti Vina Mara Nath Re",
      url: TamariMurtiVinaMaraNathRe,
    },
    {
      title: "Sardh Shatabdi Utsav Geet",
      url: SardhShatabdiUtsavGeet,
    },
  ],
  Prabhatiya: [
    {
      title: "Prabhatiya 1",
      url: BAPSSwaminarayanDhun2,
    },
    {
      title: "Prabhatiya 2",
      url: SwaminarayanDhaun3,
    },
  ],
  Katha: [
    {
      title: "Katha 1",
      url: BAPSSwaminarayanDhun2,
    },
    {
      title: "Katha 2",
      url: SwaminarayanDhaun3,
    },
  ],
  DevotionalMusic: [
    {
      title: "Devotional Music 1",
      url: Aarti,
    },
    {
      title: "Devotional Music 2",
      url: Aarti,
    },
  ],
};
