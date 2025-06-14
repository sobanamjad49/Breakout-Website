import React from "react";

function About() {
  return (
    <div className="w-full bg-white py-10 px-4 lg:px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Text Content */}
        <div className="lg:pl-10">
          <p className="font-semibold text-lg text-left text-[#333] mb-4">
            WE WANT TO MAKE YOU FEEL GOOD TO LOOK GOOD
          </p>
          <p className="text-sm text-left text-gray-700 leading-relaxed">
            Breakout is representing style and quality since 2010. Breakout
            works on a basis of creativity and responsibility, fused with a
            mirroring New York street style. Effortless style, authenticity and
            easy-going living are at the heart of the brand’s philosophy. These
            positive values shine through at every level, from the laid-back
            tailoring to the made-to-last quality, use of natural materials and
            responsible production. Breakout's aspiration is to be the best
            casual fashion brand with an outstanding price-value proposition:
            Capturing market trends and newness in colors, quality fabrics and
            shapes, and expressing them in the effortless, relaxed and
            comfortable style. For every garment, Breakout pays maximum
            attention to fabric selection, fitting and perfect quality.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            className="w-full max-w-md object-cover rounded shadow-lg"
            src="https://breakout.com.pk/cdn/shop/files/Breakout_About.jpg?v=1740742867&width=360"
            alt="About Breakout"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
