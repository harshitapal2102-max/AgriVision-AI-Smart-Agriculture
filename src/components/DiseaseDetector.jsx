import React, { useState } from "react";

import {
  Upload,
  Leaf,
  AlertCircle,
  CheckCircle,
  Loader2,
  ShieldCheck,
  Stethoscope
} from "lucide-react";


export default function DiseaseDetector() {

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState(null);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  // =====================================================
  // IMAGE UPLOAD
  // =====================================================

  const handleImageUpload = (event) => {

    const file = event.target.files?.[0];

    if (!file) return;


    if (!file.type.startsWith("image/")) {

      setError(
        "Please select a JPG, JPEG or PNG image."
      );

      return;
    }


    setImage(file);

    setPreview(
      URL.createObjectURL(file)
    );

    setResult(null);

    setError("");
  };


  // =====================================================
  // AI ANALYSIS
  // =====================================================

  const analyzeImage = async () => {

    if (!image) {

      setError(
        "Please upload a crop image first."
      );

      return;
    }


    setLoading(true);

    setError("");

    setResult(null);


    try {

      const formData = new FormData();

      formData.append(
        "file",
        image
      );


      const response = await fetch(
        "http://127.0.0.1:8000/predict",
        {
          method: "POST",
          body: formData
        }
      );


      const data = await response.json();


      if (!response.ok) {

        throw new Error(
          data.detail ||
          "AI prediction failed."
        );
      }


      setResult(data);

    }

    catch (err) {

      setError(
        err.message ||
        "Could not connect to the AI server."
      );

    }

    finally {

      setLoading(false);

    }
  };


  return (

    <div className="max-w-5xl mx-auto space-y-6">


      {/* =================================================
          UPLOAD CARD
      ================================================= */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">


        <div className="flex items-center gap-4 mb-7">

          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg,#dcfce7,#bbf7d0)"
            }}
          >

            <Leaf
              className="w-6 h-6 text-green-700"
            />

          </div>


          <div>

            <h2 className="text-2xl font-bold text-gray-800">

              AI Crop Disease Detector

            </h2>


            <p className="text-sm text-gray-400">

              Upload a crop leaf image for AI analysis

            </p>

          </div>

        </div>


        {/* UPLOAD */}

        <label
          className="
            border-2 border-dashed
            border-gray-200
            rounded-2xl
            p-8
            flex flex-col
            items-center
            justify-center
            cursor-pointer
            hover:border-green-400
            hover:bg-green-50/30
            transition
          "
        >

          <Upload
            className="w-10 h-10 text-green-600 mb-3"
          />


          <p className="font-semibold text-gray-700">

            Click to upload crop image

          </p>


          <p className="text-xs text-gray-400 mt-1">

            JPG, JPEG or PNG

          </p>


          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

        </label>


        {/* IMAGE PREVIEW */}

        {preview && (

          <div className="mt-6">

            <p className="text-sm font-semibold text-gray-600 mb-3">

              Selected Crop Image

            </p>


            <div className="rounded-2xl overflow-hidden border border-gray-100">

              <img
                src={preview}
                alt="Selected crop"
                className="
                  w-full
                  max-h-[420px]
                  object-contain
                  bg-gray-50
                "
              />

            </div>

          </div>

        )}


        {/* ANALYZE */}

        {image && (

          <button
            onClick={analyzeImage}
            disabled={loading}
            className="
              mt-6
              w-full
              py-4
              rounded-xl
              font-bold
              text-white
              flex
              items-center
              justify-center
              gap-2
              transition
              hover:scale-[1.01]
              disabled:opacity-60
            "
            style={{
              background:
                "linear-gradient(135deg,#16a34a,#15803d)"
            }}
          >

            {loading ? (

              <>

                <Loader2
                  className="w-5 h-5 animate-spin"
                />

                AI is analyzing image...

              </>

            ) : (

              <>

                <Leaf className="w-5 h-5" />

                Detect Disease

              </>

            )}

          </button>

        )}


        {/* ERROR */}

        {error && (

          <div
            className="
              mt-5
              p-4
              rounded-xl
              bg-red-50
              border border-red-100
              text-red-700
              flex
              items-start
              gap-3
            "
          >

            <AlertCircle
              className="w-5 h-5 flex-shrink-0 mt-0.5"
            />


            <p className="text-sm font-medium">

              {error}

            </p>

          </div>

        )}

      </div>



      {/* =================================================
          RESULT
      ================================================= */}

      {result && (

        <div
          className="
            bg-white
            rounded-3xl
            border
            border-green-100
            shadow-sm
            p-8
          "
        >


          {/* HEADER */}

          <div className="flex items-center gap-3 mb-7">

            <CheckCircle
              className="w-8 h-8 text-green-600"
            />


            <div>

              <h3 className="text-2xl font-bold text-gray-800">

                AI Diagnosis Report

              </h3>


              <p className="text-sm text-gray-400">

                Analysis generated from your uploaded crop image

              </p>

            </div>

          </div>



          {/* MAIN RESULTS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


            {/* CROP */}

            <div
              className="
                p-6
                rounded-2xl
                bg-green-50
                border border-green-100
              "
            >

              <p className="text-xs text-gray-500 uppercase font-semibold">

                Crop

              </p>


              <p className="text-2xl font-bold text-green-800 mt-2">

                {result.prediction.crop}

              </p>

            </div>



            {/* DISEASE */}

            <div
              className="
                p-6
                rounded-2xl
                bg-orange-50
                border border-orange-100
              "
            >

              <p className="text-xs text-gray-500 uppercase font-semibold">

                Disease / Status

              </p>


              <p className="text-2xl font-bold text-orange-800 mt-2">

                {result.prediction.disease}

              </p>

            </div>



            {/* CONFIDENCE */}

            <div
              className="
                p-6
                rounded-2xl
                bg-blue-50
                border border-blue-100
              "
            >

              <p className="text-xs text-gray-500 uppercase font-semibold">

                AI Confidence

              </p>


              <p className="text-2xl font-bold text-blue-800 mt-2">

                {result.prediction.confidence}%

              </p>

            </div>

          </div>



          {/* LOW CONFIDENCE */}

          {result.warning && (

            <div
              className="
                mt-6
                p-5
                rounded-2xl
                bg-yellow-50
                border
                border-yellow-200
              "
            >

              <div className="flex items-start gap-3">

                <AlertCircle
                  className="
                    w-6 h-6
                    text-yellow-600
                    flex-shrink-0
                  "
                />


                <div>

                  <h4 className="font-bold text-yellow-800">

                    Low-confidence prediction

                  </h4>


                  <p className="text-sm text-yellow-700 mt-1">

                    {result.warning}

                  </p>

                </div>

              </div>

            </div>

          )}



          {/* DESCRIPTION */}

          <div
            className="
              mt-6
              p-6
              rounded-2xl
              bg-gray-50
              border border-gray-100
            "
          >

            <div className="flex items-center gap-2 mb-3">

              <Stethoscope
                className="w-5 h-5 text-gray-700"
              />

              <h4 className="font-bold text-gray-800">

                Disease Description

              </h4>

            </div>


            <p className="text-sm text-gray-600 leading-7">

              {result.diagnosis.description}

            </p>

          </div>



          {/* SYMPTOMS */}

          <div
            className="
              mt-5
              p-6
              rounded-2xl
              bg-red-50
              border border-red-100
            "
          >

            <h4 className="font-bold text-gray-800 mb-4">

              🔎 Common Symptoms

            </h4>


            <ul className="space-y-3">

              {result.diagnosis.symptoms.map(
                (item, index) => (

                  <li
                    key={index}
                    className="
                      flex
                      items-start
                      gap-3
                      text-sm
                      text-gray-700
                    "
                  >

                    <span
                      className="
                        w-2
                        h-2
                        rounded-full
                        bg-red-500
                        mt-2
                        flex-shrink-0
                      "
                    />

                    {item}

                  </li>

                )
              )}

            </ul>

          </div>



          {/* SOLUTION */}

          <div
            className="
              mt-5
              p-6
              rounded-2xl
              bg-green-50
              border border-green-100
            "
          >

            <h4 className="font-bold text-gray-800 mb-4">

              🌱 Recommended Solution

            </h4>


            <ul className="space-y-3">

              {result.diagnosis.solution.map(
                (item, index) => (

                  <li
                    key={index}
                    className="
                      flex
                      items-start
                      gap-3
                      text-sm
                      text-gray-700
                    "
                  >

                    <CheckCircle
                      className="
                        w-5
                        h-5
                        text-green-600
                        flex-shrink-0
                      "
                    />

                    {item}

                  </li>

                )
              )}

            </ul>

          </div>



          {/* PREVENTION */}

          <div
            className="
              mt-5
              p-6
              rounded-2xl
              bg-blue-50
              border border-blue-100
            "
          >

            <div className="flex items-center gap-2 mb-4">

              <ShieldCheck
                className="w-5 h-5 text-blue-600"
              />

              <h4 className="font-bold text-gray-800">

                🛡 Prevention

              </h4>

            </div>


            <ul className="space-y-3">

              {result.diagnosis.prevention.map(
                (item, index) => (

                  <li
                    key={index}
                    className="
                      flex
                      items-start
                      gap-3
                      text-sm
                      text-gray-700
                    "
                  >

                    <span className="text-blue-600 font-bold">

                      ✓

                    </span>

                    {item}

                  </li>

                )
              )}

            </ul>

          </div>



          {/* DISCLAIMER */}

          <div
            className="
              mt-6
              p-5
              rounded-2xl
              bg-gray-50
              border border-gray-100
            "
          >

            <p className="text-xs text-gray-500 leading-6">

              <strong>Important:</strong>{" "}

              This AI result is a screening aid and not a
              laboratory diagnosis. If the confidence is low,
              upload a clearer image. For serious crop damage
              or treatment decisions, verify the result with
              a qualified agricultural expert and follow
              locally approved agricultural guidance.

            </p>

          </div>

        </div>

      )}

    </div>

  );
}