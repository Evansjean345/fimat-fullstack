import React from "react";

export default function PanelBlocs() {
  return (
    <div className="flex md:flex-row  md:flex-nowrap flex-wrap flex-col w-full h-full md:space-x-12 md:space-y-0 space-y-12 rounded-xl bg-blue-400 p-12">
      {/* Panel 1 */}
      <div className="md:w-1/3 w-full bg-white flex justify-center items-center rounded-xl space-x-1 sm:space-x-4 lg:space-x-8 py-8 px-5 h-44">
        <img src="/images/order-1.png" alt="" className="w-16 h-16 mt-2" />
        <div>
          <p className="mb-2 font-semibold font-mono text-sm">
            Nombres total de livraisons
          </p>
          <strong className="pl-2 text-xl font-mono">209</strong>
        </div>
      </div>
      {/* Panel 2 */}
      <div className="md:w-1/3 w-full bg-white flex justify-center items-center rounded-xl space-x-1 sm:space-x-4 lg:space-x-8 py-8 px-5 h-44">
        <img src="/images/order.png" alt="" className="w-16 h-16 mt-2" />
        <div>
          <p className="mb-2 font-semibold font-mono text-sm">
            Nombres de livraisons effectuées
          </p>
          <strong className="pl-2 text-xl font-mono">189</strong>
        </div>
      </div>
      {/* Panel 3 */}
      <div className="md:w-1/3 w-full bg-white flex justify-center items-center rounded-xl  space-x-1 sm:space-x-4 lg:space-x-8 py-8 px-5 h-44">
        <img src="/images/video-call.png" alt="" className="w-16 h-16 mt-2" />
        <div>
          <p className="mb-2 font-semibold font-mono text-sm">
            Nombres de total de livreurs
          </p>
          <strong className="pl-2 text-xl font-mono">79</strong>
        </div>
      </div>
    </div>
  );
}
