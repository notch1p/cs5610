import "@/app/labs/lab2/tailwind/utilities.css";
import { FaCalendar, FaEnvelopeOpenText, FaRegClock } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaBookBible } from "react-icons/fa6";
import { VscAccount, VscAgent, VscBell } from "react-icons/vsc";
import { Md18Mp } from "react-icons/md";
import { HiBars2 } from "react-icons/hi2";

export default function ReactIconsSampler() {
  return (
    <div id="wd-react-icons-sampler" className="mb-4 font-sans">
      <h2 className="text-lg font-semibold">React Icons Sampler</h2>
      <div className="flex gap-3 text-3xl">
        <VscAccount />
        <AiOutlineDashboard />
        <FaBookBible />
        <FaCalendar />
        <FaEnvelopeOpenText />
        <FaRegClock />
        <VscAgent className="wd-ftsz-32 wd-fg-color-red" />
        <VscBell className="wd-ftsz-32 wd-fg-color-blue" />
        <br />
        <span className="text-4xl text-blue-600">AI:</span>
        <Md18Mp className="text-4xl text-blue-600" />
        <HiBars2 className="text-4xl text-blue-600" />
      </div>
    </div>
  );
}
