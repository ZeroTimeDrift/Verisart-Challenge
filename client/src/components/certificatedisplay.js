import React, { useState, useEffect } from "react";
import axios from "axios";

  
  export default function CertficateDisplay() {
    const [certificates, setCertificates] = useState([]);
    async function getCertificates() {
      const result = await axios.get("http://localhost:5001/record");
      console.log(result.data);
      return result;
    }
    useEffect(() => {
      getCertificates().then((result) => { setCertificates(result.data) });
    }, []);

    /* useEffect(() => { don't need this
      // called when the component is mounted and certificates is updated
      console.log("this is now the " + JSON.stringify(certificates));
    }, [certificates]); */

    return (
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
  
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
            {certificates && certificates.map((certificate) => (
              <div key={certificate.title} className="group relative">
                <div className="w-full h-56 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
                  <img
                    src={"http://localhost:5001/images/" + certificate.photo}
                    /* alt={product.imageAlt} */
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                {/* <h3 className="mt-4 text-sm text-gray-700">
                  <a href={certificate.artist}>
                    <span className="absolute inset-0" />
                  </a>
                </h3> */}
                <p className="mt-1 text-sm text-gray-500">{certificate.title}</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{certificate.artist}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  