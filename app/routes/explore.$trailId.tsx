import { useEffect, useState } from "react";
import CreateStepForm from "../components/buttonModal";
import { getAllSteps, getAllStepsByTrailId } from "../api/config/config";
import { useParams } from "@remix-run/react";

interface Step {
  id: string;
  title: string;
  content: string;
}

export default function Explore() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stepsData, setStepsData] = useState<Step[]>([]);
  const { trailId } = useParams<{ trailId: string }>();

  useEffect(() => {
    if (trailId) {
      getTrailIdSteps(trailId);
    } else {
      updateSteps();
    }
  }, [trailId]);

  const updateSteps = async () => {
    try {
      const stepsData = await getAllSteps();
      setStepsData(stepsData);
    } catch (error) {
      console.error("Error updating steps:", error);
    }
  };

  const getTrailIdSteps = async (trailId: string) => {
    try {
      const stepsData = await getAllStepsByTrailId(trailId);
      setStepsData(stepsData);
    } catch (error) {
      console.error("Error updating steps:", error);
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col flex-wrap items-center justify-center my-16">
        <div className="w-container">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-customPurple">
              Título da trilha
            </h1>
            <div>
              <button
                onClick={handleModalOpen}
                className="flex items-center bg-customPurple px-4 py-3 gap-customSpacing rounded-xl text-white hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-opacity-50"
              >
                <div className="text-2xl mr-2 ml-2">+</div>
                <div className="font-bold text-lg">Adicionar passo</div>
              </button>
            </div>
          </div>
          <div className="flex flex-col mt-12 border-slate-200 gap-6">
            {stepsData.map((step, index) => (
              <div
                key={index}
                className="p-6 bg-white w-[800px] min-h-32 rounded-lg border-2"
              >
                <p className="text-lg font-bold mb-2 text-customPurple">
                  {step.title}
                </p>
                <p className="text-base text-customSubPurple overflow-hidden whitespace-pre-wrap break-words">
                  {step.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CreateStepForm
        isOpen={isModalOpen}
        closeModal={handleModalClose}
        updateSteps={updateSteps}
      />
    </>
  );
}
