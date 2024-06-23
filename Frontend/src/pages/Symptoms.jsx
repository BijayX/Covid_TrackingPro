import React from "react";
import Header from "../components/Header";

const Symptoms = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
        <div className="max-w-5xl bg-white p-6 rounded-lg border border-gray-300 shadow-lg flex flex-col md:flex-row">
          <div className="md:w-3/4 md:pr-6">
            <h1 className="text-2xl font-bold text-purple-700 mb-4">
              COVID-19 Coronavirus - Symptoms
            </h1>
            <div className="bg-pink-100 text-red-700 p-4 rounded-md mb-6">
              There’s currently no vaccine to prevent coronavirus disease
              (COVID-19). So, take the necessary preventive measures.
            </div>
            <p className="mb-4">
              On average it takes 5–6 days from when someone is infected with
              the virus for symptoms to show, however it can take up to 14 days.
              People with mild symptoms who are otherwise healthy should
              self-isolate. Seek medical attention if you have a fever, a cough,
              and difficulty breathing.
            </p>
            <p className="mb-4">
              COVID-19 affects different people in different ways. Most infected
              people will develop mild to moderate symptoms.
            </p>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Common Symptoms</h2>
              <ul className="list-disc list-inside">
                <li>Fever</li>
                <li>Tiredness</li>
                <li>Dry Cough</li>
              </ul>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Some People May Experience</h2>
              <ul className="list-disc list-inside">
                <li>Aches and Pains</li>
                <li>Nasal Congestion</li>
                <li>Runny Nose</li>
                <li>Sore Throat</li>
                <li>Diarrhoea</li>
              </ul>
            </div>
            <div className="text-sm text-center text-gray-500">
              These are for informational purposes only. Consult your local
              medical authority for advice. (Source: World Health Organization)
            </div>
          </div>
          <div className="md:w-1/4 mt-6 md:mt-0">
            <iframe
              className="w-full rounded-lg shadow-lg mb-4"
              height="200"
              src="https://www.youtube.com/embed/BtN-goy9VOY"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Useful Links</h2>
              <ul className="list-disc list-inside text-blue-600">
                <li>
                  <a
                    href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Prevention of Coronavirus
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.who.int/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Learn more on who.int
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Symptoms;
