import React from "react";

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full  bg-slate-700 flex justify-center flex-col">
      <div className="logo font-bold bg-slate-700 flex justify-center text-xl ">
        <span className="text-green-500">&lt;</span>
        Pass
        <span className="text-green-500">OP/&gt;</span>
      </div>
      <span className="text-white flex justify-center text-xs">
        Created By Irfan
      </span>
    </div>
  );
};

export default Footer;
